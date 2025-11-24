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
    <div className={`flex flex-col gap-1.5 ${fullWidth ? "w-full" : ""}`}>
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        type={type}
        className={`w-full px-4 py-2.5 border rounded-lg text-sm transition-all duration-200 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60 ${error ? "border-red-300 focus:border-red-500 focus:ring-red-100" : "border-gray-300 focus:border-red-500 focus:ring-red-100"}`}
        {...props}
      />
      {error && (
        <span className="text-red-600 text-xs mt-0.5">{error}</span>
      )}
    </div>
  );
};
