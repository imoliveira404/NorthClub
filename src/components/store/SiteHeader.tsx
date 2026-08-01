import { useEffect, useState } from "react";
import { Menu, Search, ShoppingCart, User, X } from "lucide-react";

const ANNOUNCEMENTS = [
  "DIRETO DO BRASIL E SEM TAXA",
  "ACIMA DE 3 PEÇAS: ATÉ 10% OFF",
  "ENVIAMOS PARA TODO O BRASIL",
];

const NAV = [
  "Início",
  "Produtos",
  "Blog",
  "Contato",
  "Tabela de medidas",
  "Como comprar",
  "Trocas e devoluções",
  "Quem somos",
  "Rastreio",
];

export function SiteHeader() {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % ANNOUNCEMENTS.length),
      4000,
    );
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

          <form
            className="relative hidden flex-1 lg:block"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="search"
              placeholder="O que você está buscando?"
              aria-label="Buscar produtos"
              className="w-full max-w-md rounded-none border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
            />
            <Search className="pointer-events-none absolute left-[calc(28rem-2.25rem)] top-2.5 hidden size-5 text-muted-foreground xl:block" />
          </form>

          <a
            href="/"
            className="mx-auto font-display text-3xl uppercase tracking-tight text-foreground"
          >
            Futz<span className="text-primary">.</span>
          </a>

          <div className="flex flex-1 items-center justify-end gap-5">
            <a
              href="#conta"
              className="hidden items-center gap-2 text-xs leading-tight text-foreground sm:flex"
            >
              <User className="size-6" />
              <span>
                <strong className="block">Olá! Faça login</strong>
                <span className="text-muted-foreground">Ou cadastre-se</span>
              </span>
            </a>
            <button className="relative text-foreground" aria-label="Carrinho">
              <ShoppingCart className="size-6" />
              <span className="absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                0
              </span>
            </button>
          </div>
        </div>

        <nav className="border-t border-border">
          <div className="mx-auto hidden max-w-7xl items-center gap-6 px-4 lg:flex">
            <span className="flex items-center gap-2 bg-foreground px-4 py-3.5 text-xs font-bold uppercase tracking-wider text-background">
              <Menu className="size-4" /> Categorias
            </span>
            {NAV.map((item) => (
              <a
                key={item}
                href="#produtos"
                className="py-3.5 text-xs font-semibold uppercase tracking-wider text-foreground transition-colors hover:text-primary"
              >
                {item}
              </a>
            ))}
          </div>

          {open && (
            <div className="flex flex-col px-4 pb-4 lg:hidden">
              {NAV.map((item) => (
                <a
                  key={item}
                  href="#produtos"
                  className="border-b border-border py-3 text-sm font-semibold uppercase tracking-wide text-foreground"
                >
                  {item}
                </a>
              ))}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
