import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

// Importar o logo
import logoImage from '../assets/images/logo/logo.jpg';

const Header: React.FC = () => {
  const location = useLocation();

  const handleSobreNosClick = () => {
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

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <img src={logoImage} alt="Sons de Cena Logo" className="header-logo" />
          </Link>
        </div>
        <nav className="nav">
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
          <button className="btn-primary">Descobrir</button>
        </div>
      </div>
    </header>
  );
};

export default Header; 