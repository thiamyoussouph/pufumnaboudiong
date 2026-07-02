import { prisma } from "@/lib/prisma";

function randomReference() {
  return "SLG-" + Math.floor(100000 + Math.random() * 900000);
}

// Génère une référence de commande unique (retry en cas de collision improbable)
export async function generateOrderReference() {
  for (let i = 0; i < 5; i++) {
    const reference = randomReference();
    const existing = await prisma.order.findUnique({ where: { reference } });
    if (!existing) return reference;
  }
  throw new Error("Impossible de générer une référence de commande unique");
}

export async function getOrderByReference(reference) {
  return prisma.order.findUnique({ where: { reference }, include: { items: true } });
}

// Point d'extension pour futures notifications (email/SMS) — pas de clé API configurée pour l'instant.
export async function notifyOrderPlaced(order) {
  console.log(`[notify] Commande ${order.reference} confirmée (non envoyé, notifications non configurées).`);
}
