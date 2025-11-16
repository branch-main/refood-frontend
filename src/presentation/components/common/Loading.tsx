interface LoadingProps {
  fullScreen?: boolean;
}

export const Loading = ({ fullScreen = false }: LoadingProps) => {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-white/95 z-[9999] gap-4">
        <div className="w-12 h-12 border-4 border-gray-100 border-t-[#B21F1F] rounded-full animate-spin"></div>
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center p-8">
      <div className="w-12 h-12 border-4 border-gray-100 border-t-[#B21F1F] rounded-full animate-spin"></div>
    </div>
  );
};
