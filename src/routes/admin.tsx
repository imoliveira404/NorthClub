import { useCallback, useEffect, useRef, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ImagePlus, Loader2, Lock, LogOut, Pencil, Plus, Save, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { SiteHeader } from "@/components/store/SiteHeader";
import { SiteFooter } from "@/components/store/SiteFooter";

import { formatBRL } from "@/lib/products";
import { adminSignIn, adminSignOut, isAdminAuthed } from "@/lib/admin-auth";
import { deleteProduct, listProducts, seedProducts, upsertProduct } from "@/lib/product-store";
import { compressImage } from "@/lib/image";
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
      { title: "Painel de produtos | North" },
      {
        name: "description",
        content:
          "Cadastre camisas com imagem, nome, preço, tamanhos, estoque e descrição no painel interno da North.",
      },
      { property: "og:title", content: "Painel de produtos | North" },
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

function PasswordGate({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!password.trim()) return;
    if (!adminSignIn(password)) {
      toast.error("Senha incorreta.");
      setPassword("");
      return;
    }
    toast.success("Acesso liberado!");
    onSuccess();
  }

  return (
    <main className="mx-auto flex max-w-md flex-col px-4 py-24">
      <div className="flex items-center justify-center">
        <Lock className="size-8 text-primary" />
      </div>
      <h1 className="mt-4 text-center font-display text-3xl uppercase tracking-tight text-foreground">
        Painel de produtos
      </h1>
      <p className="mt-2 text-center text-sm text-muted-foreground">
        Área interna da loja. Informe a senha de administrador para continuar.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <label className="block">
          <span className="mb-1 block text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
            Senha
          </span>
          <input
            className={inputClass}
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button
          type="submit"
          className="w-full bg-foreground py-4 text-xs font-bold uppercase tracking-[0.2em] text-background transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          Entrar no painel
        </button>
      </form>
    </main>
  );
}

function AdminPage() {
  const navigate = useNavigate();
  const [authed, setAuthed] = useState(false);
  const [products, setProducts] = useState<AdminProduct[]>(() => seedProducts());
  const [draft, setDraft] = useState<AdminProductDraft>(emptyDraft);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);

  const loadProducts = useCallback(async () => {
    const loaded = await listProducts();
    setProducts(loaded);
  }, []);

  useEffect(() => {
    setAuthed(isAdminAuthed());
  }, []);

  useEffect(() => {
    if (!authed) return;
    void loadProducts();
  }, [authed, loadProducts]);

  function resetForm() {
    setDraft(emptyDraft());
    setEditingId(null);
    if (fileRef.current) fileRef.current.value = "";
  }

  function toggleSize(size: string) {
    setDraft((d) => ({
      ...d,
      sizes: d.sizes.includes(size) ? d.sizes.filter((s) => s !== size) : [...d.sizes, size],
    }));
  }

  function handleImage(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Selecione um arquivo de imagem.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Imagem muito grande", { description: "Limite de 10 MB antes da compactação." });
      return;
    }
    setUploading(true);
    compressImage(file)
      .then((dataUrl) => {
        setDraft((d) => ({ ...d, image: dataUrl }));
        toast.success("Imagem adicionada", {
          description: "Compactada automaticamente para não pesar a loja.",
        });
      })
      .catch(() => {
        toast.error("Não foi possível processar a imagem.");
      })
      .finally(() => setUploading(false));
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

    const payload: AdminProductDraft = {
      name,
      price: draft.price,
      ...(draft.oldPrice !== undefined ? { oldPrice: draft.oldPrice } : {}),
      stock: draft.stock,
      sizes: draft.sizes,
      ...(draft.badge && draft.badge.trim() ? { badge: draft.badge.trim().slice(0, 40) } : {}),
      category: draft.category,
      description: draft.description.trim().slice(0, 1200),
      image: draft.image,
      active: draft.active,
    };

    setSaving(true);
    const saved = await upsertProduct(payload, editingId ?? undefined);
    setSaving(false);

    if (!saved) {
      toast.error("Não foi possível salvar", {
        description: "Não foi possível acessar o armazenamento do navegador.",
      });
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
    if (!(await deleteProduct(id))) {
      toast.error("Não foi possível remover", {
        description: "Não foi possível acessar o armazenamento do navegador.",
      });
      return;
    }
    if (editingId === id) resetForm();
    toast.success("Produto removido");
    void loadProducts();
  }

  function handleLogout() {
    adminSignOut();
    setAuthed(false);
    resetForm();
    navigate({
      to: "/",
      search: { q: "", cat: "", size: "", sort: "recentes", min: 0, max: 0 },
      replace: true,
    });
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <PasswordGate onSuccess={() => setAuthed(true)} />
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
              Cadastre camisas com imagem, nome, preço, tamanhos, estoque e descrição. Imagens são
              compactadas e tudo fica salvo no navegador, publicado na vitrine automaticamente.
            </p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 border border-border px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-foreground hover:border-primary"
          >
            <LogOut className="size-3.5" /> Sair
          </button>
        </div>

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
                      referrerPolicy="no-referrer"
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
                    JPG ou PNG, até 10 MB. A imagem é compactada para no máximo 1000px e convertida
                    para WebP antes de salvar.
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
                  onChange={(e) => setDraft({ ...draft, price: Number(e.target.value) })}
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
                      oldPrice: e.target.value ? Number(e.target.value) : undefined,
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
                  onChange={(e) => setDraft({ ...draft, stock: Number(e.target.value) })}
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
                  onChange={(e) => setDraft({ ...draft, category: e.target.value })}
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
                onChange={(e) => setDraft({ ...draft, description: e.target.value })}
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
              <h2 className="font-display text-xl uppercase text-foreground">Cadastrados</h2>
              <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                {products.length} itens
              </span>
            </div>

            {products.length === 0 ? (
              <p className="mt-6 text-sm text-muted-foreground">
                Nenhum produto cadastrado ainda. Use o formulário ao lado para criar o primeiro.
              </p>
            ) : (
              <ul className="mt-4 divide-y divide-border">
                {products.map((product) => (
                  <li key={product.id} className="flex gap-3 py-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      referrerPolicy="no-referrer"
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
                        {product.category} · {product.sizes.join(", ")} · {product.stock} em estoque
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
      </main>

      <SiteFooter />
      <Toaster />
    </div>
  );
}
