import { useState } from "react";
import { X, Star, CheckCircle2, Search, MessageSquare, ThumbsUp } from "lucide-react";
import { whatsappLink } from "@/lib/whatsapp";

export type Review = {
  id: string;
  name: string;
  city: string;
  rating: number;
  date: string;
  comment: string;
  productName: string;
  avatarUrl?: string;
  verified: boolean;
  likes: number;
};

export const REVIEWS_DATA: Review[] = [
  {
    id: "1",
    name: "Lucas Menezes",
    city: "São Paulo, SP",
    rating: 5,
    date: "Há 2 dias",
    comment: "Qualidade surreal! O tecido é leve, os escudos são bordados em altíssima definição e o caimento no corpo ficou perfeito. Chegou em 3 dias úteis!",
    productName: "Camisa Real Madrid Home 24/25 Player Edition",
    verified: true,
    likes: 24,
  },
  {
    id: "2",
    name: "Gabriel Santos",
    city: "Rio de Janeiro, RJ",
    rating: 5,
    date: "Há 4 dias",
    comment: "Já é minha 3ª compra na North! Atendimento nota 10 no WhatsApp, me mandaram fotos antes de enviar e o código de rastreio no mesmo dia.",
    productName: "Camisa Flamengo I 24/25 Torcedor",
    verified: true,
    likes: 19,
  },
  {
    id: "3",
    name: "Matheus Oliveira",
    city: "Belo Horizonte, MG",
    rating: 5,
    date: "Há 1 semana",
    comment: "Comprei no atacado pra revender aqui no meu bairro e vendeu tudo em 4 dias. A galera amou a qualidade 1.1! Já vou fazer o próximo pedido.",
    productName: "Kit 5 Camisas Sortidas (Atacado)",
    verified: true,
    likes: 31,
  },
  {
    id: "4",
    name: "Rafael Costa",
    city: "Curitiba, PR",
    rating: 5,
    date: "Há 1 semana",
    comment: "A camisa do Mengão veio sensacional. Etiquetagem oficial, tecido respirável e todas as marcas d'água originais. Fãço questão de recomendar!",
    productName: "Camisa Flamengo II 24/25",
    verified: true,
    likes: 15,
  },
  {
    id: "5",
    name: "Bruno Almeida",
    city: "Salvador, BA",
    rating: 5,
    date: "Há 2 semanas",
    comment: "Estava receoso por ser minha primeira compra, mas a entrega foi super rápida e o atendimento esclareceu todas as minhas dúvidas com fotos reais.",
    productName: "Camisa Palmeiras I 24/25",
    verified: true,
    likes: 12,
  },
  {
    id: "6",
    name: "Thiago Rocha",
    city: "Porto Alegre, RS",
    rating: 5,
    date: "Há 2 semanas",
    comment: "Qualidade 1.1 indiscutível. Bordados milimétricos, patrocínio aveludado e o produto veio super embalado com selo da North.",
    productName: "Camisa Grêmio I 24/25",
    verified: true,
    likes: 22,
  },
  {
    id: "7",
    name: "Felipe Andrade",
    city: "Recife, PE",
    rating: 5,
    date: "Há 3 semanas",
    comment: "Comprei de presente pro meu pai e ele ficou impressionado. Achou que eu tinha gasto R$ 450 numa loja oficial! Produto sensacional.",
    productName: "Camisa São Paulo I 24/25",
    verified: true,
    likes: 28,
  },
  {
    id: "8",
    name: "Diego Ferreira",
    city: "Brasília, DF",
    rating: 5,
    date: "Há 3 semanas",
    comment: "Chegou extremamente rápido aqui no DF. O acabamento interno e as etiquetas de lavagem são exatamente padrão loja física. Nota 1000!",
    productName: "Camisa Corinthians I 24/25",
    verified: true,
    likes: 17,
  },
];

interface ReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReviewsModal({ isOpen, onClose }: ReviewsModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  if (!isOpen) return null;

  const filteredReviews = REVIEWS_DATA.filter((review) => {
    const matchTerm =
      review.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchTerm.toLowerCase());

    const matchRating = selectedRating ? review.rating === selectedRating : true;

    return matchTerm && matchRating;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative flex max-h-[90vh] w-full max-w-3xl flex-col rounded-none border border-border bg-card shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border bg-foreground px-6 py-4 text-background">
          <div>
            <h3 className="font-display text-xl uppercase tracking-wider text-background">
              Avaliações de Clientes
            </h3>
            <p className="text-xs text-background/70 mt-0.5">
              100% de transparência e opiniões reais sobre nossas camisas 1.1
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 text-background/80 hover:bg-background/10 hover:text-background transition-colors"
            aria-label="Fechar modal"
          >
            <X className="size-6" />
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-muted/40 p-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar por time, cidade ou nome..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-border bg-card pl-9 pr-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <span>Filtrar:</span>
            <button
              type="button"
              onClick={() => setSelectedRating(null)}
              className={`px-2.5 py-1 text-[11px] border ${
                selectedRating === null
                  ? "border-primary bg-primary text-primary-foreground font-bold"
                  : "border-border bg-card hover:border-primary"
              }`}
            >
              Todas
            </button>
            <button
              type="button"
              onClick={() => setSelectedRating(5)}
              className={`flex items-center gap-1 px-2.5 py-1 text-[11px] border ${
                selectedRating === 5
                  ? "border-primary bg-primary text-primary-foreground font-bold"
                  : "border-border bg-card hover:border-primary"
              }`}
            >
              5 <Star className="size-3 fill-current" />
            </button>
          </div>
        </div>

        {/* Reviews List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 max-h-[60vh]">
          {filteredReviews.length === 0 ? (
            <div className="py-12 text-center text-sm text-muted-foreground">
              Nenhuma avaliação encontrada para os termos pesquisados.
            </div>
          ) : (
            filteredReviews.map((rev) => (
              <div
                key={rev.id}
                className="rounded-none border border-border bg-card p-4 transition-all hover:border-primary/50"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 font-display text-sm font-bold uppercase text-primary border border-primary/20">
                      {rev.name.slice(0, 2)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-foreground">{rev.name}</h4>
                        {rev.verified && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#25D366]">
                            <CheckCircle2 className="size-3" />
                            Compra Verificada
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-muted-foreground">{rev.city}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center text-amber-400">
                      {Array.from({ length: rev.rating ?? 5 }).map((_, i) => (
                        <Star key={i} className="size-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-[10px] font-semibold text-muted-foreground">
                      {rev.date}
                    </span>
                  </div>
                </div>

                <p className="mt-3 text-xs leading-relaxed text-foreground">{rev.comment}</p>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-border/50 pt-2.5">
                  <span className="inline-block rounded-none border border-border bg-muted/50 px-2 py-0.5 text-[10px] font-bold uppercase text-foreground">
                    {rev.productName}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <ThumbsUp className="size-3" />
                    <span>{rev.likes} acharam útil</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">
            Dúvidas sobre o caimento ou tecido? Fale com a gente no WhatsApp.
          </p>
          <a
            href={whatsappLink("Olá! Vi as avaliações no site e gostaria de tirar uma dúvida sobre os produtos.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#25D366] px-4 py-2 text-xs font-bold uppercase tracking-wider text-black transition-opacity hover:opacity-90"
          >
            <MessageSquare className="size-4" />
            Tirar dúvida no WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
