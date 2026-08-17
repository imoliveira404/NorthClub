import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as internacionais, r as brasileirao } from "./products-DoTCJ6Ja.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-products-tqBJ-AOB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var DB_NAME = "north-store";
var DB_VERSION = 1;
var STORE = "products";
function openDB() {
	return new Promise((resolve, reject) => {
		if (typeof window === "undefined" || !("indexedDB" in window)) {
			reject(/* @__PURE__ */ new Error("IndexedDB indisponível"));
			return;
		}
		const request = window.indexedDB.open(DB_NAME, DB_VERSION);
		request.onupgradeneeded = () => {
			const db = request.result;
			if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE, { keyPath: "id" });
		};
		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error ?? /* @__PURE__ */ new Error("Falha ao abrir o armazenamento"));
	});
}
var dbPromise = null;
function getDB() {
	if (!dbPromise) dbPromise = openDB();
	return dbPromise;
}
async function withStore(mode, run) {
	const db = await getDB();
	return await new Promise((resolve, reject) => {
		let result;
		const tx = db.transaction(STORE, mode);
		const request = run(tx.objectStore(STORE));
		request.onsuccess = () => {
			result = request.result;
		};
		request.onerror = () => reject(request.error ?? /* @__PURE__ */ new Error("Falha no armazenamento"));
		tx.oncomplete = () => resolve(result);
		tx.onerror = () => reject(tx.error ?? /* @__PURE__ */ new Error("Falha no armazenamento"));
		tx.onabort = () => reject(tx.error ?? /* @__PURE__ */ new Error("Transação cancelada"));
	});
}
function getAllRecords() {
	return withStore("readonly", (store) => store.getAll());
}
function putRecord(value) {
	return withStore("readwrite", (store) => store.put(value));
}
function deleteRecord(id) {
	return withStore("readwrite", (store) => store.delete(id));
}
function clearRecords() {
	return withStore("readwrite", (store) => store.clear());
}
var LEGACY_KEY = "futz-products";
var META_ID = "__catalog_meta__";
var CATALOG_VERSION = 3;
function toAdminProduct(p, category, createdAt) {
	return {
		id: p.id,
		name: p.name,
		price: p.price,
		...p.oldPrice !== void 0 ? { oldPrice: p.oldPrice } : {},
		stock: p.stock,
		sizes: p.sizes,
		...p.badge !== void 0 ? { badge: p.badge } : {},
		category,
		description: "",
		image: p.image,
		active: true,
		createdAt
	};
}
/** Catálogo inicial para a primeira renderização (leve, evita blocos no SSR). */
function seedProducts() {
	const now = Date.now();
	const fromBrasileirao = brasileirao.map((p, i) => toAdminProduct(p, "Time brasileiro", (/* @__PURE__ */ new Date(now - i * 1e3)).toISOString()));
	const fromInternacionais = internacionais.map((p, i) => toAdminProduct(p, "Europeu", (/* @__PURE__ */ new Date(now - (brasileirao.length + i) * 1e3)).toISOString()));
	return [...fromBrasileirao, ...fromInternacionais];
}
/** Catálogo completo exportado do banco (carregado sob demanda para não pesar o bundle inicial). */
async function loadCatalog() {
	return (await import("./catalog-CnBnEXEP.mjs")).default.map((p) => ({ ...p }));
}
/** Lê produtos salvos pelo armazenamento antigo (localStorage) para migrar. */
function readLegacyProducts() {
	if (typeof window === "undefined") return null;
	try {
		const raw = window.localStorage.getItem(LEGACY_KEY);
		if (!raw) return null;
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) && parsed.length > 0 ? parsed : null;
	} catch {
		return null;
	}
}
/** Lê o catálogo salvo no navegador; instala o catálogo completo quando a versão é nova ou vazia. */
async function listProducts() {
	try {
		const saved = await getAllRecords();
		if (saved.find((r) => r.id === META_ID)?.version === CATALOG_VERSION) return saved.filter((r) => r.id !== META_ID);
	} catch {}
	const catalog = await loadCatalog();
	const legacy = readLegacyProducts();
	const ids = new Set(catalog.map((p) => p.id));
	const extra = (legacy ?? []).filter((p) => !ids.has(p.id));
	const next = [...catalog, ...extra];
	try {
		await clearRecords();
		await Promise.all(next.map((p) => putRecord(p)));
		await putRecord({
			id: META_ID,
			version: CATALOG_VERSION
		});
		if (legacy) window.localStorage.removeItem(LEGACY_KEY);
	} catch {}
	return next;
}
/** Cria ou atualiza um produto; devolve o produto salvo ou null em falha. */
async function upsertProduct(draft, id) {
	let saved;
	if (id) {
		const existing = (await listProducts()).find((p) => p.id === id);
		if (!existing) return null;
		saved = {
			...draft,
			id,
			createdAt: existing.createdAt
		};
	} else saved = {
		...draft,
		id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	};
	try {
		await putRecord(saved);
		return saved;
	} catch {
		return null;
	}
}
async function deleteProduct(id) {
	try {
		await deleteRecord(id);
		return true;
	} catch {
		return false;
	}
}
/** Hook reativo para a vitrine: catálogo salvo no navegador, com seed. */
function useStoreProducts() {
	const [products, setProducts] = (0, import_react.useState)(() => seedProducts());
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		listProducts().then((loaded) => {
			if (!cancelled) setProducts(loaded);
		});
		return () => {
			cancelled = true;
		};
	}, []);
	return products;
}
var SIZE_OPTIONS = [
	"P",
	"M",
	"G",
	"GG",
	"2XL",
	"3GG"
];
var KID_SIZE_OPTIONS = [
	"16",
	"18",
	"20",
	"22",
	"24",
	"26",
	"28"
];
var CATEGORIES = [
	"Time brasileiro",
	"Europeu",
	"Seleção",
	"Retro",
	"Jogador",
	"Feminino",
	"Infantil",
	"Conjunto adulto",
	"Agasalho conjunto",
	"Calção oferta"
];
var emptyDraft = () => ({
	name: "",
	price: 0,
	stock: 0,
	sizes: [],
	badge: "",
	category: "Time brasileiro",
	description: "",
	image: "",
	active: true
});
//#endregion
export { emptyDraft as a, upsertProduct as c, deleteProduct as i, useStoreProducts as l, KID_SIZE_OPTIONS as n, listProducts as o, SIZE_OPTIONS as r, seedProducts as s, CATEGORIES as t };
