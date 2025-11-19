import { ChangeEvent, InputHTMLAttributes, forwardRef } from "react";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  borderSize?: number;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, borderSize = 2, className, onChange, checked, ...props }, ref) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
    };

    return (
      <label className="cursor-pointer">
        <input
          ref={ref}
          type="checkbox"
          className="sr-only peer"
          onChange={handleChange}
          checked={checked}
          {...props}
        />
        <div
          className={`
              w-5 h-5 rounded border border-gray-400
              flex items-center justify-center
              peer-checked:bg-gray-800 peer-checked:border-gray-800
              transition-all duration-200
              ${checked ? "bg-gray-800 border-gray-800" : ""}
              ${props.disabled ? "opacity-50 cursor-not-allowed" : ""}
              ${className}
            `}
          style={{ borderWidth: `${borderSize}px` }}
        >
          {checked && (
            <svg
              className="text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </div>
      </label>
    );
  },
);

Checkbox.displayName = "Checkbox";
