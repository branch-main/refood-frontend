import './Input.css';

export const Input = ({ 
  label, 
  error, 
  type = 'text',
  fullWidth = true,
  ...props 
}) => {
  return (
    <div className={`input-group ${fullWidth ? 'input-full' : ''}`}>
      {label && <label className="input-label">{label}</label>}
      <input 
        type={type}
        className={`input ${error ? 'input-error' : ''}`}
        {...props}
      />
      {error && <span className="input-error-text">{error}</span>}
    </div>
  );
};
