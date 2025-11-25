import { useState } from "react";
import { Select } from "@/shared/components/ui";

export const PartnerAnalytics = () => {
  const [period, setPeriod] = useState("7d");

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-800 mb-7">Analíticas</h1>

      {/* Date Range Selector */}
      <div className="bg-white rounded-2xl shadow-[0px_0px_25px_2px_rgba(0,0,0,0.025)] p-6 mb-6">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-700">Período:</span>
          <Select
            options={[
              { value: "7d", label: "Últimos 7 días" },
              { value: "30d", label: "Últimos 30 días" },
              { value: "3m", label: "Últimos 3 meses" },
              { value: "1y", label: "Último año" },
            ]}
            value={period}
            onChange={(value) => setPeriod(value as string)}
            className="min-w-[180px]"
          />
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-2xl shadow-[0px_0px_25px_2px_rgba(0,0,0,0.025)] p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Ingresos</h3>
          <div className="h-64 flex items-center justify-center text-gray-400">
            Gráfico de ingresos
          </div>
        </div>

        {/* Orders Chart */}
        <div className="bg-white rounded-2xl shadow-[0px_0px_25px_2px_rgba(0,0,0,0.025)] p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Pedidos</h3>
          <div className="h-64 flex items-center justify-center text-gray-400">
            Gráfico de pedidos
          </div>
        </div>

        {/* Popular Items */}
        <div className="bg-white rounded-2xl shadow-[0px_0px_25px_2px_rgba(0,0,0,0.025)] p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            Productos Más Vendidos
          </h3>
          <div className="space-y-4">
            <p className="text-gray-400 text-center py-8">
              No hay datos disponibles
            </p>
          </div>
        </div>

        {/* Customer Stats */}
        <div className="bg-white rounded-2xl shadow-[0px_0px_25px_2px_rgba(0,0,0,0.025)] p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            Estadísticas de Clientes
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-500">Clientes Nuevos</span>
              <span className="font-medium text-gray-800">0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Clientes Recurrentes</span>
              <span className="font-medium text-gray-800">0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Tasa de Retorno</span>
              <span className="font-medium text-gray-800">0%</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
