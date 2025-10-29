import { useNavigate } from "react-router-dom";
import { Button } from "../components/common";

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-200px)]">
      <section className="relative bg-gradient-to-br from-[#B21F1F] via-[#9B1919] to-[#8B1616] text-white overflow-hidden">
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
                  size="large"
                  onClick={() => navigate("/listings")}
                  className="bg-white !text-[#B21F1F] font-bold shadow-lg hover:!bg-gray-50 hover:!shadow-xl !px-8 !py-4 !rounded-xl !text-lg transition-all"
                >
                  Explorar Alimentos
                </Button>
                <Button
                  size="large"
                  onClick={() => navigate("/restaurants")}
                  className="bg-[#8B1616] !text-white font-bold shadow-lg hover:!bg-[#6B1212] hover:!shadow-xl !px-8 !py-4 !rounded-xl !text-lg transition-all"
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

      <section className="py-16 px-8">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Cómo Funciona
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-10 bg-white rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all duration-300 border border-black/5 hover:-translate-y-2 hover:shadow-[0_12px_24px_rgba(178,31,31,0.15)] hover:border-[#B21F1F]/20">
              <div className="text-6xl mb-6 inline-block transition-transform duration-300 hover:scale-110 hover:rotate-[5deg]">
                🔍
              </div>
              <h3 className="text-2xl mb-4 text-gray-900 font-semibold">
                Explorar
              </h3>
              <p className="text-gray-500 leading-relaxed">
                Descubre alimentos excedentes de restaurantes cerca de ti a
                precios con descuento
              </p>
            </div>
            <div className="text-center p-10 bg-white rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all duration-300 border border-black/5 hover:-translate-y-2 hover:shadow-[0_12px_24px_rgba(178,31,31,0.15)] hover:border-[#B21F1F]/20">
              <div className="text-6xl mb-6 inline-block transition-transform duration-300 hover:scale-110 hover:rotate-[5deg]">
                🛒
              </div>
              <h3 className="text-2xl mb-4 text-gray-900 font-semibold">
                Ordenar
              </h3>
              <p className="text-gray-500 leading-relaxed">
                Reserva tus comidas y paga de forma segura a través de nuestra
                plataforma
              </p>
            </div>
            <div className="text-center p-10 bg-white rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all duration-300 border border-black/5 hover:-translate-y-2 hover:shadow-[0_12px_24px_rgba(178,31,31,0.15)] hover:border-[#B21F1F]/20">
              <div className="text-6xl mb-6 inline-block transition-transform duration-300 hover:scale-110 hover:rotate-[5deg]">
                📦
              </div>
              <h3 className="text-2xl mb-4 text-gray-900 font-semibold">
                Recoger
              </h3>
              <p className="text-gray-500 leading-relaxed">
                Recoge tu pedido en el horario programado del restaurante
              </p>
            </div>
            <div className="text-center p-10 bg-white rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all duration-300 border border-black/5 hover:-translate-y-2 hover:shadow-[0_12px_24px_rgba(178,31,31,0.15)] hover:border-[#B21F1F]/20">
              <div className="text-6xl mb-6 inline-block transition-transform duration-300 hover:scale-110 hover:rotate-[5deg]">
                ♻️
              </div>
              <h3 className="text-2xl mb-4 text-gray-900 font-semibold">
                Ahorrar
              </h3>
              <p className="text-gray-500 leading-relaxed">
                Ahorra dinero mientras ayudas a reducir el desperdicio de
                alimentos y proteger el medio ambiente
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 px-8">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-10 bg-white rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all duration-300 border border-black/5 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)]">
              <div className="text-5xl font-extrabold text-[#B21F1F] mb-2">
                50%
              </div>
              <div className="text-gray-500">Ahorro Promedio</div>
            </div>
            <div className="text-center p-10 bg-white rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all duration-300 border border-black/5 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)]">
              <div className="text-5xl font-extrabold text-[#B21F1F] mb-2">
                1000+
              </div>
              <div className="text-gray-500">Comidas Salvadas</div>
            </div>
            <div className="text-center p-10 bg-white rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all duration-300 border border-black/5 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)]">
              <div className="text-5xl font-extrabold text-[#B21F1F] mb-2">
                500kg
              </div>
              <div className="text-gray-500">Desperdicio Prevenido</div>
            </div>
            <div className="text-center p-10 bg-white rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all duration-300 border border-black/5 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)]">
              <div className="text-5xl font-extrabold text-[#B21F1F] mb-2">
                100+
              </div>
              <div className="text-gray-500">Restaurantes Asociados</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-8 text-center">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            ¿Listo para Comenzar?
          </h2>
          <p className="text-xl text-gray-500 mb-8">
            Únete a miles de personas combatiendo el desperdicio de alimentos y
            ahorrando dinero
          </p>
          <Button size="large" onClick={() => navigate("/register")}>
            Regístrate Ahora
          </Button>
        </div>
      </section>
    </div>
  );
};
