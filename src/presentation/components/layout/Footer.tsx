export const Footer = () => {
  return (
    <footer className="bg-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="flex flex-col gap-4">
            <img src="/logo.png" alt="ReFood" className="h-12 w-36" />
            <p className="text-gray-500 text-sm leading-relaxed">
              Reduciendo el desperdicio de alimentos, una comida a la vez.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-gray-500 hover:text-red-500 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 3a9 9 0 01-9 9m0 0a9 9 0 01-9-9m9 9v6m0 0a9 9 0 01-9-9" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-red-500 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 3a9 9 0 01-9 9m0 0a9 9 0 01-9-9m9 9v6m0 0a9 9 0 01-9-9" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gray-800 font-semibold mb-4 text-sm uppercase tracking-wide">
              Explorar
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="/menu"
                  className="text-gray-500 text-sm no-underline transition-colors duration-200 hover:text-red-500"
                >
                  Explorar Alimentos
                </a>
              </li>
              <li>
                <a
                  href="/restaurants"
                  className="text-gray-500 text-sm no-underline transition-colors duration-200 hover:text-red-500"
                >
                  Restaurantes
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-gray-500 text-sm no-underline transition-colors duration-200 hover:text-red-500"
                >
                  Acerca de Nosotros
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-gray-800 font-semibold mb-4 text-sm uppercase tracking-wide">
              Soporte
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="/help"
                  className="text-gray-500 text-sm no-underline transition-colors duration-200 hover:text-red-500"
                >
                  Centro de Ayuda
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-500 text-sm no-underline transition-colors duration-200 hover:text-red-500"
                >
                  Contáctanos
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  className="text-gray-500 text-sm no-underline transition-colors duration-200 hover:text-red-500"
                >
                  Preguntas Frecuentes
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-gray-800 font-semibold mb-4 text-sm uppercase tracking-wide">
              Legal
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="/privacy"
                  className="text-gray-500 text-sm no-underline transition-colors duration-200 hover:text-red-500"
                >
                  Política de Privacidad
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="text-gray-500 text-sm no-underline transition-colors duration-200 hover:text-red-500"
                >
                  Términos de Servicio
                </a>
              </li>
              <li>
                <a
                  href="/cookies"
                  className="text-gray-500 text-sm no-underline transition-colors duration-200 hover:text-red-500"
                >
                  Política de Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-gray-500 text-sm">
              &copy; 2025 ReFood. Todos los derechos reservados.
            </p>
            <div className="flex gap-6">
              <a
                href="/privacy"
                className="text-gray-500 text-sm hover:text-red-500 transition-colors"
              >
                Privacidad
              </a>
              <a
                href="/terms"
                className="text-gray-500 text-sm hover:text-red-500 transition-colors"
              >
                Términos
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
