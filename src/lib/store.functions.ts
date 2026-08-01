import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type StoreProduct = {
  id: string;
  name: string;
  price: number;
  oldPrice: number | null;
  image: string;
  stock: number;
  sizes: string[];
  badge: string | null;
  category: string;
  description: string;
};

/** Catálogo público (produtos ativos) — seguro para SSR, sem sessão. */
export const listStoreProducts = createServerFn({ method: "GET" }).handler(
  async (): Promise<StoreProduct[]> => {
    const { createClient } = await import("@supabase/supabase-js");
    const url = process.env["SUPABASE_URL"];
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
    if (!url || !key) return [];

    const client = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (input, init) => {
          const headers = new Headers(init?.headers);
          if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) {
            headers.delete("Authorization");
          }
          headers.set("apikey", key);
          return fetch(input, { ...init, headers });
        },
      },
    });

    const { data, error } = await client
      .from("products")
      .select(
        "id, name, price, old_price, image_url, stock, sizes, badge, category, description",
      )
      .eq("active", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[store] listStoreProducts", error.message);
      return [];
    }

    return (data ?? []).map((row) => ({
      id: row.id as string,
      name: row.name as string,
      price: Number(row.price),
      oldPrice: row.old_price === null ? null : Number(row.old_price),
      image: (row.image_url as string) ?? "",
      stock: Number(row.stock ?? 0),
      sizes: (row.sizes as string[]) ?? [],
      badge: (row.badge as string | null) ?? null,
      category: (row.category as string) ?? "Brasileirão",
      description: (row.description as string) ?? "",
    }));
  },
);

/** Concede o papel de admin ao e-mail configurado como administrador da loja. */
export const claimAdminRole = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const adminEmail = process.env["ADMIN_EMAIL"]?.toLowerCase().trim();
    const email = String(context.claims["email"] ?? "").toLowerCase().trim();
    if (!adminEmail || !email || email !== adminEmail) {
      return { granted: false };
    }
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("user_roles")
      .upsert(
        { user_id: context.userId, role: "admin" },
        { onConflict: "user_id,role" },
      );
    if (error) {
      console.error("[store] claimAdminRole", error.message);
      return { granted: false };
    }
    return { granted: true };
  });

/** Vincula um pedido recém-criado ao cliente logado. */
export const attachOrderToMe = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z.object({ mpOrderId: z.string().min(3).max(64) }).parse(data),
  )
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("orders")
      .update({ user_id: context.userId })
      .eq("mp_order_id", data.mpOrderId)
      .is("user_id", null);
    if (error) console.error("[store] attachOrderToMe", error.message);
    return { ok: !error };
  });
