export const Card = ({ children, className = '', onClick, hover = false }) => {
  return (
    <div 
      className={`bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.05),0_1px_2px_rgba(0,0,0,0.03)] overflow-hidden transition-all duration-300 border border-gray-100 ${hover ? 'cursor-pointer hover:shadow-[0_10px_25px_rgba(0,0,0,0.08),0_6px_12px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:border-gray-200' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
