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
import { whatsappLink } from "@/lib/whatsapp";
import { useItemsPerPage } from "@/hooks/use-items-per-page";
import heroStadium from "@/assets/hero-stadium.jpg";

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

function getPageNumbers(current: number, total: number): (number | string)[] {
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

export const Route = createFileRoute("/")({
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
    meta: [
      { title: "North | Camisas de Time Tailandesas 1.1 a Pronta Entrega" },
      {
        name: "description",
        content:
          "Camisas de futebol versão tailandesa 1.1 a pronta entrega. Atacado e varejo, envio para todo o Brasil e até 10% OFF em quantidade.",
      },
      {
        property: "og:title",
        content: "North | Camisas de Time Tailandesas 1.1",
      },
      {
        property: "og:description",
        content:
          "Fornecedor de camisas tailandesas 1.1 a pronta entrega. Envio para todo o Brasil.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  errorComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 text-center text-sm text-muted-foreground">
      Não conseguimos carregar a vitrine agora. Atualize a página em instantes.
    </div>
  ),
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-background text-sm text-muted-foreground">
      Página não encontrada.
    </div>
  ),
  component: Home,
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

const BENEFITS = [
  { icon: PackageCheck, title: "Pronta entrega", text: "Estoque no Brasil" },
  { icon: Truck, title: "Enviamos p/ todo o Brasil", text: "Sem taxas extras" },
  { icon: BadgeCheck, title: "Versão 1.1", text: "Qualidade tailandesa" },
  { icon: ShieldCheck, title: "Compra segura", text: "Troca facilitada" },
];

const chip = (active: boolean) =>
  `border px-4 py-2 text-[11px] font-bold uppercase tracking-widest transition-colors ${
    active
      ? "border-primary bg-primary text-primary-foreground"
      : "border-border text-foreground hover:border-primary hover:text-primary"
  }`;

function Home() {
  const storeProducts = useStoreProducts();
  const itemsPerPage = useItemsPerPage();
  const { q, cat, size, sort, min, max, page } = Route.useSearch();
  const navigate = useNavigate({ from: "/" });

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
      const section = document.getElementById("produtos");
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
        <section className="relative isolate overflow-hidden bg-foreground">
          <img
            src={heroStadium}
            alt="Estádio de futebol iluminado à noite"
            width={1920}
            height={1088}
            className="absolute inset-0 size-full object-cover opacity-45"
          />
          <div className="relative mx-auto flex min-h-[520px] max-w-7xl flex-col justify-center px-4 py-20">
            <p className="font-display text-5xl uppercase leading-[0.9] text-background sm:text-7xl lg:text-8xl">
              Tailandesa
            </p>
            <p className="font-display text-4xl uppercase leading-[0.9] text-primary sm:text-6xl lg:text-7xl">
              Pronta entrega
            </p>
            <p className="mt-8 max-w-sm font-display text-2xl uppercase leading-tight text-background sm:text-3xl">
              Enviamos p/ todo o Brasil
            </p>
            <a
              href="#produtos"
              className="mt-8 w-fit bg-primary px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground transition-opacity hover:opacity-90"
            >
              Ver produtos
            </a>
          </div>
        </section>

        <section className="border-y border-border bg-card">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-4 py-5 sm:gap-6 sm:py-8 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5 sm:gap-3 border border-border/50 sm:border-0 bg-background/50 sm:bg-transparent p-3 sm:p-0"
              >
                <Icon className="size-6 sm:size-8 shrink-0 text-primary" />
                <div>
                  <p className="text-xs sm:text-sm font-bold uppercase tracking-wide text-foreground leading-tight">
                    {title}
                  </p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12">
          <h2 className="mb-6 font-display text-2xl uppercase tracking-tight text-foreground">
            Navegue por categoria
          </h2>
          <div className="flex flex-wrap gap-2">
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

        <section id="produtos" className="mx-auto max-w-7xl px-4 py-14">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl uppercase tracking-tight text-foreground md:text-4xl">
                Produtos
              </h2>
              <p className="mt-2 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
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
            <p className="py-10 text-center text-sm text-muted-foreground">
              Nenhuma camisa encontrada com esses filtros. Tente outra busca.
            </p>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {paginatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-12 flex flex-col items-center justify-center gap-4 border-t border-border pt-8">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <button
                          type="button"
                          disabled={currentPage <= 1}
                          onClick={() => goToPage(currentPage - 1)}
                          className={`flex items-center gap-1 px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                            currentPage <= 1
                              ? "pointer-events-none opacity-30"
                              : "text-foreground hover:bg-accent"
                          }`}
                        >
                          <ChevronLeft className="size-4" />
                          Anterior
                        </button>
                      </PaginationItem>

                      {getPageNumbers(currentPage, totalPages).map((p, i) => (
                        <PaginationItem key={i}>
                          {typeof p === "number" ? (
                            <button
                              type="button"
                              onClick={() => goToPage(p)}
                              className={`flex min-w-[36px] h-9 items-center justify-center px-3 text-xs font-bold transition-colors ${
                                currentPage === p
                                  ? "border border-primary bg-primary text-primary-foreground"
                                  : "border border-border text-foreground hover:border-primary hover:text-primary"
                              }`}
                            >
                              {p}
                            </button>
                          ) : (
                            <span className="flex h-9 items-center px-2 text-xs font-bold text-muted-foreground">
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
                          className={`flex items-center gap-1 px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                            currentPage >= totalPages
                              ? "pointer-events-none opacity-30"
                              : "text-foreground hover:bg-accent"
                          }`}
                        >
                          Próxima
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

        <section className="bg-foreground">
          <div className="mx-auto grid max-w-7xl items-center gap-6 px-4 py-14 md:grid-cols-[1.4fr_1fr]">
            <div>
              <h2 className="font-display text-3xl uppercase leading-tight text-background md:text-5xl">
                Revenda com a gente
              </h2>
              <p className="mt-4 max-w-xl text-sm text-background/70">
                Preços de atacado a partir de 3 peças, catálogo atualizado diariamente e envio no
                mesmo dia para pedidos aprovados até 15h.
              </p>
            </div>
            <a
              href={whatsappLink("Olá! Quero saber mais sobre revenda de camisas na North.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit bg-[#25D366] px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-black"
            >
              Falar no WhatsApp
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />
      <Toaster />
    </div>
  );
}
