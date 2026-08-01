import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const itemSchema = z.object({
  id: z.string().min(1).max(64),
  name: z.string().min(1).max(256),
  price: z.number().positive().max(100000),
  quantity: z.number().int().positive().max(50),
  size: z.string().min(1).max(8),
});

const payerSchema = z.object({
  email: z.string().email().max(254),
  firstName: z.string().min(1).max(80),
  lastName: z.string().min(1).max(80),
  cpf: z.string().regex(/^\d{11}$/, "CPF deve ter 11 dígitos"),
});

const inputSchema = z.object({
  items: z.array(itemSchema).min(1).max(30),
  payer: payerSchema,
  method: z.enum(["card", "pix"]),
  cardToken: z.string().min(10).max(200).optional(),
  paymentMethodId: z.string().min(2).max(40).optional(),
  installments: z.number().int().min(1).max(12).optional(),
});

const toAmount = (value: number) => value.toFixed(2);

export const getMercadoPagoPublicKey = createServerFn({ method: "GET" }).handler(
  async () => ({ publicKey: process.env["MERCADOPAGO_PUBLIC_KEY"] ?? "" }),
);

export const createMercadoPagoOrder = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => inputSchema.parse(data))
  .handler(async ({ data }) => {
    const { mpRequest, type MpOrder } = await import("@/lib/mercadopago.server");

    const total = data.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const externalReference = `futz-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    const payment =
      data.method === "pix"
        ? {
            amount: toAmount(total),
            payment_method: {
              id: "pix",
              type: "bank_transfer" as const,
            },
          }
        : {
            amount: toAmount(total),
            payment_method: {
              id: data.paymentMethodId!,
              type: "credit_card" as const,
              token: data.cardToken!,
              installments: data.installments ?? 1,
              statement_descriptor: "FUTZ",
            },
          };

    if (data.method === "card" && (!data.cardToken || !data.paymentMethodId)) {
      throw new Error("Dados do cartão incompletos.");
    }

    const order = await mpRequest<MpOrder>("/v1/orders", {
      method: "POST",
      idempotencyKey: externalReference,
      body: {
        type: "online",
        processing_mode: "automatic",
        external_reference: externalReference,
        total_amount: toAmount(total),
        description: "Pedido Futz",
        payer: {
          email: data.payer.email,
          first_name: data.payer.firstName,
          last_name: data.payer.lastName,
          identification: { type: "CPF", number: data.payer.cpf },
        },
        transactions: { payments: [payment] },
        items: data.items.map((item) => ({
          title: `${item.name} (${item.size})`,
          unit_price: toAmount(item.price),
          quantity: item.quantity,
          external_code: item.id,
        })),
      },
    });

    const mpPayment = order.transactions?.payments?.[0];

    return {
      orderId: order.id,
      externalReference,
      status: order.status,
      statusDetail: mpPayment?.status_detail ?? order.status_detail ?? null,
      paymentStatus: mpPayment?.status ?? null,
      pix: {
        qrCode: mpPayment?.payment_method?.qr_code ?? null,
        qrCodeBase64: mpPayment?.payment_method?.qr_code_base64 ?? null,
        ticketUrl: mpPayment?.payment_method?.ticket_url ?? null,
      },
      total,
    };
  });

export const getMercadoPagoOrder = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    z.object({ orderId: z.string().min(3).max(64) }).parse(data),
  )
  .handler(async ({ data }) => {
    const { mpRequest, type MpOrder } = await import("@/lib/mercadopago.server");
    const order = await mpRequest<MpOrder>(`/v1/orders/${data.orderId}`, {
      method: "GET",
    });
    const payment = order.transactions?.payments?.[0];
    return {
      orderId: order.id,
      status: order.status,
      paymentStatus: payment?.status ?? null,
      statusDetail: payment?.status_detail ?? null,
    };
  });
