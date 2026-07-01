import Link from "next/link";
import ProductForm from "@/components/ProductForm";
import { createProduct } from "@/app/admin/actions";

export default function NewProductPage() {
  return (
    <div className="max-w-4xl">
      <Link href="/admin" className="text-ivory-soft hover:text-ivory text-sm mb-6 inline-block">← Retour au catalogue</Link>
      <h1 className="font-serif font-light text-[clamp(26px,4vw,38px)] mb-8">Ajouter un parfum</h1>
      <ProductForm action={createProduct} />
    </div>
  );
}
