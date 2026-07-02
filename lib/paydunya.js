const BASE_URL =
  process.env.PAYDUNYA_MODE === "live"
    ? "https://app.paydunya.com/api/v1"
    : "https://app.paydunya.com/sandbox-api/v1";

function headers() {
  return {
    "Content-Type": "application/json",
    "PAYDUNYA-MASTER-KEY": process.env.PAYDUNYA_MASTER_KEY,
    "PAYDUNYA-PRIVATE-KEY": process.env.PAYDUNYA_PRIVATE_KEY,
    "PAYDUNYA-TOKEN": process.env.PAYDUNYA_TOKEN,
  };
}

// Crée une facture PayDunya pour une commande et renvoie { token, redirectUrl }
export async function createInvoice(order, items) {
  const body = {
    invoice: {
      total_amount: order.total,
      description: `Commande ${order.reference} — Sillage Parfums`,
      items: Object.fromEntries(
        items.map((it, i) => [
          `item_${i}`,
          { name: it.name, quantity: it.qty, unit_price: it.price, total_price: it.price * it.qty },
        ])
      ),
    },
    store: { name: "Sillage Parfums" },
    actions: {
      cancel_url: `${process.env.NEXTAUTH_URL}/checkout?order=${order.reference}&status=cancelled`,
      return_url: `${process.env.NEXTAUTH_URL}/checkout/retour?order=${order.reference}`,
      callback_url: `${process.env.NEXTAUTH_URL}/api/paydunya/webhook`,
    },
    custom_data: { orderReference: order.reference },
  };

  const res = await fetch(`${BASE_URL}/checkout-invoice/create`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(body),
  });
  const data = await res.json();

  if (data.response_code !== "00") {
    throw new Error(data.response_text || "Échec de création de la facture PayDunya");
  }
  return { token: data.token, redirectUrl: data.response_text };
}

// Confirme le statut réel d'une facture auprès de PayDunya (source de vérité, ne jamais se fier au seul payload webhook)
export async function confirmInvoice(token) {
  const res = await fetch(`${BASE_URL}/checkout-invoice/confirm/${token}`, {
    method: "GET",
    headers: headers(),
  });
  return res.json(); // data.status: "completed" | "pending" | "cancelled"
}
