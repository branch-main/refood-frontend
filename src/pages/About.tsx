import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { IoMdHome } from "react-icons/io";
import { FiHeart, FiUsers, FiTruck, FiShield, FiTarget, FiZap } from "react-icons/fi";

const VALUES = [
  {
    icon: FiHeart,
    title: "Pasión por la comida",
    description: "Amamos la gastronomía y queremos compartir esa pasión conectando a las personas con los mejores sabores.",
  },
  {
    icon: FiUsers,
    title: "Comunidad primero",
    description: "Apoyamos a restaurantes locales y creamos conexiones significativas entre negocios y clientes.",
  },
  {
    icon: FiTruck,
    title: "Entrega confiable",
    description: "Tu pedido llega caliente y a tiempo. Nos comprometemos con la excelencia en cada entrega.",
  },
  {
    icon: FiShield,
    title: "Seguridad garantizada",
    description: "Transacciones seguras y protección de datos para que compres con total tranquilidad.",
  },
];

const STATS = [
  { value: "500+", label: "Restaurantes asociados" },
  { value: "100K+", label: "Pedidos completados" },
  { value: "50K+", label: "Clientes satisfechos" },
  { value: "4.8", label: "Calificación promedio" },
];

const TEAM = [
  { name: "Carlos Mendoza", role: "CEO & Co-fundador", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" },
  { name: "María García", role: "CTO & Co-fundadora", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face" },
  { name: "Juan Pérez", role: "Director de Operaciones", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face" },
  { name: "Ana López", role: "Directora de Marketing", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face" },
];

export const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-red-50 via-white to-orange-50/50 overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-72 h-72 bg-orange-100 rounded-full blur-3xl opacity-50" />
        
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
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
              <span>Acerca de nosotros</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-gray-900">
              Conectando sabores con{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">
                personas
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              En ReFood, transformamos la forma en que las personas experimentan la comida. 
              Conectamos a amantes de la gastronomía con los mejores restaurantes locales, 
              llevando sabores increíbles directamente a tu puerta.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 -mt-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-red-600">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Story Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 font-semibold text-sm px-4 py-2 rounded-full mb-6">
              <FiTarget className="w-4 h-4" />
              Nuestra Historia
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              De una idea simple a una revolución gastronómica
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                ReFood nació en 2025 con una visión clara: hacer que la mejor comida local 
                estuviera al alcance de todos. Lo que comenzó como un pequeño proyecto se 
                ha convertido en la plataforma de delivery preferida de miles de usuarios.
              </p>
              <p>
                Trabajamos directamente con restaurantes locales, desde pequeñas cocinas 
                familiares hasta establecimientos reconocidos, para ofrecer una variedad 
                gastronómica sin igual.
              </p>
              <p>
                Nuestro compromiso va más allá de la entrega. Nos enfocamos en crear 
                experiencias memorables, apoyar a negocios locales y construir una 
                comunidad de amantes de la buena comida.
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-red-100 to-orange-100">
              <img
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=800&fit=crop"
                alt="Equipo de ReFood"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <FiZap className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Entrega promedio</p>
                  <p className="text-sm text-gray-500">25-35 minutos</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nuestros valores
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Los principios que guían cada decisión que tomamos y cada interacción que tenemos.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 rounded-2xl p-6 hover:bg-red-50 transition-colors group"
              >
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm group-hover:bg-red-100 transition-colors">
                  <value.icon className="w-7 h-7 text-red-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-sm text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Conoce al equipo
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Las personas apasionadas detrás de ReFood que trabajan cada día para mejorar tu experiencia.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {TEAM.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-32 h-32 mx-auto rounded-2xl overflow-hidden mb-4 bg-gray-100">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-gray-900">{member.name}</h3>
              <p className="text-sm text-gray-500">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative bg-gray-900 rounded-3xl overflow-hidden p-8 md:p-12"
        >
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-red-900/30 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-72 h-72 bg-orange-900/30 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              ¿Listo para explorar?
            </h2>
            <p className="text-gray-300 mb-8">
              Descubre los mejores restaurantes de tu zona y disfruta de comida increíble 
              con solo unos clics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/restaurants"
                className="bg-red-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-red-900/20"
              >
                Ver restaurantes
              </Link>
              <Link
                to="/contact"
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold px-8 py-4 rounded-xl hover:bg-white/20 transition-all"
              >
                Contáctanos
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};
