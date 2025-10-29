export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-8 py-12 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-8">
        <div>
          <h3 className="text-2xl mb-4">🍽️ ReeFood</h3>
          <p className="text-gray-400 leading-relaxed">Reduciendo el desperdicio de alimentos, una comida a la vez.</p>
        </div>
        
        <div>
          <h4 className="text-lg mb-4 text-[#B21F1F]">Enlaces Rápidos</h4>
          <ul className="list-none p-0">
            <li className="mb-2"><a href="/listings" className="text-gray-400 no-underline transition-colors duration-200 hover:text-[#B21F1F]">Explorar Alimentos</a></li>
            <li className="mb-2"><a href="/restaurants" className="text-gray-400 no-underline transition-colors duration-200 hover:text-[#B21F1F]">Restaurantes</a></li>
            <li className="mb-2"><a href="/about" className="text-gray-400 no-underline transition-colors duration-200 hover:text-[#B21F1F]">Acerca de Nosotros</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg mb-4 text-[#B21F1F]">Soporte</h4>
          <ul className="list-none p-0">
            <li className="mb-2"><a href="/help" className="text-gray-400 no-underline transition-colors duration-200 hover:text-[#B21F1F]">Centro de Ayuda</a></li>
            <li className="mb-2"><a href="/contact" className="text-gray-400 no-underline transition-colors duration-200 hover:text-[#B21F1F]">Contáctanos</a></li>
            <li className="mb-2"><a href="/faq" className="text-gray-400 no-underline transition-colors duration-200 hover:text-[#B21F1F]">Preguntas Frecuentes</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg mb-4 text-[#B21F1F]">Legal</h4>
          <ul className="list-none p-0">
            <li className="mb-2"><a href="/privacy" className="text-gray-400 no-underline transition-colors duration-200 hover:text-[#B21F1F]">Política de Privacidad</a></li>
            <li className="mb-2"><a href="/terms" className="text-gray-400 no-underline transition-colors duration-200 hover:text-[#B21F1F]">Términos de Servicio</a></li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-gray-700 text-center py-6 text-gray-400">
        <p>&copy; 2024 ReeFood. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};
