export const Notifications = () => {
  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold">Notificaciones</h1>
      <p className="mt-1 text-sm text-gray-500 border-b border-gray-200 pb-4">
        Aquí encontrarás todas las notificaciones relacionadas con tus pedidos y
        actividades en la plataforma.
      </p>

      <div className="mt-8 text-center py-12 w-1/2 mx-auto">
        <h3 className="text-lg font-semibold mb-1">
          No tienes notificaciones aún
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          Explora restaurantes y realiza pedidos para recibir notificaciones
          importantes sobre tus actividades.
        </p>
      </div>
    </div>
  );
};
