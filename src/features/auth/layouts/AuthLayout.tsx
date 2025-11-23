import { Link, Outlet } from "react-router-dom";
import { FiCheck } from "react-icons/fi";

const features = [
  {
    title: "Gestión en tiempo real",
    desc: "Controla todos los pedidos instantáneamente",
  },
  {
    title: "Análisis inteligente",
    desc: "Obtén insights sobre tu negocio",
  },
  {
    title: "Fácil de usar",
    desc: "Interface intuitiva y moderna",
  },
];

export const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex">
      <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-red-600 via-red-500 to-orange-500 p-8 overflow-hidden sticky top-0 h-screen">
        <div className="absolute inset-0 bg-black/20 " />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

        <div className="relative z-10 flex flex-col justify-between w-full text-white">
          <div>
            <Link to="/" className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl">
                🍽️
              </div>
              <span className="text-3xl font-bold">ReeFood</span>
            </Link>
          </div>

          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold mb-4 leading-tight">
                Administra tu negocio de comida con facilidad
              </h1>
              <p className="text-lg text-white/90 leading-relaxed">
                Gestiona pedidos, menús y entregas desde una plataforma moderna
                y eficiente.
              </p>
            </div>

            <div className="space-y-4">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                    <FiCheck className="text-base" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm text-white/80">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-sm text-white/70">
            © 2024 ReeFood. Todos los derechos reservados.
          </div>
        </div>
      </div>

      <main className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-lg">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
