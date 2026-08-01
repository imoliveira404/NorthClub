import { useCallback, useEffect, useState } from "react";

const KEY = "futz.guest.email";
const EVENT = "futz-guest-change";

function read(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(KEY);
}

/**
 * "Conta leve" do cliente: guarda apenas o e-mail no navegador.
 * Não há persistência em banco — serve para identificar o comprador no checkout.
 */
export function useGuestAccount() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    setEmail(read());
    const sync = () => setEmail(read());
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const signIn = useCallback((value: string) => {
    const clean = value.trim().toLowerCase();
    if (!clean) return;
    window.localStorage.setItem(KEY, clean);
    window.dispatchEvent(new Event(EVENT));
  }, []);

  const signOut = useCallback(() => {
    window.localStorage.removeItem(KEY);
    window.dispatchEvent(new Event(EVENT));
  }, []);

  return { email, signIn, signOut };
}
