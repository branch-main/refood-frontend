import { Button } from "@/shared/components/ui";

export const PartnerSettings = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Configuración</h1>

      <div className="space-y-6">
        {/* Restaurant Info */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Información del Restaurante
            </h2>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre del Restaurante
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Mi Restaurante"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Describe tu restaurante..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dirección
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Calle Principal 123"
              />
            </div>
            <Button variant="primary">Guardar Cambios</Button>
          </div>
        </div>

        {/* Business Hours */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Horario de Atención
            </h2>
          </div>
          <div className="p-6">
            <p className="text-gray-500">Configure los horarios de apertura...</p>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Notificaciones</h2>
          </div>
          <div className="p-6 space-y-4">
            <label className="flex items-center gap-3">
              <input type="checkbox" className="w-5 h-5 text-red-600" />
              <span className="text-gray-700">Nuevos pedidos</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" className="w-5 h-5 text-red-600" />
              <span className="text-gray-700">Reseñas de clientes</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" className="w-5 h-5 text-red-600" />
              <span className="text-gray-700">Actualizaciones del sistema</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
