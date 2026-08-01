import { useCallback, useEffect, useRef, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import {
  ImagePlus,
  Loader2,
  LogOut,
  Pencil,
  Plus,
  Save,
  Trash2,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { SiteHeader } from "@/components/store/SiteHeader";
import { SiteFooter } from "@/components/store/SiteFooter";
import { OrdersPanel } from "@/components/admin/OrdersPanel";

import { formatBRL } from "@/lib/products";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/lib/use-session";
import { claimAdminRole } from "@/lib/store.functions";
import {
  CATEGORIES,
  SIZE_OPTIONS,
  emptyDraft,
  type AdminProduct,
  type AdminProductDraft,
} from "@/lib/admin-products";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Painel de produtos | Futz" },
      {
        name: "description",
        content:
          "Cadastre camisas com imagem, nome, preço, tamanhos, estoque e descrição no painel interno da Futz.",
      },
      { property: "og:title", content: "Painel de produtos | Futz" },
      {
        property: "og:description",
        content: "Área interna para cadastro e edição do catálogo de camisas.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-1 block text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
      {children}
    </span>
  );
}

const inputClass =
  "w-full border border-border bg-card px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary";

const SIGNED_URL_TTL = 60 * 60 * 24 * 365 * 5;

type ProductRow = {
  id: string;
  name: string;
  price: number | string;
  old_price: number | string | null;
  stock: number;
  sizes: string[] | null;
  badge: string | null;
  category: string | null;
  description: string | null;
  image_url: string | null;
  active: boolean;
  created_at: string;
};

const rowToProduct = (row: ProductRow): AdminProduct => ({
  id: row.id,
  name: row.name,
  price: Number(row.price),
  oldPrice: row.old_price === null ? undefined : Number(row.old_price),
  stock: Number(row.stock ?? 0),
  sizes: row.sizes ?? [],
  badge: row.badge ?? undefined,
  category: row.category ?? "Time brasileiro",
  description: row.description ?? "",
  image: row.image_url ?? "",
  active: row.active,
  createdAt: row.created_at,
});

function AdminPage() {
  const navigate = useNavigate();
  const { session, loading: sessionLoading } = useSession();
  const claimAdmin = useServerFn(claimAdminRole);

  const [checkingRole, setCheckingRole] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [listLoading, setListLoading] = useState(false);
  const [draft, setDraft] = useState<AdminProductDraft>(emptyDraft);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState<"produtos" | "pedidos">("produtos");

  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!sessionLoading && !session) {
      navigate({ to: "/auth", search: { redirect: "/admin" }, replace: true });
    }
  }, [session, sessionLoading, navigate]);

  const loadProducts = useCallback(async () => {
    setListLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select(
        "id, name, price, old_price, stock, sizes, badge, category, description, image_url, active, created_at",
      )
      .order("created_at", { ascending: false });
    setListLoading(false);
    if (error) {
      toast.error("Não foi possível carregar os produtos", {
        description: error.message,
      });
      return;
    }
    setProducts(((data ?? []) as ProductRow[]).map(rowToProduct));
  }, []);

  useEffect(() => {
    if (!session) return;
    let cancelled = false;
    (async () => {
      setCheckingRole(true);
      await claimAdmin().catch(() => undefined);
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .maybeSingle();
      if (cancelled) return;
      const admin = Boolean(data);
      setIsAdmin(admin);
      setCheckingRole(false);
      if (admin) void loadProducts();
    })();
    return () => {
      cancelled = true;
    };
  }, [session, claimAdmin, loadProducts]);

  function resetForm() {
    setDraft(emptyDraft());
    setEditingId(null);
    if (fileRef.current) fileRef.current.value = "";
  }

  function toggleSize(size: string) {
    setDraft((d) => ({
      ...d,
      sizes: d.sizes.includes(size)
        ? d.sizes.filter((s) => s !== size)
        : [...d.sizes, size],
    }));
  }

  async function handleImage(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Selecione um arquivo de imagem.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Imagem muito grande", { description: "Limite de 5 MB." });
      return;
    }
    setUploading(true);
    try {
      const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
      const path = `${session?.user.id}/${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 8)}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(path, file, { contentType: file.type, upsert: false });
      if (uploadError) throw uploadError;
      const { data, error: signError } = await supabase.storage
        .from("product-images")
        .createSignedUrl(path, SIGNED_URL_TTL);
      if (signError || !data) throw signError ?? new Error("URL não gerada");
      setDraft((d) => ({ ...d, image: data.signedUrl }));
      toast.success("Imagem enviada");
    } catch (error) {
      toast.error("Não foi possível enviar a imagem", {
        description: error instanceof Error ? error.message : undefined,
      });
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const name = draft.name.trim();
    if (name.length < 3) {
      toast.error("Informe um nome com pelo menos 3 caracteres.");
      return;
    }
    if (draft.price <= 0) {
      toast.error("Informe um preço maior que zero.");
      return;
    }
    if (draft.sizes.length === 0) {
      toast.error("Selecione ao menos um tamanho.");
      return;
    }
    if (!draft.image) {
      toast.error("Anexe uma imagem do produto.");
      return;
    }

    const payload = {
      name,
      price: draft.price,
      old_price: draft.oldPrice ?? null,
      stock: draft.stock,
      sizes: draft.sizes,
      badge: draft.badge?.trim() ? draft.badge.trim().slice(0, 40) : null,
      category: draft.category,
      description: draft.description.trim().slice(0, 1200),
      image_url: draft.image,
      active: draft.active,
    };

    setSaving(true);
    const { error } = editingId
      ? await supabase.from("products").update(payload).eq("id", editingId)
      : await supabase.from("products").insert(payload);
    setSaving(false);

    if (error) {
      toast.error("Não foi possível salvar", { description: error.message });
      return;
    }
    toast.success(editingId ? "Produto atualizado" : "Produto cadastrado");
    resetForm();
    void loadProducts();
  }

  function startEdit(product: AdminProduct) {
    setDraft({
      name: product.name,
      price: product.price,
      oldPrice: product.oldPrice,
      stock: product.stock,
      sizes: product.sizes,
      badge: product.badge ?? "",
      category: product.category,
      description: product.description,
      image: product.image,
      active: product.active,
    });
    setEditingId(product.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function remove(id: string) {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      toast.error("Não foi possível remover", { description: error.message });
      return;
    }
    if (editingId === id) resetForm();
    toast.success("Produto removido");
    void loadProducts();
  }

  if (sessionLoading || (session && checkingRole)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (session && !isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <main className="mx-auto max-w-xl px-4 py-24 text-center">
          <h1 className="font-display text-3xl uppercase text-foreground">
            Acesso restrito
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            A conta <strong>{session.user.email}</strong> não tem permissão de
            administrador. Entre com a conta de administrador da loja.
          </p>
          <button
            type="button"
            onClick={async () => {
              await supabase.auth.signOut();
              navigate({ to: "/auth", search: { redirect: "/admin" }, replace: true });
            }}
            className="mt-6 inline-flex items-center gap-2 border border-border px-5 py-3 text-xs font-bold uppercase tracking-widest text-foreground hover:border-primary"
          >
            <LogOut className="size-4" /> Trocar de conta
          </button>
        </main>
        <SiteFooter />
        <Toaster />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-4xl uppercase tracking-tight text-foreground">
              Painel de produtos
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Cadastre camisas com imagem, nome, preço, tamanhos, estoque e
              descrição. Tudo salvo no banco e publicado na vitrine
              automaticamente.
            </p>
          </div>
          <button
            type="button"
            onClick={async () => {
              await supabase.auth.signOut();
              navigate({ to: "/", replace: true });
            }}
            className="flex items-center gap-2 border border-border px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-foreground hover:border-primary"
          >
            <LogOut className="size-3.5" /> Sair
          </button>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {(
            [
              { value: "produtos", label: "Produtos" },
              { value: "pedidos", label: "Pedidos" },
            ] as const
          ).map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => setTab(t.value)}
              className={`border px-5 py-3 text-[11px] font-bold uppercase tracking-widest transition-colors ${
                tab === t.value
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-foreground hover:border-primary"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "produtos" ? (
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1fr]">

          <form
            onSubmit={handleSubmit}
            className="h-fit space-y-6 border border-border bg-card p-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl uppercase text-foreground">
                {editingId ? "Editar produto" : "Novo produto"}
              </h2>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground"
                >
                  <X className="size-3" /> Cancelar
                </button>
              )}
            </div>

            <div>
              <Label>Imagem</Label>
              <div className="flex items-start gap-4">
                <div className="flex size-28 shrink-0 items-center justify-center border border-dashed border-border bg-secondary">
                  {uploading ? (
                    <Loader2 className="size-5 animate-spin text-muted-foreground" />
                  ) : draft.image ? (
                    <img
                      src={draft.image}
                      alt="Pré-visualização do produto"
                      className="size-28 object-cover"
                    />
                  ) : (
                    <ImagePlus className="size-6 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImage}
                    className="w-full text-xs text-muted-foreground file:mr-3 file:border file:border-border file:bg-secondary file:px-3 file:py-2 file:text-[11px] file:font-bold file:uppercase file:tracking-widest file:text-foreground"
                  />
                  <p className="mt-2 text-[11px] text-muted-foreground">
                    JPG ou PNG, até 5 MB. Proporção quadrada fica melhor na
                    vitrine.
                  </p>
                  {draft.image && (
                    <button
                      type="button"
                      onClick={() => {
                        setDraft((d) => ({ ...d, image: "" }));
                        if (fileRef.current) fileRef.current.value = "";
                      }}
                      className="mt-2 text-[11px] font-bold uppercase tracking-widest text-destructive"
                    >
                      Remover imagem
                    </button>
                  )}
                </div>
              </div>
            </div>

            <label className="block">
              <Label>Nome do produto</Label>
              <input
                className={inputClass}
                maxLength={140}
                value={draft.name}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-3">
              <label className="block">
                <Label>Preço (R$)</Label>
                <input
                  className={inputClass}
                  type="number"
                  min={0}
                  step="0.01"
                  value={draft.price || ""}
                  onChange={(e) =>
                    setDraft({ ...draft, price: Number(e.target.value) })
                  }
                />
              </label>
              <label className="block">
                <Label>Preço antigo</Label>
                <input
                  className={inputClass}
                  type="number"
                  min={0}
                  step="0.01"
                  value={draft.oldPrice ?? ""}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      oldPrice: e.target.value
                        ? Number(e.target.value)
                        : undefined,
                    })
                  }
                />
              </label>
              <label className="block">
                <Label>Estoque</Label>
                <input
                  className={inputClass}
                  type="number"
                  min={0}
                  step={1}
                  value={draft.stock}
                  onChange={(e) =>
                    setDraft({ ...draft, stock: Number(e.target.value) })
                  }
                />
              </label>
            </div>

            <div>
              <Label>Tamanhos disponíveis</Label>
              <div className="flex flex-wrap gap-2">
                {SIZE_OPTIONS.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => toggleSize(size)}
                    aria-pressed={draft.sizes.includes(size)}
                    className={`border px-3 py-2 text-[11px] font-bold uppercase tracking-widest transition-colors ${
                      draft.sizes.includes(size)
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border text-foreground"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <Label>Categoria</Label>
                <select
                  className={inputClass}
                  value={draft.category}
                  onChange={(e) =>
                    setDraft({ ...draft, category: e.target.value })
                  }
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <Label>Selo (opcional)</Label>
                <input
                  className={inputClass}
                  maxLength={40}
                  placeholder="Pronta entrega"
                  value={draft.badge ?? ""}
                  onChange={(e) => setDraft({ ...draft, badge: e.target.value })}
                />
              </label>
            </div>

            <label className="block">
              <Label>Descrição</Label>
              <textarea
                className={`${inputClass} min-h-28 resize-y`}
                maxLength={1200}
                placeholder="Material, caimento, detalhes de acabamento e prazo de envio."
                value={draft.description}
                onChange={(e) =>
                  setDraft({ ...draft, description: e.target.value })
                }
              />
            </label>

            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-foreground">
              <input
                type="checkbox"
                checked={draft.active}
                onChange={(e) => setDraft({ ...draft, active: e.target.checked })}
              />
              Publicar na vitrine
            </label>

            <button
              type="submit"
              disabled={saving}
              className="flex w-full items-center justify-center gap-2 bg-foreground py-4 text-xs font-bold uppercase tracking-[0.2em] text-background transition-colors hover:bg-primary hover:text-primary-foreground disabled:opacity-60"
            >
              {saving ? (
                <Loader2 className="size-4 animate-spin" />
              ) : editingId ? (
                <Save className="size-4" />
              ) : (
                <Plus className="size-4" />
              )}
              {editingId ? "Salvar alterações" : "Cadastrar produto"}
            </button>
          </form>

          <section className="h-fit border border-border bg-card p-6">
            <div className="flex items-baseline justify-between">
              <h2 className="font-display text-xl uppercase text-foreground">
                Cadastrados
              </h2>
              <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                {products.length} itens
              </span>
            </div>

            {listLoading ? (
              <div className="mt-6 flex justify-center">
                <Loader2 className="size-5 animate-spin text-muted-foreground" />
              </div>
            ) : products.length === 0 ? (
              <p className="mt-6 text-sm text-muted-foreground">
                Nenhum produto cadastrado ainda. Use o formulário ao lado para
                criar o primeiro.
              </p>
            ) : (
              <ul className="mt-4 divide-y divide-border">
                {products.map((product) => (
                  <li key={product.id} className="flex gap-3 py-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="size-16 shrink-0 object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-foreground">
                        {product.name}
                        {!product.active && (
                          <span className="ml-2 text-[10px] uppercase text-muted-foreground">
                            (rascunho)
                          </span>
                        )}
                      </p>
                      <p className="mt-1 text-[11px] uppercase text-muted-foreground">
                        {product.category} · {product.sizes.join(", ")} ·{" "}
                        {product.stock} em estoque
                      </p>
                      {product.description && (
                        <p className="mt-1 line-clamp-2 text-[11px] text-muted-foreground">
                          {product.description}
                        </p>
                      )}
                      <div className="mt-2 flex items-center gap-3">
                        <span className="text-sm font-bold text-foreground">
                          {formatBRL(product.price)}
                        </span>
                        {product.oldPrice ? (
                          <span className="text-[11px] text-muted-foreground line-through">
                            {formatBRL(product.oldPrice)}
                          </span>
                        ) : null}
                        <button
                          type="button"
                          aria-label={`Editar ${product.name}`}
                          onClick={() => startEdit(product)}
                          className="ml-auto text-muted-foreground hover:text-primary"
                        >
                          <Pencil className="size-4" />
                        </button>
                        <button
                          type="button"
                          aria-label={`Remover ${product.name}`}
                          onClick={() => void remove(product.id)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
          </div>
        ) : (
          <div className="mt-10">
            <OrdersPanel />
          </div>
        )}
      </main>


      <SiteFooter />
      <Toaster />
    </div>
  );
}
