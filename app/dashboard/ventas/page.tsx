// app/dashboard/ventas/page.tsx
import StatCard from "@/components/dashboard/StatCard";
import Button from "@/components/ui/Button";

// Importamos los íconos que usaremos
import PlusIcon from "@/components/icons/PlusIcon";
import ShoppingCartIcon from "@/components/icons/ShoppingCartIcon";
import DollarSignIcon from "@/components/icons/DollarSignIcon";
import ClockIcon from "@/components/icons/ClockIcon";

// Importamos los componentes de la página
import SalesHistoryList from "./components/SalesHistoryList";
import SalesByType from "./components/SalesByType";
import SalesActions from "./components/SalesActions";

const VentasPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Ventas</h1>
          <p className="text-gray-400 mt-1">
            Gestiona las ventas y genera recibos automáticamente
          </p>
        </div>
        <Button variant="primary" icon={<PlusIcon className="h-4 w-4" />}>
          Nueva Venta
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Ventas Hoy"
          value="Bs. 2,450"
          description="18 ventas realizadas"
          icon={<ShoppingCartIcon className="h-5 w-5" />}
        />
        <StatCard
          title="Ventas Mes"
          value="Bs. 45,678"
          description="Total de ventas"
          percentageChange="+23%"
          icon={<ShoppingCartIcon className="h-5 w-5" />}
        />
        <StatCard
          title="Ticket Promedio"
          value="Bs. 156"
          description="Promedio por venta"
          icon={<DollarSignIcon className="h-5 w-5" />}
        />
        <StatCard
          title="Ventas Pendientes"
          value="3"
          description="Por completar"
          isCritical={true}
          icon={<ClockIcon className="h-5 w-5" />}
        />
      </div>

      <SalesHistoryList />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SalesByType />
        <SalesActions />
      </div>
    </div>
  );
};

export default VentasPage;
