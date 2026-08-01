import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { BadgeCheck, PackageCheck, ShieldCheck, Truck, X } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { SiteHeader } from "@/components/store/SiteHeader";
import { SiteFooter } from "@/components/store/SiteFooter";
import { ProductCard } from "@/components/store/ProductCard";
import {
  brasileirao,
  internacionais,
  teams,
  type Product,
} from "@/lib/products";
import { listStoreProducts, type StoreProduct } from "@/lib/store.functions";
import { CATEGORIES, SIZE_OPTIONS } from "@/lib/admin-products";
import heroStadium from "@/assets/hero-stadium.jpg";

type CatalogSearch = {
  q: string;
  cat: string;
  size: string;
  sort: string;
  min: number;
  max: number;
};

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): CatalogSearch => ({
    q: typeof search["q"] === "string" ? search["q"].slice(0, 80) : "",
    cat: typeof search["cat"] === "string" ? search["cat"] : "",
    size: typeof search["size"] === "string" ? search["size"] : "",
    sort: typeof search["sort"] === "string" ? search["sort"] : "recentes",
    min: Number(search["min"]) > 0 ? Number(search["min"]) : 0,
    max: Number(search["max"]) > 0 ? Number(search["max"]) : 0,
  }),
  loader: async () => ({ products: await listStoreProducts() }),
  head: () => ({
    meta: [
      { title: "Futz | Camisas de Time Tailandesas 1.1 a Pronta Entrega" },
      {
        name: "description",
        content:
          "Camisas de futebol versão tailandesa 1.1 a pronta entrega. Atacado e varejo, envio para todo o Brasil e até 10% OFF em quantidade.",
      },
      {
        property: "og:title",
        content: "Futz | Camisas de Time Tailandesas 1.1",
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

const toCatalogItem = (
  item: StoreProduct,
  index: number,
): CatalogItem => ({
  id: item.id,
  name: item.name,
  price: item.price,
  ...(item.oldPrice ? { oldPrice: item.oldPrice } : {}),
  image: item.image,
  stock: item.stock,
  sizes: item.sizes,
  ...(item.badge ? { badge: item.badge } : {}),
  category: item.category,
  createdIndex: index,
});

const fallbackCatalog: CatalogItem[] = [
  ...brasileirao.map((p, i) => ({
    ...p,
    category: "Brasileirão",
    createdIndex: i,
  })),
  ...internacionais.map((p, i) => ({
    ...p,
    category: "Internacionais",
    createdIndex: brasileirao.length + i,
  })),
];

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
  const { products } = Route.useLoaderData() as { products: StoreProduct[] };
  const { q, cat, size, sort } = Route.useSearch();
  const navigate = useNavigate({ from: "/" });

  const setFilter = (patch: Partial<CatalogSearch>) => {
    void navigate({
      search: (prev: CatalogSearch) => ({ ...prev, ...patch }),
    });

  };

  const catalog: CatalogItem[] =
    products.length > 0 ? products.map(toCatalogItem) : fallbackCatalog;

  const term = q.trim().toLowerCase();
  const filtered = catalog
    .filter((item) => {
      if (cat && item.category !== cat) return false;
      if (size && !item.sizes.includes(size)) return false;
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

  const hasFilters = Boolean(term || cat || size) || sort !== "recentes";

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
          <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex items-center gap-3">
                <Icon className="size-8 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-bold uppercase tracking-wide text-foreground">
                    {title}
                  </p>
                  <p className="text-xs text-muted-foreground">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12">
          <h2 className="mb-6 font-display text-2xl uppercase tracking-tight text-foreground">
            Busque pelo seu time
          </h2>
          <div className="flex flex-wrap gap-2">
            {teams.map((team) => (
              <a
                key={team}
                href={`/?q=${encodeURIComponent(team)}#produtos`}
                className={chip(term === team.toLowerCase())}
              >
                {team}
              </a>
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
                {filtered.length} camisa(s) encontradas
                {term ? ` para "${q.trim()}"` : ""}
              </p>
            </div>
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

          <div className="mb-8 space-y-4 border border-border bg-card p-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                Categoria
              </span>
              <button
                type="button"
                onClick={() => setFilter({ cat: "" })}
                className={chip(!cat)}
              >
                Todas
              </button>
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setFilter({ cat: c })}
                  className={chip(cat === c)}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                Tamanho
              </span>
              <button
                type="button"
                onClick={() => setFilter({ size: "" })}
                className={chip(!size)}
              >
                Todos
              </button>
              {SIZE_OPTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setFilter({ size: size === s ? "" : s })}
                  className={chip(size === s)}
                >
                  {s}
                </button>
              ))}
            </div>

            {hasFilters && (
              <button
                type="button"
                onClick={() =>
                  setFilter({ q: "", cat: "", size: "", sort: "recentes" })
                }
                className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-destructive"
              >
                <X className="size-3" /> Limpar filtros
              </button>
            )}
          </div>

          {filtered.length === 0 ? (
            <p className="py-10 text-center text-sm text-muted-foreground">
              Nenhuma camisa encontrada com esses filtros. Tente outra busca.
            </p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </section>

        <section className="bg-foreground">
          <div className="mx-auto grid max-w-7xl items-center gap-6 px-4 py-14 md:grid-cols-[1.4fr_1fr]">
            <div>
              <h2 className="font-display text-3xl uppercase leading-tight text-background md:text-5xl">
                Revenda com a gente
              </h2>
              <p className="mt-4 max-w-xl text-sm text-background/70">
                Preços de atacado a partir de 3 peças, catálogo atualizado
                diariamente e envio no mesmo dia para pedidos aprovados até 15h.
              </p>
            </div>
            <a
              href="#produtos"
              className="w-fit bg-primary px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground"
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
