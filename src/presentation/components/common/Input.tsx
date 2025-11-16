interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Input = ({
  label,
  error,
  type = "text",
  fullWidth = true,
  ...props
}: InputProps) => {
  return (
    <div className={`flex flex-col gap-2 ${fullWidth ? "w-full" : ""}`}>
      {label && (
        <label className="text-[0.9375rem] font-semibold text-gray-700 tracking-wide">
          {label}
        </label>
      )}
      <input
        type={type}
        className={`w-full px-4 py-3.5 border-2 rounded-xl text-base transition-all duration-200 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:bg-[#fefefe] disabled:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 ${error ? "border-red-500 focus:border-red-600 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]" : "border-gray-200 focus:border-[#B21F1F] focus:shadow-[0_0_0_3px_rgba(178,31,31,0.1)]"}`}
        {...props}
      />
      {error && (
        <span className="text-red-600 text-sm mt-1 font-medium">{error}</span>
      )}
    </div>
  );
};
