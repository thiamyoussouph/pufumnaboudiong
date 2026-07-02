import { prisma } from "@/lib/prisma";
import { confirmInvoice } from "@/lib/paydunya";
import { notifyOrderPlaced } from "@/lib/orders";

export async function POST(req) {
  const body = await req.json().catch(() => null);
  const token = body?.data?.invoice?.token || body?.token;
  if (!token) return new Response("Bad request", { status: 400 });

  const order = await prisma.order.findUnique({ where: { paydunyaToken: token } });
  if (!order) return new Response("Order not found", { status: 404 });

  let confirmation;
  try {
    confirmation = await confirmInvoice(token);
  } catch (err) {
    return new Response("Confirmation failed", { status: 500 });
  }

  if (confirmation.status === "completed") {
    let justPaid = false;
    await prisma.$transaction(async (tx) => {
      const fresh = await tx.order.findUnique({ where: { id: order.id }, include: { items: true } });
      if (fresh.status === "paid") return;
      for (const item of fresh.items) {
        if (item.productId) {
          await tx.product.update({
            where: { id: item.productId },
            data: { stock: { decrement: item.qty } },
          });
        }
      }
      await tx.order.update({
        where: { id: order.id },
        data: { status: "paid", paidAt: new Date(), stockDecremented: true },
      });
      justPaid = true;
    });
    if (justPaid) await notifyOrderPlaced(order);
  } else if (confirmation.status === "cancelled") {
    await prisma.order.update({ where: { id: order.id }, data: { status: "cancelled" } }).catch(() => {});
  }

  return new Response("OK", { status: 200 });
}
