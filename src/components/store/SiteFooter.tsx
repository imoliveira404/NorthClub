const COLUMNS = [
  {
    title: "Institucional",
    links: ["Quem somos", "Blog", "Contato", "Termos de uso", "Privacidade"],
  },
  {
    title: "Ajuda",
    links: [
      "Como comprar",
      "Tabela de medidas",
      "Trocas e devoluções",
      "Rastreio",
      "Perguntas frequentes",
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4">
        <div>
          <span className="font-display text-3xl uppercase">
            Futz<span className="text-primary">.</span>
          </span>
          <p className="mt-3 max-w-xs text-sm text-background/70">
            Fornecedor de camisas de time versão tailandesa 1.1 a pronta
            entrega. Atacado e varejo, direto do Brasil.
          </p>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h3 className="text-xs font-bold uppercase tracking-widest text-primary">
              {col.title}
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-background/70">
              {col.links.map((l) => (
                <li key={l}>
                  <a href="#produtos" className="hover:text-background">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-primary">
            Receba as novidades
          </h3>
          <form
            className="mt-4 flex"
            onSubmit={(e) => e.preventDefault()}
            aria-label="Newsletter"
          >
            <input
              type="email"
              required
              placeholder="Seu e-mail"
              aria-label="Seu e-mail"
              className="w-full border border-background/30 bg-transparent px-3 py-2.5 text-sm text-background outline-none placeholder:text-background/50 focus:border-primary"
            />
            <button className="bg-primary px-4 text-xs font-bold uppercase tracking-widest text-primary-foreground">
              Ok
            </button>
          </form>
          <p className="mt-4 text-sm text-background/70">
            Atendimento no WhatsApp de seg. a sáb., 9h às 18h.
          </p>
        </div>
      </div>

      <div className="border-t border-background/15 py-5 text-center text-xs text-background/60">
        © {new Date().getFullYear()} Futz — Camisas tailandesas 1.1. Loja
        demonstrativa.
      </div>
    </footer>
  );
}
