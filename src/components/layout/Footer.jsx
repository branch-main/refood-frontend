import './Footer.css';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>🍽️ ReeFood</h3>
          <p>Reduciendo el desperdicio de alimentos, una comida a la vez.</p>
        </div>
        
        <div className="footer-section">
          <h4>Enlaces Rápidos</h4>
          <ul>
            <li><a href="/listings">Explorar Alimentos</a></li>
            <li><a href="/restaurants">Restaurantes</a></li>
            <li><a href="/about">Acerca de Nosotros</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Soporte</h4>
          <ul>
            <li><a href="/help">Centro de Ayuda</a></li>
            <li><a href="/contact">Contáctanos</a></li>
            <li><a href="/faq">Preguntas Frecuentes</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Legal</h4>
          <ul>
            <li><a href="/privacy">Política de Privacidad</a></li>
            <li><a href="/terms">Términos de Servicio</a></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2024 ReeFood. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};
