const SalesByType = () => (
  <div className="bg-neutral-900/50 p-6 rounded-lg border border-neutral-800 h-full">
    <h2 className="text-lg font-semibold">Ventas por Tipo</h2>
    <p className="text-sm text-neutral-400 mb-6">
      Distribución de ventas mayoristas y minoristas
    </p>
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-blue-500"></span>
          <p>Ventas Minoristas</p>
        </div>
        <div className="text-right">
          <p className="font-semibold">Bs. 28,450</p>
          <p className="text-xs text-neutral-400">62%</p>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-green-500"></span>
          <p>Ventas Mayoristas</p>
        </div>
        <div className="text-right">
          <p className="font-semibold">Bs. 17,228</p>
          <p className="text-xs text-neutral-400">38%</p>
        </div>
      </div>
    </div>
  </div>
);
export default SalesByType;
