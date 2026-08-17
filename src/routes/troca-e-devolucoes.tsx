import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, HelpCircle, RefreshCw, ShieldCheck, Truck } from "lucide-react";
import { SiteHeader } from "@/components/store/SiteHeader";
import { SiteFooter } from "@/components/store/SiteFooter";
import { Toaster } from "@/components/ui/sonner";
import { whatsappLink } from "@/lib/whatsapp";

export const Route = createFileRoute("/troca-e-devolucoes")({
  head: () => ({
    meta: [
      { title: "Trocas e Devoluções | North Football Club" },
      {
        name: "description",
        content:
          "Política de trocas e devoluções da North. Garantia de 7 dias para devoluções e suporte rápido para trocas de tamanho ou defeito.",
      },
    ],
  }),
  component: TrocaEDevolucoesPage,
});

function TrocaEDevolucoesPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main>
        {/* Header Hero */}
        <section className="bg-foreground py-16 text-background">
          <div className="mx-auto max-w-7xl px-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Políticas de Garantia
            </p>
            <h1 className="mt-2 font-display text-4xl uppercase tracking-tight sm:text-5xl lg:text-6xl">
              Trocas & <span className="text-primary">Devoluções</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base text-background/80">
              Na North, a sua satisfação é a nossa prioridade. Oferecemos um processo simples, transparente e sem burocracia para você solicitar a troca ou devolução do seu produto.
            </p>
          </div>
        </section>

        {/* Informações Principais */}
        <section className="mx-auto max-w-7xl px-4 py-16">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="border border-border bg-card p-6">
              <RefreshCw className="size-8 text-primary" />
              <h3 className="mt-4 font-display text-xl uppercase text-foreground">
                7 Dias para Devolução
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                De acordo com o Código de Defesa do Consumidor, você tem até 7 dias corridos após o recebimento para desistir da compra ou solicitar a devolução.
              </p>
            </div>

            <div className="border border-border bg-card p-6">
              <ShieldCheck className="size-8 text-primary" />
              <h3 className="mt-4 font-display text-xl uppercase text-foreground">
                Troca por Tamanho
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Ficou grande ou pequeno? Realizamos a troca do tamanho sem complicações, desde que o produto esteja sem marcas de uso e com as etiquetas originais.
              </p>
            </div>

            <div className="border border-border bg-card p-6">
              <Truck className="size-8 text-primary" />
              <h3 className="mt-4 font-display text-xl uppercase text-foreground">
                Garantia contra Defeitos
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Se a peça apresentar qualquer defeito de fabricação ou bordado, realizamos a substituição por uma peça nova sem custo adicional.
              </p>
            </div>
          </div>
        </section>

        {/* Regras e Passo a Passo */}
        <section className="bg-card py-16 border-y border-border">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="font-display text-3xl uppercase tracking-tight text-foreground">
              Passo a Passo para Solicitar
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Siga os passos abaixo para que sua solicitação seja processada rapidamente:
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-4">
              <div className="border border-border bg-background p-6">
                <span className="font-display text-4xl text-primary">01</span>
                <h4 className="mt-3 font-display text-base uppercase text-foreground">
                  Entre em Contato
                </h4>
                <p className="mt-2 text-xs text-muted-foreground">
                  Fale com nosso suporte via WhatsApp informando o número do pedido e o motivo da troca.
                </p>
              </div>

              <div className="border border-border bg-background p-6">
                <span className="font-display text-4xl text-primary">02</span>
                <h4 className="mt-3 font-display text-base uppercase text-foreground">
                  Envie Fotos
                </h4>
                <p className="mt-2 text-xs text-muted-foreground">
                  Envie fotos nítidas do produto e das etiquetas afixadas para nossa equipe validar a solicitação.
                </p>
              </div>

              <div className="border border-border bg-background p-6">
                <span className="font-display text-4xl text-primary">03</span>
                <h4 className="mt-3 font-display text-base uppercase text-foreground">
                  Envio do Produto
                </h4>
                <p className="mt-2 text-xs text-muted-foreground">
                  Você receberá as instruções para envio da peça de volta ao nosso centro de distribuição.
                </p>
              </div>

              <div className="border border-border bg-background p-6">
                <span className="font-display text-4xl text-primary">04</span>
                <h4 className="mt-3 font-display text-base uppercase text-foreground">
                  Reenvio / Reembolso
                </h4>
                <p className="mt-2 text-xs text-muted-foreground">
                  Assim que a peça for vistoriada, enviamos seu novo produto ou efetuamos o estorno do valor.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Requisitos Importantes */}
        <section className="mx-auto max-w-7xl px-4 py-16">
          <div className="border border-border bg-card p-8">
            <h3 className="flex items-center gap-2 font-display text-2xl uppercase text-foreground">
              <CheckCircle2 className="size-6 text-primary" /> Condições do Produto para Aceitação
            </h3>

            <ul className="mt-6 space-y-3 text-xs leading-relaxed text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="size-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                O produto deve estar na embalagem original, com todas as etiquetas e tags afixadas.
              </li>
              <li className="flex items-start gap-2">
                <span className="size-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                Sem nenhum sinal de lavagem, odor ou uso (manchas, sujeiras ou dobras forçadas).
              </li>
              <li className="flex items-start gap-2">
                <span className="size-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                Não aceitamos trocas de peças personalizadas com nomes ou números customizados a pedido do cliente, salvo em caso de defeito de fabricação.
              </li>
            </ul>

            <div className="mt-8 pt-6 border-t border-border flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-display text-lg uppercase text-foreground">Dúvidas sobre sua troca?</p>
                <p className="text-xs text-muted-foreground">Nossa equipe de atendimento está pronta para te auxiliar agora mesmo.</p>
              </div>
              <a
                href={whatsappLink("Olá! Preciso de ajuda com troca ou devolução de um pedido.")}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary px-8 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground hover:opacity-90"
              >
                Solicitar Troca pelo WhatsApp
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
