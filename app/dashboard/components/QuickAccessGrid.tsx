import PackageIcon from "@/components/icons/PackageIcon";
import ShoppingCartIcon from "@/components/icons/ShoppingCartIcon";
import UsersIcon from "@/components/icons/UsersIcon";
import TruckIcon from "@/components/icons/TruckIcon";
import Link from "next/link";

const QuickAccessCard = ({
  title,
  icon,
  href,
}: {
  title: string;
  icon: React.ReactNode;
  href: string;
}) => (
  <Link
    href={href}
    className="bg-gray-900/50 p-6 rounded-lg flex flex-col items-center justify-center text-center gap-2 hover:bg-gray-700 transition-colors"
  >
    <span className="text-neutral-400">{icon}</span>
    <p className="font-semibold">{title}</p>
  </Link>
);

const QuickAccessGrid = () => {
  return (
    <div className="bg-neutral-900/50 p-6 rounded-lg border border-neutral-800">
      <h2 className="text-lg font-semibold">Accesos Rápidos</h2>
      <p className="text-sm text-neutral-400 mb-6">
        Módulos principales del sistema
      </p>
      <div className="grid grid-cols-2 gap-4">
        <QuickAccessCard
          title="Inventario"
          icon={<PackageIcon className="h-6 w-6" />}
          href="/dashboard/inventario"
        />
        <QuickAccessCard
          title="Ventas"
          icon={<ShoppingCartIcon className="h-6 w-6" />}
          href="/dashboard/ventas"
        />
        <QuickAccessCard
          title="Clientes"
          icon={<UsersIcon className="h-6 w-6" />}
          href="/dashboard/clientes"
        />
        <QuickAccessCard
          title="Proveedores"
          icon={<TruckIcon className="h-6 w-6" />}
          href="/dashboard/proveedores"
        />
      </div>
    </div>
  );
};
export default QuickAccessGrid;
