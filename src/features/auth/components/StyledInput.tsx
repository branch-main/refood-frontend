import { InputHTMLAttributes } from "react";
import { IconType } from "react-icons";

interface StyledInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: IconType;
  error?: string;
}

export const StyledInput = ({
  label,
  icon: Icon,
  error,
  ...props
}: StyledInputProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon size={18} />
          </div>
        )}
        <input
          {...props}
          className={`w-full ${Icon ? "pl-11" : "pl-4"} pr-4 py-3 border ${
            error ? "border-red-300" : "border-gray-300"
          } focus:ring-red-500 rounded-xl focus:ring-2 focus:border-transparent focus:outline-none transition-all text-sm bg-gray-50`}
        />
      </div>
      {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
    </div>
  );
};
