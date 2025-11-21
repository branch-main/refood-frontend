import { Button } from "@/shared/components/ui";

export const PartnerMenu = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Mi Menú</h1>
        <Button variant="primary">
          + Agregar Producto
        </Button>
      </div>

      {/* Menu Items List */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Productos</h2>
            <div className="flex gap-2">
              <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm">
                <option>Todos</option>
                <option>Activos</option>
                <option>Inactivos</option>
              </select>
            </div>
          </div>
        </div>
        <div className="p-6">
          <p className="text-gray-500 text-center py-8">
            No tienes productos en tu menú. Agrega tu primer producto para empezar.
          </p>
        </div>
      </div>
    </div>
  );
};
