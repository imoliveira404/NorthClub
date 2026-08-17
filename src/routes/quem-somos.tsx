import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BadgeCheck, PackageCheck, ShieldCheck, Sparkles, Users } from "lucide-react";
import { SiteHeader } from "@/components/store/SiteHeader";
import { SiteFooter } from "@/components/store/SiteFooter";
import { Toaster } from "@/components/ui/sonner";
import { whatsappLink } from "@/lib/whatsapp";
import { buildSeoMeta } from "@/lib/seo";

export const Route = createFileRoute("/quem-somos")({
  head: () => ({
    meta: buildSeoMeta({
      title: "Quem Somos | North Football Club",
      description:
        "Conheça a história da North, o seu fornecedor especialista em camisas de futebol versão tailandesa 1.1 a pronta entrega no Brasil.",
      path: "/quem-somos",
      image: "/og-preview.jpg",
    }),
  }),
  component: QuemSomosPage,
});

function QuemSomosPage() {
  const [loading, setLoading] = useState(true);
  const [fade, setFade] = useState(false);
  const [logoExpanded, setLogoExpanded] = useState(true);

  useEffect(() => {
    // Recolher as letras "orth" para virar "N." após 600ms
    const logoTimer = setTimeout(() => {
      setLogoExpanded(false);
    }, 600);

    // Iniciar o fade-out da tela branca e do logo aos 1.5s
    const fadeTimer = setTimeout(() => {
      setFade(true);
    }, 1500);

    // Encerrar e remover a tela de loading totalmente aos 2.0s (metade do tempo)
    const endTimer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(fadeTimer);
      clearTimeout(endTimer);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-background">
      {/* Tela de Loading Branca com Animação Centralizada do Logo North. */}
      {loading && (
        <div
          className={`fixed inset-0 z-[100] flex items-center justify-center bg-white transition-opacity duration-500 ease-in-out ${
            fade ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <div className="font-display text-5xl sm:text-7xl uppercase tracking-tight text-black flex items-center justify-center">
            <span>N</span>
            <span
              className={`inline-block overflow-hidden transition-all duration-700 ease-in-out ${
                logoExpanded ? "max-w-[8rem] opacity-100" : "max-w-0 opacity-0"
              }`}
            >
              orth
            </span>
            <span className="text-primary">.</span>
          </div>
        </div>
      )}

      <SiteHeader />

      <main>
        {/* Header Hero */}
        <section className="bg-foreground py-16 text-background">
          <div className="mx-auto max-w-7xl px-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Nossa História
            </p>
            <h1 className="mt-2 font-display text-4xl uppercase tracking-tight sm:text-5xl lg:text-6xl">
              Quem <span className="text-primary">Somos</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base text-background/80">
              A North nasceu da paixão pelo futebol e pela cultura dos mantos sagrados. Somos referência em fornecimento de camisas versão tailandesa 1.1 a pronta entrega no Brasil.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="mx-auto max-w-7xl px-4 py-16">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <h2 className="font-display text-3xl uppercase tracking-tight text-foreground sm:text-4xl">
                Apaixonados por futebol. Especialistas em mantos.
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Sabemos o quanto uma camisa de futebol representa. Não é apenas um tecido: é identidade, história, orgulho e emoção. Por isso, selecionamos a dedo cada peça do nosso catálogo com o mais alto padrão de acabamento 1.1.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Diferente de importações demoradas, mantemos todo o nosso estoque localizado no Brasil. Isso garante que você receba seu manto com agilidade, sem surpresas com taxas alfandegárias ou atrasos de meses.
              </p>
              <div className="pt-4">
                <a
                  href={whatsappLink("Olá! Vim pelo site e gostaria de tirar dúvidas com a equipe da North.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-primary px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground transition-opacity hover:opacity-90"
                >
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Grid de Destaques */}
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-border bg-card p-6">
                <BadgeCheck className="size-8 text-primary" />
                <h3 className="mt-4 font-display text-lg uppercase text-foreground">
                  Qualidade 1.1
                </h3>
                <p className="mt-2 text-xs text-muted-foreground">
                  Bordados impecáveis, tecidos tecnológicos respiráveis e etiquetas oficiais.
                </p>
              </div>

              <div className="border border-border bg-card p-6">
                <PackageCheck className="size-8 text-primary" />
                <h3 className="mt-4 font-display text-lg uppercase text-foreground">
                  Pronta Entrega
                </h3>
                <p className="mt-2 text-xs text-muted-foreground">
                  Estoque próprio no Brasil. Envio imediato em até 24h úteis.
                </p>
              </div>

              <div className="border border-border bg-card p-6">
                <Users className="size-8 text-primary" />
                <h3 className="mt-4 font-display text-lg uppercase text-foreground">
                  Atacado & Varejo
                </h3>
                <p className="mt-2 text-xs text-muted-foreground">
                  Descontos progressivos para colecionadores e revendedores de todo o país.
                </p>
              </div>

              <div className="border border-border bg-card p-6">
                <ShieldCheck className="size-8 text-primary" />
                <h3 className="mt-4 font-display text-lg uppercase text-foreground">
                  Garantia Total
                </h3>
                <p className="mt-2 text-xs text-muted-foreground">
                  Suporte dedicado para trocas e devoluções simplificadas.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Banner de Compromisso */}
        <section className="bg-card py-16 border-y border-border">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <Sparkles className="mx-auto size-10 text-primary" />
            <h2 className="mt-4 font-display text-3xl uppercase tracking-tight text-foreground">
              Nosso Compromisso com Você
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Transparência, rapidez no atendimento e produtos de altíssimo padrão. Seja para vestir a paixão pelo seu clube do coração ou para alavancar suas vendas de revenda, conte sempre com a North.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
      <Toaster />
    </div>
  );
}
