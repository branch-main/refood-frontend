export const FormInput = ({ 
  label, 
  icon: Icon, 
  error,
  ...props 
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon className="text-lg" />
          </div>
        )}
        <input
          {...props}
          className={`w-full ${Icon ? 'pl-11' : 'pl-4'} pr-4 py-2.5 border ${
            error ? 'border-red-300' : 'border-gray-300'
          } rounded-lg focus:ring-2 focus:ring-[#B21F1F] focus:border-transparent transition-colors text-base`}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};
