import Link from "next/link";
import { notFound } from "next/navigation";
import ProductForm from "@/components/ProductForm";
import { updateProduct } from "@/app/admin/actions";
import { getProductById } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function EditProductPage({ params }) {
  const product = await getProductById(params.id);
  if (!product) notFound();

  // Lie l'id à l'action serveur
  const action = updateProduct.bind(null, product.id);

  return (
    <div className="max-w-4xl">
      <Link href="/admin" className="text-ivory-soft hover:text-ivory text-sm mb-6 inline-block">← Retour au catalogue</Link>
      <h1 className="font-serif font-light text-[clamp(26px,4vw,38px)] mb-8">Modifier « {product.name} »</h1>
      <ProductForm action={action} product={product} />
    </div>
  );
}
