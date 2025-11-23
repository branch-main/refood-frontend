import { useState, InputHTMLAttributes } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { IconType } from "react-icons";

interface PasswordInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  icon?: IconType;
  error?: string;
}

export const PasswordInput = ({
  label,
  icon: Icon,
  error,
  ...props
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

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
          type={showPassword ? "text" : "password"}
          className={`w-full ${Icon ? "pl-11" : "pl-4"} pr-11 py-3 border ${
            error ? "border-red-300" : "border-gray-300"
          } focus:ring-red-500 rounded-xl focus:ring-2 focus:border-transparent focus:outline-none transition-all text-sm bg-gray-50`}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
        </button>
      </div>
      {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
    </div>
  );
};
