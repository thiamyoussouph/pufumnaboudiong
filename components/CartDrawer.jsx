"use client";

import Link from "next/link";
import Flacon from "./Flacon";
import { useCart } from "@/context/CartContext";
import { formatFCFA } from "@/lib/format";

export default function CartDrawer() {
  const { items, open, setOpen, changeQty, removeItem, subtotal } = useCart();

  return (
    <>
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />
      <aside
        className={`fixed top-0 right-0 h-full w-[420px] max-w-[92vw] bg-ink border-l border-line-strong z-[60] flex flex-col transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Panier"
      >
        <div className="flex items-center justify-between px-7 py-6 border-b border-line">
          <h3 className="font-serif font-medium text-[22px]">Votre panier</h3>
          <button onClick={() => setOpen(false)} className="text-ivory-soft hover:text-ivory text-[26px] leading-none" aria-label="Fermer">×</button>
        </div>

        <div className="flex-1 overflow-y-auto px-7 drawer-scroll">
          {items.length === 0 ? (
            <div className="text-center text-ivory-soft py-[70px] text-[15px]">
              <span className="block font-serif italic text-[22px] text-ivory mb-2">Votre panier est vide</span>
              Choisissez un parfum dans la collection.
            </div>
          ) : (
            items.map(({ product: p, qty }) => (
              <div key={p.id} className="flex gap-4 py-5 border-b border-line">
                <Flacon liquid={undefined} imageUrl={p.imageUrl} size="sm" />
                <div className="flex-1">
                  <h4 className="font-serif font-medium text-base mb-0.5">{p.name}</h4>
                  <span className="text-[11px] tracking-[0.14em] uppercase text-rose">{p.family} · 50ml</span>
                  <div className="flex items-center justify-between mt-2.5">
                    <div className="flex items-center gap-3 border border-line-strong rounded-full px-3 py-1">
                      <button onClick={() => changeQty(p.id, -1)} className="text-ivory w-4" aria-label="Réduire">−</button>
                      <span className="text-sm min-w-[14px] text-center">{qty}</span>
                      <button onClick={() => changeQty(p.id, 1)} className="text-ivory w-4" aria-label="Augmenter">+</button>
                    </div>
                    <span className="font-serif text-base">{formatFCFA(p.price * qty)}</span>
                  </div>
                  <button onClick={() => removeItem(p.id)} className="text-ivory-soft hover:text-rose text-xs underline mt-2">Retirer</button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="px-7 py-6 border-t border-line-strong">
          <div className="flex justify-between items-baseline mb-1.5">
            <span className="text-ivory-soft text-sm">Sous-total</span>
            <span className="font-serif text-[26px]">{formatFCFA(subtotal)}</span>
          </div>
          <p className="text-ivory-soft text-[12.5px] mb-4">
            Livraison offerte à Dakar dès 60 000 FCFA · Échantillon offert.
          </p>
          {items.length === 0 ? (
            <button disabled className="w-full bg-gold/40 text-ink py-4 rounded-full font-semibold cursor-not-allowed">
              Passer la commande
            </button>
          ) : (
            <Link
              href="/checkout"
              onClick={() => setOpen(false)}
              className="block text-center w-full bg-gold hover:bg-[#d4b16e] text-ink py-4 rounded-full font-semibold text-[15px] tracking-wide transition"
            >
              Passer la commande
            </Link>
          )}
        </div>
      </aside>
    </>
  );
}
