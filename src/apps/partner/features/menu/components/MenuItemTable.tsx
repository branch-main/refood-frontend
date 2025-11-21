import { MenuItem } from "@/shared/types";
import { formatPrice, getFallbackImage } from "@/shared/utils";
import { useNavigate } from "react-router-dom";

export const MenuItemTable = ({ items }: { items: MenuItem[] }) => {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full border-collapse overflow-hidden">
        <thead className="text-center text-gray-400 text-xs uppercase">
          <th className="pb-2 text-left">Producto</th>
          <th className="pb-2">Precio</th>
          <th className="pb-2">Estado</th>
          <th className="pb-2">Opciones</th>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {items.map((item) => (
            <tr key={item.id} className="text-sm">
              <td
                className="py-2 text-gray-800 inline-flex items-center gap-3 cursor-pointer"
                onClick={() => navigate(`/menu/${item.id}`)}
              >
                <img
                  alt={item.name}
                  src={getFallbackImage(item.name, item.image)}
                  className="w-12 h-12 rounded-xl shadow-sm object-cover"
                />
                <div className="flex flex-col">
                  <span className="font-bold">{item.name}</span>
                  <span className="text-gray-500 text-xs line-clamp-1">
                    {item.description}
                  </span>
                </div>
              </td>

              <td className="py-2 text-center text-gray-800">
                {formatPrice(item.price)}
              </td>

              <td className="py-2 text-center">
                <span
                  className={`py-1 px-2 rounded-xl text-xs font-medium ${item.isAvailable ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}
                >
                  {item.isAvailable ? "Disponible" : "No disponible"}
                </span>
              </td>

              <td className="py-2 text-gray-800 text-center">
                {item.options.length}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
