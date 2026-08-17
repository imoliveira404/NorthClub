import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useCart } from "./cart-2y9krRSi.mjs";
import { c as ShoppingCart, f as Search, r as User, t as X, x as Menu } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/products-DoTCJ6Ja.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var KEY = "futz.guest.email";
var EVENT = "futz-guest-change";
function read() {
	if (typeof window === "undefined") return null;
	return window.localStorage.getItem(KEY);
}
/**
* "Conta leve" do cliente: guarda apenas o e-mail no navegador.
* Não há persistência em banco — serve para identificar o comprador no checkout.
*/
function useGuestAccount() {
	const [email, setEmail] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		setEmail(read());
		const sync = () => setEmail(read());
		window.addEventListener(EVENT, sync);
		window.addEventListener("storage", sync);
		return () => {
			window.removeEventListener(EVENT, sync);
			window.removeEventListener("storage", sync);
		};
	}, []);
	return {
		email,
		signIn: (0, import_react.useCallback)((value) => {
			const clean = value.trim().toLowerCase();
			if (!clean) return;
			window.localStorage.setItem(KEY, clean);
			window.dispatchEvent(new Event(EVENT));
		}, []),
		signOut: (0, import_react.useCallback)(() => {
			window.localStorage.removeItem(KEY);
			window.dispatchEvent(new Event(EVENT));
		}, [])
	};
}
var ANNOUNCEMENTS = [
	"DIRETO DO BRASIL E SEM TAXA",
	"ACIMA DE 3 PEÇAS: ATÉ 10% OFF",
	"ENVIAMOS PARA TODO O BRASIL"
];
var defaultCatalogSearch$1 = {
	q: "",
	cat: "",
	size: "",
	sort: "recentes",
	min: 0,
	max: 0,
	page: 1
};
var NAV = [
	{
		label: "Início",
		path: "/",
		search: defaultCatalogSearch$1
	},
	{
		label: "Produtos",
		path: "/produtos",
		search: defaultCatalogSearch$1
	},
	{
		label: "Quem somos",
		path: "/quem-somos"
	},
	{
		label: "Contato",
		path: "/contato"
	},
	{
		label: "Trocas e devoluções",
		path: "/troca-e-devolucoes"
	},
	{
		label: "Como comprar",
		path: "/como-comprar"
	}
];
function SiteHeader() {
	const { count } = useCart();
	const { email: guestEmail, signIn, signOut } = useGuestAccount();
	const [accountOpen, setAccountOpen] = (0, import_react.useState)(false);
	const [emailInput, setEmailInput] = (0, import_react.useState)("");
	const [index, setIndex] = (0, import_react.useState)(0);
	const [term, setTerm] = (0, import_react.useState)("");
	const [open, setOpen] = (0, import_react.useState)(false);
	const [searchOpen, setSearchOpen] = (0, import_react.useState)(false);
	const navigate = useNavigate();
	const submitSearch = (e) => {
		e.preventDefault();
		navigate({
			to: "/produtos",
			search: {
				q: term.trim(),
				cat: "",
				size: "",
				sort: "recentes",
				min: 0,
				max: 0,
				page: 1
			}
		});
		setOpen(false);
		setSearchOpen(false);
	};
	(0, import_react.useEffect)(() => {
		const id = setInterval(() => setIndex((i) => (i + 1) % ANNOUNCEMENTS.length), 4e3);
		return () => clearInterval(id);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-50",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "bg-primary py-2 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-primary-foreground",
			children: ANNOUNCEMENTS[index]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-7xl items-center justify-between gap-2 sm:gap-4 px-4 py-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-1 items-center justify-start gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "text-foreground lg:hidden",
								"aria-label": "Abrir menu",
								onClick: () => setOpen((v) => !v),
								children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-6" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-6" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								className: "relative hidden flex-1 lg:block",
								onSubmit: submitSearch,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "search",
									placeholder: "O que você está buscando?",
									"aria-label": "Buscar produtos",
									value: term,
									onChange: (e) => setTerm(e.target.value),
									className: "w-full max-w-md rounded-none border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-[calc(28rem-2.25rem)] top-2.5 hidden size-5 text-muted-foreground xl:block" })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							search: defaultCatalogSearch$1,
							className: "font-display text-3xl uppercase tracking-tight text-foreground text-center shrink-0",
							children: ["North", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-primary",
								children: "."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-1 items-center justify-end gap-4 sm:gap-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "text-foreground lg:hidden",
									"aria-label": "Buscar produtos",
									onClick: () => setSearchOpen((v) => !v),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-6" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative hidden sm:block",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => setAccountOpen((v) => !v),
										className: "flex items-center gap-2 text-left text-xs leading-tight text-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "size-6" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: guestEmail ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											className: "block",
											children: "Minha conta"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block max-w-[9rem] truncate text-muted-foreground",
											children: guestEmail
										})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											className: "block",
											children: "Olá! Faça login"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Só com seu e-mail"
										})] }) })]
									}), accountOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute right-0 top-full z-50 mt-3 w-72 border border-border bg-card p-4 shadow-lg",
										children: guestEmail ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[11px] font-bold uppercase tracking-widest text-muted-foreground",
												children: "Conectado como"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 truncate text-sm text-foreground",
												children: guestEmail
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => {
													signOut();
													setAccountOpen(false);
												},
												className: "mt-4 w-full border border-border py-2.5 text-[11px] font-bold uppercase tracking-widest text-foreground hover:border-primary",
												children: "Sair"
											})
										] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
											onSubmit: (e) => {
												e.preventDefault();
												if (!emailInput.trim()) return;
												signIn(emailInput);
												setEmailInput("");
												setAccountOpen(false);
											},
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[11px] font-bold uppercase tracking-widest text-muted-foreground",
													children: "Entrar com e-mail"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "email",
													required: true,
													placeholder: "seu@email.com",
													value: emailInput,
													onChange: (e) => setEmailInput(e.target.value),
													className: "mt-2 w-full border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "submit",
													className: "mt-3 w-full bg-primary py-2.5 text-[11px] font-bold uppercase tracking-widest text-primary-foreground",
													children: "Entrar"
												})
											]
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/checkout",
									className: "relative text-foreground",
									"aria-label": "Carrinho",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "size-6" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground",
										children: count
									})]
								})
							]
						})
					]
				}),
				searchOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-t border-border bg-card p-3 lg:hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: submitSearch,
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "search",
							autoFocus: true,
							placeholder: "O que você está buscando?",
							"aria-label": "Buscar produtos",
							value: term,
							onChange: (e) => setTerm(e.target.value),
							className: "w-full border border-border bg-background px-4 py-2 text-sm text-foreground outline-none focus:border-primary"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "bg-primary px-4 text-xs font-bold uppercase tracking-widest text-primary-foreground",
							children: "Buscar"
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "border-t border-border",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto hidden max-w-7xl items-center gap-6 px-4 lg:flex",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/produtos",
							search: defaultCatalogSearch$1,
							className: "flex items-center gap-2 bg-foreground px-4 py-3.5 text-xs font-bold uppercase tracking-wider text-background hover:bg-foreground/90",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-4" }), " Categorias"]
						}), NAV.map((item) => "search" in item ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: item.path,
							search: item.search,
							className: "py-3.5 text-xs font-semibold uppercase tracking-wider text-foreground transition-colors hover:text-primary",
							children: item.label
						}, item.label) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: item.path,
							className: "py-3.5 text-xs font-semibold uppercase tracking-wider text-foreground transition-colors hover:text-primary",
							children: item.label
						}, item.label))]
					}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col px-4 pb-4 lg:hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
							onSubmit: submitSearch,
							className: "py-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "search",
								placeholder: "O que você está buscando?",
								"aria-label": "Buscar produtos",
								value: term,
								onChange: (e) => setTerm(e.target.value),
								className: "w-full border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
							})
						}), NAV.map((item) => "search" in item ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: item.path,
							search: item.search,
							onClick: () => setOpen(false),
							className: "border-b border-border py-3 text-sm font-semibold uppercase tracking-wide text-foreground hover:text-primary",
							children: item.label
						}, item.label) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: item.path,
							onClick: () => setOpen(false),
							className: "border-b border-border py-3 text-sm font-semibold uppercase tracking-wide text-foreground hover:text-primary",
							children: item.label
						}, item.label))]
					})]
				})
			]
		})]
	});
}
var defaultCatalogSearch = {
	q: "",
	cat: "",
	size: "",
	sort: "recentes",
	min: 0,
	max: 0,
	page: 1
};
var COLUMNS = [{
	title: "Institucional",
	links: [
		{
			label: "Quem somos",
			path: "/quem-somos"
		},
		{
			label: "Produtos",
			path: "/produtos",
			search: defaultCatalogSearch
		},
		{
			label: "Contato",
			path: "/contato"
		}
	]
}, {
	title: "Ajuda",
	links: [{
		label: "Como comprar",
		path: "/como-comprar"
	}, {
		label: "Trocas e devoluções",
		path: "/troca-e-devolucoes"
	}]
}];
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "bg-foreground text-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					search: defaultCatalogSearch,
					className: "font-display text-3xl uppercase",
					children: ["North", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-primary",
						children: "."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-xs text-sm text-background/70",
					children: "Fornecedor de camisas de time versão tailandesa 1.1 a pronta entrega. Atacado e varejo, direto do Brasil."
				})] }),
				COLUMNS.map((col) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-xs font-bold uppercase tracking-widest text-primary",
					children: col.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 space-y-2 text-sm text-background/70",
					children: col.links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "search" in l ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: l.path,
						search: l.search,
						className: "hover:text-background transition-colors",
						children: l.label
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: l.path,
						className: "hover:text-background transition-colors",
						children: l.label
					}) }, l.label))
				})] }, col.title)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-xs font-bold uppercase tracking-widest text-primary",
						children: "Receba as novidades"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "mt-4 flex",
						onSubmit: (e) => e.preventDefault(),
						"aria-label": "Newsletter",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "email",
							required: true,
							placeholder: "Seu e-mail",
							"aria-label": "Seu e-mail",
							className: "w-full border border-background/30 bg-transparent px-3 py-2.5 text-sm text-background outline-none placeholder:text-background/50 focus:border-primary"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "bg-primary px-4 text-xs font-bold uppercase tracking-widest text-primary-foreground hover:opacity-90",
							children: "Ok"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 text-sm text-background/70",
						children: [
							"WhatsApp: ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "text-background",
								children: "+55 11 96697-3200"
							}),
							" (Seg. a Sáb., 9h às 18h)"
						]
					})
				] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border-t border-background/15 py-5 text-center text-xs text-background/60",
			children: [
				"© ",
				(/* @__PURE__ */ new Date()).getFullYear(),
				" North — Camisas tailandesas 1.1. Todos os direitos reservados."
			]
		})]
	});
}
var jersey_1_default = "/assets/jersey-1-B-SIT8kT.webp";
var jersey_2_default = "/assets/jersey-2-BjkJe3WX.webp";
var jersey_3_default = "/assets/jersey-3-DZZmRBVP.webp";
var jersey_4_default = "/assets/jersey-4-ClRGDuQF.webp";
var jersey_5_default = "/assets/jersey-5-Fcn2Lt2k.webp";
var jersey_6_default = "/assets/jersey-6-Dm7Iltl7.webp";
var SIZES = [
	"P",
	"M",
	"G",
	"GG",
	"2XL",
	"3GG"
];
var brasileirao = [
	{
		id: "verde-i",
		name: "Camisa Listrada Verde I 2025/26 Torcedor Masculina",
		price: 75,
		oldPrice: 129,
		image: jersey_1_default,
		stock: 12,
		sizes: SIZES,
		badge: "Pronta entrega"
	},
	{
		id: "preto-branco-i",
		name: "Camisa Listrada Preto e Branco I 2025/26 Torcedor",
		price: 75,
		oldPrice: 129,
		image: jersey_2_default,
		stock: 4,
		sizes: SIZES
	},
	{
		id: "azul-i",
		name: "Camisa Azul Royal I 2025/26 Torcedor Masculina",
		price: 75,
		image: jersey_3_default,
		stock: 9,
		sizes: SIZES
	},
	{
		id: "vermelho-i",
		name: "Camisa Vermelha e Preta I 2025/26 Torcedor Masculina",
		price: 75,
		oldPrice: 139,
		image: jersey_4_default,
		stock: 2,
		sizes: SIZES,
		badge: "Últimas peças"
	}
];
var internacionais = [
	{
		id: "branca-ii",
		name: "Camisa Branca Ouro II 2025/26 Torcedor Masculina",
		price: 79,
		image: jersey_5_default,
		stock: 15,
		sizes: SIZES
	},
	{
		id: "amarela-i",
		name: "Camisa Amarela Seleção I 2025/26 Torcedor Masculina",
		price: 89,
		oldPrice: 149,
		image: jersey_6_default,
		stock: 7,
		sizes: SIZES,
		badge: "Mais vendida"
	},
	{
		id: "azul-ii",
		name: "Camisa Azul Treino 2025/26 Torcedor Masculina",
		price: 69,
		image: jersey_3_default,
		stock: 21,
		sizes: SIZES
	},
	{
		id: "verde-ii",
		name: "Camisa Listrada Verde II 2025/26 Torcedor Masculina",
		price: 75,
		image: jersey_1_default,
		stock: 5,
		sizes: SIZES
	}
];
var formatBRL = (value) => value.toLocaleString("pt-BR", {
	style: "currency",
	currency: "BRL"
});
//#endregion
export { internacionais as a, formatBRL as i, SiteHeader as n, useGuestAccount as o, brasileirao as r, SiteFooter as t };
