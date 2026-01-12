import React, { useState, useEffect, useRef } from 'react';
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
  const [slidesPerView, setSlidesPerView] = useState(3);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Calculate slides per view based on screen size
  useEffect(() => {
    const updateSlidesPerView = () => {
      if (window.innerWidth <= 768) {
        setSlidesPerView(1);
      } else if (window.innerWidth <= 1024) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(3);
      }
    };

    updateSlidesPerView();
    window.addEventListener('resize', updateSlidesPerView);
    return () => window.removeEventListener('resize', updateSlidesPerView);
  }, []);

  // Auto-slide effect - only if there are more LPs than slides per view
  useEffect(() => {
    if (lps.length === 0) return;
    
    // Only auto-slide if there are more LPs than can be shown at once
    if (lps.length <= slidesPerView) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const maxIndex = Math.max(0, lps.length - slidesPerView);
        if (prevIndex >= maxIndex) {
          return 0;
        }
        return prevIndex + 1;
      });
    }, 5000); // Increased to 5 seconds for better visibility

    return () => clearInterval(interval);
  }, [lps.length, slidesPerView]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const maxIndex = Math.max(0, lps.length - slidesPerView);
      if (prevIndex >= maxIndex) {
        return 0;
      }
      return prevIndex + 1;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex <= 0) {
        return 0;
      }
      return prevIndex - 1;
    });
  };

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }
  };

  // Calculate slide width percentage based on slides per view
  const slideWidthPercent = 100 / slidesPerView;
  const maxIndex = Math.max(0, lps.length - slidesPerView);

  // Reset index when LPs change
  useEffect(() => {
    setCurrentIndex(0);
  }, [lps.length]);

  // Debug: Log when LPs data changes
  useEffect(() => {
    if (lps.length > 0) {
      console.log('💿 LPs loaded in slider:', lps.length, 'albums');
      console.log('📐 Slides per view:', slidesPerView, 'Slide width:', slideWidthPercent + '%');
      console.log('🎯 Current index:', currentIndex, 'Max index:', maxIndex);
      console.log('🔧 Transform:', `translateX(-${currentIndex * slideWidthPercent}%)`);
    }
  }, [lps.length, slidesPerView, slideWidthPercent, currentIndex, maxIndex]);

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
        
        <div 
          className="lp-slider-content"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          ref={sliderRef}
        >
          <div 
            className="lp-slider-track"
            style={{ 
              transform: `translateX(-${currentIndex * slideWidthPercent}%)`,
              display: 'flex'
            }}
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
          disabled={lps.length <= slidesPerView || currentIndex >= maxIndex}
          aria-label="Próximo LP"
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default LPSlider;

