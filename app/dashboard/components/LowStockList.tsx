import Badge from "@/components/ui/Badge";
import AlertCircleIcon from "@/components/icons/AlertCircleIcon";

const lowStockProducts = [
  { name: "Carro de Control Remoto", stock: 3, min: 10 },
  { name: "Muñeca Barbie", stock: 5, min: 15 },
  { name: "Lego City", stock: 2, min: 8 },
];

const LowStockList = () => {
  return (
    <div className="bg-neutral-900/50 p-6 rounded-lg border border-neutral-800">
      <div className="flex items-center gap-2 mb-4">
        <AlertCircleIcon className="text-yellow-500 h-5 w-5" />
        <h2 className="text-lg font-semibold">Productos con Stock Bajo</h2>
      </div>
      <p className="text-sm text-neutral-400 mb-6">
        Productos que necesitan reabastecimiento urgente
      </p>
      <div className="space-y-4">
        {lowStockProducts.map((product) => (
          <div
            key={product.name}
            className="flex justify-between items-center bg-gray-900/50 p-3 rounded-md"
          >
            <div>
              <p className="font-semibold">{product.name}</p>
              <p className="text-xs text-neutral-400">
                Stock actual: {product.stock} (Mínimo: {product.min})
              </p>
            </div>
            <Badge variant="danger">Urgente</Badge>
          </div>
        ))}
      </div>
    </div>
  );
};
export default LowStockList;
