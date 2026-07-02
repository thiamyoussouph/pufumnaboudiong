"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatFCFA } from "@/lib/format";
import { createOrder } from "./actions";

const PAYMENTS = ["Wave", "Orange Money", "PayDunya"];

export default function CheckoutPage() {
  const { items, subtotal } = useCart();
  const [payment, setPayment] = useState("Wave");
  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const [error, setError] = useState(null);
  const [pending, startTransition] = useTransition();

  const submit = (e) => {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const result = await createOrder({
        customerName: form.name,
        customerPhone: form.phone,
        customerAddress: form.address,
        paymentMethod: payment,
        items: items.map(({ product, qty }) => ({ productId: product.id, qty })),
      });
      if (result.error) setError(result.error);
      else window.location.href = result.redirectUrl;
    });
  };

  return (
    <div className="max-w-[880px] mx-auto px-7 py-16">
      <Link href="/" className="text-ivory-soft hover:text-ivory text-sm mb-8 inline-block">← Retour à la boutique</Link>
      <h1 className="font-serif font-light text-[clamp(30px,5vw,48px)] mb-10">Finaliser la commande</h1>

      {items.length === 0 ? (
        <div className="text-ivory-soft">
          <p className="mb-4">Votre panier est vide.</p>
          <Link href="/" className="text-gold underline">Découvrir la collection</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-[1fr_360px] gap-12">
          <form onSubmit={submit}>
            <div className="mb-5">
              <label className="block text-xs tracking-[0.1em] uppercase text-ivory-soft mb-2">Nom complet</label>
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Votre nom"
                className="w-full bg-surface border border-line-strong focus:border-gold outline-none text-ivory px-4 py-3.5 rounded-[10px]" />
            </div>
            <div className="mb-5">
              <label className="block text-xs tracking-[0.1em] uppercase text-ivory-soft mb-2">Téléphone</label>
              <input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="77 000 00 00"
                className="w-full bg-surface border border-line-strong focus:border-gold outline-none text-ivory px-4 py-3.5 rounded-[10px]" />
            </div>
            <div className="mb-5">
              <label className="block text-xs tracking-[0.1em] uppercase text-ivory-soft mb-2">Adresse de livraison</label>
              <input required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })}
                placeholder="Quartier, ville"
                className="w-full bg-surface border border-line-strong focus:border-gold outline-none text-ivory px-4 py-3.5 rounded-[10px]" />
            </div>

            <label className="block text-xs tracking-[0.1em] uppercase text-ivory-soft mb-2 mt-8">Mode de paiement</label>
            <div className="flex flex-col gap-2.5 mb-8">
              {PAYMENTS.map((p) => (
                <button type="button" key={p} onClick={() => setPayment(p)}
                  className={`flex items-center gap-3 border rounded-[10px] px-4 py-3.5 text-left transition ${
                    payment === p ? "border-gold bg-gold/10" : "border-line-strong hover:border-gold"
                  }`}>
                  <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${payment === p ? "border-gold" : "border-line-strong"}`}>
                    {payment === p && <span className="w-2 h-2 rounded-full bg-gold" />}
                  </span>
                  <span className="text-[15px]">{p}</span>
                </button>
              ))}
            </div>

            {error && <p className="text-rose text-sm mb-4">{error}</p>}

            <button type="submit" disabled={pending}
              className="w-full bg-gold hover:bg-[#d4b16e] disabled:opacity-50 text-ink py-4 rounded-full font-semibold text-[15px] tracking-wide transition">
              {pending ? "Redirection vers le paiement…" : `Payer ${formatFCFA(subtotal)}`}
            </button>
          </form>

          <aside className="bg-surface border border-line rounded-[18px] p-7 h-fit">
            <h2 className="font-serif text-xl mb-5">Récapitulatif</h2>
            {items.map(({ product: p, qty }) => (
              <div key={p.id} className="flex justify-between py-3 border-b border-line text-sm">
                <span className="text-ivory-soft">{p.name} × {qty}</span>
                <span>{formatFCFA(p.price * qty)}</span>
              </div>
            ))}
            <div className="flex justify-between items-baseline pt-5">
              <span className="text-ivory-soft">Total</span>
              <span className="font-serif text-[26px]">{formatFCFA(subtotal)}</span>
            </div>
            <p className="text-ivory-soft text-[12.5px] mt-3">Paiement via {payment} · Confirmation par SMS.</p>
          </aside>
        </div>
      )}
    </div>
  );
}
