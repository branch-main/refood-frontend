import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

type Animation = "scale" | "slide-right" | "slide-left";

export const Modal = ({
  isOpen,
  onClose,
  children,
  animation = "scale",
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  animation?: Animation;
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const modalElement = modalRef.current;
    if (!modalElement) return;

    const focusableElements = modalElement.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (!modalElement.contains(document.activeElement)) {
        e.preventDefault();
        e.shiftKey ? lastElement?.focus() : firstElement?.focus();
        return;
      }

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    };

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleTabKey);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleTabKey);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);

  const getModalVariants = () => {
    if (animation === "slide-right") {
      return {
        hidden: { x: "100%" },
        visible: { x: 0 },
        exit: { x: "100%" },
      };
    }
    if (animation === "slide-left") {
      return {
        hidden: { x: "-100%" },
        visible: { x: 0 },
        exit: { x: "-100%" },
      };
    }
    return {
      hidden: { scale: 1.05, opacity: 0 },
      visible: { scale: 1, opacity: 1 },
      exit: { scale: 1.05, opacity: 0 },
    };
  };

  const containerClassName =
    animation === "slide-right" || animation === "slide-left"
      ? "fixed inset-0 z-[9999]"
      : "fixed inset-0 z-[9999] flex items-center justify-center";

  const modalClassName =
    animation === "slide-right"
      ? "bg-white h-screen fixed right-0"
      : animation === "slide-left"
        ? "bg-white h-screen fixed left-0"
        : "bg-white rounded-lg max-w-screen max-h-screen";

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={containerClassName}
          onClick={onClose}
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <motion.div
            ref={modalRef}
            variants={getModalVariants()}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className={modalClassName}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
};
