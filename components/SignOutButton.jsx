"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="text-ivory-soft hover:text-ivory text-sm border border-line-strong hover:border-ivory px-4 py-2 rounded-full transition"
    >
      Déconnexion
    </button>
  );
}
