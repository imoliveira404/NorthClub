import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  PackageCheck,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { SiteHeader } from "@/components/store/SiteHeader";
import { SiteFooter } from "@/components/store/SiteFooter";
import { ProductCard } from "@/components/store/ProductCard";
import { FilterPanel } from "@/components/store/FilterPanel";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { type Product } from "@/lib/products";
import {
  CATEGORIES,
  SIZE_OPTIONS,
  KID_SIZE_OPTIONS,
  type AdminProduct,
} from "@/lib/admin-products";
import { useStoreProducts } from "@/lib/product-store";
import { useItemsPerPage } from "@/hooks/use-items-per-page";
import { useIsMobile } from "@/hooks/use-mobile";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { buildSeoMeta } from "@/lib/seo";

type CatalogSearch = {
  q: string;
  cat: string;
  size: string;
  sort: string;
  min: number;
  max: number;
  page?: number;
};

const ITEMS_PER_PAGE = 10;

function getPageNumbers(current: number, total: number, isMobile: boolean): (number | string)[] {
  if (total <= 1) return [1];

  if (isMobile) {
    if (total <= 3) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    if (current >= total - 2) {
      return [total - 2, total - 1, total];
    }
    if (current + 2 === total - 1) {
      return [current, current + 1, current + 2, total];
    }
    return [current, current + 1, current + 2, "...", total];
  }

  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  if (current <= 4) {
    return [1, 2, 3, 4, 5, "...", total];
  }
  if (current >= total - 3) {
    return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
  }
  return [1, "...", current - 1, current, current + 1, "...", total];
}

export const Route = createFileRoute("/produtos")({
  validateSearch: (search: Record<string, unknown>): CatalogSearch => ({
    q: typeof search["q"] === "string" ? search["q"].slice(0, 80) : "",
    cat: typeof search["cat"] === "string" ? search["cat"] : "",
    size: typeof search["size"] === "string" ? search["size"] : "",
    sort: typeof search["sort"] === "string" ? search["sort"] : "recentes",
    min: Number(search["min"]) > 0 ? Number(search["min"]) : 0,
    max: Number(search["max"]) > 0 ? Number(search["max"]) : 0,
    page: Number(search["page"]) > 0 ? Math.floor(Number(search["page"])) : 1,
  }),
  head: () => ({
    meta: buildSeoMeta({
      title: "Catálogo de Camisas 1.1 | North Football Club",
      description:
        "Explore nosso catálogo completo de camisas de time versão tailandesa 1.1 a pronta entrega. Times brasileiros, europeus, seleções e edições retrôs.",
      path: "/produtos",
      image: "/assets/hero-stadium.webp",
    }),
  }),
  component: ProdutosPage,
});

type CatalogItem = Product & { category: string; createdIndex: number };

const toCatalogItem = (item: AdminProduct, index: number): CatalogItem => ({
  id: item.id,
  name: item.name,
  price: item.price,
  ...(item.oldPrice !== undefined ? { oldPrice: item.oldPrice } : {}),
  image: item.image,
  stock: item.stock,
  sizes: item.sizes,
  ...(item.badge !== undefined ? { badge: item.badge } : {}),
  category: item.category,
  createdIndex: index,
});

const SORTS = [
  { value: "recentes", label: "Mais recentes" },
  { value: "menor-preco", label: "Menor preço" },
  { value: "maior-preco", label: "Maior preço" },
  { value: "nome", label: "A-Z" },
];

const chip = (active: boolean) =>
  `border px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
    active
      ? "border-primary bg-primary text-primary-foreground"
      : "border-border text-foreground hover:border-primary hover:text-primary"
  }`;

function ProdutosPage() {
  const storeProducts = useStoreProducts();
  const itemsPerPage = useItemsPerPage();
  const isMobile = useIsMobile();
  const { q, cat, size, sort, min, max, page } = Route.useSearch();
  const navigate = useNavigate({ from: "/produtos" });

  const setFilter = (patch: Partial<CatalogSearch>) => {
    void navigate({
      search: (prev: CatalogSearch) => {
        const next = { ...prev, ...patch };
        if (!("page" in patch)) {
          next.page = 1;
        }
        return next;
      },
    });
  };

  const goToPage = (newPage: number) => {
    setFilter({ page: newPage });
    if (typeof window !== "undefined") {
      const section = document.getElementById("vitrine");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const catalog: CatalogItem[] = storeProducts.map(toCatalogItem);

  const availableCategories = CATEGORIES.filter((c) =>
    catalog.some((item) => item.category === c),
  ).concat(
    [...new Set(catalog.map((i) => i.category))].filter((c) => c && !CATEGORIES.includes(c)),
  );

  const sizeOrder = [...SIZE_OPTIONS, ...KID_SIZE_OPTIONS];
  const availableSizes = [...new Set(catalog.flatMap((i) => i.sizes))].sort((a, b) => {
    const ia = sizeOrder.indexOf(a);
    const ib = sizeOrder.indexOf(b);
    return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
  });

  const term = q.trim().toLowerCase();
  const filtered = catalog
    .filter((item) => {
      if (cat && item.category !== cat) return false;
      if (size && !item.sizes.includes(size)) return false;
      if (min > 0 && item.price < min) return false;
      if (max > 0 && item.price > max) return false;
      if (term) {
        const haystack = `${item.name} ${item.category}`.toLowerCase();
        if (!haystack.includes(term)) return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sort === "menor-preco") return a.price - b.price;
      if (sort === "maior-preco") return b.price - a.price;
      if (sort === "nome") return a.name.localeCompare(b.name, "pt-BR");
      return a.createdIndex - b.createdIndex;
    });

  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const currentPage = Math.min(Math.max(1, page ?? 1), totalPages);

  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const paginatedProducts = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const activeCount = (term ? 1 : 0) + (cat ? 1 : 0) + (size ? 1 : 0) + (min || max ? 1 : 0);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main>
        <section className="bg-foreground py-12 text-background">
          <div className="mx-auto max-w-7xl px-4">
            <h1 className="font-display text-4xl uppercase tracking-tight sm:text-5xl lg:text-6xl">
              Catálogo <span className="text-primary">Completo</span>
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-background/70">
              Todas as nossas camisas versão tailandesa 1.1 em um só lugar. Qualidade premium, tecido respirável e mantos a pronta entrega.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8">
          <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Filtrar por Categoria
          </h2>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setFilter({ cat: "" })}
              className={chip(!cat)}
            >
              Todas
            </button>
            {availableCategories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setFilter({ cat: cat === c ? "" : c })}
                className={chip(cat === c)}
              >
                {c}
              </button>
            ))}
          </div>
        </section>

        <section id="vitrine" className="mx-auto max-w-7xl px-4 py-8 pb-16">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                Exibindo {startItem}–{endItem} de {totalItems} camisa(s)
                {term ? ` para "${q.trim()}"` : ""}
                {totalPages > 1 ? ` (Página ${currentPage} de ${totalPages})` : ""}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <FilterPanel
                filters={{ q, cat, size, sort, min, max }}
                categories={availableCategories}
                sizes={availableSizes}
                onChange={setFilter}
                onClear={() =>
                  setFilter({
                    q: "",
                    cat: "",
                    size: "",
                    sort: "recentes",
                    min: 0,
                    max: 0,
                    page: 1,
                  })
                }
                activeCount={activeCount}
                resultCount={filtered.length}
              />
              <label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                Ordenar
                <select
                  value={sort}
                  onChange={(e) => setFilter({ sort: e.target.value })}
                  className="ml-2 border border-border bg-card px-3 py-2 text-xs font-semibold uppercase tracking-widest text-foreground outline-none focus:border-primary"
                >
                  {SORTS.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-base font-semibold text-foreground">
                Nenhuma camisa encontrada
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Tente ajustar os filtros ou pesquisar por outro termo.
              </p>
              <button
                type="button"
                onClick={() => setFilter({ q: "", cat: "", size: "", min: 0, max: 0 })}
                className="mt-6 border border-border bg-card px-6 py-2.5 text-xs font-bold uppercase tracking-widest hover:border-primary"
              >
                Limpar filtros
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {paginatedProducts.map((p, idx) => (
                  <ScrollReveal key={p.id} delay={(idx % 4) * 60}>
                    <ProductCard product={p} />
                  </ScrollReveal>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-8 sm:mt-12 flex flex-col items-center justify-center gap-3 sm:gap-4 border-t border-border pt-6 sm:pt-8 w-full overflow-hidden">
                  <Pagination>
                    <PaginationContent className="flex-wrap justify-center gap-1">
                      <PaginationItem>
                        <button
                          type="button"
                          disabled={currentPage <= 1}
                          onClick={() => goToPage(currentPage - 1)}
                          className={`flex items-center gap-1 px-2 py-1.5 sm:px-3 sm:py-2 text-[11px] sm:text-xs font-semibold uppercase tracking-wider transition-colors ${
                            currentPage <= 1
                              ? "pointer-events-none opacity-30"
                              : "text-foreground hover:bg-accent"
                          }`}
                          aria-label="Página anterior"
                        >
                          <ChevronLeft className="size-4" />
                          <span className="hidden sm:inline">Anterior</span>
                        </button>
                      </PaginationItem>

                      {getPageNumbers(currentPage, totalPages, isMobile).map((p, i) => (
                        <PaginationItem key={i}>
                          {typeof p === "number" ? (
                            <button
                              type="button"
                              onClick={() => goToPage(p)}
                              className={`flex min-w-[32px] sm:min-w-[36px] h-8 sm:h-9 items-center justify-center px-2 sm:px-3 text-xs font-bold transition-colors ${
                                currentPage === p
                                  ? "border border-primary bg-primary text-primary-foreground"
                                  : "border border-border text-foreground hover:border-primary hover:text-primary"
                              }`}
                            >
                              {p}
                            </button>
                          ) : (
                            <span className="flex h-8 sm:h-9 items-center px-1 sm:px-2 text-xs font-bold text-muted-foreground">
                              ...
                            </span>
                          )}
                        </PaginationItem>
                      ))}

                      <PaginationItem>
                        <button
                          type="button"
                          disabled={currentPage >= totalPages}
                          onClick={() => goToPage(currentPage + 1)}
                          className={`flex items-center gap-1 px-2 py-1.5 sm:px-3 sm:py-2 text-[11px] sm:text-xs font-semibold uppercase tracking-wider transition-colors ${
                            currentPage >= totalPages
                              ? "pointer-events-none opacity-30"
                              : "text-foreground hover:bg-accent"
                          }`}
                          aria-label="Próxima página"
                        >
                          <span className="hidden sm:inline">Próxima</span>
                          <ChevronRight className="size-4" />
                        </button>
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>

                  <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                    Página {currentPage} de {totalPages}
                  </p>
                </div>
              )}
            </>
          )}
        </section>
      </main>

      <SiteFooter />
      <Toaster />
    </div>
  );
}
