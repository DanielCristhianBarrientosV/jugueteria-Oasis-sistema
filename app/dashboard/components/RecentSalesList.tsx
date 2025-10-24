import Badge from "@/components/ui/Badge";

const recentSales = [
  { id: "V001", customer: "Juan Pérez", date: "2024-01-15", total: 250 },
  { id: "V002", customer: "Maria Garcia", date: "2024-01-15", total: 180 },
];

const RecentSalesList = () => {
  return (
    <div className="bg-neutral-900/50 p-6 rounded-lg border border-neutral-800">
      <h2 className="text-lg font-semibold">Ventas Recientes</h2>
      <p className="text-sm text-neutral-400 mb-6">Últimas ventas realizadas</p>
      <div className="space-y-4">
        {recentSales.map((sale) => (
          <div
            key={sale.id}
            className="flex justify-between items-center bg-gray-900/50 p-3 rounded-md"
          >
            <div>
              <p className="font-semibold">{sale.id}</p>
              <p className="text-xs text-neutral-400">
                {sale.customer} • {sale.date}
              </p>
            </div>
            <div className="text-right">
              <p className="font-semibold">Bs. {sale.total}</p>
              <Badge variant="success">Completada</Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default RecentSalesList;
