import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import EyeIcon from "@/components/icons/EyeIcon";

export interface Sale {
  id: string;
  type: "Minorista" | "Mayorista";
  status: "Completada" | "Pendiente";
  client: string;
  date: string;
  total: number;
  items: number;
}

interface SaleListItemProps {
  sale: Sale;
}

const SaleListItem = ({ sale }: SaleListItemProps) => {
  const statusVariant = sale.status === "Completada" ? "success" : "danger";

  return (
    <div className="bg-neutral-800/50 p-4 rounded-lg border border-neutral-700 flex flex-col md:flex-row justify-between items-start gap-4">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <p className="font-bold text-white">{sale.id}</p>
          <Badge>{sale.type}</Badge>
          <Badge variant={statusVariant}>{sale.status}</Badge>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-gray-400">Cliente</p>
            <p className="font-semibold">{sale.client}</p>
          </div>
          <div>
            <p className="text-gray-400">Fecha</p>
            <p className="font-semibold">{sale.date}</p>
          </div>
          <div>
            <p className="text-gray-400">Total</p>
            <p className="font-semibold">Bs. {sale.total}</p>
          </div>
          <div>
            <p className="text-gray-400">Items</p>
            <p className="font-semibold">{sale.items} productos</p>
          </div>
        </div>
      </div>
      <Button variant="secondary" className="whitespace-nowrap">
        <EyeIcon className="h-4 w-4" /> Ver Recibo
      </Button>
    </div>
  );
};

export default SaleListItem;
