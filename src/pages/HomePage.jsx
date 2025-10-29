import { useNavigate } from 'react-router-dom';
import { Button } from '../components/common';

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-200px)]">
      <section className="relative bg-gradient-to-br from-[#B21F1F] to-[#8B1616] text-white py-24 px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.1)_0%,transparent_50%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.08)_0%,transparent_50%)] pointer-events-none"></div>
        
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="text-left lg:text-left text-center">
            <div className="inline-block bg-white/20 backdrop-blur-md px-5 py-2 rounded-full text-sm font-semibold mb-6 border border-white/30 animate-[fadeInUp_0.6s_ease-out]">
              ♻️ Sostenible • Económico • Delicioso
            </div>
            <h1 className="text-5xl lg:text-6xl font-extrabold mb-6 leading-tight tracking-tight animate-[fadeInUp_0.8s_ease-out]">
              Reduce el Desperdicio de Alimentos,<br />
              <span className="bg-gradient-to-r from-white to-red-50 bg-clip-text text-transparent">Ahorra Dinero</span>
            </h1>
            <p className="text-lg mb-10 opacity-95 leading-relaxed animate-[fadeInUp_1s_ease-out]">
              Descubre alimentos excedentes de restaurantes locales a precios con descuento.
              Ayuda a reducir el desperdicio mientras disfrutas de excelentes comidas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-[fadeInUp_1.2s_ease-out]">
              <Button 
                size="large" 
                onClick={() => navigate('/listings')}
                className="bg-white !text-[#B21F1F] border-2 border-white font-semibold shadow-[0_4px_14px_rgba(0,0,0,0.2)] hover:!bg-white/95 hover:!shadow-[0_6px_20px_rgba(0,0,0,0.25)] hover:!-translate-y-0.5 !px-8 !py-4 !rounded-xl !text-lg transition-all"
              >
                Explorar Alimentos
              </Button>
              <Button 
                size="large" 
                variant="outline" 
                onClick={() => navigate('/restaurants')}
                className="bg-white/10 !text-white border-2 border-white/50 backdrop-blur-md font-semibold hover:!bg-white/20 hover:!border-white hover:!-translate-y-0.5 !px-8 !py-4 !rounded-xl !text-lg transition-all"
              >
                Ver Restaurantes
              </Button>
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-8 flex-wrap animate-[fadeInUp_1.4s_ease-out]">
              <div className="flex flex-col gap-1">
                <span className="text-3xl font-extrabold leading-none">50%</span>
                <span className="text-sm opacity-90">Descuento</span>
              </div>
              <div className="w-px h-10 bg-white/30"></div>
              <div className="flex flex-col gap-1">
                <span className="text-3xl font-extrabold leading-none">100+</span>
                <span className="text-sm opacity-90">Restaurantes</span>
              </div>
              <div className="w-px h-10 bg-white/30"></div>
              <div className="flex flex-col gap-1">
                <span className="text-3xl font-extrabold leading-none">1000+</span>
                <span className="text-sm opacity-90">Comidas Salvadas</span>
              </div>
            </div>
          </div>
          <div className="animate-[fadeInRight_1s_ease-out]">
            <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.3)] transform perspective-1000 lg:rotate-y-[-5deg] hover:rotate-y-0 hover:scale-105 transition-transform duration-600">
              <img 
                src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80" 
                alt="Delicious food" 
                className="w-full h-[500px] lg:h-[500px] object-cover block"
              />
              <div className="absolute bottom-5 left-5 bg-white/95 backdrop-blur-md px-6 py-3 rounded-full flex items-center gap-2 shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
                <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">✓</span>
                <span className="text-gray-800 font-semibold text-sm">Calidad Garantizada</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-8">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Cómo Funciona</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-10 bg-white rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all duration-300 border border-black/5 hover:-translate-y-2 hover:shadow-[0_12px_24px_rgba(178,31,31,0.15)] hover:border-[#B21F1F]/20">
              <div className="text-6xl mb-6 inline-block transition-transform duration-300 hover:scale-110 hover:rotate-[5deg]">🔍</div>
              <h3 className="text-2xl mb-4 text-gray-900 font-semibold">Explorar</h3>
              <p className="text-gray-500 leading-relaxed">Descubre alimentos excedentes de restaurantes cerca de ti a precios con descuento</p>
            </div>
            <div className="text-center p-10 bg-white rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all duration-300 border border-black/5 hover:-translate-y-2 hover:shadow-[0_12px_24px_rgba(178,31,31,0.15)] hover:border-[#B21F1F]/20">
              <div className="text-6xl mb-6 inline-block transition-transform duration-300 hover:scale-110 hover:rotate-[5deg]">🛒</div>
              <h3 className="text-2xl mb-4 text-gray-900 font-semibold">Ordenar</h3>
              <p className="text-gray-500 leading-relaxed">Reserva tus comidas y paga de forma segura a través de nuestra plataforma</p>
            </div>
            <div className="text-center p-10 bg-white rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all duration-300 border border-black/5 hover:-translate-y-2 hover:shadow-[0_12px_24px_rgba(178,31,31,0.15)] hover:border-[#B21F1F]/20">
              <div className="text-6xl mb-6 inline-block transition-transform duration-300 hover:scale-110 hover:rotate-[5deg]">📦</div>
              <h3 className="text-2xl mb-4 text-gray-900 font-semibold">Recoger</h3>
              <p className="text-gray-500 leading-relaxed">Recoge tu pedido en el horario programado del restaurante</p>
            </div>
            <div className="text-center p-10 bg-white rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all duration-300 border border-black/5 hover:-translate-y-2 hover:shadow-[0_12px_24px_rgba(178,31,31,0.15)] hover:border-[#B21F1F]/20">
              <div className="text-6xl mb-6 inline-block transition-transform duration-300 hover:scale-110 hover:rotate-[5deg]">♻️</div>
              <h3 className="text-2xl mb-4 text-gray-900 font-semibold">Ahorrar</h3>
              <p className="text-gray-500 leading-relaxed">Ahorra dinero mientras ayudas a reducir el desperdicio de alimentos y proteger el medio ambiente</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 px-8">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-10 bg-white rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all duration-300 border border-black/5 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)]">
              <div className="text-5xl font-extrabold text-[#B21F1F] mb-2">50%</div>
              <div className="text-gray-500">Ahorro Promedio</div>
            </div>
            <div className="text-center p-10 bg-white rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all duration-300 border border-black/5 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)]">
              <div className="text-5xl font-extrabold text-[#B21F1F] mb-2">1000+</div>
              <div className="text-gray-500">Comidas Salvadas</div>
            </div>
            <div className="text-center p-10 bg-white rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all duration-300 border border-black/5 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)]">
              <div className="text-5xl font-extrabold text-[#B21F1F] mb-2">500kg</div>
              <div className="text-gray-500">Desperdicio Prevenido</div>
            </div>
            <div className="text-center p-10 bg-white rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all duration-300 border border-black/5 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)]">
              <div className="text-5xl font-extrabold text-[#B21F1F] mb-2">100+</div>
              <div className="text-gray-500">Restaurantes Asociados</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-8 text-center">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">¿Listo para Comenzar?</h2>
          <p className="text-xl text-gray-500 mb-8">
            Únete a miles de personas combatiendo el desperdicio de alimentos y ahorrando dinero
          </p>
          <Button size="large" onClick={() => navigate('/register')}>
            Regístrate Ahora
          </Button>
        </div>
      </section>
    </div>
  );
};
