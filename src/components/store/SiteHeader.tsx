import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useGuestAccount } from "@/lib/guest-account";

const ANNOUNCEMENTS = [
  "DIRETO DO BRASIL E SEM TAXA",
  "ACIMA DE 3 PEÇAS: ATÉ 10% OFF",
  "ENVIAMOS PARA TODO O BRASIL",
];

const defaultCatalogSearch = { q: "", cat: "", size: "", sort: "recentes", min: 0, max: 0, page: 1 };

type NavItem =
  | { label: string; path: "/" | "/produtos"; search: typeof defaultCatalogSearch }
  | { label: string; path: "/quem-somos" | "/contato" | "/troca-e-devolucoes" | "/como-comprar" };

const NAV: NavItem[] = [
  { label: "Início", path: "/", search: defaultCatalogSearch },
  { label: "Produtos", path: "/produtos", search: defaultCatalogSearch },
  { label: "Quem somos", path: "/quem-somos" },
  { label: "Contato", path: "/contato" },
  { label: "Trocas e devoluções", path: "/troca-e-devolucoes" },
  { label: "Como comprar", path: "/como-comprar" },
];

export function SiteHeader() {
  const { count } = useCart();
  const { email: guestEmail, signIn, signOut } = useGuestAccount();
  const [accountOpen, setAccountOpen] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [index, setIndex] = useState(0);
  const [term, setTerm] = useState("");
  const navigate = useNavigate();

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    void navigate({
      to: "/produtos",
      search: { q: term.trim(), cat: "", size: "", sort: "recentes", min: 0, max: 0, page: 1 },
    });
    setOpen(false);
  };

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % ANNOUNCEMENTS.length), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-primary py-2 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-primary-foreground">
        {ANNOUNCEMENTS[index]}
      </div>

      <div className="bg-card">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4">
          <button
            className="text-foreground lg:hidden"
            aria-label="Abrir menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>

          <form className="relative hidden flex-1 lg:block" onSubmit={submitSearch}>
            <input
              type="search"
              placeholder="O que você está buscando?"
              aria-label="Buscar produtos"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              className="w-full max-w-md rounded-none border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
            />
            <Search className="pointer-events-none absolute left-[calc(28rem-2.25rem)] top-2.5 hidden size-5 text-muted-foreground xl:block" />
          </form>

          <Link
            to="/"
            search={defaultCatalogSearch}
            className="mx-auto font-display text-3xl uppercase tracking-tight text-foreground"
          >
            North<span className="text-primary">.</span>
          </Link>

          <div className="flex flex-1 items-center justify-end gap-5">
            <div className="relative hidden sm:block">
              <button
                type="button"
                onClick={() => setAccountOpen((v) => !v)}
                className="flex items-center gap-2 text-left text-xs leading-tight text-foreground"
              >
                <User className="size-6" />
                <span>
                  {guestEmail ? (
                    <>
                      <strong className="block">Minha conta</strong>
                      <span className="block max-w-[9rem] truncate text-muted-foreground">
                        {guestEmail}
                      </span>
                    </>
                  ) : (
                    <>
                      <strong className="block">Olá! Faça login</strong>
                      <span className="text-muted-foreground">Só com seu e-mail</span>
                    </>
                  )}
                </span>
              </button>

              {accountOpen && (
                <div className="absolute right-0 top-full z-50 mt-3 w-72 border border-border bg-card p-4 shadow-lg">
                  {guestEmail ? (
                    <>
                      <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                        Conectado como
                      </p>
                      <p className="mt-1 truncate text-sm text-foreground">{guestEmail}</p>
                      <button
                        type="button"
                        onClick={() => {
                          signOut();
                          setAccountOpen(false);
                        }}
                        className="mt-4 w-full border border-border py-2.5 text-[11px] font-bold uppercase tracking-widest text-foreground hover:border-primary"
                      >
                        Sair
                      </button>
                    </>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (!emailInput.trim()) return;
                        signIn(emailInput);
                        setEmailInput("");
                        setAccountOpen(false);
                      }}
                    >
                      <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                        Entrar com e-mail
                      </p>
                      <input
                        type="email"
                        required
                        placeholder="seu@email.com"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        className="mt-2 w-full border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary"
                      />
                      <button
                        type="submit"
                        className="mt-3 w-full bg-primary py-2.5 text-[11px] font-bold uppercase tracking-widest text-primary-foreground"
                      >
                        Entrar
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>

            <Link to="/checkout" className="relative text-foreground" aria-label="Carrinho">
              <ShoppingCart className="size-6" />
              <span className="absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {count}
              </span>
            </Link>
          </div>
        </div>

        <nav className="border-t border-border">
          <div className="mx-auto hidden max-w-7xl items-center gap-6 px-4 lg:flex">
            <Link
              to="/produtos"
              search={defaultCatalogSearch}
              className="flex items-center gap-2 bg-foreground px-4 py-3.5 text-xs font-bold uppercase tracking-wider text-background hover:bg-foreground/90"
            >
              <Menu className="size-4" /> Categorias
            </Link>
            {NAV.map((item) =>
              "search" in item ? (
                <Link
                  key={item.label}
                  to={item.path}
                  search={item.search}
                  className="py-3.5 text-xs font-semibold uppercase tracking-wider text-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              ) : (
                <Link
                  key={item.label}
                  to={item.path}
                  className="py-3.5 text-xs font-semibold uppercase tracking-wider text-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              ),
            )}
          </div>

          {open && (
            <div className="flex flex-col px-4 pb-4 lg:hidden">
              <form onSubmit={submitSearch} className="py-3">
                <input
                  type="search"
                  placeholder="O que você está buscando?"
                  aria-label="Buscar produtos"
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  className="w-full border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
                />
              </form>
              {NAV.map((item) =>
                "search" in item ? (
                  <Link
                    key={item.label}
                    to={item.path}
                    search={item.search}
                    onClick={() => setOpen(false)}
                    className="border-b border-border py-3 text-sm font-semibold uppercase tracking-wide text-foreground hover:text-primary"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <Link
                    key={item.label}
                    to={item.path}
                    onClick={() => setOpen(false)}
                    className="border-b border-border py-3 text-sm font-semibold uppercase tracking-wide text-foreground hover:text-primary"
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
