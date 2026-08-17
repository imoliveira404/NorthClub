import { n as require_jsx_runtime, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useRouter, c as HeadContent, d as Outlet, f as lazyRouteComponent, h as Link, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as CartProvider } from "./cart-2y9krRSi.mjs";
import { t as Route$8 } from "./produtos-BLBAKmlh.mjs";
import { t as Route$9 } from "./routes-BYR1iT45.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { i as unionType, n as objectType, r as stringType, t as numberType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BSAefp24.js
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-DXYtz956.css";
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						search: {
							q: "",
							cat: "",
							size: "",
							sort: "recentes",
							min: 0,
							max: 0
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$7 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "North | Camisas de Time Tailandesas 1.1 a Pronta Entrega" },
			{
				name: "description",
				content: "Camisas de time versão tailandesa 1.1 a pronta entrega, atacado e varejo direto do Brasil. Envio rápido para todo o país."
			},
			{
				name: "theme-color",
				content: "#ec4899"
			},
			{
				property: "og:site_name",
				content: "North Football Club"
			},
			{
				property: "og:title",
				content: "North | Camisas de Time Tailandesas 1.1 a Pronta Entrega"
			},
			{
				property: "og:description",
				content: "Camisas de futebol versão tailandesa 1.1 a pronta entrega. Atacado e varejo com envio rápido para todo o Brasil."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:locale",
				content: "pt_BR"
			},
			{
				property: "og:image",
				content: "/assets/hero-stadium.webp"
			},
			{
				property: "og:image:type",
				content: "image/webp"
			},
			{
				property: "og:image:width",
				content: "1200"
			},
			{
				property: "og:image:height",
				content: "630"
			},
			{
				property: "og:image:alt",
				content: "North Football Club — Camisas de Time Tailandesas 1.1"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:title",
				content: "North | Camisas de Time Tailandesas 1.1"
			},
			{
				name: "twitter:description",
				content: "Camisas de futebol versão tailandesa 1.1 a pronta entrega. Envio para todo o Brasil."
			},
			{
				name: "twitter:image",
				content: "/assets/hero-stadium.webp"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Anton&family=Barlow:wght@400;500;600;700&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.svg",
				type: "image/svg+xml"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "pt-BR",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$7.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) })
	});
}
var $$splitComponentImporter$5 = () => import("./admin-BAV6uHPT.mjs");
var Route$6 = createFileRoute("/admin")({
	head: () => ({ meta: [
		{ title: "Painel de produtos | North" },
		{
			name: "description",
			content: "Cadastre camisas com imagem, nome, preço, tamanhos, estoque e descrição no painel interno da North."
		},
		{
			property: "og:title",
			content: "Painel de produtos | North"
		},
		{
			property: "og:description",
			content: "Área interna para cadastro e edição do catálogo de camisas."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		},
		{
			name: "robots",
			content: "noindex, nofollow"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./checkout-Dm6j5dt2.mjs");
var Route$5 = createFileRoute("/checkout")({
	head: () => ({ meta: [
		{ title: "Carrinho | North — Finalize no WhatsApp" },
		{
			name: "description",
			content: "Revise as camisas do seu carrinho e finalize o pedido direto com nosso atendimento no WhatsApp."
		},
		{
			property: "og:site_name",
			content: "North Football Club"
		},
		{
			property: "og:title",
			content: "Carrinho | North Football Club"
		},
		{
			property: "og:description",
			content: "Revise seu carrinho e finalize o pedido com nosso atendimento no WhatsApp."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			property: "og:image",
			content: "/assets/hero-stadium.webp"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		},
		{
			name: "twitter:title",
			content: "Carrinho | North Football Club"
		},
		{
			name: "twitter:image",
			content: "/assets/hero-stadium.webp"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./como-comprar-Z-u33yN6.mjs");
var Route$4 = createFileRoute("/como-comprar")({
	head: () => ({ meta: [
		{ title: "Como Comprar | North Football Club" },
		{
			name: "description",
			content: "Guia passo a passo de como comprar camisas de futebol tailandesas 1.1 na North. Compra fácil, segura e com envio imediato."
		},
		{
			property: "og:site_name",
			content: "North Football Club"
		},
		{
			property: "og:title",
			content: "Como Comprar | North Football Club"
		},
		{
			property: "og:description",
			content: "Guia passo a passo de como comprar camisas de futebol tailandesas 1.1 na North. Compra fácil e segura."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			property: "og:image",
			content: "/assets/hero-stadium.webp"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		},
		{
			name: "twitter:title",
			content: "Como Comprar | North Football Club"
		},
		{
			name: "twitter:image",
			content: "/assets/hero-stadium.webp"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./contato-c4wILlmV.mjs");
var Route$3 = createFileRoute("/contato")({
	head: () => ({ meta: [
		{ title: "Fale Conosco | North Football Club" },
		{
			name: "description",
			content: "Entre em contato com a equipe North. Atendimento via WhatsApp, e-mail e formulário de mensagem."
		},
		{
			property: "og:site_name",
			content: "North Football Club"
		},
		{
			property: "og:title",
			content: "Fale Conosco | North Football Club"
		},
		{
			property: "og:description",
			content: "Entre em contato com a equipe North. Atendimento rápido via WhatsApp, e-mail e formulário."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			property: "og:image",
			content: "/assets/hero-stadium.webp"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		},
		{
			name: "twitter:title",
			content: "Fale Conosco | North Football Club"
		},
		{
			name: "twitter:image",
			content: "/assets/hero-stadium.webp"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./quem-somos-B4_FLNy2.mjs");
var Route$2 = createFileRoute("/quem-somos")({
	head: () => ({ meta: [
		{ title: "Quem Somos | North Football Club" },
		{
			name: "description",
			content: "Conheça a história da North, o seu fornecedor especialista em camisas de futebol versão tailandesa 1.1 a pronta entrega no Brasil."
		},
		{
			property: "og:site_name",
			content: "North Football Club"
		},
		{
			property: "og:title",
			content: "Quem Somos | North Football Club"
		},
		{
			property: "og:description",
			content: "Conheça a história da North, especialista em camisas de futebol versão tailandesa 1.1 a pronta entrega no Brasil."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			property: "og:image",
			content: "/assets/hero-stadium.webp"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		},
		{
			name: "twitter:title",
			content: "Quem Somos | North Football Club"
		},
		{
			name: "twitter:image",
			content: "/assets/hero-stadium.webp"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./troca-e-devolucoes-DIjT9u6c.mjs");
var Route$1 = createFileRoute("/troca-e-devolucoes")({
	head: () => ({ meta: [
		{ title: "Trocas e Devoluções | North Football Club" },
		{
			name: "description",
			content: "Política de trocas e devoluções da North. Garantia de 7 dias para devoluções e suporte rápido para trocas de tamanho ou defeito."
		},
		{
			property: "og:site_name",
			content: "North Football Club"
		},
		{
			property: "og:title",
			content: "Trocas e Devoluções | North Football Club"
		},
		{
			property: "og:description",
			content: "Política de trocas e devoluções da North. Garantia de 7 dias e suporte rápido para trocas."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			property: "og:image",
			content: "/assets/hero-stadium.webp"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		},
		{
			name: "twitter:title",
			content: "Trocas e Devoluções | North Football Club"
		},
		{
			name: "twitter:image",
			content: "/assets/hero-stadium.webp"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
/**
* Webhook de notificações do Mercado Pago.
* Configure esta URL em: Suas integrações > Webhooks.
* O prefixo /api/public/ é liberado da autenticação do site publicado,
* por isso a validação da assinatura acontece aqui dentro.
*/
var Route = createFileRoute("/api/public/mercadopago-webhook")({ server: { handlers: { POST: async ({ request }) => {
	const secret = process.env["MERCADOPAGO_WEBHOOK_SECRET"];
	const raw = await request.text();
	if (secret) {
		const signature = request.headers.get("x-signature") ?? "";
		const requestId = request.headers.get("x-request-id") ?? "";
		const dataId = new URL(request.url).searchParams.get("data.id") ?? "";
		const parts = Object.fromEntries(signature.split(",").map((p) => p.split("=").map((s) => s.trim())).filter((p) => p.length === 2));
		const manifest = `id:${dataId};request-id:${requestId};ts:${parts["ts"] ?? ""};`;
		const { createHmac, timingSafeEqual } = await import("crypto");
		const expected = createHmac("sha256", secret).update(manifest).digest("hex");
		const received = parts["v1"] ?? "";
		if (!(received.length === expected.length && timingSafeEqual(Buffer.from(received), Buffer.from(expected)))) {
			console.error("Webhook Mercado Pago: assinatura inválida");
			return new Response("Invalid signature", { status: 401 });
		}
	}
	const parsed = objectType({
		action: stringType().optional(),
		type: stringType().optional(),
		data: objectType({ id: unionType([stringType(), numberType()]) }).optional()
	}).safeParse(JSON.parse(raw || "{}"));
	if (!parsed.success) return new Response("Invalid payload", { status: 400 });
	console.log("Webhook Mercado Pago recebido:", {
		type: parsed.data.type,
		action: parsed.data.action,
		id: parsed.data.data?.id
	});
	return new Response("ok", { status: 200 });
} } } });
var rootRouteChildren = {
	IndexRoute: Route$9.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$7
	}),
	AdminRoute: Route$6.update({
		id: "/admin",
		path: "/admin",
		getParentRoute: () => Route$7
	}),
	CheckoutRoute: Route$5.update({
		id: "/checkout",
		path: "/checkout",
		getParentRoute: () => Route$7
	}),
	ComoComprarRoute: Route$4.update({
		id: "/como-comprar",
		path: "/como-comprar",
		getParentRoute: () => Route$7
	}),
	ContatoRoute: Route$3.update({
		id: "/contato",
		path: "/contato",
		getParentRoute: () => Route$7
	}),
	ProdutosRoute: Route$8.update({
		id: "/produtos",
		path: "/produtos",
		getParentRoute: () => Route$7
	}),
	QuemSomosRoute: Route$2.update({
		id: "/quem-somos",
		path: "/quem-somos",
		getParentRoute: () => Route$7
	}),
	TrocaEDevolucoesRoute: Route$1.update({
		id: "/troca-e-devolucoes",
		path: "/troca-e-devolucoes",
		getParentRoute: () => Route$7
	}),
	ApiPublicMercadopagoWebhookRoute: Route.update({
		id: "/api/public/mercadopago-webhook",
		path: "/api/public/mercadopago-webhook",
		getParentRoute: () => Route$7
	})
};
var routeTree = Route$7._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
