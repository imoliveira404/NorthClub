import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Check, ShieldCheck, ShoppingBag, Sparkles, Truck, X } from "lucide-react";
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

  if (!open) return null;

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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-card border border-border shadow-2xl p-4 sm:p-6 my-auto overflow-hidden text-foreground animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão Fechar */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 p-2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Fechar detalhes"
        >
          <X className="size-6" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Lado Esquerdo: Imagem do Produto */}
          <div className="relative overflow-hidden bg-secondary border border-border rounded-none">
            {product.badge && (
              <span className="absolute left-3 top-3 z-10 bg-primary px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-primary-foreground">
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
              <h2 className="mt-1 font-display text-2xl sm:text-3xl uppercase leading-tight tracking-tight text-foreground">
                {product.name}
              </h2>
            </div>

            {/* Preço */}
            <div className="border-y border-border py-3">
              <div className="flex items-baseline gap-3">
                {product.oldPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    {formatBRL(product.oldPrice + customizationTotal)}
                  </span>
                )}
                <span className="font-display text-3xl text-foreground">
                  {formatBRL(totalPrice)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                ou 3x de {formatBRL(totalPrice / 3)} sem juros no cartão
              </p>
              {customizationTotal > 0 && (
                <p className="text-[11px] font-bold uppercase tracking-wider text-primary mt-1">
                  Inclui +{formatBRL(customizationTotal)} de personalização
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
                    className={`min-w-[42px] h-10 border px-3 text-xs font-bold uppercase transition-all flex items-center justify-center ${
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
            <div className="bg-muted/40 border border-border p-3 space-y-2.5">
              <p className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
                Personalização Oficial (Opcional)
              </p>
              <div className="grid grid-cols-2 gap-2">
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
                    className="w-full border border-border bg-background px-2.5 py-1.5 text-xs text-foreground uppercase placeholder:normal-case outline-none focus:border-primary"
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
                    className="w-full border border-border bg-background px-2.5 py-1.5 text-xs text-foreground uppercase placeholder:normal-case outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>

            {/* Garantias Rápida */}
            <div className="space-y-1.5 text-[11px] text-muted-foreground">
              <p className="flex items-center gap-1.5">
                <Truck className="size-4 text-primary shrink-0" /> Envios todos os dias com rastreamento
              </p>
              <p className="flex items-center gap-1.5">
                <ShieldCheck className="size-4 text-primary shrink-0" /> Garantia de troca e satisfação 100%
              </p>
            </div>
          </div>
        </div>

        {/* Botão Finalizar Verde Elegante */}
        <div className="mt-6 pt-4 border-t border-border">
          <button
            type="button"
            onClick={handleFinishPurchase}
            className="w-full py-4 bg-[#16a34a] hover:bg-[#15803d] text-white text-sm font-bold uppercase tracking-[0.18em] shadow-lg transition-all flex items-center justify-center gap-2.5 active:scale-[0.99]"
          >
            <ShoppingBag className="size-5" />
            Finalizar Pedido — {formatBRL(totalPrice)}
          </button>
        </div>
      </div>
    </div>
  );
}
