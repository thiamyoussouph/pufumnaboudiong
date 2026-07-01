"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const FAMILIES = ["Boisé", "Floral", "Cuir", "Vert", "Hespéridé", "Oriental"];

export default function ProductForm({ action, product }) {
  const router = useRouter();
  const [preview, setPreview] = useState(product?.imageUrl || null);
  const [saving, setSaving] = useState(false);

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const formData = new FormData(e.currentTarget);
    try {
      await action(formData);
      // action fait redirect() vers /admin
    } catch (err) {
      setSaving(false);
      alert("Une erreur est survenue. Vérifiez les champs et réessayez.");
    }
  };

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-10">
      {/* Colonne champs */}
      <div>
        <div className="mb-5">
          <label className="block text-xs tracking-[0.1em] uppercase text-ivory-soft mb-2">Nom du parfum *</label>
          <input name="name" required defaultValue={product?.name}
            placeholder="Ex : Nuit Vétiver"
            className="w-full bg-surface border border-line-strong focus:border-gold outline-none text-ivory px-4 py-3 rounded-[10px]" />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <label className="block text-xs tracking-[0.1em] uppercase text-ivory-soft mb-2">Famille *</label>
            <select name="family" required defaultValue={product?.family || ""}
              className="w-full bg-surface border border-line-strong focus:border-gold outline-none text-ivory px-4 py-3 rounded-[10px]">
              <option value="" disabled>Choisir…</option>
              {FAMILIES.map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs tracking-[0.1em] uppercase text-ivory-soft mb-2">Prix (FCFA) *</label>
            <input name="price" required type="number" min="0" defaultValue={product?.price}
              placeholder="45000"
              className="w-full bg-surface border border-line-strong focus:border-gold outline-none text-ivory px-4 py-3 rounded-[10px]" />
          </div>
        </div>

        <div className="mb-5">
          <label className="block text-xs tracking-[0.1em] uppercase text-ivory-soft mb-2">Description *</label>
          <textarea name="description" required rows={4} defaultValue={product?.description}
            placeholder="Décrivez le parfum, son caractère, ses accords…"
            className="w-full bg-surface border border-line-strong focus:border-gold outline-none text-ivory px-4 py-3 rounded-[10px] resize-y" />
        </div>

        <p className="text-xs tracking-[0.1em] uppercase text-gold mb-3 mt-8">Pyramide olfactive (optionnel)</p>
        <div className="grid grid-cols-3 gap-4 mb-5">
          <div>
            <label className="block text-xs text-ivory-soft mb-2">Notes de tête</label>
            <input name="noteTop" defaultValue={product?.noteTop || ""}
              placeholder="bergamote, poivre"
              className="w-full bg-surface border border-line-strong focus:border-gold outline-none text-ivory px-3 py-2.5 rounded-[10px] text-sm" />
          </div>
          <div>
            <label className="block text-xs text-ivory-soft mb-2">Notes de cœur</label>
            <input name="noteHeart" defaultValue={product?.noteHeart || ""}
              placeholder="iris, rose"
              className="w-full bg-surface border border-line-strong focus:border-gold outline-none text-ivory px-3 py-2.5 rounded-[10px] text-sm" />
          </div>
          <div>
            <label className="block text-xs text-ivory-soft mb-2">Notes de fond</label>
            <input name="noteBase" defaultValue={product?.noteBase || ""}
              placeholder="cèdre, vanille"
              className="w-full bg-surface border border-line-strong focus:border-gold outline-none text-ivory px-3 py-2.5 rounded-[10px] text-sm" />
          </div>
        </div>

        <label className="flex items-center gap-3 mt-6 cursor-pointer">
          <input type="checkbox" name="active" defaultChecked={product ? product.active : true}
            className="w-4 h-4 accent-[#c6a15b]" />
          <span className="text-sm text-ivory-soft">Visible sur la boutique</span>
        </label>

        <div className="flex gap-4 mt-10">
          <button type="submit" disabled={saving}
            className="bg-gold hover:bg-[#d4b16e] disabled:opacity-50 text-ink px-8 py-3.5 rounded-full font-semibold transition">
            {saving ? "Enregistrement…" : product ? "Enregistrer les modifications" : "Ajouter le parfum"}
          </button>
          <Link href="/admin" className="border border-line-strong hover:border-ivory text-ivory px-8 py-3.5 rounded-full transition">
            Annuler
          </Link>
        </div>
      </div>

      {/* Colonne photo */}
      <div>
        <label className="block text-xs tracking-[0.1em] uppercase text-ivory-soft mb-2">Photo du parfum</label>
        <div className="aspect-[3/4] rounded-[14px] border border-line-strong overflow-hidden bg-surface flex items-center justify-center mb-3">
          {preview ? (
            <img src={preview} alt="Aperçu" className="w-full h-full object-cover" />
          ) : (
            <span className="text-ivory-soft text-sm text-center px-4">Aucune photo</span>
          )}
        </div>
        <input type="file" name="image" accept="image/*" onChange={onFileChange}
          className="block w-full text-sm text-ivory-soft file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-gold file:text-ink file:font-medium file:cursor-pointer" />
        <p className="text-xs text-ivory-soft mt-2">
          La photo est envoyée sur Cloudinary. {product?.imageUrl && "Laissez vide pour garder l'actuelle."}
        </p>
      </div>
    </form>
  );
}
