import { useEffect, useState } from "react";
import { brasileirao, internacionais, type Product } from "@/lib/products";
import { type AdminProduct, type AdminProductDraft } from "@/lib/admin-products";
import { clearRecords, deleteRecord, getAllRecords, putRecord } from "@/lib/idb";

const LEGACY_KEY = "futz-products";
const META_ID = "__catalog_meta__";
const CATALOG_VERSION = 5;

function toAdminProduct(p: Product, category: string, createdAt: string): AdminProduct {
  return {
    id: p.id,
    name: p.name,
    price: p.price,
    ...(p.oldPrice !== undefined ? { oldPrice: p.oldPrice } : {}),
    stock: p.stock,
    sizes: p.sizes,
    ...(p.badge !== undefined ? { badge: p.badge } : {}),
    category,
    description: "",
    image: p.image,
    active: true,
    createdAt,
  };
}

/** Catálogo inicial para a primeira renderização (leve, evita blocos no SSR). */
export function seedProducts(): AdminProduct[] {
  const now = Date.now();
  const fromBrasileirao = brasileirao.map((p, i) =>
    toAdminProduct(p, "Time brasileiro", new Date(now - i * 1000).toISOString()),
  );
  const fromInternacionais = internacionais.map((p, i) =>
    toAdminProduct(p, "Europeu", new Date(now - (brasileirao.length + i) * 1000).toISOString()),
  );
  return [...fromBrasileirao, ...fromInternacionais];
}

/** Catálogo completo exportado do banco (carregado sob demanda para não pesar o bundle inicial). */
async function loadCatalog(): Promise<AdminProduct[]> {
  const mod = await import("@/lib/catalog.json");
  const items = mod.default as unknown as AdminProduct[];
  return items.map((p) => ({ ...p }));
}

/** Lê produtos salvos pelo armazenamento antigo (localStorage) para migrar. */
function readLegacyProducts(): AdminProduct[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(LEGACY_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AdminProduct[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : null;
  } catch {
    return null;
  }
}

/** Lê o catálogo salvo no navegador; instala o catálogo completo quando a versão é nova ou vazia. */
export async function listProducts(): Promise<AdminProduct[]> {
  try {
    const saved = await getAllRecords<AdminProduct>();
    const meta = saved.find((r) => r.id === META_ID) as
      (AdminProduct & { version?: number }) | undefined;
    if (meta?.version === CATALOG_VERSION) {
      return saved.filter((r) => r.id !== META_ID);
    }
  } catch {
    /* armazenamento indisponível */
  }

  const catalog = await loadCatalog();
  const legacy = readLegacyProducts();
  const ids = new Set(catalog.map((p) => p.id));
  const extra = (legacy ?? []).filter((p) => !ids.has(p.id));
  const next = [...catalog, ...extra];

  try {
    await clearRecords();
    await Promise.all(next.map((p) => putRecord(p)));
    await putRecord({ id: META_ID, version: CATALOG_VERSION });
    if (legacy) window.localStorage.removeItem(LEGACY_KEY);
  } catch {
    /* persistência opcional */
  }

  return next;
}

/** Cria ou atualiza um produto; devolve o produto salvo ou null em falha. */
export async function upsertProduct(
  draft: AdminProductDraft,
  id?: string,
): Promise<AdminProduct | null> {
  let saved: AdminProduct;
  if (id) {
    const products = await listProducts();
    const existing = products.find((p) => p.id === id);
    if (!existing) return null;
    saved = { ...draft, id, createdAt: existing.createdAt };
  } else {
    saved = {
      ...draft,
      id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
      createdAt: new Date().toISOString(),
    };
  }

  try {
    await putRecord(saved);
    return saved;
  } catch {
    return null;
  }
}

export async function deleteProduct(id: string): Promise<boolean> {
  try {
    await deleteRecord(id);
    return true;
  } catch {
    return false;
  }
}

/** Hook reativo para a vitrine: catálogo salvo no navegador, com seed. */
export function useStoreProducts(): AdminProduct[] {
  const [products, setProducts] = useState<AdminProduct[]>(() => seedProducts());

  useEffect(() => {
    let cancelled = false;
    void listProducts().then((loaded) => {
      if (!cancelled) setProducts(loaded);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return products;
}
