"use server";

import { prisma } from "@/lib/prisma";
import { createInvoice } from "@/lib/paydunya";
import { generateOrderReference } from "@/lib/orders";

export async function createOrder({ customerName, customerPhone, customerAddress, paymentMethod, items }) {
  if (!customerName?.trim()) return { error: "Le nom est requis." };
  if (!customerPhone?.trim()) return { error: "Le téléphone est requis." };
  if (!customerAddress?.trim()) return { error: "L'adresse est requise." };
  if (!Array.isArray(items) || items.length === 0) return { error: "Le panier est vide." };

  const productIds = items.map((i) => i.productId);
  const products = await prisma.product.findMany({ where: { id: { in: productIds } } });

  for (const it of items) {
    const p = products.find((p) => p.id === it.productId);
    if (!p || !p.active) return { error: "Un des articles du panier n'est plus disponible." };
    if (p.stock < it.qty) return { error: `Stock insuffisant pour « ${p.name} ».` };
  }

  const orderItems = items.map((it) => {
    const p = products.find((p) => p.id === it.productId);
    return { productId: p.id, name: p.name, price: p.price, qty: it.qty };
  });
  const total = orderItems.reduce((s, it) => s + it.price * it.qty, 0);

  const reference = await generateOrderReference();
  const order = await prisma.order.create({
    data: {
      reference,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      customerAddress: customerAddress.trim(),
      paymentMethod,
      total,
      status: "pending",
      items: { create: orderItems },
    },
  });

  try {
    const { token, redirectUrl } = await createInvoice(order, orderItems);
    await prisma.order.update({ where: { id: order.id }, data: { paydunyaToken: token } });
    return { redirectUrl };
  } catch (err) {
    await prisma.order.update({ where: { id: order.id }, data: { status: "failed" } });
    return { error: "Le paiement n'a pas pu être initié. Réessayez." };
  }
}
