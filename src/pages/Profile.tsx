import { useAuth } from "@/shared/hooks";
import { getFallbackImage } from "@/shared/utils";
import { useState } from "react";
import { FiUser, FiMail, FiPhone, FiSave } from "react-icons/fi";

export const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  if (!user) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call to update user
    console.log("Update user:", formData);
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setFormData({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phone: user?.phone || "",
    });
    setIsEditing(false);
  };

  return (
    <>
      <div className="p-6 border-b border-gray-200 flex items-center gap-5">
        <span className="text-gray-800 font-bold">Ajustes de cuenta</span>
      </div>

      <div className="px-24 py-12 flex flex-col gap-8">
        {/* Profile Picture Section */}
        <div className="flex flex-col items-center border-b border-gray-200 pb-8">
          <img
            alt={user.firstName}
            src={getFallbackImage(user.firstName, user.image)}
            className="h-24 w-24 rounded-full object-cover shadow-lg border-4 border-white"
          />
          <h2 className="text-2xl font-bold text-gray-800 mt-4">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>

        {/* Personal Information Section */}
        <div className="flex flex-col px-5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-800 text-lg font-bold">
              Información Personal
            </span>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-colors"
              >
                Editar
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <FiUser size={16} />
                  Nombre
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-50 disabled:text-gray-600"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <FiUser size={16} />
                  Apellido
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-50 disabled:text-gray-600"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FiMail size={16} />
                Correo Electrónico
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-50 disabled:text-gray-600"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FiPhone size={16} />
                Teléfono
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-50 disabled:text-gray-600"
              />
            </div>

            {isEditing && (
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
                >
                  <FiSave size={18} />
                  Guardar Cambios
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancelar
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Account Details Section */}
        <div className="flex flex-col border-t border-gray-200 pt-8 px-5">
          <span className="text-gray-800 text-lg font-bold mb-4">
            Detalles de la Cuenta
          </span>
          <div className="space-y-3">
            <div className="flex justify-between py-2">
              <span className="text-sm text-gray-600">Fecha de registro</span>
              <span className="text-sm font-semibold text-gray-800">
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "N/A"}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-sm text-gray-600">Rol</span>
              <span className="text-sm font-semibold text-gray-800 capitalize">
                {user.role}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
