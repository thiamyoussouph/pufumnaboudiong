import ProductCard from "./ProductCard";
import { getActiveProducts, familyGradient } from "@/lib/queries";

export default async function Collection() {
  const products = await getActiveProducts();

  return (
    <section id="collection" className="max-w-shell mx-auto px-7 pt-10 pb-24">
      <div className="flex items-end justify-between mb-12 gap-5 flex-wrap">
        <div>
          <p className="eyebrow">La collection</p>
          <h2 className="font-serif font-normal text-[clamp(30px,4vw,46px)]">
            {products.length > 1 ? `${products.length} parfums, ${products.length} caractères` : "Notre collection"}
          </h2>
        </div>
        <p className="text-ivory-soft text-[15px] max-w-[340px]">
          Chaque flacon dévoile une pyramide olfactive : notes de tête, de cœur et de fond.
        </p>
      </div>

      {products.length === 0 ? (
        <p className="text-ivory-soft">Aucun parfum pour le moment. Ajoutez-en depuis l'espace boutique.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} liquid={familyGradient(p.family)} />
          ))}
        </div>
      )}
    </section>
  );
}
