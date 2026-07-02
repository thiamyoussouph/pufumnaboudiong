import { formatFCFA } from "@/lib/format";

const STATUS_STYLES = {
  pending: "border-line-strong text-ivory-soft",
  paid: "border-gold text-gold",
  failed: "border-rose text-rose",
  cancelled: "border-rose text-rose",
};

const STATUS_LABELS = {
  pending: "En attente",
  paid: "Payée",
  failed: "Échouée",
  cancelled: "Annulée",
};

export default function AdminOrderRow({ order }) {
  return (
    <div className="flex items-center gap-4 py-4 border-b border-line flex-wrap">
      <div className="flex-1 min-w-[160px]">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="font-serif text-lg">{order.reference}</h3>
          <span className={`text-[10px] uppercase tracking-wide border px-2 py-0.5 rounded-full ${STATUS_STYLES[order.status]}`}>
            {STATUS_LABELS[order.status]}
          </span>
        </div>
        <p className="text-ivory-soft text-sm">{order.customerName} · {order.customerPhone}</p>
      </div>
      <div className="text-ivory-soft text-sm hidden sm:block">
        {order.items.length} article(s)
      </div>
      <div className="font-serif text-lg mr-4">{formatFCFA(order.total)}</div>
      <div className="text-ivory-soft text-xs w-[110px] text-right">
        {new Date(order.createdAt).toLocaleDateString("fr-FR")}
      </div>
    </div>
  );
}
