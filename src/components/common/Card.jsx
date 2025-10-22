import './Card.css';

export const Card = ({ children, className = '', onClick, hover = false }) => {
  return (
    <div 
      className={`card ${hover ? 'card-hover' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
