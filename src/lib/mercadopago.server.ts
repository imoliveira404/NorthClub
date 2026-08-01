const MP_API = "https://api.mercadopago.com";

function accessToken(): string {
  const token = process.env["MERCADOPAGO_ACCESS_TOKEN"];
  if (!token) {
    throw new Error(
      "MERCADOPAGO_ACCESS_TOKEN não está configurado no ambiente do servidor.",
    );
  }
  return token;
}

export async function mpRequest<T>(
  path: string,
  init: { method: "GET" | "POST" | "PUT"; body?: unknown; idempotencyKey?: string },
): Promise<T> {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${accessToken()}`,
    "Content-Type": "application/json",
  };
  if (init.idempotencyKey) headers["X-Idempotency-Key"] = init.idempotencyKey;

  const response = await fetch(`${MP_API}${path}`, {
    method: init.method,
    headers,
    ...(init.body ? { body: JSON.stringify(init.body) } : {}),
  });


  const text = await response.text();
  if (!response.ok) {
    console.error(`Mercado Pago ${init.method} ${path} [${response.status}]: ${text}`);
    let message = `Mercado Pago retornou ${response.status}`;
    try {
      const parsed = JSON.parse(text) as {
        message?: string;
        errors?: { description?: string; message?: string }[];
      };
      message =
        parsed.errors?.[0]?.description ??
        parsed.errors?.[0]?.message ??
        parsed.message ??
        message;
    } catch {
      /* keep default message */
    }
    throw new Error(message);
  }

  return JSON.parse(text) as T;
}

export type MpOrder = {
  id: string;
  status: string;
  status_detail?: string;
  external_reference?: string;
  transactions?: {
    payments?: {
      id?: string;
      status?: string;
      status_detail?: string;
      payment_method?: {
        id?: string;
        type?: string;
        qr_code?: string;
        qr_code_base64?: string;
        ticket_url?: string;
      };
    }[];
  };
};
