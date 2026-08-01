import { useEffect, useRef, useState } from "react";

type MpInstance = {
  createCardToken: (data: Record<string, string>) => Promise<{ id: string }>;
  getPaymentMethods: (data: { bin: string }) => Promise<{
    results: { id: string; payment_type_id: string }[];
  }>;
};

declare global {
  interface Window {
    MercadoPago?: new (
      publicKey: string,
      options?: { locale?: string },
    ) => MpInstance;
  }
}

const SDK_URL = "https://sdk.mercadopago.com/js/v2";

/** Carrega o SDK MP.js e devolve a instância pronta para tokenizar cartões. */
export function useMercadoPagoSdk(publicKey: string | undefined) {
  const [mp, setMp] = useState<MpInstance | null>(null);
  const [error, setError] = useState<string | null>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!publicKey || started.current) return;
    started.current = true;

    const init = () => {
      if (!window.MercadoPago) {
        setError("Não foi possível carregar o SDK do Mercado Pago.");
        return;
      }
      setMp(new window.MercadoPago(publicKey, { locale: "pt-BR" }));
    };

    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${SDK_URL}"]`,
    );
    if (existing) {
      if (window.MercadoPago) init();
      else existing.addEventListener("load", init, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = SDK_URL;
    script.async = true;
    script.onload = init;
    script.onerror = () =>
      setError("Não foi possível carregar o SDK do Mercado Pago.");
    document.body.appendChild(script);
  }, [publicKey]);

  return { mp, error };
}
