"use client";

import { useCart } from "@/context/CartContext";

export default function Header() {
  const { count, setOpen } = useCart();
  return (
    <header className="sticky top-0 z-40 bg-ink/80 backdrop-blur-md border-b border-line">
      <div className="max-w-shell mx-auto px-7 flex items-center justify-between h-[74px]">
        <a href="#" className="font-serif text-2xl tracking-[0.22em] font-medium">
          SIL<span className="text-gold">·</span>LAGE
        </a>
        <nav className="hidden md:flex gap-9 text-sm tracking-wide text-ivory-soft">
          <a href="#collection" className="hover:text-ivory transition">Collection</a>
          <a href="#maison" className="hover:text-ivory transition">Notre Maison</a>
          <a href="#collection" className="hover:text-ivory transition">Nouveautés</a>
          <a href="#footer" className="hover:text-ivory transition">Contact</a>
        </nav>
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2.5 border border-line-strong hover:border-gold hover:bg-gold/10 text-ivory px-4 py-2.5 rounded-full text-[13px] tracking-wide transition"
          aria-label="Ouvrir le panier"
        >
          Panier
          <span className="bg-gold text-ink min-w-5 h-5 rounded-full text-[11px] font-semibold inline-flex items-center justify-center px-1.5">
            {count}
          </span>
        </button>
      </div>
    </header>
  );
}
