export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  fullWidth = false,
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  ...props 
}) => {
  const baseClasses = 'border-none rounded-xl font-semibold cursor-pointer transition-all duration-200 inline-flex items-center justify-center gap-2 tracking-wide shadow-md hover:not-disabled:-translate-y-0.5 hover:not-disabled:shadow-lg active:not-disabled:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none';
  
  const variantClasses = {
    primary: 'bg-gradient-to-br from-[#B21F1F] to-[#8B1616] text-white hover:not-disabled:bg-gradient-to-br hover:not-disabled:from-[#8B1616] hover:not-disabled:to-[#6B1111]',
    secondary: 'bg-white text-[#B21F1F] border-2 border-[#B21F1F] hover:not-disabled:bg-red-50 hover:not-disabled:border-[#8B1616]',
    outline: 'bg-transparent text-[#B21F1F] border-2 border-[#B21F1F] hover:not-disabled:bg-[#B21F1F] hover:not-disabled:text-white'
  };
  
  const sizeClasses = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-8 py-3.5 text-base',
    large: 'px-10 py-4 text-lg'
  };
  
  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${fullWidth ? 'w-full' : ''}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? 'Cargando...' : children}
    </button>
  );
};
