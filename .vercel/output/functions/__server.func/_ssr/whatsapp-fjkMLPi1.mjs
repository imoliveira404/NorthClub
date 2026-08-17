import { i as formatBRL } from "./products-DoTCJ6Ja.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/whatsapp-fjkMLPi1.js
var WHATSAPP_NUMBER = "5511966973200";
var WHATSAPP_DISPLAY = "+55 11 96697-3200";
function whatsappLink(message) {
	return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
function cartWhatsappMessage(items, total, email) {
	return [
		"Olá! Quero finalizar esse pedido na North:",
		"",
		...items.map((i, index) => `${index + 1}) ${i.name}\n   Ref.: ${i.id}\n   Tamanho: ${i.size}\n   Qtd: ${i.quantity}\n   Valor un.: ${formatBRL(i.price)}\n   Subtotal: ${formatBRL(i.price * i.quantity)}`),
		"",
		`Total: ${formatBRL(total)}`,
		email ? `E-mail: ${email}` : ""
	].filter(Boolean).join("\n");
}
//#endregion
export { cartWhatsappMessage as n, whatsappLink as r, WHATSAPP_DISPLAY as t };
