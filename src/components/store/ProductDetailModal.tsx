import { useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "@tanstack/react-router";
import { ShieldCheck, ShoppingBag, Sparkles, Truck, X } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/lib/cart";
import { formatBRL, type Product } from "@/lib/products";

interface ProductDetailModalProps {
  product: Product;
  open: boolean;
  onClose: () => void;
}

export function ProductDetailModal({ product, open, onClose }: ProductDetailModalProps) {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [size, setSize] = useState<string>(product.sizes[2] ?? product.sizes[0] ?? "M");
  const [customName, setCustomName] = useState<string>("");
  const [customNumber, setCustomNumber] = useState<string>("");

  if (!open || typeof window === "undefined") return null;

  // Cálculo da personalização (Nome R$40, Número R$40, Ambos R$80)
  const nameCost = customName.trim() ? 40 : 0;
  const numberCost = customNumber.trim() ? 40 : 0;
  const customizationTotal = nameCost + numberCost;
  const totalPrice = product.price + customizationTotal;

  const handleFinishPurchase = () => {
    // Monta o nome personalizado se preenchido
    let finalName = product.name;
    if (customName.trim() || customNumber.trim()) {
      const details = [
        customName.trim() ? `Nome: ${customName.trim().toUpperCase()}` : "",
        customNumber.trim() ? `Nº: ${customNumber.trim()}` : "",
      ]
        .filter(Boolean)
        .join(" | ");
      finalName = `${product.name} (${details})`;
    }

    addItem({
      id: `${product.id}-${size}-${customName.trim()}-${customNumber.trim()}`,
      name: finalName,
      price: totalPrice,
      image: product.image,
      size,
    });

    toast.success("Produto adicionado ao carrinho!", {
      description: `${product.name} — Tamanho ${size}`,
    });

    onClose();
    void navigate({ to: "/checkout" });
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-2 sm:p-4 md:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative flex flex-col w-full max-w-4xl lg:max-w-5xl max-h-[92vh] sm:max-h-[90vh] bg-card border border-border shadow-2xl overflow-hidden text-foreground animate-in zoom-in-95 duration-200 my-auto rounded-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão Fechar "X" de Alta Visibilidade */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-30 flex size-10 items-center justify-center rounded-full bg-background/90 text-foreground border border-border shadow-lg transition-all hover:bg-primary hover:text-primary-foreground hover:scale-110 active:scale-95"
          aria-label="Fechar detalhes"
        >
          <X className="size-6 stroke-[2.5]" />
        </button>

        {/* Corpo de Conteúdo Rolável & Responsivo */}
        <div className="overflow-y-auto p-4 sm:p-6 md:p-8 flex-1 scrollbar-thin">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 items-start">
            {/* Lado Esquerdo: Imagem Ampliada */}
            <div className="relative overflow-hidden bg-secondary border border-border rounded-none shadow-sm">
              {product.badge && (
                <span className="absolute left-3 top-3 z-10 bg-primary px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-md">
                  {product.badge}
                </span>
              )}
              <img
                src={product.image}
                alt={product.name}
                className="aspect-square w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Lado Direito: Informações & Personalização */}
            <div className="flex flex-col gap-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-primary flex items-center gap-1">
                  <Sparkles className="size-3.5" /> Versão Tailandesa 1.1 Premium
                </span>
                <h2 className="mt-1 font-display text-2xl sm:text-3xl lg:text-4xl uppercase leading-tight tracking-tight text-foreground">
                  {product.name}
                </h2>
              </div>

              {/* Preço & Parcelamento */}
              <div className="border-y border-border py-3.5">
                <div className="flex items-baseline gap-3">
                  {product.oldPrice && (
                    <span className="text-sm sm:text-base text-muted-foreground line-through">
                      {formatBRL(product.oldPrice + customizationTotal)}
                    </span>
                  )}
                  <span className="font-display text-3xl sm:text-4xl text-foreground">
                    {formatBRL(totalPrice)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  ou 3x de {formatBRL(totalPrice / 3)} sem juros no cartão
                </p>
                {customizationTotal > 0 && (
                  <p className="text-[11px] font-bold uppercase tracking-wider text-primary mt-1.5">
                    Inclui +{formatBRL(customizationTotal)} de personalização oficial
                  </p>
                )}
              </div>

              {/* Escolha do Tamanho */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-foreground mb-2">
                  Tamanho da Camisa: <span className="text-primary">{size}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSize(s)}
                      className={`min-w-[44px] h-10 sm:h-11 border px-3 text-xs font-bold uppercase transition-all flex items-center justify-center ${
                        size === s
                          ? "border-primary bg-primary text-primary-foreground shadow-sm scale-105"
                          : "border-border text-foreground hover:border-foreground bg-background"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Personalização de Nome e Número */}
              <div className="bg-muted/40 border border-border p-3.5 space-y-2.5">
                <p className="text-xs font-bold uppercase tracking-wider text-foreground">
                  Personalização Oficial (Opcional)
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-semibold uppercase text-muted-foreground mb-1">
                      Nome (+R$ 40)
                    </label>
                    <input
                      type="text"
                      maxLength={15}
                      placeholder="Ex: SILVA"
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value)}
                      className="w-full border border-border bg-background px-3 py-2 text-xs text-foreground uppercase placeholder:normal-case outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold uppercase text-muted-foreground mb-1">
                      Número (+R$ 40)
                    </label>
                    <input
                      type="text"
                      maxLength={3}
                      placeholder="Ex: 10"
                      value={customNumber}
                      onChange={(e) => setCustomNumber(e.target.value)}
                      className="w-full border border-border bg-background px-3 py-2 text-xs text-foreground uppercase placeholder:normal-case outline-none focus:border-primary"
                    />
                  </div>
                </div>
              </div>

              {/* Garantias */}
              <div className="space-y-2 text-xs text-muted-foreground pt-1">
                <p className="flex items-center gap-2">
                  <Truck className="size-4 text-primary shrink-0" /> Envios todos os dias com código de rastreamento
                </p>
                <p className="flex items-center gap-2">
                  <ShieldCheck className="size-4 text-primary shrink-0" /> Garantia total de troca e devolução em 7 dias
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Rodapé Fixo com Botão Verde Elegante */}
        <div className="sticky bottom-0 bg-card/95 border-t border-border p-3.5 sm:p-4 backdrop-blur-md z-20">
          <button
            type="button"
            onClick={handleFinishPurchase}
            className="w-full py-4 bg-[#16a34a] hover:bg-[#15803d] text-white text-xs sm:text-sm font-bold uppercase tracking-[0.18em] shadow-lg transition-all flex items-center justify-center gap-2.5 active:scale-[0.99]"
          >
            <ShoppingBag className="size-5" />
            Finalizar Pedido — {formatBRL(totalPrice)}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
