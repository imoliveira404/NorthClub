import type { CartItem } from "@/lib/cart";
import { formatBRL } from "@/lib/products";

export const WHATSAPP_NUMBER = "5511966973200";
export const WHATSAPP_DISPLAY = "+55 11 96697-3200";

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function cartWhatsappMessage(items: CartItem[], total: number, email?: string | null) {
  const lines = items.map(
    (i, index) =>
      `${index + 1}) ${i.name}\n   Ref.: ${i.id}\n   Tamanho: ${i.size}\n   Qtd: ${i.quantity}\n   Valor un.: ${formatBRL(i.price)}\n   Subtotal: ${formatBRL(i.price * i.quantity)}`,
  );

  return [
    "Olá! Quero finalizar esse pedido na North:",
    "",
    ...lines,
    "",
    `Total: ${formatBRL(total)}`,
    email ? `E-mail: ${email}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}
