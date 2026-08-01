import { useCallback, useEffect, useMemo, useState } from "react";
import { Loader2, RefreshCw, Search } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { formatBRL } from "@/lib/products";

type OrderItem = {
  id?: string;
  name?: string;
  price?: number;
  quantity?: number;
  size?: string;
};

type OrderRow = {
  id: string;
  email: string;
  full_name: string;
  items: OrderItem[] | null;
  total: number | string;
  payment_method: string;
  status: string;
  mp_order_id: string | null;
  created_at: string;
};

const STATUS_LABEL: Record<string, string> = {
  approved: "Aprovado",
  processed: "Aprovado",
  pending: "Pendente",
  action_required: "Aguardando",
  rejected: "Recusado",
  cancelled: "Cancelado",
  refunded: "Reembolsado",
};

const STATUS_TONE: Record<string, string> = {
  approved: "border-primary text-primary",
  processed: "border-primary text-primary",
  pending: "border-border text-muted-foreground",
  action_required: "border-border text-muted-foreground",
  rejected: "border-destructive text-destructive",
  cancelled: "border-destructive text-destructive",
  refunded: "border-border text-muted-foreground",
};

const STATUS_FILTERS = [
  { value: "all", label: "Todos" },
  { value: "approved", label: "Aprovados" },
  { value: "pending", label: "Pendentes" },
  { value: "rejected", label: "Recusados" },
];

const PERIOD_FILTERS = [
  { value: "all", label: "Sempre" },
  { value: "7", label: "7 dias" },
  { value: "30", label: "30 dias" },
];

const dateFmt = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "short",
  timeStyle: "short",
});

const inputClass =
  "w-full border border-border bg-card px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary";

const chip = (active: boolean) =>
  `border px-3 py-2 text-[11px] font-bold uppercase tracking-widest transition-colors ${
    active
      ? "border-primary bg-primary text-primary-foreground"
      : "border-border text-foreground hover:border-primary"
  }`;

export function OrdersPanel() {
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [method, setMethod] = useState("all");
  const [period, setPeriod] = useState("all");

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .select(
        "id, email, full_name, items, total, payment_method, status, mp_order_id, created_at",
      )
      .order("created_at", { ascending: false })
      .limit(300);
    setLoading(false);
    if (error) {
      toast.error("Não foi possível carregar os pedidos", {
        description: error.message,
      });
      return;
    }
    setOrders((data ?? []) as unknown as OrderRow[]);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const since =
      period === "all"
        ? null
        : Date.now() - Number(period) * 24 * 60 * 60 * 1000;
    return orders.filter((order) => {
      if (status !== "all") {
        const normalized =
          order.status === "processed" ? "approved" : order.status;
        if (status === "rejected") {
          if (!["rejected", "cancelled"].includes(normalized)) return false;
        } else if (normalized !== status) return false;
      }
      if (method !== "all" && order.payment_method !== method) return false;
      if (since && new Date(order.created_at).getTime() < since) return false;
      if (q) {
        const haystack = [
          order.email,
          order.full_name,
          order.mp_order_id ?? "",
          order.id,
          ...(order.items ?? []).map((i) => i.name ?? ""),
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [orders, query, status, method, period]);

  const revenue = filtered.reduce((sum, o) => sum + Number(o.total ?? 0), 0);

  return (
    <section className="border border-border bg-card p-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-xl uppercase text-foreground">
            Pedidos
          </h2>
          <p className="mt-1 text-[11px] uppercase tracking-widest text-muted-foreground">
            {filtered.length} pedido(s) · {formatBRL(revenue)}
          </p>
        </div>
        <button
          type="button"
          onClick={() => void load()}
          className="flex items-center gap-2 border border-border px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-foreground hover:border-primary"
        >
          <RefreshCw className="size-3.5" /> Atualizar
        </button>
      </div>

      <div className="mt-6 space-y-4">
        <label className="relative block">
          <Search className="pointer-events-none absolute right-3 top-3 size-4 text-muted-foreground" />
          <input
            className={inputClass}
            placeholder="Buscar por e-mail, nome, produto ou ID"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <div className="flex flex-wrap gap-2">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setStatus(f.value)}
              className={chip(status === f.value)}
            >
              {f.label}
            </button>
          ))}
          <span className="w-px bg-border" />
          {[
            { value: "all", label: "Pagamento" },
            { value: "pix", label: "Pix" },
            { value: "card", label: "Cartão" },
          ].map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setMethod(f.value)}
              className={chip(method === f.value)}
            >
              {f.label}
            </button>
          ))}
          <span className="w-px bg-border" />
          {PERIOD_FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setPeriod(f.value)}
              className={chip(period === f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="mt-8 flex justify-center">
          <Loader2 className="size-5 animate-spin text-muted-foreground" />
        </div>
      ) : filtered.length === 0 ? (
        <p className="mt-8 text-sm text-muted-foreground">
          Nenhum pedido encontrado com esses filtros.
        </p>
      ) : (
        <ul className="mt-6 divide-y divide-border">
          {filtered.map((order) => {
            const normalized =
              order.status === "processed" ? "approved" : order.status;
            return (
              <li key={order.id} className="py-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`border px-2 py-1 text-[10px] font-bold uppercase tracking-widest ${
                      STATUS_TONE[normalized] ?? "border-border text-muted-foreground"
                    }`}
                  >
                    {STATUS_LABEL[normalized] ?? order.status}
                  </span>
                  <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
                    {dateFmt.format(new Date(order.created_at))} ·{" "}
                    {order.payment_method === "pix" ? "Pix" : "Cartão"}
                  </span>
                  <span className="ml-auto text-sm font-bold text-foreground">
                    {formatBRL(Number(order.total ?? 0))}
                  </span>
                </div>
                <p className="mt-2 text-xs font-semibold text-foreground">
                  {order.full_name || "Sem nome"} · {order.email}
                </p>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  {(order.items ?? [])
                    .map(
                      (i) =>
                        `${i.quantity ?? 1}x ${i.name ?? "item"}${
                          i.size ? ` (${i.size})` : ""
                        }`,
                    )
                    .join(" · ") || "Sem itens registrados"}
                </p>
                {order.mp_order_id && (
                  <p className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">
                    Mercado Pago #{order.mp_order_id}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
