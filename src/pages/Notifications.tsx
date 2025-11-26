import { motion } from "framer-motion";
import { FiBell } from "react-icons/fi";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

export const Notifications = () => {
  return (
    <motion.div 
      className="p-4 sm:p-6 lg:p-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants} className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Notificaciones</h1>
        <p className="mt-1 text-sm text-gray-500">
          Aquí encontrarás todas las notificaciones relacionadas con tus pedidos y
          actividades en la plataforma.
        </p>
      </motion.div>

      <motion.div 
        variants={itemVariants}
        className="bg-white rounded-2xl shadow-[0px_0px_25px_2px_rgba(0,0,0,0.025)] p-8 sm:p-12"
      >
        <div className="text-center max-w-sm mx-auto">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-2xl flex items-center justify-center">
            <FiBell className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            No tienes notificaciones aún
          </h3>
          <p className="text-sm text-gray-500">
            Explora restaurantes y realiza pedidos para recibir notificaciones
            importantes sobre tus actividades.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};
