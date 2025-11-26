import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { IoMdHome } from "react-icons/io";
import { FiShield, FiLock, FiEye, FiDatabase, FiUserCheck, FiMail } from "react-icons/fi";

const PRIVACY_HIGHLIGHTS = [
  {
    icon: FiShield,
    title: "Protección de datos",
    description: "Utilizamos encriptación de nivel empresarial para proteger tu información personal.",
  },
  {
    icon: FiLock,
    title: "Pagos seguros",
    description: "Todas las transacciones se procesan a través de proveedores certificados PCI DSS.",
  },
  {
    icon: FiEye,
    title: "Transparencia total",
    description: "Siempre sabrás qué datos recopilamos y cómo los utilizamos.",
  },
  {
    icon: FiUserCheck,
    title: "Control del usuario",
    description: "Puedes acceder, modificar o eliminar tus datos en cualquier momento.",
  },
];

const PRIVACY_SECTIONS = [
  {
    id: "recopilacion",
    title: "1. Información que Recopilamos",
    content: [
      {
        subtitle: "Información que nos proporcionas directamente:",
        items: [
          "Datos de registro: nombre, correo electrónico, número de teléfono",
          "Información de perfil: foto, preferencias alimentarias",
          "Direcciones de entrega: ubicaciones guardadas para entregas",
          "Información de pago: datos de tarjeta (procesados de forma segura por terceros)",
          "Comunicaciones: mensajes que nos envías a través de soporte",
        ],
      },
      {
        subtitle: "Información recopilada automáticamente:",
        items: [
          "Datos de uso: páginas visitadas, clics, tiempo en la plataforma",
          "Información del dispositivo: tipo de navegador, sistema operativo, identificadores únicos",
          "Datos de ubicación: con tu consentimiento, para mostrar restaurantes cercanos",
          "Cookies y tecnologías similares: para mejorar tu experiencia",
        ],
      },
    ],
  },
  {
    id: "uso",
    title: "2. Cómo Usamos tu Información",
    content: [
      {
        subtitle: "Utilizamos tu información para:",
        items: [
          "Procesar y entregar tus pedidos de manera eficiente",
          "Personalizar tu experiencia y mostrarte restaurantes relevantes",
          "Comunicarnos contigo sobre pedidos, actualizaciones y promociones",
          "Mejorar nuestros servicios y desarrollar nuevas funcionalidades",
          "Prevenir fraudes y garantizar la seguridad de la plataforma",
          "Cumplir con obligaciones legales y normativas",
        ],
      },
    ],
  },
  {
    id: "compartir",
    title: "3. Compartición de Información",
    content: [
      {
        subtitle: "Podemos compartir tu información con:",
        items: [
          "Restaurantes asociados: para procesar y entregar tu pedido",
          "Repartidores: nombre y dirección de entrega únicamente",
          "Proveedores de servicios: procesadores de pago, servicios de análisis",
          "Autoridades legales: cuando sea requerido por ley",
        ],
      },
      {
        subtitle: "Nunca:",
        items: [
          "Vendemos tu información personal a terceros",
          "Compartimos datos sensibles sin tu consentimiento explícito",
          "Utilizamos tu información para fines no descritos en esta política",
        ],
      },
    ],
  },
  {
    id: "seguridad",
    title: "4. Seguridad de los Datos",
    content: [
      {
        subtitle: "Medidas de protección implementadas:",
        items: [
          "Encriptación SSL/TLS para todas las comunicaciones",
          "Almacenamiento seguro de contraseñas mediante hash y salting",
          "Procesamiento de pagos a través de proveedores certificados PCI DSS",
          "Acceso restringido a datos personales solo a personal autorizado",
          "Auditorías de seguridad regulares y pruebas de vulnerabilidad",
          "Copias de seguridad encriptadas y recuperación ante desastres",
        ],
      },
    ],
  },
  {
    id: "derechos",
    title: "5. Tus Derechos",
    content: [
      {
        subtitle: "Como usuario, tienes derecho a:",
        items: [
          "Acceder: Solicitar una copia de tus datos personales",
          "Rectificar: Corregir información inexacta o desactualizada",
          "Eliminar: Solicitar la eliminación de tus datos personales",
          "Portabilidad: Recibir tus datos en un formato estructurado",
          "Oposición: Oponerte al procesamiento de tus datos para ciertos fines",
          "Retirar consentimiento: En cualquier momento para uso no esencial",
        ],
      },
    ],
  },
  {
    id: "cookies",
    title: "6. Cookies y Tecnologías Similares",
    content: [
      {
        subtitle: "Utilizamos cookies para:",
        items: [
          "Cookies esenciales: Necesarias para el funcionamiento básico",
          "Cookies de rendimiento: Análisis anónimo del uso de la plataforma",
          "Cookies de funcionalidad: Recordar tus preferencias",
          "Cookies de marketing: Solo con tu consentimiento explícito",
        ],
      },
      {
        subtitle: "Control de cookies:",
        items: [
          "Puedes configurar tu navegador para rechazar cookies",
          "Ofrecemos un panel de preferencias de cookies en la configuración",
          "Algunas funcionalidades pueden verse afectadas sin cookies esenciales",
        ],
      },
    ],
  },
  {
    id: "retencion",
    title: "7. Retención de Datos",
    content: [
      {
        subtitle: "Conservamos tu información:",
        items: [
          "Datos de cuenta: Mientras mantengas una cuenta activa con nosotros",
          "Historial de pedidos: 5 años para fines contables y legales",
          "Datos de pago: Procesados por terceros, no almacenamos datos completos",
          "Comunicaciones de soporte: 2 años para mejorar nuestro servicio",
          "Datos de marketing: Hasta que retires tu consentimiento",
        ],
      },
    ],
  },
  {
    id: "contacto",
    title: "8. Contacto",
    content: [
      {
        subtitle: "Para ejercer tus derechos o consultas sobre privacidad:",
        items: [
          "Email: privacidad@refood.com",
          "Formulario de contacto: disponible en nuestra sección de ayuda",
          "Responderemos a tu solicitud en un plazo máximo de 30 días",
        ],
      },
    ],
  },
];

export const Privacy = () => {
  const lastUpdated = "26 de Noviembre, 2025";

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
            className="max-w-3xl"
          >
            <div className="flex items-center gap-2 text-xs text-gray-600 mb-6">
              <IoMdHome className="w-4 h-4" />
              <span>ReFood</span>
              <span>•</span>
              <span>Política de Privacidad</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-gray-900">
              Política de{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">
                Privacidad
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Tu privacidad es importante para nosotros. Aquí explicamos cómo recopilamos, 
              usamos y protegemos tu información personal.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Última actualización: {lastUpdated}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Highlights */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 -mt-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {PRIVACY_HIGHLIGHTS.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-3">
                <item.icon className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm mb-1">{item.title}</h3>
              <p className="text-xs text-gray-500">{item.description}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Table of Contents + Content */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Table of Contents - Sticky Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="sticky top-24"
            >
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-gray-900 mb-4">Contenido</h3>
                <nav className="space-y-2">
                  {PRIVACY_SECTIONS.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="block text-sm text-gray-600 hover:text-red-600 transition-colors py-1"
                    >
                      {section.title}
                    </a>
                  ))}
                </nav>
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10"
            >
              <div className="prose prose-gray max-w-none">
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-8">
                  <p className="text-sm text-blue-800 m-0">
                    <strong>Resumen:</strong> Recopilamos solo la información necesaria para brindarte 
                    nuestro servicio, la protegemos con medidas de seguridad robustas, y nunca la vendemos 
                    a terceros. Puedes acceder, modificar o eliminar tus datos en cualquier momento.
                  </p>
                </div>

                {PRIVACY_SECTIONS.map((section, sectionIndex) => (
                  <motion.div
                    key={section.id}
                    id={section.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: sectionIndex * 0.05 }}
                    className="mb-10 scroll-mt-24"
                  >
                    <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                      {section.title}
                    </h2>
                    {section.content.map((block, blockIndex) => (
                      <div key={blockIndex} className="mb-4">
                        <p className="font-semibold text-gray-800 mb-2">{block.subtitle}</p>
                        <ul className="space-y-2">
                          {block.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start gap-2 text-gray-600">
                              <span className="text-red-500 mt-1">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gray-900 rounded-3xl p-8 md:p-12"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-red-600 rounded-xl flex items-center justify-center">
                <FiMail className="w-7 h-7 text-white" />
              </div>
              <div className="text-white">
                <h3 className="text-xl font-bold">¿Tienes preguntas sobre privacidad?</h3>
                <p className="text-gray-400">Contáctanos en privacidad@refood.com</p>
              </div>
            </div>
            <Link
              to="/contact"
              className="bg-white text-gray-900 font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition-all flex-shrink-0"
            >
              Contactar
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};
