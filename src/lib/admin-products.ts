const STORAGE_KEY = "futz-admin-products";

export const SIZE_OPTIONS = ["P", "M", "G", "GG", "2XL", "3GG"];

export type AdminProduct = {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  stock: number;
  sizes: string[];
  badge?: string;
  category: string;
  description: string;
  image: string;
  createdAt: string;
};

export type AdminProductDraft = Omit<AdminProduct, "id" | "createdAt">;

export const emptyDraft = (): AdminProductDraft => ({
  name: "",
  price: 0,
  stock: 0,
  sizes: [],
  badge: "",
  category: "Brasileirão",
  description: "",
  image: "",
});

export function loadAdminProducts(): AdminProduct[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as AdminProduct[]) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveAdminProducts(products: AdminProduct[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

export function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Não foi possível ler a imagem."));
    reader.readAsDataURL(file);
  });
}

export const newId = () =>
  `p-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
