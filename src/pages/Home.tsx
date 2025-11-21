import { useNavigate } from "react-router-dom";
import { Button } from "@/shared/components/ui";
import {
  FiSearch,
  FiShoppingCart,
  FiPackage,
  FiSmile,
  FiDollarSign,
  FiGlobe,
  FiMapPin,
  FiZap,
  FiCheckCircle,
  FiGift,
  FiTrendingUp,
  FiRefreshCw,
  FiHome,
} from "react-icons/fi";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-200px)]">
      <section className="relative bg-linear-to-br from-[#B21F1F] via-[#9B1919] to-[#8B1616] text-white overflow-hidden">
        {/* Animated background patterns */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.1)_0%,transparent_50%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.08)_0%,transparent_50%)] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.03)_50%,transparent_100%)] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-6 leading-[1.1] tracking-tight">
                Combate el
                <br />
                <span className="bg-gradient-to-r from-yellow-300 via-orange-200 to-yellow-100 bg-clip-text text-transparent">
                  Desperdicio de Alimentos
                </span>
              </h1>

              <p className="text-xl lg:text-2xl mb-8 opacity-95 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Descubre alimentos excedentes de restaurantes locales con hasta{" "}
                <span className="font-bold text-yellow-300">
                  50% de descuento
                </span>
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center lg:justify-start">
                <Button
                  size="lg"
                  variant="primary"
                  onClick={() => navigate("/menu")}
                >
                  Explorar Alimentos
                </Button>
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={() => navigate("/restaurants")}
                >
                  Ver Restaurantes
                </Button>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-center lg:justify-start gap-6 lg:gap-10 flex-wrap">
                <div className="flex flex-col">
                  <span className="text-4xl lg:text-5xl font-extrabold leading-none mb-1 bg-gradient-to-br from-white to-yellow-100 bg-clip-text text-transparent">
                    50%
                  </span>
                  <span className="text-sm lg:text-base opacity-90 font-medium">
                    Descuento
                  </span>
                </div>
                <div className="w-px h-12 bg-white/30"></div>
                <div className="flex flex-col">
                  <span className="text-4xl lg:text-5xl font-extrabold leading-none mb-1 bg-gradient-to-br from-white to-yellow-100 bg-clip-text text-transparent">
                    100+
                  </span>
                  <span className="text-sm lg:text-base opacity-90 font-medium">
                    Restaurantes
                  </span>
                </div>
                <div className="w-px h-12 bg-white/30"></div>
                <div className="flex flex-col">
                  <span className="text-4xl lg:text-5xl font-extrabold leading-none mb-1 bg-gradient-to-br from-white to-yellow-100 bg-clip-text text-transparent">
                    1K+
                  </span>
                  <span className="text-sm lg:text-base opacity-90 font-medium">
                    Comidas Salvadas
                  </span>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative lg:h-[550px] flex items-center justify-center">
              <div className="relative w-full max-w-lg mx-auto">
                {/* Main Image */}
                <div className="relative rounded-3xl overflow-hidden shadow-[0_25px_50px_rgba(0,0,0,0.4)] border-8 border-white/20 backdrop-blur-sm transform hover:scale-105 transition-transform duration-500">
                  <img
                    src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80"
                    alt="Delicious food"
                    className="w-full h-[400px] lg:h-[500px] object-cover"
                  />
                  {/* Overlay Badge */}
                  <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md px-6 py-4 rounded-2xl shadow-2xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg">
                          ✓
                        </div>
                        <div>
                          <div className="text-gray-900 font-bold text-base">
                            Calidad Garantizada
                          </div>
                          <div className="text-gray-500 text-sm">
                            Alimentos frescos y deliciosos
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-br from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-2xl shadow-2xl font-bold text-lg rotate-6 hover:rotate-0 transition-transform">
                  🔥 Hasta -50%
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Cómo Funciona
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Cuatro pasos simples para comenzar a ahorrar hoy
            </p>
          </div>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-green-200 via-purple-200 to-orange-200 -translate-y-1/2 z-0"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {[
                {
                  icon: FiSearch,
                  title: "Busca",
                  description:
                    "Encuentra restaurantes cerca de ti con alimentos disponibles",
                  color: "from-blue-500 to-blue-600",
                  details: "Filtra por ubicación, tipo de comida y precio",
                },
                {
                  icon: FiShoppingCart,
                  title: "Reserva",
                  description:
                    "Selecciona y reserva tu comida favorita al instante",
                  color: "from-green-500 to-green-600",
                  details: "Pago seguro y confirmación inmediata",
                },
                {
                  icon: FiPackage,
                  title: "Recoge",
                  description: "Visita el restaurante en el horario indicado",
                  color: "from-purple-500 to-purple-600",
                  details: "Muestra tu código QR y recoge tu pedido",
                },
                {
                  icon: FiSmile,
                  title: "Disfruta",
                  description: "Saborea tu comida mientras ayudas al planeta",
                  color: "from-orange-500 to-orange-600",
                  details: "Ahorra dinero y reduce desperdicios",
                },
              ].map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <div key={index} className="relative">
                    {/* Number Badge */}
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-[#B21F1F] rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg z-20 border-4 border-white">
                      {index + 1}
                    </div>

                    <div className="bg-white border-2 border-gray-200 rounded-3xl p-8 text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-3 hover:border-[#B21F1F]/50 h-full pt-12">
                      {/* Icon */}
                      <div
                        className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-xl transform hover:rotate-6 transition-transform`}
                      >
                        <IconComponent className="text-white text-4xl" />
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-700 leading-relaxed mb-4 font-medium">
                        {step.description}
                      </p>

                      {/* Details */}
                      <p className="text-sm text-gray-500 italic">
                        {step.details}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA Below Steps */}
          <div className="mt-16 text-center">
            <Button
              size="lg"
              variant="primary"
              onClick={() => navigate("/register")}
            >
              Empezar Ahora - Es Gratis
            </Button>
            <p className="text-sm text-gray-500 mt-3">
              No se requiere tarjeta de crédito
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Por Qué Elegirnos
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              La manera más fácil y conveniente de combatir el desperdicio de
              alimentos
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: FiDollarSign,
                title: "Ahorra Hasta 50%",
                description:
                  "Disfruta de comida deliciosa a precios increíbles. Ahorra dinero mientras ayudas al planeta.",
              },
              {
                icon: FiGlobe,
                title: "Impacto Ambiental",
                description:
                  "Cada comida que salvas previene emisiones de CO2 y reduce el desperdicio de alimentos.",
              },
              {
                icon: FiMapPin,
                title: "Restaurantes Locales",
                description:
                  "Apoya a negocios locales mientras descubres nuevos lugares favoritos en tu ciudad.",
              },
              {
                icon: FiZap,
                title: "Fácil y Rápido",
                description:
                  "Busca, reserva y recoge tu comida en minutos. Simple, conveniente y sin complicaciones.",
              },
              {
                icon: FiCheckCircle,
                title: "Calidad Garantizada",
                description:
                  "Solo excedentes de alta calidad. Los mismos estándares que esperarías al precio completo.",
              },
              {
                icon: FiGift,
                title: "Descubre Variedades",
                description:
                  "Prueba nuevos platillos y cocinas que quizás nunca habrías explorado antes.",
              },
            ].map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl hover:border-[#B21F1F]/30 transition-all"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-[#B21F1F] to-[#8B1616] rounded-xl flex items-center justify-center mb-4 shadow-md">
                    <IconComponent className="text-white text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-[#B21F1F] to-[#8B1616] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1)_0%,transparent_50%)] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold mb-4">Nuestro Impacto</h2>
            <p className="text-xl opacity-90">
              Juntos estamos marcando la diferencia cada día
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                value: "50%",
                label: "Ahorro Promedio",
                icon: FiDollarSign,
                sublabel: "En cada compra",
              },
              {
                value: "1000+",
                label: "Comidas Salvadas",
                icon: FiTrendingUp,
                sublabel: "Este mes",
              },
              {
                value: "500kg",
                label: "Desperdicio Prevenido",
                icon: FiRefreshCw,
                sublabel: "De CO2 evitado",
              },
              {
                value: "100+",
                label: "Restaurantes",
                icon: FiHome,
                sublabel: "En tu ciudad",
              },
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20 hover:bg-white/20 transition-all"
                >
                  <div className="w-12 h-12 mx-auto mb-3 bg-white/20 rounded-xl flex items-center justify-center">
                    <IconComponent className="text-white text-2xl" />
                  </div>
                  <div className="text-4xl lg:text-5xl font-extrabold mb-2">
                    {stat.value}
                  </div>
                  <div className="font-semibold mb-1">{stat.label}</div>
                  <div className="text-sm opacity-75">{stat.sublabel}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Lo Que Dicen Nuestros Usuarios
            </h2>
            <p className="text-xl text-gray-600">
              Miles de personas ya están ahorrando y ayudando al planeta
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "María García",
                role: "Usuario Frecuente",
                comment:
                  "He ahorrado más de 200€ en los últimos 3 meses. ¡Es increíble poder comer bien y ayudar al medio ambiente!",
                rating: 5,
              },
              {
                name: "Carlos Rodríguez",
                role: "Restaurador",
                comment:
                  "Como dueño de restaurante, esta plataforma nos ha ayudado a reducir desperdicios y conectar con nuevos clientes.",
                rating: 5,
              },
              {
                name: "Ana Martínez",
                role: "Estudiante",
                comment:
                  "Perfecto para mi presupuesto estudiantil. Comida de calidad a precios que puedo pagar. ¡Totalmente recomendado!",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg border border-gray-200"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">
                      ⭐
                    </span>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonial.comment}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#B21F1F] to-[#8B1616] flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Preguntas Frecuentes
            </h2>
            <p className="text-xl text-gray-600">
              Todo lo que necesitas saber sobre ReeFood
            </p>
          </div>
          <div className="space-y-4">
            {[
              {
                question: "¿Qué tipo de alimentos puedo encontrar?",
                answer:
                  "Encontrarás una variedad de alimentos frescos y de calidad, desde comidas preparadas hasta productos de panadería. Todos son excedentes del día que los restaurantes no pueden vender al precio completo.",
              },
              {
                question: "¿Cómo funcionan los pagos?",
                answer:
                  "Paga de forma segura a través de nuestra plataforma usando tarjeta de crédito o débito. El pago se procesa solo cuando confirmas tu reserva.",
              },
              {
                question: "¿Puedo elegir qué alimentos recibo?",
                answer:
                  "Depende del restaurante. Algunos ofrecen paquetes sorpresa mientras otros te permiten elegir artículos específicos. Siempre verás los detalles antes de hacer tu pedido.",
              },
              {
                question: "¿Qué pasa si no puedo recoger mi pedido?",
                answer:
                  "Puedes cancelar hasta 2 horas antes del horario de recogida programado para un reembolso completo. Después de eso, no se permiten cancelaciones.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md border border-gray-200"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
