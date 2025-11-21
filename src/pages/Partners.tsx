import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/shared/components/ui";
import {
  FiTrendingUp,
  FiUsers,
  FiDollarSign,
  FiBarChart2,
  FiCheckCircle,
  FiClock,
  FiSmartphone,
  FiPieChart,
  FiZap,
  FiShield,
  FiGlobe,
  FiAward,
} from "react-icons/fi";

export const Partners = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-200px)]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#B21F1F] via-[#9B1919] to-[#8B1616] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.1)_0%,transparent_50%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.08)_0%,transparent_50%)] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl lg:text-6xl font-extrabold mb-6 leading-[1.1] tracking-tight">
                Únete a Nuestra
                <br />
                <span className="bg-gradient-to-r from-yellow-300 via-orange-200 to-yellow-100 bg-clip-text text-transparent">
                  Red de Restaurantes
                </span>
              </h1>

              <p className="text-xl lg:text-2xl mb-8 opacity-95 leading-relaxed">
                Reduce desperdicios, aumenta ingresos y conecta con nuevos
                clientes
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center lg:justify-start">
                <Button
                  size="lg"
                  variant="primary"
                  onClick={() => navigate("/register")}
                >
                  Registrar Mi Restaurante
                </Button>
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={() => window.scrollTo({ top: 600, behavior: "smooth" })}
                >
                  Ver Beneficios
                </Button>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-6 lg:gap-10 flex-wrap">
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
                    5K+
                  </span>
                  <span className="text-sm lg:text-base opacity-90 font-medium">
                    Clientes Activos
                  </span>
                </div>
                <div className="w-px h-12 bg-white/30"></div>
                <div className="flex flex-col">
                  <span className="text-4xl lg:text-5xl font-extrabold leading-none mb-1 bg-gradient-to-br from-white to-yellow-100 bg-clip-text text-transparent">
                    30%
                  </span>
                  <span className="text-sm lg:text-base opacity-90 font-medium">
                    Más Ingresos
                  </span>
                </div>
              </div>
            </div>

            <div className="relative lg:h-[550px] flex items-center justify-center">
              <div className="relative w-full max-w-lg mx-auto">
                <div className="relative rounded-3xl overflow-hidden shadow-[0_25px_50px_rgba(0,0,0,0.4)] border-8 border-white/20 backdrop-blur-sm transform hover:scale-105 transition-transform duration-500">
                  <img
                    src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80"
                    alt="Restaurant partner"
                    className="w-full h-[400px] lg:h-[500px] object-cover"
                  />
                  <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md px-6 py-4 rounded-2xl shadow-2xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg">
                          ✓
                        </div>
                        <div>
                          <div className="text-gray-900 font-bold text-base">
                            Socios Verificados
                          </div>
                          <div className="text-gray-500 text-sm">
                            Crecimiento garantizado
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-4 -right-4 bg-gradient-to-br from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-2xl shadow-2xl font-bold text-lg rotate-6 hover:rotate-0 transition-transform">
                  🚀 Sin Comisiones
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              ¿Por Qué Ser Nuestro Socio?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Convierte excedentes en ingresos mientras ayudas al medio ambiente
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: FiTrendingUp,
                title: "Aumenta Ingresos",
                description:
                  "Convierte alimentos que de otra forma se desperdiciarían en ventas adicionales.",
              },
              {
                icon: FiUsers,
                title: "Nuevos Clientes",
                description:
                  "Alcanza a miles de usuarios activos buscando comida de calidad cerca de ellos.",
              },
              {
                icon: FiDollarSign,
                title: "Sin Comisiones",
                description:
                  "Sin costos ocultos. Mantén el 100% de tus ganancias de excedentes.",
              },
              {
                icon: FiBarChart2,
                title: "Análisis Detallado",
                description:
                  "Dashboard completo con estadísticas de ventas, clientes y rendimiento.",
              },
              {
                icon: FiCheckCircle,
                title: "Fácil Integración",
                description:
                  "Comienza a vender en minutos. Sin equipos especiales ni capacitación compleja.",
              },
              {
                icon: FiClock,
                title: "Flexibilidad Total",
                description:
                  "Tú decides qué ofrecer, cuándo y a qué precio. Control total de tu inventario.",
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

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Cómo Funciona Para Restaurantes
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tres simples pasos para empezar a vender
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: FiSmartphone,
                title: "1. Regístrate",
                description:
                  "Crea tu cuenta y completa el perfil de tu restaurante en minutos.",
                details:
                  "Sin costos iniciales ni contratos a largo plazo",
              },
              {
                icon: FiPieChart,
                title: "2. Publica Ofertas",
                description:
                  "Lista tus excedentes del día con precios reducidos cuando lo necesites.",
                details: "Control total sobre cantidades y horarios",
              },
              {
                icon: FiZap,
                title: "3. Empieza a Vender",
                description:
                  "Los clientes reservan y recogen. Tú recibes el pago instantáneamente.",
                details: "Notificaciones en tiempo real de cada pedido",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-200 hover:border-[#B21F1F]/50 hover:shadow-2xl transition-all"
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-[#B21F1F] to-[#8B1616] rounded-2xl flex items-center justify-center shadow-xl">
                  {React.createElement(step.icon, {
                    className: "text-white text-3xl",
                  })}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">
                  {step.title}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4 text-center font-medium">
                  {step.description}
                </p>
                <p className="text-sm text-gray-500 italic text-center">
                  {step.details}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Características de la Plataforma
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Todo lo que necesitas para gestionar tus excedentes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: FiShield,
                title: "Pagos Seguros",
                description:
                  "Sistema de pago encriptado y seguro. Recibe transferencias directas a tu cuenta.",
              },
              {
                icon: FiGlobe,
                title: "Visibilidad Online",
                description:
                  "Perfil de restaurante optimizado con fotos, horarios y ubicación en mapa.",
              },
              {
                icon: FiAward,
                title: "Soporte Dedicado",
                description:
                  "Equipo de atención al socio disponible por chat, email y teléfono.",
              },
              {
                icon: FiBarChart2,
                title: "Reportes Avanzados",
                description:
                  "Analítica completa de ventas, tendencias y comportamiento de clientes.",
              },
            ].map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="flex gap-6 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#B21F1F] to-[#8B1616] rounded-lg flex items-center justify-center">
                      <IconComponent className="text-white text-xl" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Historias de Éxito
            </h2>
            <p className="text-xl text-gray-600">
              Lo que nuestros socios dicen sobre nosotros
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "La Trattoria Italiana",
                owner: "Marco Rossi",
                comment:
                  "Hemos reducido nuestro desperdicio en un 60% y ganamos €500 extra cada semana. Los clientes nuevos que descubren nuestro restaurante después regresan al precio completo.",
                stats: "€2,000/mes",
              },
              {
                name: "Panadería Artesanal",
                owner: "Carmen López",
                comment:
                  "Ya no tiramos pan al final del día. Lo vendemos a través de ReeFood y nuestros clientes están felices de conseguir productos frescos a buen precio.",
                stats: "€800/mes",
              },
              {
                name: "Sushi Express",
                owner: "Kenji Tanaka",
                comment:
                  "La plataforma es súper fácil de usar. Publicamos nuestro excedente en 2 minutos y se vende todo en una hora. Excelente forma de evitar pérdidas.",
                stats: "€1,500/mes",
              },
            ].map((story, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">
                      ⭐
                    </span>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  "{story.comment}"
                </p>
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-gray-900 text-lg">
                        {story.name}
                      </div>
                      <div className="text-sm text-gray-500">{story.owner}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[#B21F1F] font-bold text-xl">
                        {story.stats}
                      </div>
                      <div className="text-xs text-gray-500">Ingreso extra</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#B21F1F] to-[#8B1616] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1)_0%,transparent_50%)] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-6">
            ¿Listo Para Unirte?
          </h2>
          <p className="text-xl lg:text-2xl mb-8 opacity-90">
            Comienza a convertir excedentes en ganancias hoy mismo
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate("/register")}
            >
              Registrar Mi Restaurante
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => (window.location.href = "mailto:partners@reefood.com")}
            >
              Contactar Equipo de Ventas
            </Button>
          </div>
          <p className="text-sm opacity-75 mt-6">
            Sin costos de instalación • Sin comisiones • Comienza en minutos
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Preguntas Frecuentes Para Socios
            </h2>
            <p className="text-xl text-gray-600">
              Respuestas a las preguntas más comunes
            </p>
          </div>
          <div className="space-y-4">
            {[
              {
                question: "¿Cuánto cuesta unirse a ReeFood?",
                answer:
                  "Es completamente gratis. No hay costos de registro, mensualidades ni comisiones. Solo pagas una pequeña tarifa de procesamiento de pagos estándar de la industria.",
              },
              {
                question: "¿Qué tipo de alimentos puedo vender?",
                answer:
                  "Cualquier excedente de comida fresca, preparada o productos de panadería que de otra forma se desperdiciaría al final del día. Todo debe cumplir con estándares de calidad y seguridad alimentaria.",
              },
              {
                question: "¿Cómo funciona el sistema de pagos?",
                answer:
                  "Los clientes pagan a través de la plataforma cuando hacen su reserva. Nosotros transferimos tu dinero a tu cuenta bancaria semanalmente. Puedes ver todas las transacciones en tu dashboard.",
              },
              {
                question: "¿Necesito equipo especial?",
                answer:
                  "No. Solo necesitas un smartphone o computadora con conexión a internet. Nuestra plataforma es 100% web-based, sin necesidad de instalar software.",
              },
              {
                question: "¿Puedo pausar o cancelar en cualquier momento?",
                answer:
                  "Sí, tienes control total. Puedes pausar publicaciones en cualquier momento o darte de baja sin penalización alguna. No hay contratos a largo plazo.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-6 border border-gray-200"
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
