import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as useCart } from "./cart-2y9krRSi.mjs";
import { M as ChevronRight, N as ChevronLeft, O as Ellipsis, P as ChevronDown, s as SlidersHorizontal, t as X } from "../_libs/lucide-react.mjs";
import { i as formatBRL } from "./products-DoTCJ6Ja.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scroll-reveal-L_xAO51z.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProductCard({ product }) {
	const [size, setSize] = (0, import_react.useState)(product.sizes[2] ?? product.sizes[0] ?? "M");
	const { items, addItem, removeItem } = useCart();
	const isInCart = items.some((i) => i.id === product.id && i.size === size);
	const handleCartClick = () => {
		if (isInCart) {
			removeItem(product.id, size);
			toast.info("Removido do carrinho", { description: `${product.name} — tamanho ${size}` });
		} else {
			addItem({
				id: product.id,
				name: product.name,
				price: product.price,
				image: product.image,
				size
			});
			toast.success("Adicionado ao carrinho", { description: `${product.name} — tamanho ${size}` });
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "group flex flex-col border border-border bg-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative overflow-hidden bg-secondary",
			children: [product.badge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute left-3 top-3 z-10 bg-primary px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground",
				children: product.badge
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: product.image,
				alt: product.name,
				loading: "lazy",
				referrerPolicy: "no-referrer",
				width: 800,
				height: 800,
				className: "aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col gap-2.5 p-3 sm:gap-3 sm:p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-[13px] sm:text-sm font-semibold leading-snug text-foreground line-clamp-2",
					children: product.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] sm:text-xs font-bold uppercase tracking-wider text-primary",
					children: "Até 10% OFF em quantidade"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-auto",
					children: [
						product.oldPrice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-[11px] sm:text-xs text-muted-foreground line-through",
							children: formatBRL(product.oldPrice)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-2xl sm:text-2xl text-foreground",
							children: formatBRL(product.price)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "block text-[11px] sm:text-xs text-muted-foreground",
							children: [
								"ou 3x de ",
								formatBRL(product.price / 3),
								" sem juros"
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-1 sm:gap-1.5",
					children: product.sizes.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setSize(s),
						className: `min-w-[32px] sm:min-w-9 h-7 sm:h-8 border px-1.5 text-[11px] sm:text-xs font-bold uppercase transition-colors flex items-center justify-center ${size === s ? "border-primary bg-primary text-primary-foreground" : "border-border text-foreground hover:border-foreground"}`,
						children: s
					}, s))
				}),
				isInCart ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: handleCartClick,
					className: "w-full h-9 sm:h-10 bg-[#dc2626] text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#b91c1c] flex items-center justify-center",
					children: "Remover"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: handleCartClick,
					className: "w-full h-9 sm:h-10 bg-foreground text-xs font-bold uppercase tracking-widest text-background transition-colors hover:bg-primary hover:text-primary-foreground flex items-center justify-center",
					children: "Adquirir"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-center text-[11px] sm:text-xs text-muted-foreground",
					children: [product.stock, " em estoque"]
				})
			]
		})]
	});
}
var chip = (active) => `border px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest transition-colors ${active ? "border-primary bg-primary text-primary-foreground" : "border-border text-foreground hover:border-primary hover:text-primary"}`;
var PRICE_RANGES = [
	{
		label: "Até R$ 100",
		min: 0,
		max: 100
	},
	{
		label: "R$ 100 - R$ 150",
		min: 100,
		max: 150
	},
	{
		label: "R$ 150 - R$ 200",
		min: 150,
		max: 200
	},
	{
		label: "Acima de R$ 200",
		min: 200,
		max: 0
	}
];
function FilterPanel({ filters, categories, sizes, onChange, onClear, activeCount, resultCount }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const wrapRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const onDoc = (e) => {
			if (!wrapRef.current?.contains(e.target)) setOpen(false);
		};
		document.addEventListener("mousedown", onDoc);
		return () => document.removeEventListener("mousedown", onDoc);
	}, [open]);
	const { cat, size, min, max } = filters;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: wrapRef,
		className: "relative inline-block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => setOpen((v) => !v),
			"aria-expanded": open,
			className: "flex items-center gap-2 border border-border bg-card px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-foreground transition-colors hover:border-primary",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "size-4 text-primary" }),
				"Filtros",
				activeCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex size-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground",
					children: activeCount
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: `size-4 transition-transform ${open ? "rotate-180" : ""}` })
			]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "absolute left-0 z-40 mt-2 w-[min(92vw,26rem)] space-y-5 border border-border bg-card p-5 shadow-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-2 text-[11px] font-bold uppercase tracking-widest text-muted-foreground",
					children: "Categoria"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => onChange({ cat: "" }),
						className: chip(!cat),
						children: "Todas"
					}), categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => onChange({ cat: cat === c ? "" : c }),
						className: chip(cat === c),
						children: c
					}, c))]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-2 text-[11px] font-bold uppercase tracking-widest text-muted-foreground",
					children: "Tamanho"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => onChange({ size: "" }),
						className: chip(!size),
						children: "Todos"
					}), sizes.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => onChange({ size: size === s ? "" : s }),
						className: chip(size === s),
						children: s
					}, s))]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 text-[11px] font-bold uppercase tracking-widest text-muted-foreground",
						children: "Preço"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-3 flex flex-wrap gap-2",
						children: PRICE_RANGES.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => onChange(min === r.min && max === r.max ? {
								min: 0,
								max: 0
							} : {
								min: r.min,
								max: r.max
							}),
							className: chip(min === r.min && max === r.max),
							children: r.label
						}, r.label))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								min: 0,
								placeholder: "Mín.",
								value: min || "",
								onChange: (e) => onChange({ min: Number(e.target.value) || 0 }),
								className: "w-full border border-border bg-background px-3 py-2 text-xs text-foreground outline-none focus:border-primary"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground",
								children: "até"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								min: 0,
								placeholder: "Máx.",
								value: max || "",
								onChange: (e) => onChange({ max: Number(e.target.value) || 0 }),
								className: "w-full border border-border bg-background px-3 py-2 text-xs text-foreground outline-none focus:border-primary"
							})
						]
					}),
					(min > 0 || max > 0) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-[11px] text-muted-foreground",
						children: [
							min > 0 ? formatBRL(min) : "R$ 0,00",
							" —",
							" ",
							max > 0 ? formatBRL(max) : "sem limite"
						]
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-t border-border pt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: onClear,
						className: "flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-destructive",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3" }), " Limpar"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setOpen(false),
						className: "bg-primary px-5 py-2 text-[11px] font-bold uppercase tracking-widest text-primary-foreground",
						children: [
							"Ver ",
							resultCount,
							" resultado(s)"
						]
					})]
				})
			]
		})]
	});
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var Pagination = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
	role: "navigation",
	"aria-label": "pagination",
	className: cn("mx-auto flex w-full justify-center", className),
	...props
});
Pagination.displayName = "Pagination";
var PaginationContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
	ref,
	className: cn("flex flex-row items-center gap-1", className),
	...props
}));
PaginationContent.displayName = "PaginationContent";
var PaginationItem = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
	ref,
	className: cn("", className),
	...props
}));
PaginationItem.displayName = "PaginationItem";
var PaginationLink = ({ className, isActive, size = "icon", ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
	"aria-current": isActive ? "page" : void 0,
	className: cn(buttonVariants({
		variant: isActive ? "outline" : "ghost",
		size
	}), className),
	...props
});
PaginationLink.displayName = "PaginationLink";
var PaginationPrevious = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PaginationLink, {
	"aria-label": "Go to previous page",
	size: "default",
	className: cn("gap-1 pl-2.5", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Previous" })]
});
PaginationPrevious.displayName = "PaginationPrevious";
var PaginationNext = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PaginationLink, {
	"aria-label": "Go to next page",
	size: "default",
	className: cn("gap-1 pr-2.5", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Next" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4" })]
});
PaginationNext.displayName = "PaginationNext";
var PaginationEllipsis = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
	"aria-hidden": true,
	className: cn("flex h-9 w-9 items-center justify-center", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "sr-only",
		children: "More pages"
	})]
});
PaginationEllipsis.displayName = "PaginationEllipsis";
function useItemsPerPage() {
	const [itemsPerPage, setItemsPerPage] = import_react.useState(12);
	import_react.useEffect(() => {
		const updateItems = () => {
			setItemsPerPage(window.innerWidth < 640 ? 10 : 12);
		};
		updateItems();
		window.addEventListener("resize", updateItems);
		return () => window.removeEventListener("resize", updateItems);
	}, []);
	return itemsPerPage;
}
var MOBILE_BREAKPOINT = 768;
function useIsMobile() {
	const [isMobile, setIsMobile] = import_react.useState(void 0);
	import_react.useEffect(() => {
		const mql = window.matchMedia(`(max-width: 767px)`);
		const onChange = () => {
			setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		};
		mql.addEventListener("change", onChange);
		setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		return () => mql.removeEventListener("change", onChange);
	}, []);
	return !!isMobile;
}
function ScrollReveal({ children, className = "", delay = 0 }) {
	const [isVisible, setIsVisible] = (0, import_react.useState)(false);
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const element = ref.current;
		if (!element) return;
		if (typeof window === "undefined" || !("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			setIsVisible(true);
			return;
		}
		const observer = new IntersectionObserver((entries) => {
			const entry = entries[0];
			if (entry?.isIntersecting) {
				setIsVisible(true);
				observer.unobserve(entry.target);
			}
		}, {
			threshold: .05,
			rootMargin: "40px 0px"
		});
		observer.observe(element);
		return () => observer.disconnect();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref,
		style: {
			transitionDuration: "550ms",
			transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
			transitionDelay: `${delay}ms`,
			willChange: "transform, opacity"
		},
		className: `transition-all ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5 pointer-events-none"} ${className}`,
		children
	});
}
//#endregion
export { ProductCard as a, useItemsPerPage as c, PaginationItem as i, Pagination as n, ScrollReveal as o, PaginationContent as r, useIsMobile as s, FilterPanel as t };
