"use client";

import Flacon from "./Flacon";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product, liquid }) {
  const { addToCart } = useCart();

  const rows = [
    ["Tête", product.noteTop],
    ["Cœur", product.noteHeart],
    ["Fond", product.noteBase],
  ].filter(([, v]) => v);

  return (
    <article className="group bg-surface hover:bg-surface-2 border border-line hover:border-line-strong rounded-[18px] p-7 pt-8 flex flex-col transition hover:-translate-y-1">
      <Flacon name={product.name} liquid={liquid} imageUrl={product.imageUrl} />

      <p className="text-[11px] tracking-[0.24em] uppercase text-rose mb-2">{product.family}</p>
      <h3 className="font-serif font-medium text-2xl mb-3.5">{product.name}</h3>

      {rows.length > 0 && (
        <div className="border-t border-line mb-4">
          {rows.map(([tier, val]) => (
            <div key={tier} className="flex gap-3 py-2.5 border-b border-line text-[12.5px]">
              <span className="text-gold tracking-wide min-w-[46px] font-medium">{tier}</span>
              <span className="text-ivory-soft">{val}</span>
            </div>
          ))}
        </div>
      )}

      {product.description && rows.length === 0 && (
        <p className="text-ivory-soft text-sm mb-4 line-clamp-3">{product.description}</p>
      )}

      <div className="flex items-center justify-between mt-auto pt-1.5">
        <span className="font-serif text-xl">
          {product.price.toLocaleString("fr-FR")}
          <span className="text-xs text-ivory-soft font-sans"> FCFA · 50ml</span>
        </span>
        <button
          onClick={() => addToCart(product)}
          className="border border-line-strong hover:bg-gold hover:border-gold hover:text-ink text-ivory px-5 py-2.5 rounded-full text-[13px] tracking-wide transition"
        >
          Ajouter
        </button>
      </div>
    </article>
  );
}
