import { twMerge } from "tailwind-merge";

export const DashboardCard = ({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={twMerge(
        "bg-white shadow-[0_0_20px_rgba(0,0,0,0.0225)] rounded-2xl p-4 space-y-4",
        className,
      )}
    >
      <h2 className="text-lg font-medium text-gray-800">{title}</h2>
      {children}
    </div>
  );
};
