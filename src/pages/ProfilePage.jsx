import { useState } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import { Card, Button, Input } from '../components/common';
import { formatDate } from '../utils';
import { 
  FiMail, 
  FiUser, 
  FiEdit3, 
  FiPhone, 
  FiTag, 
  FiCalendar,
  FiSave,
  FiX,
  FiEdit,
  FiShoppingBag,
  FiHeart,
  FiDollarSign,
  FiBarChart2
} from 'react-icons/fi';

export const ProfilePage = () => {
  const { user, updateUser } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    phone: user?.phone || '',
    email: user?.email || '',
  });

  if (!user) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateUser(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      first_name: user.first_name || '',
      last_name: user.last_name || '',
      phone: user.phone || '',
      email: user.email || '',
    });
    setIsEditing(false);
  };

  return (
    <div className="py-12 bg-gradient-to-br from-gray-50 to-gray-100 min-h-[calc(100vh-200px)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="overflow-hidden shadow-xl">
          {/* Header Banner */}
          <div className="relative bg-gradient-to-r from-[#B21F1F] via-[#9d1a1a] to-[#8B1616] h-40">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVHJhbnNmb3JtPSJyb3RhdGUoNDUpIj48cGF0aCBkPSJNLTEwIDMwaDYwIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IGZpbGw9InVybCgjYSkiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiLz48L3N2Zz4=')] opacity-50"></div>
          </div>

          {/* Profile Content */}
          <div className="px-8 pb-10">
            {/* Avatar and Basic Info */}
            <div className="flex flex-col items-center -mt-20 mb-8">
              <div className="relative">
                <div className="w-40 h-40 rounded-full bg-gradient-to-br from-[#B21F1F] to-[#8B1616] text-white flex items-center justify-center text-6xl font-bold border-8 border-white shadow-2xl">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <div className="absolute bottom-2 right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white"></div>
              </div>
              <h2 className="mt-5 text-3xl font-extrabold text-gray-900">{user.username}</h2>
              <div className="mt-3 flex items-center gap-2">
                <span className="inline-flex items-center gap-2 bg-gradient-to-r from-[#B21F1F] to-[#8B1616] text-white px-5 py-2 rounded-full text-sm font-bold capitalize shadow-lg">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                  {user.user_type}
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-500">Miembro desde {formatDate(user.created_at)}</p>
            </div>

            {/* Edit Mode Toggle */}
            {!isEditing ? (
              <div className="flex justify-center mb-8">
                <Button
                  onClick={() => setIsEditing(true)}
                  className="bg-[#B21F1F] !text-white hover:!bg-[#8B1616] shadow-lg px-8 py-3 !rounded-full"
                  size="large"
                >
                  <FiEdit className="inline mr-2" /> Editar Perfil
                </Button>
              </div>
            ) : (
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-8">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white flex-shrink-0 mt-1">
                      <FiEdit3 size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg mb-1">Modo de Edición</h3>
                      <p className="text-gray-600 text-sm">Realiza los cambios necesarios y guarda cuando termines.</p>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Button
                      onClick={handleCancel}
                      variant="outline"
                      className="!border-gray-300 !text-gray-700 hover:!bg-gray-100 !rounded-full"
                    >
                      <FiX className="inline mr-1" /> Cancelar
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      loading={loading}
                      className="bg-green-600 !text-white hover:!bg-green-700 shadow-md !rounded-full"
                    >
                      <FiSave className="inline mr-1" /> Guardar Cambios
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Divider */}
            <div className="mb-8 border-t border-gray-200"></div>

            {/* Information Grid */}
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email */}
                <div className={`bg-white p-6 rounded-2xl border-2 transition-all shadow-sm ${isEditing ? 'border-blue-300 bg-blue-50/30' : 'border-gray-100 hover:border-gray-200'}`}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg flex-shrink-0">
                      <FiMail />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">Correo Electrónico</p>
                      {isEditing ? (
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="!mt-0"
                          required
                        />
                      ) : (
                        <p className="text-gray-900 font-semibold text-lg break-all">{user.email}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Username (Read-only) */}
                <div className="bg-white p-6 rounded-2xl border-2 border-gray-100 hover:border-gray-200 transition-all shadow-sm opacity-75">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg flex-shrink-0">
                      <FiUser />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">Nombre de Usuario</p>
                      <p className="text-gray-900 font-semibold text-lg">{user.username}</p>
                      <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                        <span className="inline-block w-3 h-3 bg-gray-300 rounded-full"></span>
                        No se puede modificar
                      </p>
                    </div>
                  </div>
                </div>

                {/* First Name */}
                <div className={`bg-white p-6 rounded-2xl border-2 transition-all shadow-sm ${isEditing ? 'border-blue-300 bg-blue-50/30' : 'border-gray-100 hover:border-gray-200'}`}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg flex-shrink-0">
                      <FiEdit3 />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">Nombre</p>
                      {isEditing ? (
                        <Input
                          type="text"
                          name="first_name"
                          value={formData.first_name}
                          onChange={handleChange}
                          placeholder="Tu nombre"
                          className="!mt-0"
                        />
                      ) : (
                        <p className="text-gray-900 font-semibold text-lg">{user.first_name || 'No especificado'}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Last Name */}
                <div className={`bg-white p-6 rounded-2xl border-2 transition-all shadow-sm ${isEditing ? 'border-blue-300 bg-blue-50/30' : 'border-gray-100 hover:border-gray-200'}`}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg flex-shrink-0">
                      <FiEdit3 />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">Apellido</p>
                      {isEditing ? (
                        <Input
                          type="text"
                          name="last_name"
                          value={formData.last_name}
                          onChange={handleChange}
                          placeholder="Tu apellido"
                          className="!mt-0"
                        />
                      ) : (
                        <p className="text-gray-900 font-semibold text-lg">{user.last_name || 'No especificado'}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className={`bg-white p-6 rounded-2xl border-2 transition-all shadow-sm ${isEditing ? 'border-blue-300 bg-blue-50/30' : 'border-gray-100 hover:border-gray-200'}`}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg flex-shrink-0">
                      <FiPhone />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">Teléfono</p>
                      {isEditing ? (
                        <Input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Tu número de teléfono"
                          className="!mt-0"
                        />
                      ) : (
                        <p className="text-gray-900 font-semibold text-lg">{user.phone || 'No especificado'}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Account Type (Read-only) */}
                <div className="bg-white p-6 rounded-2xl border-2 border-gray-100 hover:border-gray-200 transition-all shadow-sm opacity-75">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg flex-shrink-0">
                      <FiTag />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">Tipo de Cuenta</p>
                      <p className="text-gray-900 font-semibold text-lg capitalize">{user.user_type}</p>
                      <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                        <span className="inline-block w-3 h-3 bg-gray-300 rounded-full"></span>
                        No se puede modificar
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Statistics Section */}
              <div className="mt-10 pt-8 border-t border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <FiBarChart2 className="text-[#B21F1F]" />
                  Estadísticas de la Cuenta
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <FiShoppingBag className="text-green-600" />
                      <p className="text-green-600 text-sm font-semibold uppercase tracking-wide">Pedidos</p>
                    </div>
                    <p className="text-4xl font-extrabold text-green-700">0</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <FiHeart className="text-blue-600" />
                      <p className="text-blue-600 text-sm font-semibold uppercase tracking-wide">Favoritos</p>
                    </div>
                    <p className="text-4xl font-extrabold text-blue-700">0</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border border-purple-200">
                    <div className="flex items-center gap-2 mb-2">
                      <FiDollarSign className="text-purple-600" />
                      <p className="text-purple-600 text-sm font-semibold uppercase tracking-wide">Ahorro Total</p>
                    </div>
                    <p className="text-4xl font-extrabold text-purple-700">€0</p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};
