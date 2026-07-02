import { getAllOrders } from "@/lib/queries";
import AdminOrderRow from "@/components/AdminOrderRow";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const orders = await getAllOrders();

  return (
    <div>
      <div className="flex items-end justify-between mb-8 gap-4 flex-wrap">
        <div>
          <p className="eyebrow">Ventes</p>
          <h1 className="font-serif font-light text-[clamp(28px,4vw,40px)]">Commandes</h1>
          <p className="text-ivory-soft text-sm mt-1">{orders.length} commande(s)</p>
        </div>
      </div>

      <div className="bg-surface/40 border border-line rounded-[16px] px-6">
        {orders.length === 0 ? (
          <div className="py-16 text-center text-ivory-soft">
            <p className="font-serif italic text-xl text-ivory mb-2">Aucune commande</p>
            Les commandes passées par vos clients apparaîtront ici.
          </div>
        ) : (
          orders.map((o) => <AdminOrderRow key={o.id} order={o} />)
        )}
      </div>
    </div>
  );
}
