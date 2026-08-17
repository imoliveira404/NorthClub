import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Lock, Minus, Plus, ShieldCheck, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { SiteHeader } from "@/components/store/SiteHeader";
import { SiteFooter } from "@/components/store/SiteFooter";
import { useCart } from "@/lib/cart";
import { useGuestAccount } from "@/lib/guest-account";
import { formatBRL } from "@/lib/products";
import { WHATSAPP_DISPLAY, cartWhatsappMessage, whatsappLink } from "@/lib/whatsapp";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Carrinho | North — Finalize no WhatsApp" },
      {
        name: "description",
        content:
          "Revise as camisas do seu carrinho e finalize o pedido direto com nosso atendimento no WhatsApp.",
      },
      { property: "og:site_name", content: "North Football Club" },
      { property: "og:title", content: "Carrinho | North Football Club" },
      {
        property: "og:description",
        content: "Revise seu carrinho e finalize o pedido com nosso atendimento no WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/assets/hero-stadium.webp" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Carrinho | North Football Club" },
      { name: "twitter:image", content: "/assets/hero-stadium.webp" },
    ],
  }),
  component: Cart,
});

function Cart() {
  const { items, total, updateQuantity, removeItem, clear } = useCart();
  const { email: guestEmail, signIn } = useGuestAccount();
  const [emailInput, setEmailInput] = useState("");
  const [confirmClearOpen, setConfirmClearOpen] = useState(false);

  function handleFinish() {
    if (items.length === 0) return;
    const email = (guestEmail ?? emailInput).trim().toLowerCase();
    if (email && !guestEmail) signIn(email);

    const url = whatsappLink(cartWhatsappMessage(items, total, email || null));
    toast.success("Abrindo o WhatsApp com seu pedido...");
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto max-w-3xl px-4 py-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-4xl uppercase tracking-tight text-foreground">
              Seu carrinho
            </h1>
            <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <Lock className="size-4 text-primary" /> Atendimento e pagamento pelo WhatsApp{" "}
              {WHATSAPP_DISPLAY}.
            </p>
          </div>

          {items.length > 0 && (
            <button
              type="button"
              onClick={() => setConfirmClearOpen(true)}
              className="flex items-center gap-1.5 border border-border bg-card px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-muted-foreground transition-colors hover:border-destructive hover:text-destructive"
            >
              <Trash2 className="size-3.5" />
              Esvaziar sacola
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="mt-10 border border-border bg-card p-8 text-center sm:text-left">
            <p className="text-sm text-muted-foreground">Seu carrinho está vazio.</p>
            <Link
              to="/"
              search={{ q: "", cat: "", size: "", sort: "recentes", min: 0, max: 0, page: 1 }}
              className="mt-6 inline-block bg-primary px-6 py-3 text-xs font-bold uppercase tracking-widest text-primary-foreground hover:opacity-90"
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
                    referrerPolicy="no-referrer"
                    width={80}
                    height={80}
                    className="size-20 shrink-0 object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">{item.name}</p>
                    <p className="text-[11px] uppercase text-muted-foreground">Tam. {item.size}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        aria-label="Diminuir quantidade"
                        onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                        className="border border-border p-1 hover:border-foreground"
                      >
                        <Minus className="size-3" />
                      </button>
                      <span className="text-xs font-bold px-1">{item.quantity}</span>
                      <button
                        type="button"
                        aria-label="Aumentar quantidade"
                        onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                        className="border border-border p-1 hover:border-foreground"
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
              <span className="font-display text-2xl text-foreground">{formatBRL(total)}</span>
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
              onClick={handleFinish}
              className="mt-6 flex w-full items-center justify-center gap-2 bg-[#25D366] py-4 text-xs font-bold uppercase tracking-[0.2em] text-black transition-opacity hover:opacity-90"
            >
              Finalizar compra no WhatsApp — {formatBRL(total)}
            </button>

            <p className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />
              Enviamos seu pedido com as referências, tamanhos e quantidades para o atendimento{" "}
              {WHATSAPP_DISPLAY}, que finaliza o pagamento e o frete com você.
            </p>
          </div>
        )}
      </main>

      {/* Modal de Confirmação para Esvaziar Sacola */}
      {confirmClearOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md border-2 border-foreground bg-card p-6 shadow-2xl">
            <h3 className="font-display text-lg uppercase tracking-tight text-foreground text-center">
              Tem certeza que deseja esvaziar a sacola?
            </h3>
            <p className="mt-2 text-center text-xs text-muted-foreground">
              Esta ação removerá todas as camisas do seu carrinho.
            </p>

            <div className="mt-6 flex items-center justify-between gap-4">
              {/* Lado esquerdo: Não em rosa */}
              <button
                type="button"
                onClick={() => setConfirmClearOpen(false)}
                className="flex-1 bg-[#ec4899] py-3 text-xs font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90"
              >
                Não
              </button>

              {/* Lado direito: Sim */}
              <button
                type="button"
                onClick={() => {
                  clear();
                  setConfirmClearOpen(false);
                  toast.info("Sacola esvaziada");
                }}
                className="flex-1 border border-border bg-foreground py-3 text-xs font-bold uppercase tracking-widest text-background transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                Sim
              </button>
            </div>
          </div>
        </div>
      )}

      <SiteFooter />
      <Toaster />
    </div>
  );
}
