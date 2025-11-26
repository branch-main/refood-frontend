import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { IoMdHome } from "react-icons/io";
import { FiFileText, FiAlertCircle, FiCheckCircle, FiMail } from "react-icons/fi";

const TERMS_SECTIONS = [
  {
    id: "aceptacion",
    title: "1. Aceptación de los Términos",
    content: `Al acceder, navegar o utilizar la plataforma ReFood (incluyendo nuestro sitio web, aplicaciones móviles y servicios relacionados), aceptas cumplir y estar sujeto a estos Términos de Servicio. Si no estás de acuerdo con alguna parte de estos términos, no debes utilizar nuestros servicios.

Estos términos constituyen un acuerdo legalmente vinculante entre tú ("Usuario", "Cliente" o "tú") y ReFood S.A.C. ("ReFood", "nosotros" o "la Plataforma").

Nos reservamos el derecho de modificar estos términos en cualquier momento. Te notificaremos sobre cambios significativos a través de correo electrónico o mediante un aviso en la plataforma. El uso continuado del servicio después de dichos cambios constituye tu aceptación de los nuevos términos.`,
  },
  {
    id: "servicios",
    title: "2. Descripción del Servicio",
    content: `ReFood es una plataforma tecnológica que conecta a usuarios ("Clientes") con restaurantes y establecimientos de alimentos ("Socios") para facilitar la compra y entrega de comida preparada.

Nuestros servicios incluyen:
• Catálogo digital de restaurantes y sus menús
• Sistema de procesamiento de pedidos en línea
• Pasarela de pagos segura (a través de terceros autorizados)
• Coordinación de entregas a domicilio
• Servicio de atención al cliente

ReFood actúa como intermediario tecnológico. No somos responsables de la preparación, calidad o inocuidad de los alimentos, los cuales son responsabilidad exclusiva de los restaurantes asociados. Cada restaurante es una entidad independiente que opera bajo sus propias licencias y permisos.`,
  },
  {
    id: "cuentas",
    title: "3. Registro y Cuentas de Usuario",
    content: `Para utilizar ciertos servicios de ReFood, debes crear una cuenta proporcionando información precisa y completa.

Requisitos de la cuenta:
• Debes tener al menos 18 años de edad o la mayoría de edad en tu jurisdicción
• Solo puedes tener una cuenta personal activa
• La información proporcionada debe ser verídica y actualizada
• Eres responsable de mantener la confidencialidad de tu contraseña
• Debes notificarnos inmediatamente sobre cualquier uso no autorizado

Nos reservamos el derecho de suspender o cancelar cuentas que:
• Violen estos términos de servicio
• Proporcionen información falsa o fraudulenta
• Sean utilizadas para actividades ilegales
• Generen un número excesivo de disputas o reclamaciones`,
  },
  {
    id: "pedidos",
    title: "4. Pedidos y Transacciones",
    content: `Al realizar un pedido a través de ReFood, aceptas las siguientes condiciones:

Proceso de pedido:
• Los precios mostrados incluyen impuestos aplicables, salvo indicación contraria
• El costo de envío se calcula según la distancia y otros factores, y se muestra antes de confirmar el pedido
• Un pedido se considera confirmado una vez procesado el pago exitosamente

Cancelaciones:
• Puedes cancelar tu pedido sin cargo si el restaurante aún no ha comenzado la preparación
• Cancelaciones posteriores pueden estar sujetas a cargos parciales o totales
• Nos reservamos el derecho de cancelar pedidos por razones operativas, en cuyo caso recibirás un reembolso completo

Reembolsos:
• Los reembolsos se procesan al método de pago original en un plazo de 5-10 días hábiles
• Reembolsos por productos defectuosos o pedidos incorrectos se evalúan caso por caso
• Créditos en la plataforma pueden ofrecerse como alternativa en algunos casos`,
  },
  {
    id: "pagos",
    title: "5. Pagos y Facturación",
    content: `Aceptamos múltiples formas de pago a través de procesadores de pago autorizados (Stripe, PayPal).

Términos de pago:
• Autorizas el cargo del monto total del pedido al confirmar tu compra
• Los precios pueden variar y están sujetos a cambios sin previo aviso
• Promociones y descuentos tienen términos específicos que se comunicarán en cada caso
• No almacenamos datos de tarjetas de crédito/débito directamente

Facturación:
• Recibirás un comprobante electrónico por cada transacción
• Para facturas fiscales, proporciona tus datos de facturación en tu perfil
• Las facturas se envían al correo registrado en tu cuenta`,
  },
  {
    id: "entregas",
    title: "6. Entregas",
    content: `Trabajamos para entregar tu pedido en el menor tiempo posible, pero los tiempos estimados no son garantizados.

Condiciones de entrega:
• Los tiempos de entrega son estimaciones y pueden verse afectados por factores externos
• Debes proporcionar una dirección de entrega precisa y accesible
• Es tu responsabilidad estar disponible para recibir el pedido
• El repartidor esperará un tiempo razonable; si no puedes recibir, el pedido puede cancelarse

Problemas con entregas:
• Reporta cualquier problema dentro de las 24 horas siguientes
• Pedidos no recibidos por ausencia del cliente no son reembolsables
• Daños durante el transporte deben documentarse con fotografías`,
  },
  {
    id: "conducta",
    title: "7. Conducta del Usuario",
    content: `Al usar ReFood, te comprometes a:

• No utilizar el servicio para fines ilegales o no autorizados
• No intentar acceder a áreas restringidas de la plataforma
• No interferir con el funcionamiento normal del servicio
• No realizar pedidos falsos o fraudulentos
• No abusar del sistema de promociones o reembolsos
• Tratar con respeto a repartidores, personal de restaurantes y nuestro equipo
• No publicar contenido ofensivo, difamatorio o inapropiado

El incumplimiento de estas normas puede resultar en la suspensión o cancelación de tu cuenta sin previo aviso ni reembolso de créditos o promociones acumuladas.`,
  },
  {
    id: "propiedad",
    title: "8. Propiedad Intelectual",
    content: `Todo el contenido de la plataforma ReFood está protegido por derechos de propiedad intelectual.

Derechos reservados:
• El nombre "ReFood", logotipos, diseños y marca son propiedad exclusiva de ReFood S.A.C.
• El software, código, textos, gráficos e interfaces están protegidos por derechos de autor
• Las imágenes de los restaurantes y platos pertenecen a sus respectivos propietarios

Uso permitido:
• Puedes usar la plataforma solo para fines personales y no comerciales
• Está prohibido copiar, modificar, distribuir o crear obras derivadas sin autorización
• No puedes realizar ingeniería inversa o descompilar nuestro software`,
  },
  {
    id: "limitaciones",
    title: "9. Limitación de Responsabilidad",
    content: `Dentro de los límites permitidos por la ley aplicable:

ReFood no será responsable por:
• Daños indirectos, incidentales o consecuentes
• Pérdida de beneficios, datos o uso
• Calidad, seguridad o legalidad de los productos de restaurantes
• Acciones u omisiones de restaurantes socios o repartidores
• Interrupciones del servicio por causas de fuerza mayor
• Errores o inexactitudes en la información proporcionada por terceros

Nuestra responsabilidad total está limitada al monto que hayas pagado por el pedido específico en cuestión.

Los restaurantes son responsables de cumplir con todas las normativas sanitarias y de seguridad alimentaria aplicables.`,
  },
  {
    id: "disputas",
    title: "10. Resolución de Disputas",
    content: `En caso de disputas relacionadas con nuestros servicios:

Proceso de reclamación:
1. Contacta primero a nuestro servicio de atención al cliente
2. Proporciona toda la documentación relevante
3. Nuestro equipo investigará y responderá en un plazo de 5 días hábiles
4. Si no se llega a una resolución, puedes escalar la queja

Jurisdicción:
• Estos términos se rigen por las leyes de Perú
• Cualquier disputa legal se resolverá en los tribunales de Lima
• Antes de iniciar acciones legales, las partes intentarán resolver la disputa de buena fe`,
  },
  {
    id: "terminacion",
    title: "11. Terminación",
    content: `Puedes cerrar tu cuenta en cualquier momento desde la configuración de tu perfil o contactando a soporte.

Nos reservamos el derecho de:
• Suspender o terminar tu acceso por violación de estos términos
• Cancelar cuentas inactivas por períodos prolongados
• Discontinuar el servicio con aviso previo razonable

Tras la terminación:
• Perderás acceso a créditos y promociones no utilizadas
• Los pedidos pendientes se procesarán normalmente
• Tus datos se manejarán según nuestra Política de Privacidad
• Las disposiciones que por su naturaleza deban sobrevivir, permanecerán vigentes`,
  },
  {
    id: "general",
    title: "12. Disposiciones Generales",
    content: `Divisibilidad: Si alguna disposición de estos términos se considera inválida, las demás permanecerán en pleno vigor.

Renuncia: La falta de ejercicio de cualquier derecho no constituye una renuncia al mismo.

Cesión: No puedes ceder tus derechos u obligaciones sin nuestro consentimiento previo.

Acuerdo completo: Estos términos, junto con la Política de Privacidad, constituyen el acuerdo completo entre las partes.

Idioma: En caso de discrepancia entre versiones en diferentes idiomas, prevalece la versión en español.`,
  },
  {
    id: "contacto",
    title: "13. Contacto",
    content: `Para consultas sobre estos Términos de Servicio:

• Email: legal@refood.com
• Formulario de contacto: disponible en nuestra plataforma
• Dirección: Av. Principal 123, Lima, Perú

Atención al cliente:
• soporte@refood.com
• Lunes a Viernes, 9:00 AM - 6:00 PM`,
  },
];

const KEY_POINTS = [
  {
    icon: FiCheckCircle,
    text: "Debes tener 18+ años para usar el servicio",
  },
  {
    icon: FiCheckCircle,
    text: "Los restaurantes son responsables de la calidad de los alimentos",
  },
  {
    icon: FiCheckCircle,
    text: "Puedes cancelar pedidos antes de la preparación",
  },
  {
    icon: FiCheckCircle,
    text: "Los reembolsos se procesan en 5-10 días hábiles",
  },
];

export const Terms = () => {
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
              <span>Términos de Servicio</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-gray-900">
              Términos de{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">
                Servicio
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Por favor lee estos términos detenidamente antes de usar nuestra plataforma. 
              Al usar ReFood, aceptas estos términos en su totalidad.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Última actualización: {lastUpdated}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Key Points Summary */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 -mt-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
              <FiAlertCircle className="w-5 h-5 text-amber-600" />
            </div>
            <h2 className="font-bold text-gray-900">Puntos Clave</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {KEY_POINTS.map((point, index) => (
              <div key={index} className="flex items-start gap-2">
                <point.icon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600">{point.text}</span>
              </div>
            ))}
          </div>
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
                <div className="flex items-center gap-2 mb-4">
                  <FiFileText className="w-5 h-5 text-red-600" />
                  <h3 className="font-bold text-gray-900">Índice</h3>
                </div>
                <nav className="space-y-2 max-h-[60vh] overflow-y-auto">
                  {TERMS_SECTIONS.map((section) => (
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
              {TERMS_SECTIONS.map((section, sectionIndex) => (
                <motion.div
                  key={section.id}
                  id={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: sectionIndex * 0.03 }}
                  className="mb-10 scroll-mt-24 last:mb-0"
                >
                  <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                    {section.title}
                  </h2>
                  <div className="text-gray-600 whitespace-pre-line leading-relaxed">
                    {section.content}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Links */}
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
                <h3 className="text-xl font-bold">¿Tienes preguntas sobre los términos?</h3>
                <p className="text-gray-400">Contáctanos en legal@refood.com</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Link
                to="/privacy"
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold px-6 py-3 rounded-xl hover:bg-white/20 transition-all"
              >
                Ver Privacidad
              </Link>
              <Link
                to="/contact"
                className="bg-white text-gray-900 font-bold px-6 py-3 rounded-xl hover:bg-gray-100 transition-all"
              >
                Contactar
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};
