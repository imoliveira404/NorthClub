import { useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { Loader2, LogIn } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { Toaster } from "@/components/ui/sonner";
import { SiteHeader } from "@/components/store/SiteHeader";
import { SiteFooter } from "@/components/store/SiteFooter";
import { supabase } from "@/integrations/supabase/client";

const searchSchema = z.object({
  redirect: z.string().optional(),
});

export const Route = createFileRoute("/auth")({
  validateSearch: (search) => searchSchema.parse(search),
  head: () => ({
    meta: [
      { title: "Entrar ou criar conta | Futz" },
      {
        name: "description",
        content:
          "Acesse sua conta Futz com e-mail e senha para finalizar a compra mais rápido e acompanhar seus pedidos.",
      },
      { property: "og:title", content: "Entrar ou criar conta | Futz" },
      {
        property: "og:description",
        content: "Login por e-mail para comprar camisas com mais agilidade na Futz.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuthPage,
});

const inputClass =
  "w-full border border-border bg-card px-3 py-3 text-sm text-foreground outline-none focus:border-primary";

function AuthPage() {
  const { redirect } = Route.useSearch();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const safeRedirect =
    redirect && redirect.startsWith("/") && !redirect.startsWith("//")
      ? redirect
      : "/";

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!email.includes("@")) {
      toast.error("Informe um e-mail válido.");
      return;
    }
    if (password.length < 8) {
      toast.error("A senha precisa ter pelo menos 8 caracteres.");
      return;
    }
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        toast.success("Conta criada! Você já está logado.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (error) throw error;
        toast.success("Bem-vindo de volta!");
      }
      navigate({ to: safeRedirect, replace: true });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Não foi possível entrar.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto flex max-w-md flex-col px-4 py-16">
        <h1 className="font-display text-4xl uppercase tracking-tight text-foreground">
          {mode === "login" ? "Entrar" : "Criar conta"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Use seu e-mail e senha. Assim seus dados ficam salvos e a compra fica
          mais rápida.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <label className="block">
            <span className="mb-1 block text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
              E-mail
            </span>
            <input
              className={inputClass}
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
              Senha
            </span>
            <input
              className={inputClass}
              type="password"
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 bg-foreground py-4 text-xs font-bold uppercase tracking-[0.2em] text-background transition-colors hover:bg-primary hover:text-primary-foreground disabled:opacity-60"
          >
            {loading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <LogIn className="size-4" />
            )}
            {mode === "login" ? "Entrar" : "Criar conta"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          className="mt-6 text-xs font-bold uppercase tracking-widest text-primary"
        >
          {mode === "login"
            ? "Não tenho conta — criar agora"
            : "Já tenho conta — entrar"}
        </button>

        <Link
          to="/"
          className="mt-4 text-xs uppercase tracking-widest text-muted-foreground"
        >
          Voltar para a loja
        </Link>
      </main>

      <SiteFooter />
      <Toaster />
    </div>
  );
}
