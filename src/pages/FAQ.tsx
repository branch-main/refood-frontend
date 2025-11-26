import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdHome } from "react-icons/io";
import { FiChevronDown, FiSearch, FiMessageCircle } from "react-icons/fi";

const FAQ_CATEGORIES = [
  {
    title: "Pedidos",
    icon: "🛒",
    questions: [
      {
        question: "¿Cómo puedo realizar un pedido?",
        answer: "Es muy sencillo: navega por los restaurantes disponibles, selecciona los platos que desees añadiendo las opciones de personalización, agrégalos al carrito y cuando estés listo, procede al pago. Una vez confirmado, podrás seguir el estado de tu pedido en tiempo real.",
      },
      {
        question: "¿Puedo modificar mi pedido después de confirmarlo?",
        answer: "Una vez confirmado el pedido, solo puedes modificarlo si el restaurante aún no ha comenzado a prepararlo. Para intentar modificar, ve a 'Mis Pedidos' y contacta al restaurante directamente o comunícate con nuestro soporte.",
      },
      {
        question: "¿Cómo cancelo un pedido?",
        answer: "Puedes cancelar tu pedido desde la sección 'Mis Pedidos' siempre que el restaurante no haya comenzado a prepararlo (estado 'Pendiente' o 'Confirmado'). Si ya está en preparación, contacta a nuestro equipo de soporte para asistencia.",
      },
      {
        question: "¿Qué hago si mi pedido llega incompleto o incorrecto?",
        answer: "Lamentamos el inconveniente. Por favor, contacta a nuestro equipo de soporte inmediatamente con fotos del pedido recibido. Investigaremos el caso y te ofreceremos una solución que puede incluir reembolso parcial o total, o crédito para futuros pedidos.",
      },
      {
        question: "¿Puedo programar un pedido para más tarde?",
        answer: "Actualmente estamos trabajando en la funcionalidad de pedidos programados. Por el momento, todos los pedidos se procesan para entrega inmediata. ¡Mantente atento a nuestras actualizaciones!",
      },
    ],
  },
  {
    title: "Pagos",
    icon: "💳",
    questions: [
      {
        question: "¿Cuáles son los métodos de pago aceptados?",
        answer: "Aceptamos tarjetas de crédito y débito (Visa, Mastercard, American Express) y PayPal. Todas las transacciones son procesadas de forma segura a través de proveedores de pago certificados.",
      },
      {
        question: "¿Cómo aplico un código de descuento?",
        answer: "Durante el proceso de checkout, encontrarás un campo para ingresar tu código de descuento. Una vez ingresado, el descuento se aplicará automáticamente al total de tu pedido si el código es válido.",
      },
      {
        question: "¿Por qué falló mi pago?",
        answer: "Los pagos pueden fallar por varias razones: fondos insuficientes, tarjeta expirada, datos incorrectos, o bloqueo por seguridad. Verifica los datos ingresados y el estado de tu tarjeta. Si el problema persiste, contacta a tu banco o intenta con otro método de pago.",
      },
      {
        question: "¿Cómo solicito un reembolso?",
        answer: "Para solicitar un reembolso, ve a 'Mis Pedidos', selecciona el pedido en cuestión y elige 'Solicitar reembolso'. También puedes contactar directamente a nuestro soporte. Los reembolsos se procesan en 5-10 días hábiles dependiendo de tu banco.",
      },
      {
        question: "¿Es seguro pagar en ReFood?",
        answer: "¡Absolutamente! Utilizamos encriptación SSL y procesadores de pago certificados PCI DSS. Nunca almacenamos los datos completos de tu tarjeta. Tu seguridad es nuestra prioridad.",
      },
    ],
  },
  {
    title: "Entregas",
    icon: "🚴",
    questions: [
      {
        question: "¿En qué zonas hacen entregas?",
        answer: "Operamos en varias ciudades y zonas metropolitanas. Ingresa tu dirección en la página principal o durante el proceso de pedido para verificar si tenemos cobertura en tu ubicación.",
      },
      {
        question: "¿Cuál es el tiempo promedio de entrega?",
        answer: "El tiempo de entrega varía según el restaurante, la distancia y la demanda actual. En promedio, los pedidos llegan entre 25 y 45 minutos. Verás un tiempo estimado específico antes de confirmar tu pedido.",
      },
      {
        question: "¿Puedo cambiar la dirección de entrega después de ordenar?",
        answer: "Si el repartidor aún no ha recogido tu pedido, puedes intentar cambiar la dirección contactando a soporte. Una vez que el pedido está en camino, no es posible modificar la dirección por seguridad.",
      },
      {
        question: "¿Qué pasa si no estoy en casa cuando llegue el repartidor?",
        answer: "El repartidor intentará contactarte por teléfono. Si no logra comunicarse después de varios intentos y pasa el tiempo de espera, el pedido podría cancelarse. Recomendamos estar disponible durante el tiempo estimado de entrega.",
      },
      {
        question: "¿Cuánto cuesta el envío?",
        answer: "El costo de envío varía según la distancia y el restaurante. Generalmente oscila entre S/1.90 y S/5.00. Verás el costo exacto antes de confirmar tu pedido. Algunos restaurantes ofrecen envío gratis en pedidos superiores a cierto monto.",
      },
    ],
  },
  {
    title: "Cuenta",
    icon: "👤",
    questions: [
      {
        question: "¿Cómo creo una cuenta?",
        answer: "Haz clic en 'Registrarse' en la esquina superior derecha. Completa el formulario con tu nombre, correo electrónico y contraseña. También puedes registrarte usando tu cuenta de Google para mayor comodidad.",
      },
      {
        question: "¿Cómo cambio mi contraseña?",
        answer: "Ve a tu perfil, selecciona 'Configuración de cuenta' y luego 'Cambiar contraseña'. Necesitarás ingresar tu contraseña actual antes de establecer una nueva.",
      },
      {
        question: "¿Cómo actualizo mis datos personales?",
        answer: "Accede a tu perfil y haz clic en 'Editar perfil'. Desde ahí puedes actualizar tu nombre, número de teléfono y otras preferencias personales.",
      },
      {
        question: "¿Cómo administro mis direcciones guardadas?",
        answer: "En tu perfil, ve a la sección 'Mis direcciones'. Desde ahí puedes agregar nuevas direcciones, editar las existentes, eliminarlas o establecer una como predeterminada.",
      },
      {
        question: "¿Cómo elimino mi cuenta?",
        answer: "Para eliminar tu cuenta, contacta a nuestro equipo de soporte. Ten en cuenta que esta acción es irreversible y perderás todo tu historial de pedidos, direcciones guardadas y créditos disponibles.",
      },
    ],
  },
  {
    title: "Restaurantes",
    icon: "🍽️",
    questions: [
      {
        question: "¿Cómo se califican los restaurantes?",
        answer: "Las calificaciones provienen de clientes reales que han completado pedidos. Después de cada entrega, los usuarios pueden calificar su experiencia del 1 al 5 y dejar comentarios sobre la comida y el servicio.",
      },
      {
        question: "¿Cómo puedo registrar mi restaurante en ReFood?",
        answer: "Si tienes un restaurante y quieres unirte a nuestra plataforma, visita nuestra página 'Únete como socio' o contáctanos directamente. Nuestro equipo te guiará en el proceso de registro.",
      },
      {
        question: "¿Los precios en ReFood son los mismos que en el restaurante?",
        answer: "Los restaurantes establecen sus propios precios en la plataforma. Pueden ser iguales o ligeramente diferentes a los del local físico. Siempre verás los precios actualizados antes de ordenar.",
      },
      {
        question: "¿Puedo hacer pedidos de múltiples restaurantes?",
        answer: "Actualmente, cada pedido debe ser de un solo restaurante para garantizar la mejor calidad y tiempo de entrega. Si deseas comida de varios lugares, deberás realizar pedidos separados.",
      },
    ],
  },
];

const FAQItem = ({ question, answer, isOpen, onToggle }: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) => (
  <div className="border-b border-gray-100 last:border-0">
    <button
      onClick={onToggle}
      className="w-full py-5 flex items-start justify-between gap-4 text-left hover:text-red-600 transition-colors"
    >
      <span className="font-semibold text-gray-900 group-hover:text-red-600">{question}</span>
      <FiChevronDown
        className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
      />
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          <p className="pb-5 text-gray-600 leading-relaxed">{answer}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(0);
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  const filteredQuestions = searchQuery.trim()
    ? FAQ_CATEGORIES.flatMap((cat) =>
        cat.questions.filter(
          (q) =>
            q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            q.answer.toLowerCase().includes(searchQuery.toLowerCase())
        ).map((q) => ({ ...q, category: cat.title }))
      )
    : [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-red-50 via-white to-orange-50/50 overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-72 h-72 bg-orange-100 rounded-full blur-3xl opacity-50" />
        
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="flex items-center justify-center gap-2 text-xs text-gray-600 mb-6">
              <IoMdHome className="w-4 h-4" />
              <span>ReFood</span>
              <span>•</span>
              <span>Preguntas Frecuentes</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-gray-900">
              Preguntas{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">
                Frecuentes
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Encuentra respuestas a las dudas más comunes sobre nuestro servicio
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiSearch className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar una pregunta..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all outline-none bg-white shadow-lg shadow-gray-200/50"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Search Results */}
      {searchQuery.trim() && (
        <section className="max-w-4xl mx-auto px-4 md:px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <h2 className="font-bold text-gray-900 mb-4">
              {filteredQuestions.length} resultado{filteredQuestions.length !== 1 ? "s" : ""} para "{searchQuery}"
            </h2>
            {filteredQuestions.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {filteredQuestions.map((q, index) => (
                  <FAQItem
                    key={index}
                    question={q.question}
                    answer={q.answer}
                    isOpen={openQuestion === q.question}
                    onToggle={() => setOpenQuestion(openQuestion === q.question ? null : q.question)}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No encontramos resultados. Intenta con otros términos o contacta a soporte.</p>
            )}
          </motion.div>
        </section>
      )}

      {/* FAQ Categories */}
      {!searchQuery.trim() && (
        <section className="max-w-7xl mx-auto px-4 md:px-6 py-12">
          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
            {FAQ_CATEGORIES.map((category, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(index)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold whitespace-nowrap transition-all ${
                  activeCategory === index
                    ? "bg-red-600 text-white shadow-lg shadow-red-600/20"
                    : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.title}</span>
              </button>
            ))}
          </div>

          {/* Questions List */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8"
              >
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
                  <span className="text-3xl">{FAQ_CATEGORIES[activeCategory].icon}</span>
                  <h2 className="text-2xl font-bold text-gray-900">{FAQ_CATEGORIES[activeCategory].title}</h2>
                </div>
                <div className="divide-y divide-gray-100">
                  {FAQ_CATEGORIES[activeCategory].questions.map((item, index) => (
                    <FAQItem
                      key={index}
                      question={item.question}
                      answer={item.answer}
                      isOpen={openQuestion === item.question}
                      onToggle={() => setOpenQuestion(openQuestion === item.question ? null : item.question)}
                    />
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Contact Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-gradient-to-br from-red-600 to-orange-600 rounded-2xl p-6 text-white"
                >
                  <FiMessageCircle className="w-10 h-10 mb-4" />
                  <h3 className="text-xl font-bold mb-2">¿No encontraste tu respuesta?</h3>
                  <p className="text-white/80 mb-4 text-sm">
                    Nuestro equipo de soporte está listo para ayudarte con cualquier duda.
                  </p>
                  <Link
                    to="/contact"
                    className="inline-block bg-white text-red-600 font-bold px-6 py-3 rounded-xl hover:bg-gray-100 transition-all w-full text-center"
                  >
                    Contactar soporte
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
                >
                  <h3 className="font-bold text-gray-900 mb-4">Enlaces útiles</h3>
                  <div className="space-y-3">
                    <Link to="/help" className="block text-gray-600 hover:text-red-600 transition-colors text-sm">
                      → Centro de Ayuda
                    </Link>
                    <Link to="/terms" className="block text-gray-600 hover:text-red-600 transition-colors text-sm">
                      → Términos de Servicio
                    </Link>
                    <Link to="/privacy" className="block text-gray-600 hover:text-red-600 transition-colors text-sm">
                      → Política de Privacidad
                    </Link>
                    <Link to="/partner-info" className="block text-gray-600 hover:text-red-600 transition-colors text-sm">
                      → Únete como socio
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
