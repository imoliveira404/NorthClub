const STORAGE_KEY = "futz-admin-products";

export const SIZE_OPTIONS = ["P", "M", "G", "GG", "2XL", "3GG"];

export const CATEGORIES = ["Brasileirão", "Internacionais", "Retrô", "Treino"];

export type AdminProduct = {
  id: string;
  name: string;
  price: number;
  oldPrice?: number | undefined;
  stock: number;
  sizes: string[];
  badge?: string | undefined;
  category: string;
  description: string;
  image: string;
  active: boolean;
  createdAt: string;
};

export type AdminProductDraft = Omit<
  AdminProduct,
  "id" | "createdAt" | "oldPrice" | "badge"
> & {
  oldPrice?: number | undefined;
  badge?: string | undefined;
};

export const emptyDraft = (): AdminProductDraft => ({
  name: "",
  price: 0,
  stock: 0,
  sizes: [],
  badge: "",
  category: "Brasileirão",
  description: "",
  image: "",
  active: true,
});

/** Rascunhos antigos salvos no navegador (versão anterior do painel). */
export function loadLegacyDrafts(): AdminProduct[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as AdminProduct[]) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function clearLegacyDrafts() {
  if (typeof window !== "undefined") window.localStorage.removeItem(STORAGE_KEY);
}
