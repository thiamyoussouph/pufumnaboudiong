"use client";

import Link from "next/link";
import { useTransition } from "react";
import { deleteProduct } from "@/app/admin/actions";
import { formatFCFA } from "@/lib/format";

export default function AdminProductRow({ product }) {
  const [pending, startTransition] = useTransition();

  const onDelete = () => {
    if (!confirm(`Supprimer « ${product.name} » ? Cette action est définitive.`)) return;
    startTransition(() => deleteProduct(product.id));
  };

  return (
    <div className="flex items-center gap-4 py-4 border-b border-line">
      <div className="w-12 h-16 rounded-md border border-line-strong overflow-hidden bg-surface shrink-0">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-ivory-soft text-[10px]">—</div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-serif text-lg truncate">{product.name}</h3>
          {!product.active && (
            <span className="text-[10px] uppercase tracking-wide border border-line-strong text-ivory-soft px-2 py-0.5 rounded-full">Masqué</span>
          )}
        </div>
        <p className="text-ivory-soft text-sm">{product.family}</p>
      </div>
      <div className="font-serif text-lg mr-4 hidden sm:block">{formatFCFA(product.price)}</div>
      <div className="flex items-center gap-2">
        <Link href={`/admin/${product.id}/edit`}
          className="border border-line-strong hover:border-gold text-ivory text-sm px-4 py-2 rounded-full transition">
          Modifier
        </Link>
        <button onClick={onDelete} disabled={pending}
          className="text-ivory-soft hover:text-rose disabled:opacity-50 text-sm px-3 py-2 transition">
          {pending ? "…" : "Supprimer"}
        </button>
      </div>
    </div>
  );
}
