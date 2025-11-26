import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { IoMdHome } from "react-icons/io";
import { 
  FiShoppingBag, 
  FiCreditCard, 
  FiUser, 
  FiTruck, 
  FiSearch, 
  FiMessageCircle,
  FiChevronRight,
  FiPhone,
  FiMail,
  FiClock
} from "react-icons/fi";

const HELP_CATEGORIES = [
  {
    icon: FiShoppingBag,
    title: "Pedidos",
    description: "Rastrear pedidos, modificaciones, cancelaciones y reembolsos",
    color: "bg-blue-50 text-blue-600",
    articles: [
      "¿Cómo rastreo mi pedido?",
      "¿Puedo modificar mi pedido después de confirmarlo?",
      "¿Cómo cancelo un pedido?",
      "Mi pedido llegó incompleto o incorrecto",
      "¿Cuánto tarda en llegar mi pedido?",
    ],
  },
  {
    icon: FiCreditCard,
    title: "Pagos",
    description: "Métodos de pago, facturación, reembolsos y promociones",
    color: "bg-green-50 text-green-600",
    articles: [
      "¿Qué métodos de pago aceptan?",
      "¿Cómo aplico un código de descuento?",
      "¿Por qué falló mi pago?",
      "¿Cómo solicito un reembolso?",
      "¿Puedo pagar en efectivo?",
    ],
  },
  {
    icon: FiUser,
    title: "Mi cuenta",
    description: "Perfil, contraseñas, direcciones y preferencias",
    color: "bg-purple-50 text-purple-600",
    articles: [
      "¿Cómo cambio mi contraseña?",
      "¿Cómo actualizo mis datos personales?",
      "¿Cómo agrego o edito direcciones?",
      "¿Cómo elimino mi cuenta?",
      "No recibo los correos de confirmación",
    ],
  },
  {
    icon: FiTruck,
    title: "Entregas",
    description: "Zonas de cobertura, tiempos de entrega y problemas",
    color: "bg-orange-50 text-orange-600",
    articles: [
      "¿En qué zonas hacen entregas?",
      "¿Cuál es el tiempo promedio de entrega?",
      "Mi pedido no ha llegado",
      "¿Puedo cambiar la dirección de entrega?",
      "¿Hacen entregas programadas?",
    ],
  },
];

const POPULAR_QUESTIONS = [
  {
    question: "¿Cómo rastreo mi pedido?",
    answer: "Puedes rastrear tu pedido en tiempo real desde la sección 'Mis Pedidos' en tu perfil. Recibirás notificaciones de cada actualización de estado.",
  },
  {
    question: "¿Qué métodos de pago aceptan?",
    answer: "Aceptamos tarjetas de crédito y débito (Visa, Mastercard, American Express) y PayPal. Todas las transacciones son procesadas de forma segura.",
  },
  {
    question: "¿Cómo cancelo un pedido?",
    answer: "Puedes cancelar tu pedido desde 'Mis Pedidos' siempre que el restaurante no haya comenzado a prepararlo. Si ya está en preparación, contacta a soporte.",
  },
  {
    question: "¿Cuánto tiempo tarda la entrega?",
    answer: "El tiempo de entrega varía según el restaurante y tu ubicación. Generalmente oscila entre 25 y 45 minutos. Puedes ver el tiempo estimado antes de confirmar tu pedido.",
  },
];

export const Help = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

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
              <span>Centro de Ayuda</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-gray-900">
              ¿En qué podemos{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">
                ayudarte?
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Encuentra respuestas rápidas o contacta a nuestro equipo de soporte.
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
                placeholder="Buscar en el centro de ayuda..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all outline-none bg-white shadow-lg shadow-gray-200/50"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 -mt-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {HELP_CATEGORIES.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all cursor-pointer group"
              onClick={() => setExpandedCategory(expandedCategory === category.title ? null : category.title)}
            >
              <div className={`w-14 h-14 ${category.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <category.icon className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">{category.title}</h3>
              <p className="text-sm text-gray-500 mb-4">{category.description}</p>
              
              {expandedCategory === category.title && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 pt-4 border-t border-gray-100"
                >
                  <ul className="space-y-2">
                    {category.articles.map((article, i) => (
                      <li key={i}>
                        <button className="text-sm text-gray-600 hover:text-red-600 transition-colors text-left flex items-center gap-2 w-full">
                          <FiChevronRight className="w-3 h-3 flex-shrink-0" />
                          {article}
                        </button>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Popular Questions */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Preguntas frecuentes
          </h2>
          <p className="text-gray-600">
            Las respuestas más buscadas por nuestra comunidad
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {POPULAR_QUESTIONS.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-shadow"
            >
              <h3 className="font-bold text-gray-900 mb-3">{item.question}</h3>
              <p className="text-gray-600 text-sm">{item.answer}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/faq"
            className="inline-flex items-center gap-2 text-red-600 font-semibold hover:text-red-700 transition-colors"
          >
            Ver todas las preguntas frecuentes
            <FiChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Contact Options */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ¿Necesitas más ayuda?
            </h2>
            <p className="text-gray-600">
              Nuestro equipo de soporte está disponible para asistirte
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gray-50 rounded-2xl p-6 text-center hover:bg-red-50 transition-colors"
            >
              <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                <FiMessageCircle className="w-7 h-7 text-red-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Chat en vivo</h3>
              <p className="text-sm text-gray-600 mb-4">
                Respuesta inmediata de nuestro equipo
              </p>
              <span className="inline-flex items-center gap-1 text-xs text-green-600 bg-green-50 px-3 py-1 rounded-full">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                En línea ahora
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-50 rounded-2xl p-6 text-center hover:bg-red-50 transition-colors"
            >
              <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                <FiMail className="w-7 h-7 text-red-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Envíanos un correo</h3>
              <p className="text-sm text-gray-600 mb-4">
                Te respondemos en menos de 24 horas
              </p>
              <a href="mailto:soporte@refood.com" className="text-sm text-red-600 font-medium hover:text-red-700">
                soporte@refood.com
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gray-50 rounded-2xl p-6 text-center hover:bg-red-50 transition-colors"
            >
              <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                <FiPhone className="w-7 h-7 text-red-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Llámanos</h3>
              <p className="text-sm text-gray-600 mb-4">
                Lun - Vie, 9:00 AM - 6:00 PM
              </p>
              <a href="tel:+51999999999" className="text-sm text-red-600 font-medium hover:text-red-700">
                +51 999 999 999
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-red-600 to-orange-600 rounded-3xl p-8 md:p-12"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                ¿No encontraste lo que buscabas?
              </h3>
              <p className="text-white/80">
                Contáctanos directamente y resolveremos tu consulta.
              </p>
            </div>
            <Link
              to="/contact"
              className="bg-white text-red-600 font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition-all shadow-lg flex-shrink-0"
            >
              Contactar soporte
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};
