import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { 
  FiSend, 
  FiCheck, 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiMessageCircle,
  FiClock,
  FiHelpCircle,
  FiUsers,
  FiShoppingBag,
  FiAlertCircle,
  FiChevronRight
} from "react-icons/fi";
import { motion } from "framer-motion";

const CONTACT_REASONS = [
  { value: "partner", label: "Quiero ser socio", icon: FiUsers, description: "Registrar mi restaurante en ReFood" },
  { value: "support", label: "Soporte técnico", icon: FiHelpCircle, description: "Problemas con la app o cuenta" },
  { value: "order", label: "Problema con un pedido", icon: FiShoppingBag, description: "Pedido incorrecto, retraso, etc." },
  { value: "suggestion", label: "Sugerencia", icon: FiMessageCircle, description: "Ideas para mejorar el servicio" },
  { value: "other", label: "Otro", icon: FiAlertCircle, description: "Cualquier otra consulta" },
];

const QUICK_LINKS = [
  { label: "Centro de Ayuda", href: "/help", description: "Encuentra respuestas rápidas" },
  { label: "Preguntas Frecuentes", href: "/faq", description: "Dudas más comunes" },
  { label: "Únete como Socio", href: "/partner-info", description: "Información para restaurantes" },
];

export const Contact = () => {
  const [searchParams] = useSearchParams();
  const preselectedReason = searchParams.get("reason") || "";
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    reason: preselectedReason,
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Fake submit delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleReasonSelect = (value: string) => {
    setFormData(prev => ({ ...prev, reason: value }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="relative bg-gradient-to-br from-green-50 via-white to-emerald-50/50 overflow-hidden">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-72 h-72 bg-emerald-100 rounded-full blur-3xl opacity-50" />
          
          <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-20 md:py-32">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8"
              >
                <FiCheck className="w-12 h-12 text-green-600" />
              </motion.div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-gray-900">
                ¡Mensaje enviado!
              </h1>
              <p className="text-xl text-gray-600 mb-4">
                Gracias por contactarnos, <span className="font-semibold text-gray-900">{formData.name.split(' ')[0]}</span>
              </p>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                Hemos recibido tu mensaje y nuestro equipo lo revisará pronto. 
                Te responderemos a <span className="font-medium text-gray-700">{formData.email}</span> en las próximas 24 horas.
              </p>

              <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8 max-w-md mx-auto">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Número de ticket</span>
                  <span className="font-mono font-bold text-gray-900">#{Math.random().toString(36).substring(2, 10).toUpperCase()}</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/"
                  className="bg-gray-900 text-white font-bold px-8 py-4 rounded-xl hover:bg-gray-800 transition-all shadow-lg"
                >
                  Volver al inicio
                </Link>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: "", email: "", phone: "", reason: "", message: "" });
                  }}
                  className="bg-white text-gray-700 font-bold px-8 py-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-all"
                >
                  Enviar otro mensaje
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-red-50 via-white to-red-50/50 overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-72 h-72 bg-red-100 rounded-full blur-3xl opacity-50" />
        
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-2 text-xs text-gray-600 mb-6">
              <IoMdHome className="w-4 h-4" />
              <span>ReFood</span>
              <span>•</span>
              <span>Contacto</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-gray-900">
              ¿Cómo podemos{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">
                ayudarte?
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
              Estamos aquí para ti. Ya sea una consulta sobre tu pedido, 
              una sugerencia o quieras unirte como socio.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Quick Contact Info Bar */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 -mt-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-4 md:p-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            <a href="mailto:soporte@refood.com" className="flex items-center gap-4 p-3 rounded-xl hover:bg-red-50 transition-colors group">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center group-hover:bg-red-200 transition-colors">
                <FiMail className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Email</p>
                <p className="font-semibold text-gray-900">soporte@refood.com</p>
              </div>
            </a>
            
            <a href="tel:+51999999999" className="flex items-center gap-4 p-3 rounded-xl hover:bg-red-50 transition-colors group">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center group-hover:bg-red-200 transition-colors">
                <FiPhone className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Teléfono</p>
                <p className="font-semibold text-gray-900">+51 999 999 999</p>
              </div>
            </a>
            
            <div className="flex items-center gap-4 p-3 rounded-xl">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <FiClock className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Horario</p>
                <p className="font-semibold text-gray-900">Lun - Vie, 9am - 6pm</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Quick Links */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4">Antes de escribirnos...</h3>
              <p className="text-sm text-gray-500 mb-4">
                Quizás encuentres la respuesta más rápido en estos recursos:
              </p>
              <div className="space-y-3">
                {QUICK_LINKS.map((link, index) => (
                  <Link
                    key={index}
                    to={link.href}
                    className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-red-200 hover:bg-red-50 transition-all group"
                  >
                    <div>
                      <p className="font-semibold text-gray-900 group-hover:text-red-600 transition-colors">{link.label}</p>
                      <p className="text-xs text-gray-500">{link.description}</p>
                    </div>
                    <FiChevronRight className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Office Location */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <FiMapPin className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="font-bold text-gray-900">Nuestra Oficina</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Av. Principal 123, Oficina 404<br />
                Miraflores, Lima, Perú
              </p>
              <div className="aspect-video rounded-xl overflow-hidden bg-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop" 
                  alt="Oficina ReFood"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Response Time Info */}
            <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6 text-white">
              <FiMessageCircle className="w-8 h-8 mb-4" />
              <h3 className="font-bold text-lg mb-2">Tiempo de respuesta</h3>
              <p className="text-white/80 text-sm mb-4">
                Nos esforzamos en responder todas las consultas en menos de 24 horas hábiles.
              </p>
              <div className="flex items-center gap-2 text-sm">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-white/90">Soporte activo ahora</span>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-6 md:p-10">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Envíanos un mensaje</h2>
                <p className="text-gray-500">
                  Cuéntanos en qué podemos ayudarte y te responderemos pronto.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Reason Selection Cards */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-700">
                    ¿Cuál es el motivo de tu contacto?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {CONTACT_REASONS.map((reason) => (
                      <button
                        key={reason.value}
                        type="button"
                        onClick={() => handleReasonSelect(reason.value)}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${
                          formData.reason === reason.value
                            ? "border-red-500 bg-red-50"
                            : "border-gray-100 hover:border-gray-200 bg-gray-50/50"
                        }`}
                      >
                        <reason.icon className={`w-5 h-5 mb-2 ${
                          formData.reason === reason.value ? "text-red-600" : "text-gray-400"
                        }`} />
                        <p className={`font-semibold text-sm ${
                          formData.reason === reason.value ? "text-red-600" : "text-gray-900"
                        }`}>
                          {reason.label}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">{reason.description}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Personal Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-semibold text-gray-700">
                      Nombre completo <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all outline-none bg-gray-50/50 focus:bg-white"
                      placeholder="Ej. Juan Pérez"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-semibold text-gray-700">
                      Correo electrónico <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all outline-none bg-gray-50/50 focus:bg-white"
                      placeholder="ejemplo@correo.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-semibold text-gray-700">
                    Teléfono <span className="text-gray-400 font-normal">(opcional)</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all outline-none bg-gray-50/50 focus:bg-white"
                    placeholder="+51 999 999 999"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-semibold text-gray-700">
                    Mensaje <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all outline-none bg-gray-50/50 focus:bg-white resize-none"
                    placeholder="Cuéntanos los detalles de tu consulta..."
                  />
                  <p className="text-xs text-gray-400 text-right">
                    {formData.message.length}/1000 caracteres
                  </p>
                </div>

                {/* Privacy Note */}
                <div className="bg-gray-50 rounded-xl p-4 flex items-start gap-3">
                  <FiShoppingBag className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-500">
                    Si tu consulta es sobre un pedido específico, incluye el número de pedido en tu mensaje 
                    para que podamos ayudarte más rápido.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !formData.reason}
                  className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white font-bold px-8 py-4 rounded-xl hover:from-red-700 hover:to-red-600 transition-all shadow-lg shadow-red-600/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-[0.99]"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Enviando mensaje...
                    </>
                  ) : (
                    <>
                      <FiSend className="w-5 h-5" />
                      Enviar mensaje
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-400 text-center">
                  Al enviar este formulario, aceptas nuestra{" "}
                  <Link to="/privacy" className="text-red-600 hover:underline">Política de Privacidad</Link>
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
