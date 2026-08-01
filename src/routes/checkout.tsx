import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, Lock, Minus, Plus, ShieldCheck, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { SiteHeader } from "@/components/store/SiteHeader";
import { SiteFooter } from "@/components/store/SiteFooter";
import { useCart } from "@/lib/cart";
import { useGuestAccount } from "@/lib/guest-account";
import { formatBRL } from "@/lib/products";
import { createMercadoPagoPreference } from "@/lib/mercadopago.functions";

export const Route = createFileRoute("/checkout")({
  validateSearch: (search: Record<string, unknown>) => ({
    status: typeof search["status"] === "string" ? search["status"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Carrinho | Futz — Pagamento com Mercado Pago" },
      {
        name: "description",
        content:
          "Revise as camisas do seu carrinho e finalize no checkout oficial do Mercado Pago: cartão em até 12x, Pix ou boleto.",
      },
      { property: "og:title", content: "Carrinho | Futz" },
      {
        property: "og:description",
        content:
          "Revise seu carrinho e pague no ambiente oficial do Mercado Pago.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Cart,
});

function Cart() {
  const { status } = Route.useSearch();
  const { items, total, updateQuantity, removeItem, clear } = useCart();
  const { email: guestEmail, signIn } = useGuestAccount();
  const createPreference = useServerFn(createMercadoPagoPreference);

  const [loading, setLoading] = useState(false);
  const [emailInput, setEmailInput] = useState("");

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

  async function handlePay() {
    if (items.length === 0) return;
    const email = (guestEmail ?? emailInput).trim().toLowerCase();
    if (!email) {
      toast.error("Informe seu e-mail para continuar.");
      return;
    }
    if (!guestEmail) signIn(email);

    setLoading(true);
    try {
      const result = await createPreference({
        data: {
          items: items.map((i) => ({
            id: i.id,
            name: i.name,
            price: i.price,
            quantity: i.quantity,
            size: i.size,
          })),
          payer: { email },
          origin: window.location.origin,
        },
      });

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

      <main className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="font-display text-4xl uppercase tracking-tight text-foreground">
          Seu carrinho
        </h1>
        <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
          <Lock className="size-4 text-primary" /> Pagamento finalizado no
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
          <div className="mt-10 border border-border bg-card p-6">
            <ul className="divide-y divide-border">
              {items.map((item) => (
                <li key={`${item.id}-${item.size}`} className="flex gap-4 py-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    width={80}
                    height={80}
                    className="size-20 shrink-0 object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">
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
                        className="ml-4 text-muted-foreground hover:text-destructive"
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

            {guestEmail ? (
              <p className="mt-4 text-xs text-muted-foreground">
                Pedido no e-mail <strong>{guestEmail}</strong>
              </p>
            ) : (
              <label className="mt-6 block">
                <span className="mb-1 block text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                  Seu e-mail
                </span>
                <input
                  type="email"
                  placeholder="seu@email.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary"
                />
              </label>
            )}

            <button
              type="button"
              onClick={() => void handlePay()}
              disabled={loading}
              className="mt-6 flex w-full items-center justify-center gap-2 bg-foreground py-4 text-xs font-bold uppercase tracking-[0.2em] text-background transition-colors hover:bg-primary hover:text-primary-foreground disabled:opacity-60"
            >
              {loading && <Loader2 className="size-4 animate-spin" />}
              Pagar com Mercado Pago — {formatBRL(total)}
            </button>

            <p className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />
              Cartão em até 12x, Pix ou boleto — escolha na página do Mercado
              Pago.
            </p>
          </div>
        )}
      </main>

      <SiteFooter />
      <Toaster />
    </div>
  );
}
