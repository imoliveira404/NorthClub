import { f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/produtos-BLBAKmlh.js
var $$splitComponentImporter = () => import("./produtos-AkfnUFJk.mjs");
var Route = createFileRoute("/produtos")({
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
		{ title: "Catálogo de Camisas 1.1 | North Football Club" },
		{
			name: "description",
			content: "Explore nosso catálogo completo de camisas de time versão tailandesa 1.1 a pronta entrega. Times brasileiros, europeus, seleções e retrôs."
		},
		{
			property: "og:site_name",
			content: "North Football Club"
		},
		{
			property: "og:title",
			content: "Catálogo de Camisas 1.1 | North Football Club"
		},
		{
			property: "og:description",
			content: "Catálogo completo de camisas de futebol versão tailandesa 1.1 a pronta entrega. Atacado e varejo com envio rápido para todo o Brasil."
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
			content: "Catálogo de Camisas 1.1 | North Football Club"
		},
		{
			name: "twitter:image",
			content: "/assets/hero-stadium.webp"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
