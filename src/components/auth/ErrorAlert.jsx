export const ErrorAlert = ({ message }) => {
  if (!message) return null;

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
      <span className="text-red-500 text-lg flex-shrink-0">⚠️</span>
      <span className="text-sm text-red-700">{message}</span>
    </div>
  );
};
