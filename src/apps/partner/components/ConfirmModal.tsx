import { motion, AnimatePresence } from 'framer-motion';
import { FiAlertTriangle, FiX } from 'react-icons/fi';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
  isLoading?: boolean;
}

export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  variant = 'danger',
  isLoading = false,
}: ConfirmModalProps) => {
  const variantStyles = {
    danger: {
      icon: 'bg-red-100 text-red-600',
      button: 'bg-red-500 hover:bg-red-600 text-white',
    },
    warning: {
      icon: 'bg-yellow-100 text-yellow-600',
      button: 'bg-yellow-500 hover:bg-yellow-600 text-white',
    },
    info: {
      icon: 'bg-blue-100 text-blue-600',
      button: 'bg-blue-500 hover:bg-blue-600 text-white',
    },
  };

  const styles = variantStyles[variant];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="relative bg-white rounded-xl shadow-xl max-w-md w-full mx-4 overflow-hidden"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FiX className="w-5 h-5" />
            </button>

            <div className="p-6">
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className={`p-3 rounded-full ${styles.icon}`}>
                  <FiAlertTriangle className="w-6 h-6" />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
                {title}
              </h3>

              {/* Message */}
              <p className="text-gray-600 text-center mb-6">
                {message}
              </p>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  disabled={isLoading}
                  className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
                >
                  {cancelText}
                </button>
                <button
                  onClick={onConfirm}
                  disabled={isLoading}
                  className={`flex-1 px-4 py-2.5 rounded-lg transition-colors font-medium disabled:opacity-50 flex items-center justify-center ${styles.button}`}
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    confirmText
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
