import Link from "next/link";
import { getAllProducts } from "@/lib/queries";
import AdminProductRow from "@/components/AdminProductRow";

export const dynamic = "force-dynamic";

export default async function AdminHome() {
  const products = await getAllProducts();

  return (
    <div>
      <div className="flex items-end justify-between mb-8 gap-4 flex-wrap">
        <div>
          <p className="eyebrow">Catalogue</p>
          <h1 className="font-serif font-light text-[clamp(28px,4vw,40px)]">Vos parfums</h1>
          <p className="text-ivory-soft text-sm mt-1">{products.length} parfum(s) au total</p>
        </div>
        <Link href="/admin/new"
          className="bg-gold hover:bg-[#d4b16e] text-ink px-6 py-3 rounded-full font-semibold transition">
          + Ajouter un parfum
        </Link>
      </div>

      <div className="bg-surface/40 border border-line rounded-[16px] px-6">
        {products.length === 0 ? (
          <div className="py-16 text-center text-ivory-soft">
            <p className="font-serif italic text-xl text-ivory mb-2">Aucun parfum</p>
            Commencez par ajouter votre premier parfum.
          </div>
        ) : (
          products.map((p) => <AdminProductRow key={p.id} product={p} />)
        )}
      </div>
    </div>
  );
}
