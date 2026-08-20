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
  Quote,
  Check,
  ArrowDown,
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
    badge: "Excelente",
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    iconBg: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  },
  {
    icon: Package,
    value: "+5.000",
    label: "Pedidos entregues",
    subtext: "Atacado e varejo no Brasil",
    badge: "Pronta Entrega",
    badgeColor: "bg-primary/10 text-primary border-primary/30",
    iconBg: "bg-primary/10 text-primary border-primary/30",
  },
  {
    icon: ShieldCheck,
    value: "100% Seguro",
    label: "Compra protegida",
    subtext: "Garantia total de troca",
    badge: "Garantia 100%",
    badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    iconBg: "bg-blue-500/10 text-blue-400 border-blue-500/30",
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

const INFINITE_REVIEWS = [...CAROUSEL_REVIEWS, ...CAROUSEL_REVIEWS, ...CAROUSEL_REVIEWS];

const WHATSAPP_PRINTS = [
  {
    name: "Guilherme M.",
    city: "São Paulo, SP",
    time: "Ontem às 14:32",
    msg: "Fala rapaziada! Acabou de chegar a camisa aqui em casa. PQP que qualidade sensacional! O bordado do escudo é surreal 🔥🔥",
    tag: "Entregue em SP",
  },
  {
    name: "Rodrigo T.",
    city: "Curitiba, PR",
    time: "Hoje às 09:15",
    msg: "Recebi o código de rastreio ontem e já atualizou no site dos Correios. Valeu demais pelo suporte atencioso no Whats!",
    tag: "Envio Rápido",
  },
  {
    name: "Marcelo K.",
    city: "Belo Horizonte, MG",
    time: "Há 3 dias",
    msg: "Peguei o kit de 5 peças no atacado pra revenda. Vendi 3 no mesmo dia pro pessoal da pelada! Mandem mais o catálogo atualizado.",
    tag: "Revendedor Atacado",
  },
];

export function SocialProofSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"reviews" | "whatsapp">("reviews");
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -340 : 340;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-background py-6 sm:py-8">
      <div className="mx-auto max-w-7xl px-4">
        {/* Nível 1: Faixa de Números de Autoridade (3 Colunas Elegantes) */}
        <div className="relative overflow-hidden border border-border bg-card shadow-sm">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border/60">
            {STATS.map((stat, idx) => {
              const IconComp = stat.icon;
              return (
                <div
                  key={idx}
                  className="group flex items-center gap-3.5 p-4 sm:p-5 transition-colors hover:bg-muted/30"
                >
                  <div
                    className={`flex size-10 sm:size-11 shrink-0 items-center justify-center border ${stat.iconBg} transition-transform group-hover:scale-105`}
                  >
                    <IconComp className="size-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 leading-none">
                      <span className="font-display text-xl sm:text-2xl font-normal uppercase tracking-tight text-foreground">
                        {stat.value}
                      </span>
                    </div>
                    <p className="mt-1 text-xs font-bold uppercase tracking-wide text-foreground/90 truncate leading-tight">
                      {stat.label}
                    </p>
                    <p className="text-[11px] text-muted-foreground truncate leading-tight mt-0.5">
                      {stat.subtext}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Header Centralizado com Título */}
        <div className="mt-8 flex flex-col items-center text-center">
          <h2 className="font-display text-2xl sm:text-4xl uppercase tracking-tight text-foreground lg:text-5xl">
            O que nossos <span className="text-primary">clientes dizem</span>
          </h2>
        </div>

        {/* Carrossel de Depoimentos (Slide Infinito) */}
        <div className="relative mt-6 overflow-hidden group">
          {/* Sombras de esmaecimento nas extremidades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-20 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-20 bg-gradient-to-l from-background to-transparent z-10" />

          {/* Botões de Navegação Manual */}
          <div className="absolute -top-12 right-0 hidden sm:flex items-center gap-2 z-20">
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
            className="flex gap-4 overflow-x-auto pb-4 pt-2 scrollbar-none scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="animate-infinite-scroll flex gap-4 hover:[animation-play-state:paused] shrink-0">
              {INFINITE_REVIEWS.map((rev, idx) => (
                <div
                  key={`${rev.id}-${idx}`}
                  className="w-[280px] sm:w-[360px] shrink-0 rounded-none border border-border bg-card p-4 sm:p-5 shadow-sm transition-all hover:border-primary/60 hover:shadow-md flex flex-col justify-between"
                >
                  <div>
                    {/* Top Header Card */}
                    <div className="flex items-start justify-between gap-2 border-b border-border/60 pb-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={rev.avatar}
                          alt={rev.name}
                          className="size-10 sm:size-11 rounded-full object-cover border border-primary/30 shrink-0"
                        />
                        <div className="min-w-0">
                          <h3 className="text-xs font-bold text-foreground sm:text-sm truncate">
                            {rev.name}
                          </h3>
                          <p className="text-[11px] text-muted-foreground truncate">{rev.city}</p>
                        </div>
                      </div>
                      <div className="flex items-center text-amber-400 shrink-0">
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
                    <img
                      src={rev.jerseyImg}
                      alt="Camisa comprada"
                      className="size-8 object-cover rounded border border-border shrink-0"
                    />

                    <span className="inline-flex shrink-0 items-center gap-1 rounded bg-[#25D366]/10 px-2 py-1 text-[10px] font-bold text-[#25D366]">
                      <CheckCircle2 className="size-3" />
                      Verificado
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Atalho Rápido para o Catálogo Posicionado Abaixo dos Depoimentos */}
        <div className="mt-6 flex items-center justify-center">
          <a
            href="#produtos"
            className="group inline-flex items-center gap-2 bg-primary text-primary-foreground hover:opacity-95 px-7 py-3.5 text-xs font-bold uppercase tracking-widest transition-all shadow-md hover:shadow-lg hover:scale-[1.02]"
          >
            VER CATÁLOGO
            <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" />
          </a>
        </div>

        {/* Nível 4: Selo de Engajamento Social / Instagram */}
        <div className="mt-8 rounded-none border border-border bg-foreground p-6 sm:p-8 text-background flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex size-14 items-center justify-center rounded-full border-2 border-primary bg-primary/20 text-primary shrink-0">
              <Instagram className="size-7" />
            </div>
            <div>
              <h4 className="font-display text-xl uppercase tracking-wider text-background sm:text-2xl">
                Siga @northclub.loja
              </h4>
              <p className="mt-0.5 text-xs text-background/70">
                +15 mil compradores acompanhando lançamentos, bastidores de envios e ofertas exclusivas.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <a
              href="https://instagram.com/northclub.loja"
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
