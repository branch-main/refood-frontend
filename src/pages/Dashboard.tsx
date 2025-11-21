import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/shared/hooks";
import { Card, Button } from "@/shared/components/ui";
import {
  FiShoppingBag,
  FiHeart,
  FiTrendingUp,
  FiClock,
  FiMapPin,
  FiStar,
  FiArrowRight,
  FiDollarSign,
  FiPackage,
  FiGift,
} from "react-icons/fi";

export const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

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

  // Mock data - replace with real data
  const stats = [
    {
      label: "Pedidos Totales",
      value: "24",
      icon: FiShoppingBag,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      change: "+3 este mes",
    },
    {
      label: "Total Ahorrado",
      value: "€127",
      icon: FiDollarSign,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      change: "+€23 este mes",
    },
    {
      label: "Comidas Salvadas",
      value: "32",
      icon: FiPackage,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      change: "4.2kg CO2 evitado",
    },
    {
      label: "Restaurantes Favoritos",
      value: "8",
      icon: FiHeart,
      color: "from-[#B21F1F] to-[#8B1616]",
      bgColor: "bg-red-50",
      textColor: "text-[#B21F1F]",
      change: "+2 nuevos",
    },
  ];

  const recentOrders = [
    {
      id: 1,
      restaurant: "Pizza Napolitana",
      items: "2 pizzas + bebidas",
      date: "Hoy, 14:30",
      status: "Listo para recoger",
      statusColor: "text-green-600 bg-green-50",
      amount: "€12.50",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=100&q=80",
    },
    {
      id: 2,
      restaurant: "Sushi Paradise",
      items: "Box sorpresa",
      date: "Ayer, 19:00",
      status: "Completado",
      statusColor: "text-gray-600 bg-gray-50",
      amount: "€15.00",
      image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=100&q=80",
    },
    {
      id: 3,
      restaurant: "Panadería Artesana",
      items: "Pan y bollería",
      date: "Hace 2 días",
      status: "Completado",
      statusColor: "text-gray-600 bg-gray-50",
      amount: "€5.50",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=100&q=80",
    },
  ];

  const favoriteRestaurants = [
    {
      id: 1,
      name: "Pizza Napolitana",
      rating: 4.8,
      distance: "0.5 km",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&q=80",
      available: true,
    },
    {
      id: 2,
      name: "Sushi Paradise",
      rating: 4.9,
      distance: "1.2 km",
      image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=200&q=80",
      available: true,
    },
    {
      id: 3,
      name: "Café Delicioso",
      rating: 4.7,
      distance: "0.8 km",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200&q=80",
      available: false,
    },
    {
      id: 4,
      name: "Panadería Artesana",
      rating: 4.6,
      distance: "1.5 km",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&q=80",
      available: true,
    },
  ];

  const quickActions = [
    {
      title: "Explorar Menú",
      description: "Descubre nuevas ofertas",
      icon: FiGift,
      color: "from-orange-500 to-orange-600",
      action: () => navigate("/menu"),
    },
    {
      title: "Ver Restaurantes",
      description: "Encuentra lugares cerca",
      icon: FiMapPin,
      color: "from-blue-500 to-blue-600",
      action: () => navigate("/restaurants"),
    },
  ];

  return (
    <div className="min-h-[calc(100vh-200px)] bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900">
                ¡Hola{user?.firstName ? `, ${user.firstName}` : ""}! 👋
              </h1>
              <p className="text-gray-600 mt-1">
                Bienvenido a tu panel de control
              </p>
            </div>
            <div className="hidden md:block">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#B21F1F] to-[#8B1616] flex items-center justify-center text-white text-xl font-bold shadow-lg">
                {getUserInitials()}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card
                key={index}
                className="relative overflow-hidden hover:shadow-xl transition-all"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-md`}
                    >
                      <IconComponent className="text-white text-xl" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-600 font-medium">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-extrabold text-gray-900">
                      {stat.value}
                    </p>
                    <p className={`text-xs font-semibold ${stat.textColor}`}>
                      {stat.change}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Recent Orders & Quick Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickActions.map((action, index) => {
                const IconComponent = action.icon;
                return (
                  <Card
                    key={index}
                    className="cursor-pointer hover:shadow-xl transition-all group"
                    onClick={action.action}
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-[#B21F1F] transition-colors">
                            {action.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {action.description}
                          </p>
                        </div>
                        <div
                          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}
                        >
                          <IconComponent className="text-white text-xl" />
                        </div>
                      </div>
                      <div className="mt-4 flex items-center text-[#B21F1F] font-semibold text-sm group-hover:gap-2 transition-all">
                        <span>Explorar ahora</span>
                        <FiArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Recent Orders */}
            <Card>
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#B21F1F] to-[#8B1616] flex items-center justify-center">
                      <FiClock className="text-white text-lg" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        Pedidos Recientes
                      </h2>
                      <p className="text-sm text-gray-500">
                        Tus últimas órdenes
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="small"
                    onClick={() => navigate("/profile?tab=orders")}
                  >
                    Ver todos
                  </Button>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => navigate(`/orders/${order.id}`)}
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={order.image}
                        alt={order.restaurant}
                        className="w-16 h-16 rounded-lg object-cover shadow-md"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-bold text-gray-900 mb-1">
                              {order.restaurant}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {order.items}
                            </p>
                          </div>
                          <span className="text-lg font-bold text-gray-900 whitespace-nowrap ml-4">
                            {order.amount}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 mt-3">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${order.statusColor}`}
                          >
                            {order.status}
                          </span>
                          <span className="text-xs text-gray-500">
                            {order.date}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column - Favorites */}
          <div className="lg:col-span-1">
            <Card className="lg:sticky lg:top-20">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#B21F1F] to-[#8B1616] flex items-center justify-center">
                    <FiHeart className="text-white text-lg" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Favoritos
                    </h2>
                    <p className="text-sm text-gray-500">Tus lugares top</p>
                  </div>
                </div>
              </div>
              <div className="p-4 space-y-3">
                {favoriteRestaurants.map((restaurant) => (
                  <div
                    key={restaurant.id}
                    className="group flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all cursor-pointer"
                    onClick={() => navigate(`/restaurants/${restaurant.id}`)}
                  >
                    <div className="relative">
                      <img
                        src={restaurant.image}
                        alt={restaurant.name}
                        className="w-16 h-16 rounded-lg object-cover shadow-md"
                      />
                      {restaurant.available && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 truncate group-hover:text-[#B21F1F] transition-colors">
                        {restaurant.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1">
                          <FiStar className="text-yellow-500 text-xs" />
                          <span className="text-xs font-semibold text-gray-700">
                            {restaurant.rating}
                          </span>
                        </div>
                        <span className="text-gray-300">•</span>
                        <div className="flex items-center gap-1">
                          <FiMapPin className="text-gray-400 text-xs" />
                          <span className="text-xs text-gray-600">
                            {restaurant.distance}
                          </span>
                        </div>
                      </div>
                      {restaurant.available && (
                        <span className="inline-block mt-1 text-xs font-semibold text-green-600">
                          Disponible ahora
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-gray-200">
                <Button
                  variant="outline"
                  size="small"
                  className="w-full"
                  onClick={() => navigate("/profile?tab=favorites")}
                >
                  Ver todos los favoritos
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Impact Banner */}
        <Card className="mt-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#B21F1F] to-[#8B1616] opacity-5"></div>
          <div className="relative p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
                  🌍 Tu Impacto Ambiental
                </h2>
                <p className="text-gray-600 mb-4">
                  Has salvado <strong>32 comidas</strong> y evitado{" "}
                  <strong>4.2kg de CO2</strong> este mes. ¡Sigue así!
                </p>
                <div className="flex items-center justify-center md:justify-start gap-4 flex-wrap">
                  <div className="text-center">
                    <div className="text-3xl font-extrabold bg-gradient-to-br from-[#B21F1F] to-[#8B1616] bg-clip-text text-transparent">
                      32
                    </div>
                    <div className="text-xs text-gray-600 font-medium">
                      Comidas
                    </div>
                  </div>
                  <div className="text-gray-300">•</div>
                  <div className="text-center">
                    <div className="text-3xl font-extrabold bg-gradient-to-br from-green-600 to-green-700 bg-clip-text text-transparent">
                      4.2kg
                    </div>
                    <div className="text-xs text-gray-600 font-medium">
                      CO2 Evitado
                    </div>
                  </div>
                  <div className="text-gray-300">•</div>
                  <div className="text-center">
                    <div className="text-3xl font-extrabold bg-gradient-to-br from-blue-600 to-blue-700 bg-clip-text text-transparent">
                      €127
                    </div>
                    <div className="text-xs text-gray-600 font-medium">
                      Ahorrados
                    </div>
                  </div>
                </div>
              </div>
              <div className="shrink-0">
                <Button
                  variant="primary"
                  size="large"
                  onClick={() => navigate("/menu")}
                >
                  Continuar Ahorrando
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
