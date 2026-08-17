import { createFileRoute, Link } from "@tanstack/react-router";
import { CreditCard, HelpCircle, Package, Search, ShieldCheck, ShoppingBag } from "lucide-react";
import { SiteHeader } from "@/components/store/SiteHeader";
import { SiteFooter } from "@/components/store/SiteFooter";
import { Toaster } from "@/components/ui/sonner";
import { whatsappLink } from "@/lib/whatsapp";

export const Route = createFileRoute("/como-comprar")({
  head: () => ({
    meta: [
      { title: "Como Comprar | North Football Club" },
      {
        name: "description",
        content:
          "Guia passo a passo de como comprar camisas de futebol tailandesas 1.1 na North. Compra fácil, segura e com envio imediato.",
      },
    ],
  }),
  component: ComoComprarPage,
});

function ComoComprarPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main>
        {/* Header Hero */}
        <section className="bg-foreground py-16 text-background">
          <div className="mx-auto max-w-7xl px-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Guia Prático
            </p>
            <h1 className="mt-2 font-display text-4xl uppercase tracking-tight sm:text-5xl lg:text-6xl">
              Como <span className="text-primary">Comprar</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base text-background/80">
              Comprar seu manto sagrado na North é rápido, fácil e 100% seguro. Veja nosso passo a passo e faça seu pedido em poucos minutos.
            </p>
          </div>
        </section>

        {/* Steps Section */}
        <section className="mx-auto max-w-7xl px-4 py-16">
          <div className="space-y-12">
            {/* Passo 1 */}
            <div className="grid gap-6 md:grid-cols-[80px_1fr] items-start border border-border bg-card p-8">
              <div className="flex size-16 items-center justify-center bg-primary text-primary-foreground font-display text-3xl">
                01
              </div>
              <div>
                <h3 className="flex items-center gap-3 font-display text-2xl uppercase text-foreground">
                  <Search className="size-6 text-primary" /> Escolha o produto e o tamanho
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Navegue pelo nosso catálogo de produtos ou utilize a barra de busca para encontrar o manto do seu time do coração. Na página do produto, confira os tamanhos disponíveis (P, M, G, GG, 2XL) e clique em "Adicionar ao carrinho".
                </p>
              </div>
            </div>

            {/* Passo 2 */}
            <div className="grid gap-6 md:grid-cols-[80px_1fr] items-start border border-border bg-card p-8">
              <div className="flex size-16 items-center justify-center bg-primary text-primary-foreground font-display text-3xl">
                02
              </div>
              <div>
                <h3 className="flex items-center gap-3 font-display text-2xl uppercase text-foreground">
                  <ShoppingBag className="size-6 text-primary" /> Revise seu carrinho
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  No carrinho de compras, confira a quantidade de peças e os tamanhos selecionados. Lembre-se: compras acima de 3 peças garantem descontos exclusivos de atacado (até 10% OFF)!
                </p>
              </div>
            </div>

            {/* Passo 3 */}
            <div className="grid gap-6 md:grid-cols-[80px_1fr] items-start border border-border bg-card p-8">
              <div className="flex size-16 items-center justify-center bg-primary text-primary-foreground font-display text-3xl">
                03
              </div>
              <div>
                <h3 className="flex items-center gap-3 font-display text-2xl uppercase text-foreground">
                  <CreditCard className="size-6 text-primary" /> Preencha o endereço e faça o pagamento
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Avance para o Checkout, insira seu e-mail para receber as atualizações do pedido e informe seu endereço de entrega no Brasil. Aceitamos pagamento via PIX (aprovação instantânea) ou cartão de crédito.
                </p>
              </div>
            </div>

            {/* Passo 4 */}
            <div className="grid gap-6 md:grid-cols-[80px_1fr] items-start border border-border bg-card p-8">
              <div className="flex size-16 items-center justify-center bg-primary text-primary-foreground font-display text-3xl">
                04
              </div>
              <div>
                <h3 className="flex items-center gap-3 font-display text-2xl uppercase text-foreground">
                  <Package className="size-6 text-primary" /> Receba o código de rastreio
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Assim que seu pedido for postado nos Correios ou transportadora, enviamos o código de rastreamento diretamente para seu e-mail ou WhatsApp. Agora é só aguardar seu manto chegar!
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-border pt-12">
            <div>
              <h3 className="font-display text-2xl uppercase text-foreground">
                Pronto para escolher suas camisas?
              </h3>
              <p className="text-sm text-muted-foreground">
                Confira o catálogo atualizado com as novidades de 2026.
              </p>
            </div>
            <div className="flex gap-4">
              <Link
                to="/produtos"
                search={{ q: "", cat: "", size: "", sort: "recentes", min: 0, max: 0, page: 1 }}
                className="bg-primary px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground hover:opacity-90"
              >
                Ver Produtos
              </Link>
              <a
                href={whatsappLink("Olá! Preciso de ajuda para realizar minha compra pelo site.")}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-border bg-card px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-foreground hover:border-primary"
              >
                Tirar Dúvidas
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <Toaster />
    </div>
  );
}
