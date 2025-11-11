import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';
import Contact from './Contact';
import SingerSlider from './SingerSlider';
import NewsletterSection from './NewsletterSection';

// Importar a imagem do banner
import bannerImage from '../assets/images/banner/banner.jpg';

const Hero: React.FC = () => {
  const navigate = useNavigate();

  const handleDiscoverArtists = () => {
    navigate('/artists');
  };

  const handleViewEvents = () => {
    navigate('/events');
  };
  return (
    <>
      <section className="hero" id="home">
        
        
        <div className="hero-content">
          <div className="hero-text">
          <div className="hero-background">
          <img 
            src={bannerImage} 
            alt="Sons de Cena Banner" 
            className="hero-banner-image"
          />
          <div className="hero-overlay"></div>
        </div>
            <h1 className="hero-title">
              SONS DE CENA
              <span className="hero-subtitle">A música não bate à porta, ela entra.</span>
            </h1>
            <p className="hero-description">
              Abra a janela. Ouça! Há vozes a vibrar do outro lado, batidas que pedem palco,  
              artistas que não cabem no silêncio e estão prontos para ocupar o seu espaço.
            </p>
            <div className="hero-buttons">
              <button className="hero-btn primary" onClick={handleDiscoverArtists}>Descobrir Artistas</button>
              <button className="hero-btn secondary" onClick={handleViewEvents}>Ver Eventos</button>
            </div>
          </div>
          
          
        </div>
      </section>

      <section id="singers" className="singers-section">
        <SingerSlider />
      </section>

      <section className="production-launch-section" id="producao">
        <div className="production-launch-container">
          <div className="production-launch-content">
            <div className="production-launch-intro">
              <h2 className="production-launch-title">🎛 Produção &amp; Lançamento</h2>
              <p className="production-launch-lead">
                Há talento que não pode esperar — e som que merece chegar mais longe. No Sons de Cena, não
                ficamos só à escuta: produzimos, orientamos e lançamos.
              </p>
            </div>
            <div className="production-launch-grid">
              <div className="production-launch-card">
                <span className="production-launch-icon">🎵</span>
                <p className="production-launch-text">Produção musical com identidade.</p>
              </div>
              <div className="production-launch-card">
                <span className="production-launch-icon">🚀</span>
                <p className="production-launch-text">Estratégia de lançamento em plataformas digitais.</p>
              </div>
              <div className="production-launch-card">
                <span className="production-launch-icon">📈</span>
                <p className="production-launch-text">Planeamento de presença e impacto.</p>
              </div>
            </div>
            <p className="production-launch-closing">
              O teu som não precisa de sorte. Precisa de estratégia. E nós tratamos disso.
            </p>
          </div>
          <div className="production-launch-media" aria-hidden="true">
            <div className="production-launch-overlay" />
          </div>
        </div>
      </section>

      <NewsletterSection />

      <section className="about-section" id="about">
        <div className="about-container">
          <div className="about-content">
            <h2 className="about-title">Sobre Nós</h2>
            <div className="about-text">
              <p className="about-paragraph">
                Sons de Cena não é uma lista. <br />
                É um radar de talento ativo, uma galeria sonora em carne e osso.
              </p>
              <p className="about-paragraph">
                Cada nome aqui tem corpo, tem som, tem presença. Está disponível e 
                ao seu alcance.
              </p>
              <div className="about-features">
                <div className="feature">
                  <span className="feature-icon">🎤</span>
                  <p>Procura o próximo nome para o seu festival?</p>
                </div>
                <div className="feature">
                  <span className="feature-icon">🎧</span>
                  <p>A voz certa para o seu evento?</p>
                </div>
                <div className="feature">
                  <span className="feature-icon">🎶</span>
                  <p>Uma alma criativa que transforme a sua ideia em arte?</p>
                </div>
              </div>
              <p className="about-paragraph highlight">
                Não procure no escuro, a cena está iluminada. Passe os olhos e ouça com atenção!
                O próximo a subir ao seu palco está aqui e já se apresentou.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Contact />
    </>
  );
};

export default Hero; 