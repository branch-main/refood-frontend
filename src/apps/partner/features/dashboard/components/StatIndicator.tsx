import { BiTrendingUp, BiTrendingDown } from "react-icons/bi";
import { FaChevronUp, FaChevronDown } from "react-icons/fa6";
import { DashboardCard } from "./DashboardCard";

export const StatIndicator = ({
  title,
  current,
  previous,
  formatter,
}: {
  title: string;
  current: number;
  previous: number;
  formatter?: (value: number) => string;
}) => {
  const isPositive = current - previous >= 0;
  const difference = Math.abs(current - previous);

  return (
    <DashboardCard title={title} className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-3xl font-bold text-gray-800">
          {formatter ? formatter(current) : current}
        </p>
        {isPositive ? (
          <BiTrendingUp size={36} className="text-green-400" />
        ) : (
          <BiTrendingDown size={36} className="text-red-400" />
        )}
      </div>

      <div
        className={`text-sm inline-flex gap-1 items-center ${isPositive ? "text-green-500" : "text-red-500"}`}
      >
        {isPositive ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
        <div className="inline-flex items-end leading-none gap-1">
          <span>{formatter ? formatter(difference) : difference}</span>
          <span className="text-xs leading-none text-gray-500">desde ayer</span>
        </div>
      </div>
    </DashboardCard>
  );
};
