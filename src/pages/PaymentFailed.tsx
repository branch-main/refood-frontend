import { useLocation, useNavigate } from "react-router-dom";
import { FiXCircle, FiShoppingBag, FiAlertCircle } from "react-icons/fi";
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl shadow-gray-200/50 overflow-hidden">
          {/* Header with Red Gradient */}
          <div className="bg-gradient-to-br from-red-500 via-red-600 to-red-700 p-8 text-center relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3"></div>
            
            {/* Icon */}
            <div className="relative z-10 inline-flex items-center justify-center w-24 h-24 bg-white rounded-full mb-4 shadow-xl">
              <FiXCircle className="text-red-600 text-5xl" />
            </div>
            
            {/* Title */}
            <h1 className="relative z-10 text-3xl font-bold text-white mb-2">
              Pago No Completado
            </h1>
            <p className="relative z-10 text-red-100 text-lg">
              Tu pedido no pudo ser procesado
            </p>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Error Message */}
            <div className="mb-8 p-5 bg-red-50 border-2 border-red-100 rounded-2xl flex items-start gap-4">
              <FiAlertCircle className="text-red-500 mt-0.5 shrink-0 text-2xl" />
              <div>
                <h3 className="font-semibold text-red-900 mb-1">
                  ¿Qué sucedió?
                </h3>
                <p className="text-red-700 text-sm leading-relaxed">
                  {message}
                </p>
              </div>
            </div>

            {/* Info Box */}
            <div className="mb-8 p-5 bg-blue-50 border border-blue-100 rounded-2xl">
              <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                <FiShoppingBag className="text-blue-600" />
                No te preocupes
              </h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>No se realizó ningún cargo a tu cuenta</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Tu pedido ha sido cancelado automáticamente</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Puedes intentar nuevamente cuando quieras</span>
                </li>
              </ul>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              {orderId && (
                <button
                  onClick={() => navigate(`/profile/orders/${orderId}`)}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow"
                >
                  <SlArrowLeft className="text-lg" />
                  Ver detalles del pedido
                </button>
              )}
              
              <button
                onClick={() => navigate("/profile/orders")}
                className="w-full bg-[#B21F1F] hover:bg-[#9B1919] text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                <FiShoppingBag className="text-xl" />
                Ver mis pedidos
              </button>

              <button
                onClick={() => navigate("/restaurants")}
                className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-4 px-6 rounded-xl transition-all duration-200 border-2 border-gray-200 hover:border-gray-300 flex items-center justify-center gap-2"
              >
                <SlArrowLeft className="text-lg" />
                Volver a restaurantes
              </button>
            </div>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            ¿Necesitas ayuda?{" "}
            <a
              href="mailto:soporte@refood.com"
              className="text-[#B21F1F] hover:underline font-semibold"
            >
              Contáctanos
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
