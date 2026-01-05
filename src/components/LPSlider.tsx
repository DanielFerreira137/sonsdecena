import React, { useState, useEffect } from 'react';
import './LPSlider.css';

interface LP {
  id: string;
  name: string;
  year: number;
  preSave: boolean;
  novaEra?: boolean;
  photo?: string;
  link1?: string;
  link2?: string;
}

interface LPSliderProps {
  lps: LP[];
  loading: boolean;
  error: string | null;
}

const LPSlider: React.FC<LPSliderProps> = ({ lps, loading, error }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide effect (loop back to start when 2 slides left)
  useEffect(() => {
    if (lps.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex >= lps.length - 3) {
          return 0;
        }
        return prevIndex + 1;
      });
    }, 3000); // 3 seconds

    return () => clearInterval(interval);
  }, [lps.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex >= lps.length - 3) {
        return 0;
      }
      return prevIndex + 1;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? 0 : prevIndex - 1
    );
  };

  if (loading) {
    return (
      <div className="lp-slider-container">
        <div className="lp-loading-spinner">
          <div className="spinner"></div>
          <p>Carregando LPs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="lp-slider-container">
        <div className="lp-error">
          <p>Erro ao carregar LPs: {error}</p>
        </div>
      </div>
    );
  }

  if (lps.length === 0) {
    return (
      <div className="lp-slider-container">
        <div className="no-lps">
          <p>Nenhum LP encontrado para este artista.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="lp-slider-container">
      <div className="lp-slider-header">
        <h2>Discografia</h2>
      </div>
      
      <div className="lp-slider">
        <button 
          className="lp-slider-btn prev-btn" 
          onClick={prevSlide}
          disabled={currentIndex === 0}
          aria-label="LP anterior"
        >
          ‹
        </button>
        
        <div className="lp-slider-content">
          <div 
            className="lp-slider-track"
            style={{ transform: `translateX(-${currentIndex * 33.333}%)` }}
          >
            {lps.map((lp) => (
              <div key={lp.id} className="lp-slide">
                <div className="lp-card">
                  <div className="lp-photo">
                    <img 
                      src={lp.photo || 'https://via.placeholder.com/300x300/FFD700/000?text=LP'} 
                      alt={lp.name}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/300x300/FFD700/000?text=LP';
                      }}
                    />
                  </div>
                  <div className="lp-info">
                    <h3 className="lp-name">{lp.name}</h3>
                    {lp.preSave ? (
                      <p className="lp-year">Brevemente</p>
                    ) : (
                      <p className="lp-year">{lp.year}</p>
                    )}
                  </div>
                  
                  <div className="lp-links">
                    {lp.link1 && (
                      <a 
                        href={lp.link1} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="lp-link-btn"
                      >
                        <i className="fas fa-music"></i> Ouvir Agora
                      </a>
                    )}
                    {lp.link2 && (
                      <a 
                        href={lp.link2} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="lp-link-btn"
                      >
                        <i className="fas fa-headphones"></i> Link 2
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <button 
          className="lp-slider-btn next-btn" 
          onClick={nextSlide}
          disabled={lps.length <= 3}
          aria-label="Próximo LP"
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default LPSlider;

