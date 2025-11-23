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
        "bg-white shadow-[0px_0px_25px_2px_rgba(0,0,0,0.025)] rounded-2xl p-4 space-y-4",
        className,
      )}
    >
      <h2 className="text-lg font-medium text-gray-800">{title}</h2>
      {children}
    </div>
  );
};
