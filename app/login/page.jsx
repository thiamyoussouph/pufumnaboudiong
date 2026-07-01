"use client";

import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    if (res?.error) setError("Email ou mot de passe incorrect.");
    else router.push(callbackUrl);
  };

  return (
    <form onSubmit={onSubmit} className="bg-surface border border-line rounded-[18px] p-8">
      <h1 className="font-serif text-2xl mb-6">Connexion</h1>

      {error && (
        <div className="mb-5 text-sm text-rose border border-rose/40 bg-rose/10 rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      <div className="mb-5">
        <label className="block text-xs tracking-[0.1em] uppercase text-ivory-soft mb-2">Email</label>
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@sillage.sn"
          className="w-full bg-ink border border-line-strong focus:border-gold outline-none text-ivory px-4 py-3 rounded-[10px]" />
      </div>
      <div className="mb-7">
        <label className="block text-xs tracking-[0.1em] uppercase text-ivory-soft mb-2">Mot de passe</label>
        <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full bg-ink border border-line-strong focus:border-gold outline-none text-ivory px-4 py-3 rounded-[10px]" />
      </div>

      <button type="submit" disabled={loading}
        className="w-full bg-gold hover:bg-[#d4b16e] disabled:opacity-50 text-ink py-3.5 rounded-full font-semibold transition">
        {loading ? "Connexion…" : "Se connecter"}
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/" className="font-serif text-2xl tracking-[0.22em] font-medium">
            SIL<span className="text-gold">·</span>LAGE
          </Link>
          <p className="text-ivory-soft text-sm mt-3">Espace boutique</p>
        </div>
        <Suspense fallback={<div className="text-ivory-soft text-center">Chargement…</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
