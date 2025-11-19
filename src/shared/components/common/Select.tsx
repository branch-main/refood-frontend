import { useState, useRef, useEffect, ReactNode } from "react";
import { IoIosArrowDown } from "react-icons/io";

interface Option {
  label: string;
  value: string;
}

export const Select = ({
  options,
  value,
  onChange,
  children,
}: {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  children?: ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedLabel = options.find((o) => o.value === value)?.label || value;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex gap-3 items-center justify-between px-3 py-2 rounded-lg transition-all w-48 bg-white border ${
          isOpen
            ? "border-red-500 text-red-500"
            : "border-gray-300 text-gray-500"
        }`}
      >
        {children || (
          <>
            <span className="text-sm font-medium truncate">
              {selectedLabel}
            </span>
            <IoIosArrowDown
              className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
            />
          </>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2 animate-[fadeIn_0.2s_ease-out] z-10">
          {options.map((option) => (
            <label
              key={option.value}
              className="flex items-center px-4 py-2.5 hover:bg-red-50 text-sm text-gray-800 hover:text-red-500 cursor-pointer transition-colors"
            >
              <input
                type="radio"
                value={option.value}
                checked={value === option.value}
                onChange={(e) => {
                  onChange(e.target.value);
                  setIsOpen(false);
                }}
                className="mr-3 cursor-pointer accent-red-500"
              />
              {option.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};
