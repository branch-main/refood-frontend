import { ChangeEvent, InputHTMLAttributes, forwardRef } from "react";

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  borderSize?: number;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ borderSize = 2, className, onChange, checked, ...props }, ref) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
    };

    return (
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          ref={ref}
          type="radio"
          className="sr-only peer"
          onChange={handleChange}
          checked={checked}
          {...props}
        />
        <div
          className={`
              w-5 h-5 rounded-full border border-gray-400
              flex items-center justify-center
              transition-all duration-200 p-0.5
              ${checked ? "border-gray-800" : ""}
              ${className}
            `}
          style={{ borderWidth: `${borderSize}px` }}
        >
          <div
            className={`transition-all ${checked ? "opacity-100" : "opacity-0"} w-full h-full bg-gray-800 rounded-full`}
          />
        </div>
      </label>
    );
  },
);
