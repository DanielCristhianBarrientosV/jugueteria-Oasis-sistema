// app/dashboard/ventas/components/SalesHistoryList.tsx
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import SaleListItem, { Sale } from "./SaleListItem";

const mockSales: Sale[] = [
  {
    id: "V001",
    type: "Minorista",
    status: "Completada",
    client: "Juan Pérez",
    date: "2024-01-15",
    total: 250,
    items: 3,
  },
  {
    id: "V002",
    type: "Minorista",
    status: "Completada",
    client: "Maria Garcia",
    date: "2024-01-15",
    total: 180,
    items: 2,
  },
  {
    id: "V003",
    type: "Mayorista",
    status: "Completada",
    client: "Tienda ABC",
    date: "2024-01-14",
    total: 1200,
    items: 15,
  },
  {
    id: "V004",
    type: "Minorista",
    status: "Pendiente",
    client: "Carlos López",
    date: "2024-01-14",
    total: 95,
    items: 1,
  },
];

const SalesHistoryList = () => {
  return (
    <div className="bg-neutral-900/50 p-6 rounded-lg border border-neutral-800">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold">Historial de Ventas</h2>
          <p className="text-gray-400">
            Visualiza todas las ventas realizadas y su estado actual
          </p>
        </div>
        <div className="flex w-full md:w-auto items-center gap-2">
          <Input
            type="search"
            placeholder="Buscar por código, cliente o fecha..."
            className="w-full md:w-auto flex-shrink min-w-0"
          />
          <Button variant="secondary" className="whitespace-nowrap">
            Filtros
          </Button>
        </div>
      </div>
      <div className="space-y-4">
        {mockSales.map((sale) => (
          <SaleListItem key={sale.id} sale={sale} />
        ))}
      </div>
    </div>
  );
};

export default SalesHistoryList;
