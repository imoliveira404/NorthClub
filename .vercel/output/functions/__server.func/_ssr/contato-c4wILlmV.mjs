import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { A as Clock, C as Mail, S as MapPin, b as MessageSquare, d as Send } from "../_libs/lucide-react.mjs";
import { n as SiteHeader, t as SiteFooter } from "./products-DoTCJ6Ja.mjs";
import { r as whatsappLink, t as WHATSAPP_DISPLAY } from "./whatsapp-fjkMLPi1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contato-c4wILlmV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ContatoPage() {
	const [nome, setNome] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [assunto, setAssunto] = (0, import_react.useState)("");
	const [mensagem, setMensagem] = (0, import_react.useState)("");
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!nome.trim() || !email.trim() || !mensagem.trim()) {
			toast.error("Por favor, preencha todos os campos obrigatórios.");
			return;
		}
		toast.success("Mensagem enviada com sucesso! Responderemos em breve.");
		setNome("");
		setEmail("");
		setAssunto("");
		setMensagem("");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "bg-foreground py-16 text-background",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl px-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-bold uppercase tracking-[0.2em] text-primary",
							children: "Atendimento ao Cliente"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mt-2 font-display text-4xl uppercase tracking-tight sm:text-5xl lg:text-6xl",
							children: ["Fale ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-primary",
								children: "Conosco"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-2xl text-base text-background/80",
							children: "Estamos prontos para atender você! Escolha o canal de sua preferência ou envie uma mensagem diretamente pelo formulário abaixo."
						})
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mx-auto max-w-7xl px-4 py-16",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-12 lg:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-3xl uppercase tracking-tight text-foreground",
								children: "Canais Diretos"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: "Para respostas imediatas sobre pedidos, dúvidas sobre tamanhos ou orçamentos de atacado, prefira nosso WhatsApp."
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border border-border bg-card p-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex size-12 items-center justify-center rounded-none bg-[#25D366] text-black",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "size-6" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-display text-lg uppercase text-foreground",
											children: "WhatsApp Oficial"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs font-bold text-primary mt-0.5",
											children: WHATSAPP_DISPLAY
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground mt-0.5",
											children: "Atendimento rápido e humanizado"
										})
									] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: whatsappLink("Olá! Preciso de atendimento sobre o catálogo ou meu pedido."),
									target: "_blank",
									rel: "noopener noreferrer",
									className: "mt-6 block w-full bg-[#25D366] py-3 text-center text-xs font-bold uppercase tracking-[0.18em] text-black transition-opacity hover:opacity-90",
									children: "Abrir Conversa no WhatsApp"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4 border-t border-border pt-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "mt-0.5 size-5 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											className: "block text-xs font-bold uppercase tracking-wider text-foreground",
											children: "E-mail de Suporte"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm text-muted-foreground",
											children: "contato@northclub.com.br"
										})] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "mt-0.5 size-5 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											className: "block text-xs font-bold uppercase tracking-wider text-foreground",
											children: "Horário de Atendimento"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm text-muted-foreground",
											children: "Segunda a Sábado, das 09h às 18h (Horário de Brasília)"
										})] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "mt-0.5 size-5 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											className: "block text-xs font-bold uppercase tracking-wider text-foreground",
											children: "Logística & Envio"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm text-muted-foreground",
											children: "Estoque no Brasil — Envios via Correios (PAC/SEDEX) e Transportadoras."
										})] })]
									})
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border border-border bg-card p-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl uppercase tracking-tight text-foreground",
								children: "Envie uma Mensagem"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: "Preencha o formulário abaixo que retornaremos em até 24 horas úteis."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: handleSubmit,
								className: "mt-6 space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-[11px] font-bold uppercase tracking-widest text-muted-foreground",
										children: "Nome Completo *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										required: true,
										value: nome,
										onChange: (e) => setNome(e.target.value),
										placeholder: "Seu nome",
										className: "mt-1.5 w-full border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-[11px] font-bold uppercase tracking-widest text-muted-foreground",
										children: "E-mail *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "email",
										required: true,
										value: email,
										onChange: (e) => setEmail(e.target.value),
										placeholder: "seu@email.com",
										className: "mt-1.5 w-full border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-[11px] font-bold uppercase tracking-widest text-muted-foreground",
										children: "Assunto"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: assunto,
										onChange: (e) => setAssunto(e.target.value),
										placeholder: "Ex: Dúvida sobre tamanho / Revenda",
										className: "mt-1.5 w-full border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-[11px] font-bold uppercase tracking-widest text-muted-foreground",
										children: "Mensagem *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										rows: 4,
										required: true,
										value: mensagem,
										onChange: (e) => setMensagem(e.target.value),
										placeholder: "Escreva sua mensagem aqui...",
										className: "mt-1.5 w-full border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "submit",
										className: "flex w-full items-center justify-center gap-2 bg-primary py-4 text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground transition-opacity hover:opacity-90",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-4" }), " Enviar Mensagem"]
									})
								]
							})
						]
					})]
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {})
		]
	});
}
//#endregion
export { ContatoPage as component };
