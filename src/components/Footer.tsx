import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <a href="https://dist-post.com" target="_blank" rel="noopener noreferrer">
            <img src="/images/logo/dist-post-logo.png" alt="Dist-Post Logo" />
          </a>
          <div className="social-links">
            <a href="https://facebook.com" className="social-link" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://instagram.com" className="social-link" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://youtube.com" className="social-link" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
        
        <div className="footer-section">
          <h4>Onde atuamos</h4>
          <ul className="footer-links">
            <li><a href="#events">Palcos & Festivais</a></li>
            <li><a href="#events">Casamentos</a></li>
            <li><a href="#events">Aniversários</a></li>
            <li><a href="#events">Eventos Corporativos</a></li>
            <li><a href="#events">Festas Privadas</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Contacto</h4>
          <div className="contact-info">
            <p>📞 +351 934 460 912</p>
            <p>📧 carlalopes@dist-post.com</p>
            <p>📍 Porto, Portugal</p>
          </div>
        </div>
        
        <div className="footer-section">
          <h4>🕐 Horário</h4>
          <div className="hours">
            <p>Segunda a Sexta: 9h – 18h</p>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; 2025 Dist-Post. A cena está iluminada.</p>
          <div className="footer-bottom-links">
            <a href="#privacy">Privacidade</a>
            <a href="#terms">Termos</a>
          </div>
        </div>
      </div>
      
  
      
      
    </footer>
  );
};

export default Footer; 