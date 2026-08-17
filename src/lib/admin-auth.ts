const AUTH_KEY = "futz-admin-auth";

export const ADMIN_PASSWORD =
  (import.meta.env["VITE_ADMIN_PASSWORD"] as string | undefined) || "futz-admin";

export function isAdminAuthed(): boolean {
  if (typeof window === "undefined") return false;
  return window.sessionStorage.getItem(AUTH_KEY) === "1";
}

export function adminSignIn(password: string): boolean {
  if (typeof window === "undefined") return false;
  if (password !== ADMIN_PASSWORD) return false;
  window.sessionStorage.setItem(AUTH_KEY, "1");
  return true;
}

export function adminSignOut() {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(AUTH_KEY);
}
