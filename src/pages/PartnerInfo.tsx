import { Link } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { FiCheck, FiChevronRight } from "react-icons/fi";
import { BsFillStarFill } from "react-icons/bs";
import { motion } from "framer-motion";

const BENEFITS = [
  {
    title: "Mayor visibilidad",
    description: "Llega a miles de clientes potenciales que buscan opciones como la tuya cada día.",
  },
  {
    title: "Gestión simplificada",
    description: "Panel de control intuitivo para gestionar tu menú, pedidos y estadísticas en tiempo real.",
  },
  {
    title: "Pagos seguros",
    description: "Recibe pagos de forma segura y rápida directamente en tu cuenta bancaria.",
  },
  {
    title: "Soporte dedicado",
    description: "Equipo de soporte disponible para ayudarte en todo momento con cualquier consulta.",
  },
  {
    title: "Marketing incluido",
    description: "Promocionamos tu restaurante en nuestra plataforma y redes sociales sin costo adicional.",
  },
  {
    title: "Sin exclusividad",
    description: "Puedes seguir operando con otras plataformas sin ninguna restricción.",
  },
];

const STEPS = [
  {
    number: "1",
    title: "Solicita tu registro",
    description: "Completa el formulario de contacto con los datos de tu restaurante.",
  },
  {
    number: "2",
    title: "Verificación",
    description: "Nuestro equipo verificará la información y te contactará en 24-48 horas.",
  },
  {
    number: "3",
    title: "Configuración",
    description: "Te ayudamos a configurar tu menú, precios y horarios de atención.",
  },
  {
    number: "4",
    title: "¡A vender!",
    description: "Tu restaurante estará visible para miles de clientes hambrientos.",
  },
];

const TESTIMONIALS = [
  {
    name: "María García",
    restaurant: "La Cocina de María",
    text: "Desde que me uní a ReFood, mis ventas aumentaron un 40%. La plataforma es muy fácil de usar.",
    rating: 5,
  },
  {
    name: "Carlos Mendoza",
    restaurant: "Tacos El Patrón",
    text: "El soporte es excelente, siempre están disponibles para ayudar. Lo recomiendo totalmente.",
    rating: 5,
  },
];

export const PartnerInfo = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-neutral-50 pb-12"
    >
      {/* Hero */}
      <div className="bg-red-50 border-b border-red-100">
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="flex items-center gap-2 text-xs text-gray-600 mb-4">
              <IoMdHome className="w-4 h-4" />
              <span>ReFood</span>
              <span>•</span>
              <span>Socios</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Haz crecer tu restaurante con ReFood
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Únete a la red de restaurantes más grande de la región y llega a miles de nuevos clientes cada día.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact?reason=partner"
                className="bg-red-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-red-700 transition-colors text-center"
              >
                Solicitar asociación
              </Link>
              <a
                href="#benefits"
                className="border border-gray-300 bg-white text-gray-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors text-center"
              >
                Ver beneficios
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats */}
      <section className="max-w-5xl mx-auto px-4 md:px-6 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <p className="text-3xl font-bold text-red-600">500+</p>
            <p className="text-sm text-gray-600 mt-1">Restaurantes activos</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <p className="text-3xl font-bold text-red-600">50K+</p>
            <p className="text-sm text-gray-600 mt-1">Pedidos mensuales</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <p className="text-3xl font-bold text-red-600">4.8</p>
            <p className="text-sm text-gray-600 mt-1">Calificación promedio</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <p className="text-3xl font-bold text-red-600">24/7</p>
            <p className="text-sm text-gray-600 mt-1">Soporte disponible</p>
          </div>
        </motion.div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="max-w-5xl mx-auto px-4 md:px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
            ¿Por qué elegir ReFood?
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Beneficios exclusivos para nuestros socios
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BENEFITS.map((benefit, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-white rounded-xl border border-gray-200 p-6"
            >
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <FiCheck className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
              <p className="text-sm text-gray-600">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-5xl mx-auto px-4 md:px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
            ¿Cómo funciona?
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Empieza a vender en 4 simples pasos
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {STEPS.map((step, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="relative"
            >
              <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                  {step.number}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
              {index < STEPS.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                  <FiChevronRight className="w-6 h-6 text-gray-300" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-5xl mx-auto px-4 md:px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
            Lo que dicen nuestros socios
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Historias de éxito de restaurantes como el tuyo
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white rounded-xl border border-gray-200 p-6"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <BsFillStarFill key={i} className="w-4 h-4 fill-amber-500" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
              <div>
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-gray-600">{testimonial.restaurant}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 md:px-6 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="bg-gray-900 rounded-2xl p-8 md:p-12 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            ¿Listo para empezar?
          </h2>
          <p className="text-gray-300 mb-8 max-w-lg mx-auto">
            Únete hoy y comienza a recibir pedidos de miles de clientes hambrientos.
          </p>
          <Link
            to="/contact?reason=partner"
            className="inline-block bg-red-600 text-white font-semibold px-8 py-4 rounded-lg hover:bg-red-700 transition-colors"
          >
            Solicitar asociación
          </Link>
        </motion.div>
      </section>
    </motion.div>
  );
};
