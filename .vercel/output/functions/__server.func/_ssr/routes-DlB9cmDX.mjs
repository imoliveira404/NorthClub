import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Toaster$1 } from "./sonner-DoFKumIW.mjs";
import { F as BadgeCheck, M as ChevronRight, N as ChevronLeft, i as Truck, u as ShieldCheck, v as PackageCheck } from "../_libs/lucide-react.mjs";
import { n as SiteHeader, t as SiteFooter } from "./products-DoTCJ6Ja.mjs";
import { l as useStoreProducts, n as KID_SIZE_OPTIONS, r as SIZE_OPTIONS, t as CATEGORIES } from "./admin-products-tqBJ-AOB.mjs";
import { r as whatsappLink } from "./whatsapp-fjkMLPi1.mjs";
import { a as ProductCard, c as useItemsPerPage, i as PaginationItem, n as Pagination, o as ScrollReveal, r as PaginationContent, s as useIsMobile, t as FilterPanel } from "./scroll-reveal-L_xAO51z.mjs";
import { t as Route } from "./routes-BYR1iT45.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DlB9cmDX.js
var import_jsx_runtime = require_jsx_runtime();
var hero_stadium_default = "/assets/hero-stadium-Bvuh3osa.webp";
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
var BENEFITS = [
	{
		icon: PackageCheck,
		title: "Pronta entrega",
		text: "Estoque no Brasil"
	},
	{
		icon: Truck,
		title: "Enviamos p/ todo o Brasil",
		text: "Sem taxas extras"
	},
	{
		icon: BadgeCheck,
		title: "Versão 1.1",
		text: "Qualidade tailandesa"
	},
	{
		icon: ShieldCheck,
		title: "Compra segura",
		text: "Troca facilitada"
	}
];
var chip = (active) => `border px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${active ? "border-primary bg-primary text-primary-foreground" : "border-border text-foreground hover:border-primary hover:text-primary"}`;
function Home() {
	const storeProducts = useStoreProducts();
	const itemsPerPage = useItemsPerPage();
	const isMobile = useIsMobile();
	const { q, cat, size, sort, min, max, page } = Route.useSearch();
	const navigate = useNavigate({ from: "/" });
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
			const section = document.getElementById("produtos");
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
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "relative isolate overflow-hidden bg-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: hero_stadium_default,
						alt: "Estádio de futebol iluminado à noite",
						loading: "eager",
						fetchPriority: "high",
						width: 1920,
						height: 1088,
						className: "absolute inset-0 size-full object-cover opacity-45"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mx-auto flex min-h-[520px] max-w-7xl flex-col justify-center px-4 py-20",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-5xl uppercase leading-[0.9] text-background sm:text-7xl lg:text-8xl",
								children: "Tailandesa"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-4xl uppercase leading-[0.9] text-primary sm:text-6xl lg:text-7xl",
								children: "Pronta entrega"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-8 max-w-sm font-display text-2xl uppercase leading-tight text-background sm:text-3xl",
								children: "Enviamos p/ todo o Brasil"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#produtos",
								className: "mt-8 w-fit bg-primary px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground transition-opacity hover:opacity-90",
								children: "Ver produtos"
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "border-y border-border bg-card",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto grid max-w-7xl grid-cols-2 gap-3 px-4 py-5 sm:gap-6 sm:py-8 sm:grid-cols-2 lg:grid-cols-4",
						children: BENEFITS.map(({ icon: Icon, title, text }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2.5 sm:gap-3 rounded-none border border-border bg-card p-3 sm:p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-6 sm:size-8 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[13px] sm:text-sm font-bold uppercase tracking-wide text-foreground leading-tight",
								children: title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] sm:text-xs text-muted-foreground mt-0.5",
								children: text
							})] })]
						}, title))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mx-auto max-w-7xl px-4 py-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-6 font-display text-2xl uppercase tracking-tight text-foreground",
						children: "Navegue por categoria"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: availableCategories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setFilter({ cat: cat === c ? "" : c }),
							className: chip(cat === c),
							children: c
						}, c))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					id: "produtos",
					className: "mx-auto max-w-7xl px-4 py-14",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-8 flex flex-wrap items-end justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-3xl uppercase tracking-tight text-foreground md:text-4xl",
							children: "Produtos"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-[11px] font-bold uppercase tracking-widest text-muted-foreground",
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
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
					}), filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "py-10 text-center text-sm text-muted-foreground",
						children: "Nenhuma camisa encontrada com esses filtros. Tente outra busca."
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
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "bg-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto grid max-w-7xl items-center gap-6 px-4 py-14 md:grid-cols-[1.4fr_1fr]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-3xl uppercase leading-tight text-background md:text-5xl",
							children: "Revenda com a gente"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-xl text-sm text-background/70",
							children: "Preços de atacado a partir de 3 peças, catálogo atualizado diariamente e envio no mesmo dia para pedidos aprovados até 15h."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: whatsappLink("Olá! Quero saber mais sobre revenda de camisas na North."),
							target: "_blank",
							rel: "noopener noreferrer",
							className: "w-fit bg-[#25D366] px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-black",
							children: "Falar no WhatsApp"
						})]
					})
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {})
		]
	});
}
//#endregion
export { Home as component };
