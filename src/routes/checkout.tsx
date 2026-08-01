import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, Lock, Minus, Plus, ShieldCheck, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { SiteHeader } from "@/components/store/SiteHeader";
import { SiteFooter } from "@/components/store/SiteFooter";
import { useCart } from "@/lib/cart";
import { useSession } from "@/lib/use-session";
import { attachOrderToMe } from "@/lib/store.functions";
import { formatBRL } from "@/lib/products";
import { createMercadoPagoPreference } from "@/lib/mercadopago.functions";

export const Route = createFileRoute("/checkout")({
  validateSearch: (search: Record<string, unknown>) => ({
    status: typeof search["status"] === "string" ? search["status"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Checkout | Futz — Pagamento seguro com Mercado Pago" },
      {
        name: "description",
        content:
          "Finalize seu pedido de camisas tailandesas no checkout oficial do Mercado Pago: cartão em até 12x, Pix ou boleto.",
      },
      { property: "og:title", content: "Checkout | Futz" },
      {
        property: "og:description",
        content:
          "Pagamento no ambiente oficial do Mercado Pago: cartão, Pix ou boleto.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Checkout,
});

const onlyDigits = (value: string) => value.replace(/\D/g, "");

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
  const { status } = Route.useSearch();
  const { items, total, updateQuantity, removeItem, clear } = useCart();
  const createPreference = useServerFn(createMercadoPagoPreference);
  const attachOrder = useServerFn(attachOrderToMe);
  const { user } = useSession();

  const [loading, setLoading] = useState(false);
  const [payer, setPayer] = useState({
    firstName: "",
    lastName: "",
    email: "",
    cpf: "",
  });

  useEffect(() => {
    if (user?.email) {
      setPayer((prev) => (prev.email ? prev : { ...prev, email: user.email! }));
    }
  }, [user]);

  useEffect(() => {
    if (status === "success") {
      clear();
      toast.success("Pagamento confirmado! Obrigado pela compra.");
    } else if (status === "pending") {
      toast.info("Pagamento em análise. Avisaremos por e-mail ao confirmar.");
    } else if (status === "failure") {
      toast.error("O pagamento não foi concluído. Tente novamente.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (items.length === 0) return;
    setLoading(true);

    try {
      const cpf = onlyDigits(payer.cpf);
      const result = await createPreference({
        data: {
          items: items.map((i) => ({
            id: i.id,
            name: i.name,
            price: i.price,
            quantity: i.quantity,
            size: i.size,
          })),
          payer: {
            email: payer.email.trim(),
            firstName: payer.firstName.trim(),
            lastName: payer.lastName.trim(),
            ...(cpf.length === 11 ? { cpf } : {}),
          },
          origin: window.location.origin,
        },
      });

      if (user) {
        await attachOrder({
          data: { mpOrderId: String(result.preferenceId) },
        }).catch(() => undefined);
      }

      if (!result.checkoutUrl) {
        throw new Error("Não recebemos o link de pagamento do Mercado Pago.");
      }

      window.location.href = result.checkoutUrl;
    } catch (error) {
      toast.error("Não foi possível iniciar o pagamento", {
        description: error instanceof Error ? error.message : "Erro inesperado",
      });
      setLoading(false);
    }
  }

  if (status === "success") {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <main className="mx-auto max-w-3xl px-4 py-20">
          <h1 className="font-display text-4xl uppercase tracking-tight text-foreground">
            Pagamento confirmado
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Recebemos seu pedido. Você vai receber a confirmação e o rastreio por
            e-mail em até 1 dia útil.
          </p>
          <Link
            to="/"
            className="mt-8 inline-block bg-primary px-6 py-3 text-xs font-bold uppercase tracking-widest text-primary-foreground"
          >
            Continuar comprando
          </Link>
        </main>
        <SiteFooter />
        <Toaster />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto max-w-7xl px-4 py-12">
        <h1 className="font-display text-4xl uppercase tracking-tight text-foreground">
          Checkout
        </h1>
        <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
          <Lock className="size-4 text-primary" /> O pagamento é finalizado no
          ambiente oficial do Mercado Pago.
        </p>

        {items.length === 0 ? (
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
                    label="CPF (opcional)"
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
                  Pagamento
                </h2>
                <p className="mt-4 flex items-start gap-2 text-sm text-muted-foreground">
                  <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" />
                  Ao continuar, você é levado para o checkout oficial do Mercado
                  Pago, onde escolhe cartão de crédito em até 12x, Pix ou boleto.
                  Seus dados de pagamento são tratados diretamente pelo Mercado
                  Pago.
                </p>
              </section>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 bg-foreground py-4 text-xs font-bold uppercase tracking-[0.2em] text-background transition-colors hover:bg-primary hover:text-primary-foreground disabled:opacity-60"
              >
                {loading && <Loader2 className="size-4 animate-spin" />}
                Pagar com Mercado Pago — {formatBRL(total)}
              </button>
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
