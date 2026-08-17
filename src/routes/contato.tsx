import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, MessageSquare, Send } from "lucide-react";
import { SiteHeader } from "@/components/store/SiteHeader";
import { SiteFooter } from "@/components/store/SiteFooter";
import { Toaster, toast } from "sonner";
import { WHATSAPP_DISPLAY, whatsappLink } from "@/lib/whatsapp";
import { buildSeoMeta } from "@/lib/seo";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: buildSeoMeta({
      title: "Fale Conosco | North Football Club",
      description:
        "Entre em contato com a equipe North. Atendimento via WhatsApp (+55 11 96697-3200), e-mail e formulário de suporte.",
      path: "/contato",
      image: "/og-preview.jpg",
    }),
  }),
  component: ContatoPage,
});

function ContatoPage() {
  const [loading, setLoading] = useState(true);
  const [fade, setFade] = useState(false);
  const [logoExpanded, setLogoExpanded] = useState(true);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [assunto, setAssunto] = useState("");
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    // Recolher as letras "orth" para virar "N." após 600ms
    const logoTimer = setTimeout(() => {
      setLogoExpanded(false);
    }, 600);

    // Iniciar o fade-out da tela branca e do logo aos 1.5s
    const fadeTimer = setTimeout(() => {
      setFade(true);
    }, 1500);

    // Encerrar e remover a tela de loading totalmente aos 2.0s
    const endTimer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(fadeTimer);
      clearTimeout(endTimer);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim() || !email.trim() || !mensagem.trim()) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
    toast.success("Mensagem enviada com sucesso! Responderemos em breve.");
    setNome("");
    setEmail("");
    setAssunto("");
    setMensagem("");
  };

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
              Atendimento ao Cliente
            </p>
            <h1 className="mt-2 font-display text-4xl uppercase tracking-tight sm:text-5xl lg:text-6xl">
              Fale <span className="text-primary">Conosco</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base text-background/80">
              Estamos prontos para atender você! Escolha o canal de sua preferência ou envie uma mensagem diretamente pelo formulário abaixo.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="mx-auto max-w-7xl px-4 py-16">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Informações de Contato */}
            <div className="space-y-8">
              <div>
                <h2 className="font-display text-3xl uppercase tracking-tight text-foreground">
                  Canais Diretos
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Para respostas imediatas sobre pedidos, dúvidas sobre tamanhos ou orçamentos de atacado, prefira nosso WhatsApp.
                </p>
              </div>

              {/* Card WhatsApp */}
              <div className="border border-border bg-card p-6">
                <div className="flex items-center gap-4">
                  <div className="flex size-12 items-center justify-center rounded-none bg-[#25D366] text-black">
                    <MessageSquare className="size-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg uppercase text-foreground">
                      WhatsApp
                    </h3>
                    <p className="text-xs font-bold text-primary mt-0.5">
                      {WHATSAPP_DISPLAY}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Atendimento rápido e humanizado
                    </p>
                  </div>
                </div>
                <a
                  href={whatsappLink("Olá! Preciso de atendimento sobre o catálogo ou meu pedido.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 block w-full bg-[#25D366] py-3 text-center text-xs font-bold uppercase tracking-[0.18em] text-black transition-opacity hover:opacity-90"
                >
                  Abrir Conversa no WhatsApp
                </a>
              </div>

              {/* Informações adicionais */}
              <div className="space-y-4 border-t border-border pt-6">
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 size-5 shrink-0 text-primary" />
                  <div>
                    <strong className="block text-xs font-bold uppercase tracking-wider text-foreground">
                      E-mail de Suporte
                    </strong>
                    <a
                      href="mailto:north.contato@gmail.com"
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      north.contato@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 size-5 shrink-0 text-primary" />
                  <div>
                    <strong className="block text-xs font-bold uppercase tracking-wider text-foreground">
                      Horário de Atendimento
                    </strong>
                    <span className="text-sm text-muted-foreground">
                      Segunda a Sábado, das 09h às 18h (Horário de Brasília)
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-primary" />
                  <div>
                    <strong className="block text-xs font-bold uppercase tracking-wider text-foreground">
                      Logística & Envio
                    </strong>
                    <span className="text-sm text-muted-foreground">
                      Estoque no Brasil — Envios via Correios (PAC/SEDEX) e Transportadoras.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulário de Contato */}
            <div className="border border-border bg-card p-8">
              <h2 className="font-display text-2xl uppercase tracking-tight text-foreground">
                Envie uma Mensagem
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Preencha o formulário abaixo que retornaremos em até 24 horas úteis.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Seu nome"
                    className="mt-1.5 w-full border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    className="mt-1.5 w-full border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                    Assunto
                  </label>
                  <input
                    type="text"
                    value={assunto}
                    onChange={(e) => setAssunto(e.target.value)}
                    placeholder="Ex: Dúvida sobre tamanho / Revenda"
                    className="mt-1.5 w-full border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                    Mensagem *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={mensagem}
                    onChange={(e) => setMensagem(e.target.value)}
                    placeholder="Escreva sua mensagem aqui..."
                    className="mt-1.5 w-full border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
                  />
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 bg-primary py-4 text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground transition-opacity hover:opacity-90"
                >
                  <Send className="size-4" /> Enviar Mensagem
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <Toaster />
    </div>
  );
}
