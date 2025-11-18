import { AiOutlineTikTok } from "react-icons/ai";
import { FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

export const Footer = () => (
  <footer className="bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div className="flex flex-col gap-4">
          <img src="/logo.png" alt="ReFood" className="h-12 w-36" />
          <p className="text-gray-500 text-sm leading-relaxed">
            Reduciendo el desperdicio de alimentos, una comida a la vez.
          </p>
          <div className="flex gap-4">
            <Link
              to="https://www.youtube.com"
              className="text-gray-500 hover:text-red-500 transition-colors"
            >
              <FaYoutube className="w-5 h-5" />
            </Link>
            <Link
              to="https://www.instagram.com"
              className="text-gray-500 hover:text-red-500 transition-colors"
            >
              <FaInstagram className="w-5 h-5" />
            </Link>
            <Link
              to="https://www.tiktok.com"
              className="text-gray-500 hover:text-red-500 transition-colors"
            >
              <AiOutlineTikTok className="w-5 h-5" />
            </Link>
          </div>
        </div>

        <div>
          <h4 className="text-gray-800 font-semibold mb-4 text-sm uppercase tracking-wide">
            Explorar
          </h4>
          <ul className="space-y-3">
            <li>
              <Link
                to="/menu"
                className="text-gray-500 text-sm no-underline transition-colors duration-200 hover:text-red-500"
              >
                Explorar Alimentos
              </Link>
            </li>
            <li>
              <Link
                to="/restaurants"
                className="text-gray-500 text-sm no-underline transition-colors duration-200 hover:text-red-500"
              >
                Restaurantes
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-gray-500 text-sm no-underline transition-colors duration-200 hover:text-red-500"
              >
                Acerca de Nosotros
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-gray-800 font-semibold mb-4 text-sm uppercase tracking-wide">
            Soporte
          </h4>
          <ul className="space-y-3">
            <li>
              <Link
                to="/help"
                className="text-gray-500 text-sm no-underline transition-colors duration-200 hover:text-red-500"
              >
                Centro de Ayuda
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-gray-500 text-sm no-underline transition-colors duration-200 hover:text-red-500"
              >
                Contáctanos
              </Link>
            </li>
            <li>
              <Link
                to="/faq"
                className="text-gray-500 text-sm no-underline transition-colors duration-200 hover:text-red-500"
              >
                Preguntas Frecuentes
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-gray-800 font-semibold mb-4 text-sm uppercase tracking-wide">
            Legal
          </h4>
          <ul className="space-y-3">
            <li>
              <Link
                to="/privacy"
                className="text-gray-500 text-sm no-underline transition-colors duration-200 hover:text-red-500"
              >
                Política de Privacidad
              </Link>
            </li>
            <li>
              <Link
                to="/terms"
                className="text-gray-500 text-sm no-underline transition-colors duration-200 hover:text-red-500"
              >
                Términos de Servicio
              </Link>
            </li>
            <li>
              <Link
                to="/cookies"
                className="text-gray-500 text-sm no-underline transition-colors duration-200 hover:text-red-500"
              >
                Política de Cookies
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-gray-500 text-sm">
            &copy; 2025 ReFood. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <Link
              to="/privacy"
              className="text-gray-500 text-sm hover:text-red-500 transition-colors"
            >
              Privacidad
            </Link>
            <Link
              to="/terms"
              className="text-gray-500 text-sm hover:text-red-500 transition-colors"
            >
              Términos
            </Link>
          </div>
        </div>
      </div>
    </div>
  </footer>
);
