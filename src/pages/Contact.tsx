import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { FiSend, FiCheck, FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { motion } from "framer-motion";

const CONTACT_REASONS = [
  { value: "partner", label: "Quiero ser socio" },
  { value: "support", label: "Soporte técnico" },
  { value: "order", label: "Problema con un pedido" },
  { value: "suggestion", label: "Sugerencia" },
  { value: "other", label: "Otro" },
];

export const Contact = () => {
  const [searchParams] = useSearchParams();
  const preselectedReason = searchParams.get("reason") || "";
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
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

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="relative bg-red-50 overflow-hidden h-[40vh] min-h-[300px]">
          <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-orange-50/50" />
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-72 h-72 bg-orange-100 rounded-full blur-3xl opacity-50" />
          
          <div className="relative h-full max-w-7xl mx-auto px-4 md:px-6 flex flex-col justify-center">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-xs text-gray-600 mb-6">
                <IoMdHome className="w-4 h-4" />
                <span>ReFood</span>
                <span>•</span>
                <span>Contacto</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-gray-900">
                Mensaje enviado
              </h1>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 md:px-6 -mt-20 pb-20 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8 md:p-12 text-center"
          >
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiCheck className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              ¡Gracias por escribirnos!
            </h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto text-lg">
              Hemos recibido tu mensaje correctamente. Nuestro equipo lo revisará y te responderá a la brevedad posible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="bg-red-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-red-600/20"
              >
                Volver al inicio
              </Link>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({ name: "", email: "", reason: "", message: "" });
                }}
                className="bg-white text-gray-700 font-bold px-8 py-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-all"
              >
                Enviar otro mensaje
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-red-50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-orange-50/50" />
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-72 h-72 bg-orange-100 rounded-full blur-3xl opacity-50" />
        
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2 text-xs text-gray-600 mb-6">
                <IoMdHome className="w-4 h-4" />
                <span>ReFood</span>
                <span>•</span>
                <span>Contacto</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-gray-900">
                Hablemos
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
                Estamos aquí para ayudarte. Ya sea que tengas un problema con un pedido, 
                quieras asociarte con nosotros o simplemente decir hola.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 -mt-12 pb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-1 space-y-4"
          >
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-4">
                <FiMail className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Email</h3>
              <p className="text-sm text-gray-500 mb-2">Nuestro equipo te responderá en 24h</p>
              <a href="mailto:soporte@refood.com" className="text-red-600 font-medium hover:text-red-700 text-sm">
                soporte@refood.com
              </a>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-4">
                <FiPhone className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Teléfono</h3>
              <p className="text-sm text-gray-500 mb-2">Lun-Vie de 9am a 6pm</p>
              <a href="tel:+51999999999" className="text-red-600 font-medium hover:text-red-700 text-sm">
                +51 999 999 999
              </a>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-4">
                <FiMapPin className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Oficina</h3>
              <p className="text-sm text-gray-500">
                Av. Principal 123, Oficina 404<br />
                Lima, Perú
              </p>
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
                  Completa el formulario y nos pondremos en contacto contigo lo antes posible.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-semibold text-gray-700">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all outline-none bg-gray-50/50 focus:bg-white"
                      placeholder="Ej. Juan Pérez"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-semibold text-gray-700">
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all outline-none bg-gray-50/50 focus:bg-white"
                      placeholder="ejemplo@correo.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="reason" className="text-sm font-semibold text-gray-700">
                    Motivo de contacto
                  </label>
                  <div className="relative">
                    <select
                      id="reason"
                      name="reason"
                      value={formData.reason}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all outline-none bg-gray-50/50 focus:bg-white appearance-none"
                    >
                      <option value="">Selecciona un motivo</option>
                      {CONTACT_REASONS.map(reason => (
                        <option key={reason.value} value={reason.value}>
                          {reason.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-semibold text-gray-700">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all outline-none bg-gray-50/50 focus:bg-white resize-none"
                    placeholder="¿En qué podemos ayudarte?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-red-600/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-[0.99]"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <FiSend className="w-5 h-5" />
                      Enviar mensaje
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
