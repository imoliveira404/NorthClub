import { useCallback, useEffect, useState } from "react";
import icon1 from "@/assets/avatars/icon1.webp";
import icon2 from "@/assets/avatars/icon2.webp";
import icon3 from "@/assets/avatars/icon3.webp";

const KEY = "futz.guest.email";
const KEY_AVATAR = "futz.guest.avatar";
const EVENT = "futz-guest-change";

export const AVATARS = [icon1, icon2, icon3];

export function getAvatarImage(index: number): string {
  const i = Math.max(0, Math.min(2, (index || 1) - 1));
  return AVATARS[i] ?? icon1;
}

function read(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(KEY);
}

function readAvatar(): number {
  if (typeof window === "undefined") return 1;
  const stored = window.localStorage.getItem(KEY_AVATAR);
  return stored ? Number(stored) || 1 : 1;
}

/**
 * "Conta leve" do cliente: guarda o e-mail e o índice da foto de perfil no navegador.
 */
export function useGuestAccount() {
  const [email, setEmail] = useState<string | null>(null);
  const [avatarIndex, setAvatarIndex] = useState<number>(1);

  useEffect(() => {
    setEmail(read());
    setAvatarIndex(readAvatar());
    const sync = () => {
      setEmail(read());
      setAvatarIndex(readAvatar());
    };
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
    // Sortear aleatoriamente 1 de 3 fotos a cada novo login
    const randomAvatar = Math.floor(Math.random() * 3) + 1;
    window.localStorage.setItem(KEY_AVATAR, String(randomAvatar));
    window.dispatchEvent(new Event(EVENT));
  }, []);

  const signOut = useCallback(() => {
    window.localStorage.removeItem(KEY);
    window.localStorage.removeItem(KEY_AVATAR);
    window.dispatchEvent(new Event(EVENT));
  }, []);

  return { email, avatarIndex, signIn, signOut };
}
