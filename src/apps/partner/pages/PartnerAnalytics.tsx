export const PartnerAnalytics = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Analíticas</h1>

      {/* Date Range Selector */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-gray-700">Período:</label>
          <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm">
            <option>Últimos 7 días</option>
            <option>Últimos 30 días</option>
            <option>Últimos 3 meses</option>
            <option>Último año</option>
          </select>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Ingresos</h3>
          <div className="h-64 flex items-center justify-center text-gray-500">
            Gráfico de ingresos
          </div>
        </div>

        {/* Orders Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Pedidos</h3>
          <div className="h-64 flex items-center justify-center text-gray-500">
            Gráfico de pedidos
          </div>
        </div>

        {/* Popular Items */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Productos Más Vendidos
          </h3>
          <div className="space-y-4">
            <p className="text-gray-500 text-center py-8">
              No hay datos disponibles
            </p>
          </div>
        </div>

        {/* Customer Stats */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Estadísticas de Clientes
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Clientes Nuevos</span>
              <span className="font-semibold">0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Clientes Recurrentes</span>
              <span className="font-semibold">0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tasa de Retorno</span>
              <span className="font-semibold">0%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
