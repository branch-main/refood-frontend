import { useAuthContext } from '../contexts/AuthContext';
import { Card } from '../components/common';
import { formatDate } from '../utils';

export const ProfilePage = () => {
  const { user } = useAuthContext();

  if (!user) return null;

  return (
    <div className="py-8">
      <div className="max-w-3xl mx-auto px-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Mi Perfil</h1>
        </div>

        <Card>
          <div className="flex flex-col items-center gap-8">
            <div className="flex justify-center">
              <div className="w-30 h-30 rounded-full bg-gradient-to-br from-[#B21F1F] to-[#8B1616] text-white flex items-center justify-center text-5xl font-bold">
                {user.username.charAt(0).toUpperCase()}
              </div>
            </div>

            <div className="w-full flex flex-col gap-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg sm:flex-col sm:items-start sm:gap-2">
                <span className="font-semibold text-gray-500">Usuario:</span>
                <span className="text-gray-900 font-medium">{user.username}</span>
              </div>

              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg sm:flex-col sm:items-start sm:gap-2">
                <span className="font-semibold text-gray-500">Correo:</span>
                <span className="text-gray-900 font-medium">{user.email}</span>
              </div>

              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg sm:flex-col sm:items-start sm:gap-2">
                <span className="font-semibold text-gray-500">Tipo de Cuenta:</span>
                <span className="text-gray-900 font-medium">
                  <span className="bg-[#B21F1F] text-white px-3 py-1 rounded text-sm capitalize">{user.user_type}</span>
                </span>
              </div>

              {user.first_name && (
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg sm:flex-col sm:items-start sm:gap-2">
                  <span className="font-semibold text-gray-500">Nombre:</span>
                  <span className="text-gray-900 font-medium">
                    {user.first_name} {user.last_name}
                  </span>
                </div>
              )}

              {user.phone && (
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg sm:flex-col sm:items-start sm:gap-2">
                  <span className="font-semibold text-gray-500">Teléfono:</span>
                  <span className="text-gray-900 font-medium">{user.phone}</span>
                </div>
              )}

              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg sm:flex-col sm:items-start sm:gap-2">
                <span className="font-semibold text-gray-500">Miembro Desde:</span>
                <span className="text-gray-900 font-medium">{formatDate(user.created_at)}</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
