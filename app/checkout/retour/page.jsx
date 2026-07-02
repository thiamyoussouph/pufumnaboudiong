import Link from "next/link";
import { getOrderByReference } from "@/lib/orders";
import ClearCartOnPaid from "./ClearCartOnPaid";

export const dynamic = "force-dynamic";

const MESSAGES = {
  paid: {
    icon: "✓",
    title: "Commande confirmée",
    text: "Votre paiement a bien été reçu, merci pour votre commande.",
  },
  pending: {
    icon: "…",
    title: "Paiement en cours de traitement",
    text: "Nous attendons encore la confirmation de votre paiement. Cela peut prendre quelques instants.",
  },
  cancelled: {
    icon: "✕",
    title: "Paiement annulé",
    text: "Votre commande n'a pas été payée. Vous pouvez réessayer depuis votre panier.",
  },
  failed: {
    icon: "✕",
    title: "Paiement échoué",
    text: "Une erreur est survenue lors du paiement. Vous pouvez réessayer.",
  },
};

export default async function CheckoutRetourPage({ searchParams }) {
  const reference = searchParams?.order;
  const order = reference ? await getOrderByReference(reference) : null;

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <h1 className="font-serif font-normal text-[32px] mb-3">Commande introuvable</h1>
          <p className="text-ivory-soft mb-8">Nous n'avons pas retrouvé cette commande.</p>
          <Link href="/" className="inline-block bg-gold hover:bg-[#d4b16e] text-ink px-8 py-3.5 rounded-full font-semibold transition">
            Retour à la boutique
          </Link>
        </div>
      </div>
    );
  }

  const info = MESSAGES[order.status] || MESSAGES.pending;

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      {order.status === "paid" && <ClearCartOnPaid />}
      <div className="text-center max-w-md">
        <div className="w-[66px] h-[66px] rounded-full border border-gold text-gold flex items-center justify-center text-3xl mx-auto mb-6">
          {info.icon}
        </div>
        <h1 className="font-serif font-normal text-[32px] mb-3">{info.title}</h1>
        <p className="text-ivory-soft mb-2">{info.text}</p>
        <p className="text-gold tracking-[0.1em] text-lg mb-8">{order.reference}</p>
        <Link href="/" className="inline-block bg-gold hover:bg-[#d4b16e] text-ink px-8 py-3.5 rounded-full font-semibold transition">
          Retour à la boutique
        </Link>
      </div>
    </div>
  );
}
