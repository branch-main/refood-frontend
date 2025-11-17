import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { Card, Button, Input, Loading } from "../components/common";
import { GetOrdersUseCase, CancelOrderUseCase } from "../../application/orders";
import { GetFavoritesUseCase, RemoveFavoriteUseCase } from "../../application/favorites";
import { container } from "../../container";
import { OrderRepository } from "../../domain/repositories/OrderRepository";
import { FavoriteRepository } from "../../domain/repositories/FavoriteRepository";
import { Order } from "../../domain/entities/Order";
import { Favorite } from "../../domain/entities/Favorite";
import { OrderCard } from "../components/orders/OrderCard";
import {
  FiMail,
  FiEdit3,
  FiPhone,
  FiSave,
  FiX,
  FiShoppingBag,
  FiHeart,
  FiSettings,
} from "react-icons/fi";

const getOrders = new GetOrdersUseCase(
  container.resolve<OrderRepository>("OrderRepository"),
);
const cancelOrder = new CancelOrderUseCase(
  container.resolve<OrderRepository>("OrderRepository"),
);
const getFavorites = new GetFavoritesUseCase(
  container.resolve<FavoriteRepository>("FavoriteRepository"),
);
const removeFavorite = new RemoveFavoriteUseCase(
  container.resolve<FavoriteRepository>("FavoriteRepository"),
);

export const Profile = () => {
  const { user, updateUser } = useAuthContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(
    searchParams.get("tab") || "profile",
  );
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [favoritesLoading, setFavoritesLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: user?.firstName || "",
    last_name: user?.lastName || "",
    phone: user?.phone || "",
    email: user?.email || "",
  });

  useEffect(() => {
    const tab = searchParams.get("tab") || "profile";
    setActiveTab(tab);
    fetchOrders();
    fetchFavorites();
  }, [searchParams]);

  const fetchOrders = async () => {
    try {
      setOrdersLoading(true);
      const data = await getOrders.execute();
      setOrders(data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      setOrders([]);
    } finally {
      setOrdersLoading(false);
    }
  };

  const fetchFavorites = async () => {
    try {
      setFavoritesLoading(true);
      const data = await getFavorites.execute();
      setFavorites(data);
    } catch (error) {
      console.error("Failed to fetch favorites:", error);
      setFavorites([]);
    } finally {
      setFavoritesLoading(false);
    }
  };

  const handleRemoveFavorite = async (favoriteId: number) => {
    try {
      await removeFavorite.execute(favoriteId);
      setFavorites(favorites.filter((fav) => fav.id !== favoriteId));
    } catch (error) {
      console.error("Failed to remove favorite:", error);
    }
  };

  const handleOrderAction = async (action: string, orderId: number) => {
    try {
      if (action === "cancel") {
        await cancelOrder.execute(orderId);
        fetchOrders();
      }
    } catch (error) {
      console.error("Failed to perform action:", error);
      alert("Failed to perform action. Please try again.");
    }
  };

  if (!user) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateUser(formData);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      first_name: user.firstName || "",
      last_name: user.lastName || "",
      phone: user.phone || "",
      email: user.email || "",
    });
    setIsEditing(false);
  };

  const changeTab = (tab: string) => {
    setSearchParams({ tab });
  };

  const getUserInitials = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }
    if (user?.firstName) {
      return user.firstName.substring(0, 2).toUpperCase();
    }
    if (user?.email) {
      return user.email.substring(0, 2).toUpperCase();
    }
    return "?";
  };

  return (
    <div className="min-h-[calc(100vh-200px)] bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <Card className="lg:sticky lg:top-20">
              {/* Profile Header */}
              <div className="p-6 text-center border-b border-gray-200">
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-[#B21F1F] to-[#8B1616] flex items-center justify-center text-white text-3xl font-bold shadow-lg mb-4">
                  {getUserInitials()}
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  {user.firstName && user.lastName
                    ? `${user.firstName} ${user.lastName}`
                    : user.email.split("@")[0]}
                </h2>
                <p className="text-sm text-gray-500 mt-1 break-all">
                  {user.email}
                </p>
              </div>

              {/* Navigation */}
              <nav className="p-4">
                <button
                  onClick={() => changeTab("profile")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all mb-2 ${
                    activeTab === "profile"
                      ? "bg-red-50 text-[#B21F1F] font-semibold"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <FiSettings className="text-lg" />
                  <span>Mi Perfil</span>
                </button>
                <button
                  onClick={() => changeTab("orders")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all mb-2 ${
                    activeTab === "orders"
                      ? "bg-red-50 text-[#B21F1F] font-semibold"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <FiShoppingBag className="text-lg" />
                  <span>Mis Pedidos</span>
                  {orders.length > 0 && (
                    <span className="ml-auto bg-[#B21F1F] text-white text-xs px-2 py-0.5 rounded-full">
                      {orders.length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => changeTab("favorites")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                    activeTab === "favorites"
                      ? "bg-red-50 text-[#B21F1F] font-semibold"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <FiHeart className="text-lg" />
                  <span>Favoritos</span>
                  {favorites.length > 0 && (
                    <span className="ml-auto bg-[#B21F1F] text-white text-xs px-2 py-0.5 rounded-full">
                      {favorites.length}
                    </span>
                  )}
                </button>
              </nav>

              {/* Stats */}
              <div className="p-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 uppercase font-semibold mb-3">
                  Estadísticas
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Pedidos</span>
                    <span className="text-sm font-bold text-gray-900">
                      {orders.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Favoritos</span>
                    <span className="text-sm font-bold text-gray-900">
                      {favorites.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Miembro desde</span>
                    <span className="text-sm font-bold text-gray-900">
                      {new Date(user.createdAt || "").getFullYear()}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === "profile" && (
              <Card>
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">
                        Información Personal
                      </h1>
                      <p className="text-sm text-gray-500 mt-1">
                        Gestiona tu información de perfil
                      </p>
                    </div>
                    {!isEditing && (
                      <Button
                        onClick={() => setIsEditing(true)}
                        variant="primary"
                        size="medium"
                      >
                        <FiEdit3 className="inline mr-2" /> Editar
                      </Button>
                    )}
                  </div>
                </div>

                <div className="p-6">
                  {isEditing && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex justify-between items-center">
                      <p className="text-sm text-blue-800">
                        <strong>Modo de edición:</strong> Realiza cambios y
                        guárdalos cuando termines.
                      </p>
                      <div className="flex gap-2">
                        <Button
                          onClick={handleCancel}
                          variant="outline"
                          size="small"
                        >
                          <FiX className="inline mr-1" /> Cancelar
                        </Button>
                        <Button
                          onClick={handleSubmit}
                          loading={loading}
                          variant="primary"
                          size="small"
                        >
                          <FiSave className="inline mr-1" /> Guardar
                        </Button>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          <FiMail className="text-[#B21F1F]" />
                          Correo Electrónico
                        </label>
                        <p className="text-gray-500 bg-gray-100 px-4 py-3 rounded-lg">
                          {user.email}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          No se puede modificar
                        </p>
                      </div>

                      <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          <FiEdit3 className="text-[#B21F1F]" />
                          Nombre
                        </label>
                        {isEditing ? (
                          <Input
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            placeholder="Tu nombre"
                          />
                        ) : (
                          <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-lg">
                            {user.firstName || "No especificado"}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          <FiEdit3 className="text-[#B21F1F]" />
                          Apellido
                        </label>
                        {isEditing ? (
                          <Input
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            placeholder="Tu apellido"
                          />
                        ) : (
                          <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-lg">
                            {user.lastName || "No especificado"}
                          </p>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          <FiPhone className="text-[#B21F1F]" />
                          Teléfono
                        </label>
                        {isEditing ? (
                          <Input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Tu número de teléfono"
                          />
                        ) : (
                          <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-lg">
                            {user.phone || "No especificado"}
                          </p>
                        )}
                      </div>
                    </div>
                  </form>
                </div>
              </Card>
            )}

            {activeTab === "orders" && (
              <Card>
                <div className="p-6 border-b border-gray-200">
                  <h1 className="text-2xl font-bold text-gray-900">
                    Mis Pedidos
                  </h1>
                  <p className="text-sm text-gray-500 mt-1">
                    Rastrea tus pedidos y horarios de recogida
                  </p>
                </div>
                <div className="p-6">
                  {ordersLoading ? (
                    <Loading />
                  ) : orders.length === 0 ? (
                    <div className="text-center py-16 px-8">
                      <FiShoppingBag className="text-6xl text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 mb-4">
                        No tienes pedidos todavía.
                      </p>
                      <Link
                        to="/menu"
                        className="inline-block bg-[#B21F1F] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#8B1616] transition-all"
                      >
                        Explorar Alimentos
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <OrderCard
                          key={order.id}
                          order={order}
                          onAction={handleOrderAction}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            )}

            {activeTab === "favorites" && (
              <Card>
                <div className="p-6 border-b border-gray-200">
                  <h1 className="text-2xl font-bold text-gray-900">
                    Mis Favoritos
                  </h1>
                  <p className="text-sm text-gray-500 mt-1">
                    Acceso rápido a tus lugares favoritos
                  </p>
                </div>
                <div className="p-6">
                  {favoritesLoading ? (
                    <Loading />
                  ) : favorites.length === 0 ? (
                    <div className="text-center py-16 px-8">
                      <FiHeart className="text-6xl text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 mb-4">
                        No has agregado ningún favorito todavía.
                      </p>
                      <Link
                        to="/restaurants"
                        className="inline-block bg-[#B21F1F] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#8B1616] transition-all"
                      >
                        Explorar Restaurantes
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {favorites.map((favorite) => (
                        <div
                          key={favorite.id}
                          className="bg-white rounded-lg border border-gray-200 p-4"
                        >
                          <h3 className="text-lg font-bold mb-2">
                            {favorite.restaurantName}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4">
                            {favorite.restaurantDescription}
                          </p>
                          <button
                            onClick={() => handleRemoveFavorite(favorite.id)}
                            className="w-full bg-red-50 text-red-600 px-4 py-2 rounded-lg font-semibold hover:bg-red-100 transition-colors"
                          >
                            Remover de Favoritos
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
