import { useEffect, useRef, useState } from "react";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { formatBRL } from "@/lib/products";

export type CatalogFilters = {
  q: string;
  cat: string;
  size: string;
  sort: string;
  min: number;
  max: number;
};

const chip = (active: boolean) =>
  `border px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest transition-colors ${
    active
      ? "border-primary bg-primary text-primary-foreground"
      : "border-border text-foreground hover:border-primary hover:text-primary"
  }`;

const PRICE_RANGES = [
  { label: "Até R$ 100", min: 0, max: 100 },
  { label: "R$ 100 - R$ 150", min: 100, max: 150 },
  { label: "R$ 150 - R$ 200", min: 150, max: 200 },
  { label: "Acima de R$ 200", min: 200, max: 0 },
];

export function FilterPanel({
  filters,
  categories,
  sizes,
  onChange,
  onClear,
  activeCount,
  resultCount,
}: {
  filters: CatalogFilters;
  categories: string[];
  sizes: string[];
  onChange: (patch: Partial<CatalogFilters>) => void;
  onClear: () => void;
  activeCount: number;
  resultCount: number;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const { cat, size, min, max } = filters;

  return (
    <div ref={wrapRef} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex items-center gap-2 border border-border bg-card px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-foreground transition-colors hover:border-primary"
      >
        <SlidersHorizontal className="size-4 text-primary" />
        Filtros
        {activeCount > 0 && (
          <span className="flex size-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
            {activeCount}
          </span>
        )}
        <ChevronDown
          className={`size-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute left-0 z-40 mt-2 w-[min(92vw,26rem)] space-y-5 border border-border bg-card p-5 shadow-2xl">
          <div>
            <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
              Categoria
            </p>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => onChange({ cat: "" })} className={chip(!cat)}>
                Todas
              </button>
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => onChange({ cat: cat === c ? "" : c })}
                  className={chip(cat === c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
              Tamanho
            </p>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => onChange({ size: "" })} className={chip(!size)}>
                Todos
              </button>
              {sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => onChange({ size: size === s ? "" : s })}
                  className={chip(size === s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
              Preço
            </p>
            <div className="mb-3 flex flex-wrap gap-2">
              {PRICE_RANGES.map((r) => (
                <button
                  key={r.label}
                  type="button"
                  onClick={() =>
                    onChange(
                      min === r.min && max === r.max
                        ? { min: 0, max: 0 }
                        : { min: r.min, max: r.max },
                    )
                  }
                  className={chip(min === r.min && max === r.max)}
                >
                  {r.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={0}
                placeholder="Mín."
                value={min || ""}
                onChange={(e) => onChange({ min: Number(e.target.value) || 0 })}
                className="w-full border border-border bg-background px-3 py-2 text-xs text-foreground outline-none focus:border-primary"
              />
              <span className="text-xs text-muted-foreground">até</span>
              <input
                type="number"
                min={0}
                placeholder="Máx."
                value={max || ""}
                onChange={(e) => onChange({ max: Number(e.target.value) || 0 })}
                className="w-full border border-border bg-background px-3 py-2 text-xs text-foreground outline-none focus:border-primary"
              />
            </div>
            {(min > 0 || max > 0) && (
              <p className="mt-2 text-[11px] text-muted-foreground">
                {min > 0 ? formatBRL(min) : "R$ 0,00"} —{" "}
                {max > 0 ? formatBRL(max) : "sem limite"}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between border-t border-border pt-4">
            <button
              type="button"
              onClick={onClear}
              className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-destructive"
            >
              <X className="size-3" /> Limpar
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="bg-primary px-5 py-2 text-[11px] font-bold uppercase tracking-widest text-primary-foreground"
            >
              Ver {resultCount} resultado(s)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
