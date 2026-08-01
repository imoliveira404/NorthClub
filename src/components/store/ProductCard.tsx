import { useState } from "react";
import { toast } from "sonner";
import { formatBRL, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const [size, setSize] = useState(product.sizes[2]);

  return (
    <article className="group flex flex-col border border-border bg-card">
      <div className="relative overflow-hidden bg-secondary">
        {product.badge && (
          <span className="absolute left-3 top-3 z-10 bg-primary px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
            {product.badge}
          </span>
        )}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={800}
          height={800}
          className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="text-sm font-semibold leading-snug text-foreground">
          {product.name}
        </h3>

        <p className="text-[11px] font-bold uppercase tracking-wider text-primary">
          Até 10% OFF em quantidade
        </p>

        <div className="mt-auto">
          {product.oldPrice && (
            <span className="block text-xs text-muted-foreground line-through">
              {formatBRL(product.oldPrice)}
            </span>
          )}
          <span className="font-display text-2xl text-foreground">
            {formatBRL(product.price)}
          </span>
          <span className="block text-xs text-muted-foreground">
            ou 3x de {formatBRL(product.price / 3)} sem juros
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {product.sizes.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`min-w-9 border px-2 py-1 text-[11px] font-bold uppercase transition-colors ${
                size === s
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-foreground hover:border-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <button
          onClick={() =>
            toast.success("Adicionado ao carrinho", {
              description: `${product.name} — tamanho ${size}`,
            })
          }
          className="w-full bg-foreground py-3 text-xs font-bold uppercase tracking-widest text-background transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          Comprar
        </button>

        <p className="text-center text-[11px] text-muted-foreground">
          {product.stock} em estoque
        </p>
      </div>
    </article>
  );
}
