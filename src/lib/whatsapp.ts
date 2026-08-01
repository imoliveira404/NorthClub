import type { CartItem } from "@/lib/cart";
import { formatBRL } from "@/lib/products";

export const WHATSAPP_NUMBER = "5511954463903";
export const WHATSAPP_DISPLAY = "(11) 95446-3903";

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function cartWhatsappMessage(
  items: CartItem[],
  total: number,
  email?: string | null,
) {
  const lines = items.map(
    (i, index) =>
      `${index + 1}) ${i.name}\n   Ref.: ${i.id}\n   Tamanho: ${i.size}\n   Qtd: ${i.quantity}\n   Valor un.: ${formatBRL(i.price)}\n   Subtotal: ${formatBRL(i.price * i.quantity)}`,
  );

  return [
    "Olá! Quero finalizar esse pedido na Futz:",
    "",
    ...lines,
    "",
    `Total: ${formatBRL(total)}`,
    email ? `E-mail: ${email}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}
