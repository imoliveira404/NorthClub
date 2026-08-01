import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Lock, Minus, Plus, QrCode, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { SiteHeader } from "@/components/store/SiteHeader";
import { SiteFooter } from "@/components/store/SiteFooter";
import { useCart } from "@/lib/cart";
import { useSession } from "@/lib/use-session";
import { attachOrderToMe } from "@/lib/store.functions";
import { formatBRL } from "@/lib/products";
import { useMercadoPagoSdk } from "@/hooks/use-mercadopago";
import {
  createMercadoPagoOrder,
  getMercadoPagoPublicKey,
} from "@/lib/mercadopago.functions";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout | Futz — Pagamento seguro com Mercado Pago" },
      {
        name: "description",
        content:
          "Finalize seu pedido de camisas tailandesas com cartão de crédito em até 12x ou Pix, sem sair do site.",
      },
      { property: "og:title", content: "Checkout | Futz" },
      {
        property: "og:description",
        content: "Pague com cartão ou Pix direto no site, com Mercado Pago.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Checkout,
});

const onlyDigits = (value: string) => value.replace(/\D/g, "");

type PixResult = {
  qrCodeBase64: string | null;
  qrCode: string | null;
  ticketUrl: string | null;
};

function Field({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <input
        {...props}
        className="w-full border border-border bg-card px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary"
      />
    </label>
  );
}

function Checkout() {
  const { items, total, updateQuantity, removeItem, clear } = useCart();
  const publicKeyFn = useServerFn(getMercadoPagoPublicKey);
  const createOrder = useServerFn(createMercadoPagoOrder);
  const attachOrder = useServerFn(attachOrderToMe);
  const { user } = useSession();

  const { data: keyData } = useQuery({
    queryKey: ["mp-public-key"],
    queryFn: () => publicKeyFn(),
    staleTime: Infinity,
  });
  const { mp, error: sdkError } = useMercadoPagoSdk(keyData?.publicKey);

  const [method, setMethod] = useState<"card" | "pix">("card");
  const [loading, setLoading] = useState(false);
  const [pix, setPix] = useState<PixResult | null>(null);
  const [approved, setApproved] = useState<string | null>(null);

  const [payer, setPayer] = useState({
    firstName: "",
    lastName: "",
    email: "",
    cpf: "",
  });
  const [card, setCard] = useState({
    number: "",
    holder: "",
    month: "",
    year: "",
    cvv: "",
    installments: 1,
  });

  useEffect(() => {
    if (user?.email) {
      setPayer((prev) => (prev.email ? prev : { ...prev, email: user.email! }));
    }
  }, [user]);

  const maxInstallments = 12;

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (items.length === 0) return;
    setLoading(true);
    setPix(null);

    try {
      const payerPayload = {
        email: payer.email.trim(),
        firstName: payer.firstName.trim(),
        lastName: payer.lastName.trim(),
        cpf: onlyDigits(payer.cpf),
      };

      let cardToken: string | undefined;
      let paymentMethodId: string | undefined;

      if (method === "card") {
        if (!mp) throw new Error("SDK de pagamento ainda carregando. Tente novamente.");
        const bin = onlyDigits(card.number).slice(0, 8);
        const methods = await mp.getPaymentMethods({ bin });
        paymentMethodId = methods.results?.[0]?.id;
        if (!paymentMethodId) throw new Error("Cartão não reconhecido.");

        const token = await mp.createCardToken({
          cardNumber: onlyDigits(card.number),
          cardholderName: card.holder.trim(),
          cardExpirationMonth: card.month,
          cardExpirationYear: card.year,
          securityCode: card.cvv,
          identificationType: "CPF",
          identificationNumber: payerPayload.cpf,
        });
        cardToken = token.id;
      }

      const result = await createOrder({
        data: {
          items: items.map((i) => ({
            id: i.id,
            name: i.name,
            price: i.price,
            quantity: i.quantity,
            size: i.size,
          })),
          payer: payerPayload,
          method,
          ...(cardToken ? { cardToken } : {}),
          ...(paymentMethodId ? { paymentMethodId } : {}),
          ...(method === "card" ? { installments: card.installments } : {}),
        },
      });

      if (user) {
        await attachOrder({ data: { mpOrderId: String(result.orderId) } }).catch(
          () => undefined,
        );
      }

      if (method === "pix") {
        setPix(result.pix);
        toast.success("Pix gerado! Escaneie o QR Code para pagar.");
        return;
      }

      if (result.paymentStatus === "approved" || result.status === "processed") {
        setApproved(result.orderId);
        clear();
        toast.success("Pagamento aprovado!", {
          description: `Pedido ${result.orderId}`,
        });
      } else {
        toast.error("Pagamento não aprovado", {
          description: result.statusDetail ?? result.status,
        });
      }
    } catch (error) {
      toast.error("Não foi possível concluir o pagamento", {
        description: error instanceof Error ? error.message : "Erro inesperado",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto max-w-7xl px-4 py-12">
        <h1 className="font-display text-4xl uppercase tracking-tight text-foreground">
          Checkout
        </h1>
        <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
          <Lock className="size-4 text-primary" /> Pagamento processado com
          segurança pelo Mercado Pago, sem sair do site.
        </p>

        {approved ? (
          <div className="mt-10 border border-border bg-card p-8">
            <h2 className="font-display text-2xl uppercase text-foreground">
              Pagamento aprovado
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Pedido <strong>{approved}</strong>. Você receberá o rastreio por
              e-mail em até 1 dia útil.
            </p>
            <Link
              to="/"
              className="mt-6 inline-block bg-primary px-6 py-3 text-xs font-bold uppercase tracking-widest text-primary-foreground"
            >
              Continuar comprando
            </Link>
          </div>
        ) : items.length === 0 ? (
          <div className="mt-10 border border-border bg-card p-8">
            <p className="text-sm text-muted-foreground">
              Seu carrinho está vazio.
            </p>
            <Link
              to="/"
              className="mt-6 inline-block bg-primary px-6 py-3 text-xs font-bold uppercase tracking-widest text-primary-foreground"
            >
              Ver produtos
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
            <form onSubmit={handleSubmit} className="space-y-8">
              <section className="border border-border bg-card p-6">
                <h2 className="font-display text-xl uppercase text-foreground">
                  Seus dados
                </h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Nome"
                    required
                    value={payer.firstName}
                    onChange={(e) =>
                      setPayer({ ...payer, firstName: e.target.value })
                    }
                  />
                  <Field
                    label="Sobrenome"
                    required
                    value={payer.lastName}
                    onChange={(e) =>
                      setPayer({ ...payer, lastName: e.target.value })
                    }
                  />
                  <Field
                    label="E-mail"
                    type="email"
                    required
                    value={payer.email}
                    onChange={(e) =>
                      setPayer({ ...payer, email: e.target.value })
                    }
                  />
                  <Field
                    label="CPF"
                    required
                    inputMode="numeric"
                    maxLength={14}
                    placeholder="000.000.000-00"
                    value={payer.cpf}
                    onChange={(e) => setPayer({ ...payer, cpf: e.target.value })}
                  />
                </div>
              </section>

              <section className="border border-border bg-card p-6">
                <h2 className="font-display text-xl uppercase text-foreground">
                  Forma de pagamento
                </h2>

                <div className="mt-4 flex gap-2">
                  {(["card", "pix"] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMethod(m)}
                      className={`flex-1 border px-4 py-3 text-xs font-bold uppercase tracking-widest transition-colors ${
                        method === m
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border text-foreground"
                      }`}
                    >
                      {m === "card" ? "Cartão de crédito" : "Pix"}
                    </button>
                  ))}
                </div>

                {method === "card" ? (
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <Field
                        label="Número do cartão"
                        required
                        inputMode="numeric"
                        autoComplete="cc-number"
                        maxLength={19}
                        value={card.number}
                        onChange={(e) =>
                          setCard({ ...card, number: e.target.value })
                        }
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Field
                        label="Nome impresso no cartão"
                        required
                        autoComplete="cc-name"
                        value={card.holder}
                        onChange={(e) =>
                          setCard({ ...card, holder: e.target.value })
                        }
                      />
                    </div>
                    <Field
                      label="Mês"
                      required
                      inputMode="numeric"
                      maxLength={2}
                      placeholder="MM"
                      value={card.month}
                      onChange={(e) =>
                        setCard({ ...card, month: e.target.value })
                      }
                    />
                    <Field
                      label="Ano"
                      required
                      inputMode="numeric"
                      maxLength={4}
                      placeholder="AAAA"
                      value={card.year}
                      onChange={(e) =>
                        setCard({ ...card, year: e.target.value })
                      }
                    />
                    <Field
                      label="CVV"
                      required
                      inputMode="numeric"
                      maxLength={4}
                      value={card.cvv}
                      onChange={(e) => setCard({ ...card, cvv: e.target.value })}
                    />
                    <label className="block">
                      <span className="mb-1 block text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                        Parcelas
                      </span>
                      <select
                        value={card.installments}
                        onChange={(e) =>
                          setCard({
                            ...card,
                            installments: Number(e.target.value),
                          })
                        }
                        className="w-full border border-border bg-card px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary"
                      >
                        {Array.from({ length: maxInstallments }, (_, i) => i + 1).map(
                          (n) => (
                            <option key={n} value={n}>
                              {n}x de {formatBRL(total / n)}
                            </option>
                          ),
                        )}
                      </select>
                    </label>
                    {sdkError && (
                      <p className="sm:col-span-2 text-xs text-destructive">
                        {sdkError}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="mt-6 flex items-start gap-2 text-sm text-muted-foreground">
                    <QrCode className="mt-0.5 size-5 shrink-0 text-primary" />
                    Ao confirmar, geramos um QR Code Pix válido por 30 minutos. A
                    aprovação é automática após o pagamento.
                  </p>
                )}
              </section>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 bg-foreground py-4 text-xs font-bold uppercase tracking-[0.2em] text-background transition-colors hover:bg-primary hover:text-primary-foreground disabled:opacity-60"
              >
                {loading && <Loader2 className="size-4 animate-spin" />}
                {method === "pix"
                  ? `Gerar Pix — ${formatBRL(total)}`
                  : `Pagar ${formatBRL(total)}`}
              </button>

              {pix && (
                <section className="border border-border bg-card p-6 text-center">
                  <h2 className="font-display text-xl uppercase text-foreground">
                    Pague com Pix
                  </h2>
                  {pix.qrCodeBase64 && (
                    <img
                      src={`data:image/png;base64,${pix.qrCodeBase64}`}
                      alt="QR Code Pix do pedido"
                      width={240}
                      height={240}
                      className="mx-auto mt-4"
                    />
                  )}
                  {pix.qrCode && (
                    <>
                      <p className="mx-auto mt-4 max-w-md break-all rounded bg-secondary p-3 text-xs text-foreground">
                        {pix.qrCode}
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(pix.qrCode!);
                          toast.success("Código Pix copiado");
                        }}
                        className="mt-3 bg-primary px-6 py-3 text-xs font-bold uppercase tracking-widest text-primary-foreground"
                      >
                        Copiar código
                      </button>
                    </>
                  )}
                  {pix.ticketUrl && (
                    <a
                      href={pix.ticketUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 block text-xs font-bold uppercase tracking-widest text-primary"
                    >
                      Abrir comprovante
                    </a>
                  )}
                </section>
              )}
            </form>

            <aside className="h-fit border border-border bg-card p-6">
              <h2 className="font-display text-xl uppercase text-foreground">
                Resumo
              </h2>
              <ul className="mt-4 divide-y divide-border">
                {items.map((item) => (
                  <li
                    key={`${item.id}-${item.size}`}
                    className="flex gap-3 py-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      width={64}
                      height={64}
                      className="size-16 shrink-0 object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-foreground">
                        {item.name}
                      </p>
                      <p className="text-[11px] uppercase text-muted-foreground">
                        Tam. {item.size}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          type="button"
                          aria-label="Diminuir quantidade"
                          onClick={() =>
                            updateQuantity(item.id, item.size, item.quantity - 1)
                          }
                          className="border border-border p-1"
                        >
                          <Minus className="size-3" />
                        </button>
                        <span className="text-xs font-bold">{item.quantity}</span>
                        <button
                          type="button"
                          aria-label="Aumentar quantidade"
                          onClick={() =>
                            updateQuantity(item.id, item.size, item.quantity + 1)
                          }
                          className="border border-border p-1"
                        >
                          <Plus className="size-3" />
                        </button>
                        <button
                          type="button"
                          aria-label="Remover item"
                          onClick={() => removeItem(item.id, item.size)}
                          className="ml-auto text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-foreground">
                      {formatBRL(item.price * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Total
                </span>
                <span className="font-display text-2xl text-foreground">
                  {formatBRL(total)}
                </span>
              </div>
            </aside>
          </div>
        )}
      </main>

      <SiteFooter />
      <Toaster />
    </div>
  );
}
