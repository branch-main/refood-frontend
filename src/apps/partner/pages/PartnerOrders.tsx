export const PartnerOrders = () => {
  const orderTabs = ["Nuevos", "En Preparación", "Listos", "Completados", "Cancelados"];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Pedidos</h1>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="flex overflow-x-auto border-b border-gray-200">
          {orderTabs.map((tab) => (
            <button
              key={tab}
              className="px-6 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 border-b-2 border-transparent hover:border-red-500 transition-all whitespace-nowrap"
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <p className="text-gray-500 text-center py-8">
            No hay pedidos en este momento
          </p>
        </div>
      </div>
    </div>
  );
};
