import { f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BYR1iT45.js
var $$splitComponentImporter = () => import("./routes-DlB9cmDX.mjs");
var $$splitNotFoundComponentImporter = () => import("./routes-_xwuvD0x.mjs");
var $$splitErrorComponentImporter = () => import("./routes-LiNFlm_7.mjs");
var Route = createFileRoute("/")({
	validateSearch: (search) => ({
		q: typeof search["q"] === "string" ? search["q"].slice(0, 80) : "",
		cat: typeof search["cat"] === "string" ? search["cat"] : "",
		size: typeof search["size"] === "string" ? search["size"] : "",
		sort: typeof search["sort"] === "string" ? search["sort"] : "recentes",
		min: Number(search["min"]) > 0 ? Number(search["min"]) : 0,
		max: Number(search["max"]) > 0 ? Number(search["max"]) : 0,
		page: Number(search["page"]) > 0 ? Math.floor(Number(search["page"])) : 1
	}),
	head: () => ({ meta: [
		{ title: "North | Camisas de Time Tailandesas 1.1 a Pronta Entrega" },
		{
			name: "description",
			content: "Camisas de futebol versão tailandesa 1.1 a pronta entrega. Atacado e varejo, envio para todo o Brasil e até 10% OFF em quantidade."
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
			content: "Fornecedor de camisas tailandesas 1.1 a pronta entrega. Atacado e varejo com envio para todo o Brasil."
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
			property: "og:image:width",
			content: "1200"
		},
		{
			property: "og:image:height",
			content: "630"
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
			name: "twitter:image",
			content: "/assets/hero-stadium.webp"
		}
	] }),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
