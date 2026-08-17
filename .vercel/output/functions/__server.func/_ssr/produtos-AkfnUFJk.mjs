import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Toaster$1 } from "./sonner-DoFKumIW.mjs";
import { M as ChevronRight, N as ChevronLeft } from "../_libs/lucide-react.mjs";
import { n as SiteHeader, t as SiteFooter } from "./products-DoTCJ6Ja.mjs";
import { l as useStoreProducts, n as KID_SIZE_OPTIONS, r as SIZE_OPTIONS, t as CATEGORIES } from "./admin-products-tqBJ-AOB.mjs";
import { t as Route } from "./produtos-BLBAKmlh.mjs";
import { a as ProductCard, c as useItemsPerPage, i as PaginationItem, n as Pagination, o as ScrollReveal, r as PaginationContent, s as useIsMobile, t as FilterPanel } from "./scroll-reveal-L_xAO51z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/produtos-AkfnUFJk.js
var import_jsx_runtime = require_jsx_runtime();
function getPageNumbers(current, total, isMobile) {
	if (total <= 1) return [1];
	if (isMobile) {
		if (total <= 3) return Array.from({ length: total }, (_, i) => i + 1);
		if (current >= total - 2) return [
			total - 2,
			total - 1,
			total
		];
		if (current + 2 === total - 1) return [
			current,
			current + 1,
			current + 2,
			total
		];
		return [
			current,
			current + 1,
			current + 2,
			"...",
			total
		];
	}
	if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
	if (current <= 4) return [
		1,
		2,
		3,
		4,
		5,
		"...",
		total
	];
	if (current >= total - 3) return [
		1,
		"...",
		total - 4,
		total - 3,
		total - 2,
		total - 1,
		total
	];
	return [
		1,
		"...",
		current - 1,
		current,
		current + 1,
		"...",
		total
	];
}
var toCatalogItem = (item, index) => ({
	id: item.id,
	name: item.name,
	price: item.price,
	...item.oldPrice !== void 0 ? { oldPrice: item.oldPrice } : {},
	image: item.image,
	stock: item.stock,
	sizes: item.sizes,
	...item.badge !== void 0 ? { badge: item.badge } : {},
	category: item.category,
	createdIndex: index
});
var SORTS = [
	{
		value: "recentes",
		label: "Mais recentes"
	},
	{
		value: "menor-preco",
		label: "Menor preço"
	},
	{
		value: "maior-preco",
		label: "Maior preço"
	},
	{
		value: "nome",
		label: "A-Z"
	}
];
var chip = (active) => `border px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${active ? "border-primary bg-primary text-primary-foreground" : "border-border text-foreground hover:border-primary hover:text-primary"}`;
function ProdutosPage() {
	const storeProducts = useStoreProducts();
	const itemsPerPage = useItemsPerPage();
	const isMobile = useIsMobile();
	const { q, cat, size, sort, min, max, page } = Route.useSearch();
	const navigate = useNavigate({ from: "/produtos" });
	const setFilter = (patch) => {
		navigate({ search: (prev) => {
			const next = {
				...prev,
				...patch
			};
			if (!("page" in patch)) next.page = 1;
			return next;
		} });
	};
	const goToPage = (newPage) => {
		setFilter({ page: newPage });
		if (typeof window !== "undefined") {
			const section = document.getElementById("vitrine");
			if (section) section.scrollIntoView({ behavior: "smooth" });
		}
	};
	const catalog = storeProducts.map(toCatalogItem);
	const availableCategories = CATEGORIES.filter((c) => catalog.some((item) => item.category === c)).concat([...new Set(catalog.map((i) => i.category))].filter((c) => c && !CATEGORIES.includes(c)));
	const sizeOrder = [...SIZE_OPTIONS, ...KID_SIZE_OPTIONS];
	const availableSizes = [...new Set(catalog.flatMap((i) => i.sizes))].sort((a, b) => {
		const ia = sizeOrder.indexOf(a);
		const ib = sizeOrder.indexOf(b);
		return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
	});
	const term = q.trim().toLowerCase();
	const filtered = catalog.filter((item) => {
		if (cat && item.category !== cat) return false;
		if (size && !item.sizes.includes(size)) return false;
		if (min > 0 && item.price < min) return false;
		if (max > 0 && item.price > max) return false;
		if (term) {
			if (!`${item.name} ${item.category}`.toLowerCase().includes(term)) return false;
		}
		return true;
	}).sort((a, b) => {
		if (sort === "menor-preco") return a.price - b.price;
		if (sort === "maior-preco") return b.price - a.price;
		if (sort === "nome") return a.name.localeCompare(b.name, "pt-BR");
		return a.createdIndex - b.createdIndex;
	});
	const totalItems = filtered.length;
	const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
	const currentPage = Math.min(Math.max(1, page ?? 1), totalPages);
	const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
	const endItem = Math.min(currentPage * itemsPerPage, totalItems);
	const paginatedProducts = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
	const activeCount = (term ? 1 : 0) + (cat ? 1 : 0) + (size ? 1 : 0) + (min || max ? 1 : 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "bg-foreground py-12 text-background",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-7xl px-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "font-display text-4xl uppercase tracking-tight sm:text-5xl lg:text-6xl",
							children: ["Catálogo ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-primary",
								children: "Completo"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 max-w-2xl text-sm text-background/70",
							children: "Todas as nossas camisas versão tailandesa 1.1 em um só lugar. Qualidade premium, tecido respirável e mantos a pronta entrega."
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mx-auto max-w-7xl px-4 py-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-4 text-xs font-bold uppercase tracking-widest text-muted-foreground",
						children: "Filtrar por Categoria"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setFilter({ cat: "" }),
							className: chip(!cat),
							children: "Todas"
						}), availableCategories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setFilter({ cat: cat === c ? "" : c }),
							className: chip(cat === c),
							children: c
						}, c))]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					id: "vitrine",
					className: "mx-auto max-w-7xl px-4 py-8 pb-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[11px] font-bold uppercase tracking-widest text-muted-foreground",
							children: [
								"Exibindo ",
								startItem,
								"–",
								endItem,
								" de ",
								totalItems,
								" camisa(s)",
								term ? ` para "${q.trim()}"` : "",
								totalPages > 1 ? ` (Página ${currentPage} de ${totalPages})` : ""
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterPanel, {
								filters: {
									q,
									cat,
									size,
									sort,
									min,
									max
								},
								categories: availableCategories,
								sizes: availableSizes,
								onChange: setFilter,
								onClear: () => setFilter({
									q: "",
									cat: "",
									size: "",
									sort: "recentes",
									min: 0,
									max: 0,
									page: 1
								}),
								activeCount,
								resultCount: filtered.length
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "text-[11px] font-bold uppercase tracking-widest text-muted-foreground",
								children: ["Ordenar", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: sort,
									onChange: (e) => setFilter({ sort: e.target.value }),
									className: "ml-2 border border-border bg-card px-3 py-2 text-xs font-semibold uppercase tracking-widest text-foreground outline-none focus:border-primary",
									children: SORTS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: s.value,
										children: s.label
									}, s.value))
								})]
							})]
						})]
					}), filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "py-20 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-base font-semibold text-foreground",
								children: "Nenhuma camisa encontrada"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: "Tente ajustar os filtros ou pesquisar por outro termo."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setFilter({
									q: "",
									cat: "",
									size: "",
									min: 0,
									max: 0
								}),
								className: "mt-6 border border-border bg-card px-6 py-2.5 text-xs font-bold uppercase tracking-widest hover:border-primary",
								children: "Limpar filtros"
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 gap-3 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4",
						children: paginatedProducts.map((p, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollReveal, {
							delay: idx % 4 * 60,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p })
						}, p.id))
					}), totalPages > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 sm:mt-12 flex flex-col items-center justify-center gap-3 sm:gap-4 border-t border-border pt-6 sm:pt-8 w-full overflow-hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pagination, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PaginationContent, {
							className: "flex-wrap justify-center gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									disabled: currentPage <= 1,
									onClick: () => goToPage(currentPage - 1),
									className: `flex items-center gap-1 px-2 py-1.5 sm:px-3 sm:py-2 text-[11px] sm:text-xs font-semibold uppercase tracking-wider transition-colors ${currentPage <= 1 ? "pointer-events-none opacity-30" : "text-foreground hover:bg-accent"}`,
									"aria-label": "Página anterior",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "hidden sm:inline",
										children: "Anterior"
									})]
								}) }),
								getPageNumbers(currentPage, totalPages, isMobile).map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationItem, { children: typeof p === "number" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => goToPage(p),
									className: `flex min-w-[32px] sm:min-w-[36px] h-8 sm:h-9 items-center justify-center px-2 sm:px-3 text-xs font-bold transition-colors ${currentPage === p ? "border border-primary bg-primary text-primary-foreground" : "border border-border text-foreground hover:border-primary hover:text-primary"}`,
									children: p
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex h-8 sm:h-9 items-center px-1 sm:px-2 text-xs font-bold text-muted-foreground",
									children: "..."
								}) }, i)),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									disabled: currentPage >= totalPages,
									onClick: () => goToPage(currentPage + 1),
									className: `flex items-center gap-1 px-2 py-1.5 sm:px-3 sm:py-2 text-[11px] sm:text-xs font-semibold uppercase tracking-wider transition-colors ${currentPage >= totalPages ? "pointer-events-none opacity-30" : "text-foreground hover:bg-accent"}`,
									"aria-label": "Próxima página",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "hidden sm:inline",
										children: "Próxima"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })]
								}) })
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[11px] font-bold uppercase tracking-widest text-muted-foreground",
							children: [
								"Página ",
								currentPage,
								" de ",
								totalPages
							]
						})]
					})] })]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {})
		]
	});
}
//#endregion
export { ProdutosPage as component };
