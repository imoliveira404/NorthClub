import { Link } from "@tanstack/react-router";

const defaultCatalogSearch = { q: "", cat: "", size: "", sort: "recentes", min: 0, max: 0, page: 1 };

type FooterLink =
  | { label: string; path: "/" | "/produtos"; search: typeof defaultCatalogSearch }
  | { label: string; path: "/quem-somos" | "/contato" | "/troca-e-devolucoes" | "/como-comprar" };

const COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Institucional",
    links: [
      { label: "Quem somos", path: "/quem-somos" },
      { label: "Produtos", path: "/produtos", search: defaultCatalogSearch },
      { label: "Contato", path: "/contato" },
    ],
  },
  {
    title: "Ajuda",
    links: [
      { label: "Como comprar", path: "/como-comprar" },
      { label: "Trocas e devoluções", path: "/troca-e-devolucoes" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4">
        <div>
          <Link to="/" search={defaultCatalogSearch} className="font-display text-3xl uppercase">
            North<span className="text-primary">.</span>
          </Link>
          <p className="mt-3 max-w-xs text-sm text-background/70">
            Fornecedor de camisas de time versão tailandesa 1.1 a pronta entrega. Atacado e varejo,
            direto do Brasil.
          </p>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h3 className="text-xs font-bold uppercase tracking-widest text-primary">
              {col.title}
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-background/70">
              {col.links.map((l) => (
                <li key={l.label}>
                  {"search" in l ? (
                    <Link
                      to={l.path}
                      search={l.search}
                      className="hover:text-background transition-colors"
                    >
                      {l.label}
                    </Link>
                  ) : (
                    <Link
                      to={l.path}
                      className="hover:text-background transition-colors"
                    >
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-primary">
            Receba as novidades
          </h3>
          <form className="mt-4 flex" onSubmit={(e) => e.preventDefault()} aria-label="Newsletter">
            <input
              type="email"
              required
              placeholder="Seu e-mail"
              aria-label="Seu e-mail"
              className="w-full border border-background/30 bg-transparent px-3 py-2.5 text-sm text-background outline-none placeholder:text-background/50 focus:border-primary"
            />
            <button className="bg-primary px-4 text-xs font-bold uppercase tracking-widest text-primary-foreground hover:opacity-90">
              Ok
            </button>
          </form>
          <p className="mt-4 text-sm text-background/70">
            WhatsApp: <strong className="text-background">+55 11 96697-3200</strong> (Seg. a Sáb., 9h às 18h)
          </p>
        </div>
      </div>

      <div className="border-t border-background/15 py-5 text-center text-xs text-background/60">
        © {new Date().getFullYear()} North — Camisas tailandesas 1.1. Todos os direitos reservados.
      </div>
    </footer>
  );
}
