import PlusIcon from "@/components/icons/PlusIcon";
import EyeIcon from "@/components/icons/EyeIcon";
import UsersIcon from "@/components/icons/UsersIcon";
import BarChartIcon from "@/components/icons/BarChartIcon";
import Link from "next/link";

const ActionCard = ({
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
    className="bg-neutral-800/50 p-4 rounded-lg flex items-center gap-3 hover:bg-gray-700 transition-colors"
  >
    <span className="text-neutral-400">{icon}</span>
    <p className="font-semibold">{title}</p>
  </Link>
);

const SalesActions = () => (
  <div className="bg-neutral-900/50 p-6 rounded-lg border border-neutral-800 h-full">
    <h2 className="text-lg font-semibold">Acciones Rápidas</h2>
    <p className="text-sm text-neutral-400 mb-6">
      Operaciones comunes de ventas
    </p>
    <div className="grid grid-cols-2 gap-4">
      <ActionCard
        title="Nueva Venta"
        icon={<PlusIcon className="h-5 w-5" />}
        href="/dashboard/ventas/nueva"
      />
      <ActionCard
        title="Ver Recibos"
        icon={<EyeIcon className="h-5 w-5" />}
        href="/dashboard/recibos"
      />
      <ActionCard
        title="Clientes"
        icon={<UsersIcon className="h-5 w-5" />}
        href="/dashboard/clientes"
      />
      <ActionCard
        title="Reportes"
        icon={<BarChartIcon className="h-5 w-5" />}
        href="/dashboard/reportes"
      />
    </div>
  </div>
);
export default SalesActions;
