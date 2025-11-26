import { Button } from "@/shared/components/ui";

export const PartnerSettings = () => {
  return (
    <div>
      <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">Configuración</h1>

      <div className="space-y-6">
        {/* Restaurant Info */}
        <div className="bg-white rounded-2xl shadow-[0px_0px_25px_2px_rgba(0,0,0,0.025)]">
          <div className="px-4 sm:px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-medium text-gray-800">
              Información del Restaurante
            </h2>
          </div>
          <div className="p-4 sm:p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre del Restaurante
              </label>
              <input
                type="text"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                placeholder="Mi Restaurante"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                placeholder="Describe tu restaurante..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dirección
              </label>
              <input
                type="text"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                placeholder="Calle Principal 123"
              />
            </div>
            <Button variant="primary">Guardar Cambios</Button>
          </div>
        </div>

        {/* Business Hours */}
        <div className="bg-white rounded-2xl shadow-[0px_0px_25px_2px_rgba(0,0,0,0.025)]">
          <div className="px-4 sm:px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-medium text-gray-800">
              Horario de Atención
            </h2>
          </div>
          <div className="p-4 sm:p-6">
            <p className="text-gray-500 text-sm">Configure los horarios de apertura...</p>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-2xl shadow-[0px_0px_25px_2px_rgba(0,0,0,0.025)]">
          <div className="px-4 sm:px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-medium text-gray-800">Notificaciones</h2>
          </div>
          <div className="p-4 sm:p-6 space-y-4">
            <label className="flex items-center gap-3">
              <input type="checkbox" className="w-5 h-5 text-red-600 rounded" />
              <span className="text-gray-700 text-sm">Nuevos pedidos</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" className="w-5 h-5 text-red-600 rounded" />
              <span className="text-gray-700 text-sm">Reseñas de clientes</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" className="w-5 h-5 text-red-600 rounded" />
              <span className="text-gray-700 text-sm">Actualizaciones del sistema</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
