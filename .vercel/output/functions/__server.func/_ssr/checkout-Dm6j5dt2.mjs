import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Toaster$1 } from "./sonner-DoFKumIW.mjs";
import { n as useCart } from "./cart-2y9krRSi.mjs";
import { T as Lock, a as Trash2, h as Plus, u as ShieldCheck, y as Minus } from "../_libs/lucide-react.mjs";
import { i as formatBRL, n as SiteHeader, o as useGuestAccount, t as SiteFooter } from "./products-DoTCJ6Ja.mjs";
import { n as cartWhatsappMessage, r as whatsappLink, t as WHATSAPP_DISPLAY } from "./whatsapp-fjkMLPi1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout-Dm6j5dt2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Cart() {
	const { items, total, updateQuantity, removeItem, clear } = useCart();
	const { email: guestEmail, signIn } = useGuestAccount();
	const [emailInput, setEmailInput] = (0, import_react.useState)("");
	const [confirmClearOpen, setConfirmClearOpen] = (0, import_react.useState)(false);
	function handleFinish() {
		if (items.length === 0) return;
		const email = (guestEmail ?? emailInput).trim().toLowerCase();
		if (email && !guestEmail) signIn(email);
		const url = whatsappLink(cartWhatsappMessage(items, total, email || null));
		toast.success("Abrindo o WhatsApp com seu pedido...");
		window.open(url, "_blank", "noopener,noreferrer");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-3xl px-4 py-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-4xl uppercase tracking-tight text-foreground",
						children: "Seu carrinho"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 flex items-center gap-2 text-sm text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-4 text-primary" }),
							" Atendimento e pagamento pelo WhatsApp",
							" ",
							WHATSAPP_DISPLAY,
							"."
						]
					})] }), items.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setConfirmClearOpen(true),
						className: "flex items-center gap-1.5 border border-border bg-card px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-muted-foreground transition-colors hover:border-destructive hover:text-destructive",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" }), "Esvaziar sacola"]
					})]
				}), items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 border border-border bg-card p-8 text-center sm:text-left",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Seu carrinho está vazio."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						search: {
							q: "",
							cat: "",
							size: "",
							sort: "recentes",
							min: 0,
							max: 0,
							page: 1
						},
						className: "mt-6 inline-block bg-primary px-6 py-3 text-xs font-bold uppercase tracking-widest text-primary-foreground hover:opacity-90",
						children: "Ver produtos"
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 border border-border bg-card p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "divide-y divide-border",
							children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-4 py-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: item.image,
										alt: item.name,
										loading: "lazy",
										referrerPolicy: "no-referrer",
										width: 80,
										height: 80,
										className: "size-20 shrink-0 object-cover"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm font-semibold text-foreground",
												children: item.name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-[11px] uppercase text-muted-foreground",
												children: ["Tam. ", item.size]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-2 flex items-center gap-2",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														"aria-label": "Diminuir quantidade",
														onClick: () => updateQuantity(item.id, item.size, item.quantity - 1),
														className: "border border-border p-1 hover:border-foreground",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-3" })
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-xs font-bold px-1",
														children: item.quantity
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														"aria-label": "Aumentar quantidade",
														onClick: () => updateQuantity(item.id, item.size, item.quantity + 1),
														className: "border border-border p-1 hover:border-foreground",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3" })
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														"aria-label": "Remover item",
														onClick: () => removeItem(item.id, item.size),
														className: "ml-4 text-muted-foreground hover:text-destructive",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
													})
												]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-bold text-foreground",
										children: formatBRL(item.price * item.quantity)
									})
								]
							}, `${item.id}-${item.size}`))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex items-center justify-between border-t border-border pt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-bold uppercase tracking-widest text-muted-foreground",
								children: "Total"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-2xl text-foreground",
								children: formatBRL(total)
							})]
						}),
						guestEmail ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 text-xs text-muted-foreground",
							children: ["Pedido no e-mail ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: guestEmail })]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "mt-6 block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-1 block text-[11px] font-bold uppercase tracking-widest text-muted-foreground",
								children: "Seu e-mail"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "email",
								placeholder: "seu@email.com",
								value: emailInput,
								onChange: (e) => setEmailInput(e.target.value),
								className: "w-full border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: handleFinish,
							className: "mt-6 flex w-full items-center justify-center gap-2 bg-[#25D366] py-4 text-xs font-bold uppercase tracking-[0.2em] text-black transition-opacity hover:opacity-90",
							children: ["Finalizar compra no WhatsApp — ", formatBRL(total)]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 flex items-start gap-2 text-xs text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "mt-0.5 size-4 shrink-0 text-primary" }),
								"Enviamos seu pedido com as referências, tamanhos e quantidades para o atendimento",
								" ",
								WHATSAPP_DISPLAY,
								", que finaliza o pagamento e o frete com você."
							]
						})
					]
				})]
			}),
			confirmClearOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-md border-2 border-foreground bg-card p-6 shadow-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-lg uppercase tracking-tight text-foreground text-center",
							children: "Tem certeza que deseja esvaziar a sacola?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-center text-xs text-muted-foreground",
							children: "Esta ação removerá todas as camisas do seu carrinho."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex items-center justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setConfirmClearOpen(false),
								className: "flex-1 bg-[#ec4899] py-3 text-xs font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90",
								children: "Não"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									clear();
									setConfirmClearOpen(false);
									toast.info("Sacola esvaziada");
								},
								className: "flex-1 border border-border bg-foreground py-3 text-xs font-bold uppercase tracking-widest text-background transition-colors hover:bg-primary hover:text-primary-foreground",
								children: "Sim"
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {})
		]
	});
}
//#endregion
export { Cart as component };
