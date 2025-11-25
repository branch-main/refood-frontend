import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  loading = false,
  onClick,
  type = "button",
  className = "",
  ...props
}: ButtonProps) => {
  const baseClasses =
    "border-none rounded-xl font-semibold cursor-pointer transition-all duration-200 inline-flex items-center justify-center gap-2 tracking-wide active:not-disabled:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none";

  const variantClasses: Record<string, string> = {
    primary: "bg-red-500 text-white hover:bg-red-600",
    secondary:
      "bg-white text-red-500 border-2 border-red-500 hover:not-disabled:bg-red-50",
    outline:
      "bg-transparent text-gray-700 border border-gray-300 hover:not-disabled:bg-gray-50",
  };

  const sizeClasses: Record<string, string> = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-2.5 text-sm",
    lg: "px-10 py-4 text-lg",
  };

  return (
    <button
      type={type as "button" | "submit" | "reset"}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? "Cargando..." : children}
    </button>
  );
};
