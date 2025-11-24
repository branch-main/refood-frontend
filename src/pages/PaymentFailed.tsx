import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  FiXCircle,
  FiShoppingBag,
  FiAlertCircle,
  FiHome,
} from "react-icons/fi";
import { SlArrowLeft } from "react-icons/sl";

interface LocationState {
  message?: string;
  orderId?: string;
}

export const PaymentFailed = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state as LocationState) || {};

  const message = state.message || "No se pudo procesar el pago";
  const orderId = state.orderId;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar matching profile style */}
      <nav className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 h-15 flex items-center px-8 justify-between z-50">
        <Link
          to="/"
          className="flex items-center gap-2 no-underline transition-all duration-200 hover:scale-105"
        >
          <img src="/logo.png" alt="ReFood" className="h-10 w-auto" />
        </Link>
      </nav>

      {/* Main content matching profile layout */}
      <div className="mt-15 mx-20 py-5">
        <div className="bg-white shadow-[0px_0px_25px_2px_rgba(0,0,0,0.025)]">
          {/* Header matching profile page header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <FiXCircle className="text-red-600 text-xl" />
              </div>
              <span className="text-gray-800 font-bold text-lg">
                Pago No Completado
              </span>
            </div>
          </div>

          {/* Content matching profile page content */}
          <div className="px-24 py-12 flex flex-col gap-8">
            {/* Error Message Section */}
            <div className="flex flex-col">
              <div className="p-5 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start gap-4">
                  <FiAlertCircle className="text-red-500 mt-0.5 shrink-0 text-xl" />
                  <div>
                    <h3 className="font-semibold text-red-900 mb-1">
                      ¿Qué sucedió?
                    </h3>
                    <p className="text-red-700 text-sm leading-relaxed">
                      {message}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Info Section */}
            <div className="flex flex-col border-t border-gray-200 pt-8">
              <span className="text-gray-800 text-lg font-bold mb-4 flex items-center gap-2">
                <FiShoppingBag />
                No te preocupes
              </span>
              <div className="space-y-3 px-5">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2"></div>
                  <span className="text-sm text-gray-700">
                    No se realizó ningún cargo a tu cuenta
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2"></div>
                  <span className="text-sm text-gray-700">
                    Tu pedido ha sido cancelado automáticamente
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2"></div>
                  <span className="text-sm text-gray-700">
                    Puedes intentar nuevamente cuando quieras
                  </span>
                </div>
              </div>
            </div>

            {/* Actions Section */}
            <div className="flex flex-col border-t border-gray-200 pt-8">
              <span className="text-gray-800 text-lg font-bold mb-4">
                ¿Qué deseas hacer?
              </span>
              <div className="space-y-3 px-5">
                <button
                  onClick={() => navigate("/profile/orders")}
                  className="w-full flex items-center justify-between px-6 py-4 bg-white hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <FiShoppingBag className="text-red-500" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold">Ver todos mis pedidos</div>
                      <div className="text-sm text-gray-500">
                        Revisa tu historial completo
                      </div>
                    </div>
                  </div>
                  <SlArrowLeft className="text-gray-400 group-hover:text-gray-600 transition-colors rotate-180" />
                </button>

                <button
                  onClick={() => navigate("/restaurants")}
                  className="w-full flex items-center justify-between px-6 py-4 bg-white hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <FiHome className="text-gray-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-gray-800">
                        Volver a restaurantes
                      </div>
                      <div className="text-sm text-gray-500">
                        Explora otros restaurantes
                      </div>
                    </div>
                  </div>
                  <SlArrowLeft className="text-gray-400 group-hover:text-gray-600 transition-colors rotate-180" />
                </button>
              </div>
            </div>

            {/* Help Section */}
            <div className="flex flex-col border-t border-gray-200 pt-8 pb-4">
              <div className="text-center">
                <p className="text-sm text-gray-500">
                  ¿Necesitas ayuda?{" "}
                  <a
                    href="mailto:soporte@refood.com"
                    className="text-red-500 hover:text-red-600 font-semibold hover:underline"
                  >
                    Contáctanos
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
