import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

/**
 * Webhook de notificações do Mercado Pago.
 * Configure esta URL em: Suas integrações > Webhooks.
 * O prefixo /api/public/ é liberado da autenticação do site publicado,
 * por isso a validação da assinatura acontece aqui dentro.
 */
export const Route = createFileRoute("/api/public/mercadopago-webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secret = process.env["MERCADOPAGO_WEBHOOK_SECRET"];
        const raw = await request.text();

        if (secret) {
          const signature = request.headers.get("x-signature") ?? "";
          const requestId = request.headers.get("x-request-id") ?? "";
          const dataId =
            new URL(request.url).searchParams.get("data.id") ?? "";
          const parts = Object.fromEntries(
            signature
              .split(",")
              .map((p) => p.split("=").map((s) => s.trim()))
              .filter((p) => p.length === 2) as [string, string][],
          );

          const manifest = `id:${dataId};request-id:${requestId};ts:${parts["ts"] ?? ""};`;
          const { createHmac, timingSafeEqual } = await import("crypto");
          const expected = createHmac("sha256", secret)
            .update(manifest)
            .digest("hex");
          const received = parts["v1"] ?? "";

          const valid =
            received.length === expected.length &&
            timingSafeEqual(Buffer.from(received), Buffer.from(expected));

          if (!valid) {
            console.error("Webhook Mercado Pago: assinatura inválida");
            return new Response("Invalid signature", { status: 401 });
          }
        }

        const parsed = z
          .object({
            action: z.string().optional(),
            type: z.string().optional(),
            data: z.object({ id: z.union([z.string(), z.number()]) }).optional(),
          })
          .safeParse(JSON.parse(raw || "{}"));

        if (!parsed.success) {
          return new Response("Invalid payload", { status: 400 });
        }

        console.log("Webhook Mercado Pago recebido:", {
          type: parsed.data.type,
          action: parsed.data.action,
          id: parsed.data.data?.id,
        });

        // Aqui é o ponto de integração para atualizar o pedido no banco
        // quando o app tiver persistência habilitada.
        return new Response("ok", { status: 200 });
      },
    },
  },
});
