import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  isCritical?: boolean;
  percentageChange?: string;
  icon?: React.ReactNode;
}

const StatCard = ({
  title,
  value,
  description,
  isCritical = false,
  percentageChange,
  icon,
}: StatCardProps) => {
  const valueColor = isCritical ? "text-red-500" : "text-white";
  const percentageColor = percentageChange?.startsWith("+")
    ? "text-green-500"
    : "text-neutral-400";

  return (
    <article className="bg-neutral-900/50 p-6 rounded-xl border border-neutral-800 flex flex-col justify-between shadow-md h-full">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-neutral-400">{title}</h3>
        {icon && <span className="text-neutral-500">{icon}</span>}
      </div>
      <div>
        <p className={`text-3xl font-bold mt-2 ${valueColor}`}>{value}</p>
        <p className="text-neutral-400 text-sm">{description}</p>
        {percentageChange && (
          <p className={`text-xs mt-1 ${percentageColor}`}>
            <span className="font-semibold">{percentageChange}</span> vs mes
            anterior
          </p>
        )}
      </div>
    </article>
  );
};

export default StatCard;
