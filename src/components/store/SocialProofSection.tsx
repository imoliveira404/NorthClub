import { useState, useRef } from "react";
import {
  Star,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  ShieldCheck,
  Package,
  Truck,
  Instagram,
  Sparkles,
  Quote,
  Check,
} from "lucide-react";
import { whatsappLink } from "@/lib/whatsapp";
import { REVIEWS_DATA, ReviewsModal } from "./ReviewsModal";

import avatar1 from "@/assets/avatars/icon1.webp";
import avatar2 from "@/assets/avatars/icon2.webp";
import avatar3 from "@/assets/avatars/icon3.webp";

import jersey1 from "@/assets/jersey-1.webp";
import jersey2 from "@/assets/jersey-2.webp";
import jersey3 from "@/assets/jersey-3.webp";
import jersey4 from "@/assets/jersey-4.webp";

const STATS = [
  {
    icon: Star,
    value: "4.9 / 5.0",
    label: "Nota média de satisfação",
    subtext: "+1.200 avaliações verificadas",
    highlight: "text-amber-400",
  },
  {
    icon: Package,
    value: "+5.000",
    label: "Pedidos entregues",
    subtext: "Atacado e varejo no Brasil",
    highlight: "text-primary",
  },
  {
    icon: Truck,
    value: "100% Brasil",
    label: "Envios rastreados",
    subtext: "Postagens diárias rápidas",
    highlight: "text-emerald-400",
  },
  {
    icon: ShieldCheck,
    value: "100% Seguro",
    label: "Compra protegida",
    subtext: "Garantia total de troca",
    highlight: "text-blue-400",
  },
];

const CAROUSEL_REVIEWS = [
  {
    ...REVIEWS_DATA[0],
    avatar: avatar1,
    jerseyImg: jersey1,
  },
  {
    ...REVIEWS_DATA[1],
    avatar: avatar2,
    jerseyImg: jersey2,
  },
  {
    ...REVIEWS_DATA[2],
    avatar: avatar3,
    jerseyImg: jersey3,
  },
  {
    ...REVIEWS_DATA[3],
    avatar: avatar1,
    jerseyImg: jersey4,
  },
  {
    ...REVIEWS_DATA[4],
    avatar: avatar2,
    jerseyImg: jersey1,
  },
];

const WHATSAPP_PRINTS = [
  {
    name: "Guilherme M.",
    time: "Ontem às 14:32",
    msg: "Fala rapaziada! Acabou de chegar a camisa aqui em casa. PQP que qualidade sensacional! O bordado do escudo é surreal 🔥🔥",
    tag: "Entregue em São Paulo",
  },
  {
    name: "Rodrigo T.",
    time: "Hoje às 09:15",
    msg: "Recebi o código de rastreio ontem e já atualizou no site dos Correios. Valeu demais pelo suporte atencioso no Whats!",
    tag: "Envio Rápido",
  },
  {
    name: "Marcelo K.",
    time: "Há 3 dias",
    msg: "Peguei o kit de 5 peças no atacado pra revenda. Vendi 3 no mesmo dia pro pessoal da pelada! Mandem mais o catálogo atualizado.",
    tag: "Revendedor Atacado",
  },
];

export function SocialProofSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -340 : 340;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-background py-12 sm:py-16">
      {/* Nível 1: Faixa de Números de Autoridade */}
      <div className="mx-auto max-w-7xl px-4">
        <div className="relative overflow-hidden rounded-none border border-border bg-foreground text-background shadow-xl">
          <div className="absolute -right-10 -top-10 size-40 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
          <div className="grid grid-cols-2 gap-4 p-6 sm:grid-cols-2 lg:grid-cols-4 sm:p-8 divide-y divide-border/20 sm:divide-y-0 sm:divide-x divide-border/20">
            {STATS.map((stat, idx) => {
              const IconComp = stat.icon;
              return (
                <div
                  key={idx}
                  className={`flex flex-col items-start p-3 sm:p-4 ${
                    idx > 0 ? "pt-4 sm:pt-4" : ""
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <IconComp className={`size-5 sm:size-6 ${stat.highlight}`} />
                    <span className="font-display text-2xl font-bold uppercase tracking-tight text-background sm:text-3xl lg:text-4xl">
                      {stat.value}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs font-bold uppercase tracking-wider text-background/90">
                    {stat.label}
                  </p>
                  <p className="mt-0.5 text-[11px] text-background/60">{stat.subtext}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Header do Nível 2 */}
      <div className="mx-auto max-w-7xl px-4 pt-12 sm:pt-16">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-primary">
            <Sparkles className="size-3.5" />
            Prova Social & Credibilidade
          </div>

          <h2 className="mt-3 font-display text-3xl uppercase tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            O que nossos clientes dizem
          </h2>
          <p className="mt-2 max-w-2xl text-xs sm:text-sm text-muted-foreground">
            Quem compra na North comprova: máxima qualidade 1.1, bordados impecáveis e suporte humanizado do pedido à entrega.
          </p>
        </div>

        {/* Carrossel de Depoimentos Reais */}
        <div className="relative mt-8 sm:mt-10">
          {/* Botões de Navegação */}
          <div className="absolute -top-14 right-0 hidden sm:flex items-center gap-2">
            <button
              type="button"
              onClick={() => scroll("left")}
              className="flex size-9 items-center justify-center border border-border bg-card text-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
              aria-label="Anterior"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              className="flex size-9 items-center justify-center border border-border bg-card text-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
              aria-label="Próximo"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>

          <div
            ref={carouselRef}
            className="flex gap-4 overflow-x-auto pb-4 pt-2 snap-x snap-mandatory scrollbar-none scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {CAROUSEL_REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="w-[290px] sm:w-[360px] shrink-0 snap-start rounded-none border border-border bg-card p-5 shadow-sm transition-all hover:border-primary/60 hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  {/* Top Header Card */}
                  <div className="flex items-start justify-between gap-2 border-b border-border/60 pb-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={rev.avatar}
                        alt={rev.name}
                        className="size-11 rounded-full object-cover border border-primary/30"
                      />
                      <div>
                        <h3 className="text-xs font-bold text-foreground sm:text-sm">{rev.name}</h3>
                        <p className="text-[11px] text-muted-foreground">{rev.city}</p>
                      </div>
                    </div>
                    <div className="flex items-center text-amber-400">
                      {Array.from({ length: rev.rating ?? 5 }).map((_, i) => (
                        <Star key={i} className="size-3.5 fill-current" />
                      ))}
                    </div>
                  </div>

                  {/* Body Comment */}
                  <div className="relative mt-3">
                    <Quote className="absolute -left-1 -top-1 size-5 text-primary/15" />
                    <p className="relative pl-3 text-xs leading-relaxed text-foreground italic">
                      "{rev.comment}"
                    </p>
                  </div>
                </div>

                {/* Footer Tag & Product */}
                <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <img
                      src={rev.jerseyImg}
                      alt={rev.productName}
                      className="size-8 object-cover rounded border border-border shrink-0"
                    />
                    <span className="truncate text-[10px] font-bold uppercase text-muted-foreground">
                      {rev.productName}
                    </span>
                  </div>

                  <span className="inline-flex shrink-0 items-center gap-1 rounded bg-[#25D366]/10 px-2 py-1 text-[10px] font-bold text-[#25D366]">
                    <CheckCircle2 className="size-3" />
                    Verificado
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nível 3: Prints e Atendimento WhatsApp */}
        <div className="mt-12 sm:mt-16 rounded-none border border-border bg-card p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                Atendimento Direto & Transparência
              </span>
              <h3 className="font-display text-2xl uppercase tracking-tight text-foreground sm:text-3xl">
                Prints reais de quem já recebeu
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Respostas rápidas no WhatsApp, rastreio enviado na hora e fotos dos pedidos entregues.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="w-fit border border-primary bg-primary/10 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Ver todas as avaliações (1.200+)
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {WHATSAPP_PRINTS.map((print, idx) => (
              <div
                key={idx}
                className="relative flex flex-col justify-between rounded-none border border-border/80 bg-muted/30 p-4 transition-all hover:border-primary/40"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 border-b border-border/40 pb-2">
                    <div className="flex items-center gap-2">
                      <div className="flex size-7 items-center justify-center rounded-full bg-[#25D366] text-black font-bold text-[10px]">
                        WA
                      </div>
                      <span className="text-xs font-bold text-foreground">{print.name}</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground">{print.time}</span>
                  </div>

                  <p className="mt-3 text-xs leading-relaxed text-foreground/90 bg-card p-3 border border-border/60">
                    "{print.msg}"
                  </p>
                </div>

                <div className="mt-3 flex items-center justify-between text-[10px] font-semibold text-muted-foreground">
                  <span className="inline-flex items-center gap-1 text-[#25D366]">
                    <Check className="size-3" />
                    {print.tag}
                  </span>
                  <span>Mensagem Verificada</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nível 4: Selo de Engajamento Social / Instagram */}
        <div className="mt-8 rounded-none border border-border bg-foreground p-6 sm:p-8 text-background flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex size-14 items-center justify-center rounded-full border-2 border-primary bg-primary/20 text-primary shrink-0">
              <Instagram className="size-7" />
            </div>
            <div>
              <h4 className="font-display text-xl uppercase tracking-wider text-background sm:text-2xl">
                Siga @northclub_oficial
              </h4>
              <p className="mt-0.5 text-xs text-background/70">
                +15 mil seguidores acompanhando lançamentos, bastidores de envios e ofertas exclusivas.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 md:flex-none text-center bg-primary px-6 py-3 text-xs font-bold uppercase tracking-wider text-primary-foreground transition-opacity hover:opacity-90"
            >
              Seguir no Instagram
            </a>
            <a
              href={whatsappLink("Olá! Vim pelo site e gostaria de tirar dúvidas sobre as camisas.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 md:flex-none text-center border border-background/30 bg-background/10 px-6 py-3 text-xs font-bold uppercase tracking-wider text-background transition-colors hover:bg-background/20"
            >
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Modal de Avaliações */}
      <ReviewsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
