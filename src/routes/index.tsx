import { createFileRoute } from "@tanstack/react-router";
import { BadgeCheck, PackageCheck, ShieldCheck, Truck } from "lucide-react";
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
import heroStadium from "@/assets/hero-stadium.jpg";

export const Route = createFileRoute("/")({
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

const toProduct = (item: StoreProduct): Product => ({
  id: item.id,
  name: item.name,
  price: item.price,
  ...(item.oldPrice ? { oldPrice: item.oldPrice } : {}),
  image: item.image,
  stock: item.stock,
  sizes: item.sizes,
  ...(item.badge ? { badge: item.badge } : {}),
});


const BENEFITS = [
  { icon: PackageCheck, title: "Pronta entrega", text: "Estoque no Brasil" },
  { icon: Truck, title: "Enviamos p/ todo o Brasil", text: "Sem taxas extras" },
  { icon: BadgeCheck, title: "Versão 1.1", text: "Qualidade tailandesa" },
  { icon: ShieldCheck, title: "Compra segura", text: "Troca facilitada" },
];

function Section({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-7xl px-4 py-14">
      <div className="mb-8 flex items-end justify-between gap-4">
        <h2 className="font-display text-3xl uppercase tracking-tight text-foreground md:text-4xl">
          {title}
        </h2>
        <a
          href="#produtos"
          className="shrink-0 border-b-2 border-primary pb-1 text-xs font-bold uppercase tracking-widest text-foreground"
        >
          Ver tudo
        </a>
      </div>
      {children}
    </section>
  );
}

function Home() {
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
                href="#produtos"
                className="border border-border px-4 py-2 text-xs font-bold uppercase tracking-wide text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                {team}
              </a>
            ))}
          </div>
        </section>

        <Section id="produtos" title="Brasileirão">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {brasileirao.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </Section>

        <Section title="Times internacionais">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {internacionais.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </Section>

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
