import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

// Importar o logo
import logoImage from '../assets/images/logo/logo.jpg';

const Header: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSobreNosClick = () => {
    setIsMobileMenuOpen(false);
    if (location.pathname !== '/') {
      // Se não estiver na página inicial, navega para lá
      window.location.href = '/#about';
    } else {
      // Se já estiver na página inicial, apenas faz scroll para a seção
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleContatoClick = () => {
    setIsMobileMenuOpen(false);
    if (location.pathname !== '/') {
      // Se não estiver na página inicial, navega para lá
      window.location.href = '/#contact';
    } else {
      // Se já estiver na página inicial, apenas faz scroll para a seção
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }} onClick={handleLinkClick}>
            <img src={logoImage} alt="Sons de Cena Logo" className="header-logo" />
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="nav desktop-nav">
          <ul className="nav-list">
            <li><Link to="/" className="nav-link">Home</Link></li>
            <li><Link to="/#about" onClick={handleSobreNosClick} className="nav-link">Sobre Nós</Link></li>
            <li><Link to="/artists" className="nav-link">Artistas</Link></li>
            <li><Link to="/events" className="nav-link">Eventos</Link></li>
            <li><Link to="/nova-era" className="nav-link">Nova Era</Link></li>
            <li><Link to="/#contact" onClick={handleContatoClick} className="nav-link">Contacto</Link></li>
          </ul>
        </nav>

        <div className="header-actions">
          <button className="btn-primary desktop-btn">Descobrir</button>
          
          {/* Hamburger Menu Button */}
          <button 
            className={`hamburger-menu ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <nav className="mobile-nav">
          <ul className="mobile-nav-list">
            <li>
              <Link to="/" className="mobile-nav-link" onClick={handleLinkClick}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/#about" onClick={handleSobreNosClick} className="mobile-nav-link">
                Sobre Nós
              </Link>
            </li>
            <li>
              <Link to="/artists" className="mobile-nav-link" onClick={handleLinkClick}>
                Artistas
              </Link>
            </li>
            <li>
              <Link to="/events" className="mobile-nav-link" onClick={handleLinkClick}>
                Eventos
              </Link>
            </li>
            <li>
              <Link to="/nova-era" className="mobile-nav-link" onClick={handleLinkClick}>
                Nova Era
              </Link>
            </li>
            <li>
              <Link to="/#contact" onClick={handleContatoClick} className="mobile-nav-link">
                Contacto
              </Link>
            </li>
            <li>
              <button className="btn-primary mobile-btn" onClick={handleLinkClick}>
                Descobrir
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="mobile-menu-overlay" 
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </header>
  );
};

export default Header; 