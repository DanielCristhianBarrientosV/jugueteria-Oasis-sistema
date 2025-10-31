// app/dashboard/page.tsx
import StatCard from "@/components/dashboard/StatCard";
import Button from "@/components/ui/Button";

// Importamos nuestros íconos
import PackageIcon from "@/components/icons/PackageIcon";
import ShoppingCartIcon from "@/components/icons/ShoppingCartIcon";
import UsersIcon from "@/components/icons/UsersIcon";
import TruckIcon from "@/components/icons/TruckIcon";
import PlusIcon from "@/components/icons/PlusIcon";

import LowStockList from "./components/LowStockList";
import RecentSalesList from "./components/RecentSalesList";
import QuickAccessGrid from "./components/QuickAccessGrid";

const DashboardPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 mt-1">
            Bienvenido al sistema de gestión de la Juguetería Oasis
          </p>
        </div>
        <Button variant="primary" icon={<PlusIcon className="h-4 w-4" />}>
          Nueva Venta
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Productos en Stock"
          value="1,234"
          description="Total de productos"
          percentageChange="+12%"
          icon={<PackageIcon className="h-5 w-5" />}
        />
        <StatCard
          title="Ventas del Mes"
          value="Bs. 45,678"
          description="Total de ventas"
          percentageChange="+23%"
          icon={<ShoppingCartIcon className="h-5 w-5" />}
        />
        <StatCard
          title="Clientes Activos"
          value="89"
          description="Clientes registrados"
          percentageChange="+5%"
          icon={<UsersIcon className="h-5 w-5" />}
        />
        <StatCard
          title="Proveedores"
          value="15"
          description="Proveedores activos"
          percentageChange="0%"
          icon={<TruckIcon className="h-5 w-5" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-8">
          <LowStockList />
          <RecentSalesList />
        </div>

        <div className="lg:col-span-1">
          <QuickAccessGrid />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
