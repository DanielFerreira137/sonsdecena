import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useArtistsWithCategories } from '../hooks/useArtistsWithCategories';
import './SingerSlider.css';



const SingerSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(3);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const navigate = useNavigate();
  const { artists: singers, loading, error } = useArtistsWithCategories();
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

  // Auto-slide effect
  useEffect(() => {
    if (singers.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const maxIndex = Math.max(0, singers.length - slidesPerView);
        if (prevIndex >= maxIndex) {
          return 0;
        }
        return prevIndex + 1;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [singers.length, slidesPerView]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const maxIndex = Math.max(0, singers.length - slidesPerView);
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

  const slideWidth = 100 / slidesPerView;
  const maxIndex = Math.max(0, singers.length - slidesPerView);

  // Debug: Log when singers data changes
  useEffect(() => {
    if (singers.length > 0) {
      console.log('🎤 Singers loaded in slider:', singers.length, 'artists');
      console.log('📐 Slides per view:', slidesPerView, 'Slide width:', slideWidth + '%');
    }
  }, [singers.length, slidesPerView, slideWidth]);

  const handleArtistClick = (artistId: string) => {
    navigate(`/artist/${artistId}`);
  };

  if (loading) {
    return (
      <div className="slider-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Procurando vozes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="slider-container">
        <div className="no-singers">
          <h3>Erro ao carregar artistas</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (singers.length === 0) {
    return (
      <div className="slider-container">
        <div className="no-singers">
          <h3>Nenhuma voz encontrada</h3>
          <p>Adicione artistas à sua coleção Firebase para vê-los aqui.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="slider-container">
      <div className="slider-header">
        <h2>Vozes da Cena</h2>
        <p>Descubra talentos que não cabem no silêncio</p>
      </div>
      
      <div className="slider">
        <button className="slider-btn prev-btn" onClick={prevSlide} disabled={currentIndex === 0}>
          ‹
        </button>
        
        <div 
          className="slider-content"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          ref={sliderRef}
        >
          <div 
            className="slider-track"
            style={{ 
              transform: `translateX(-${currentIndex * slideWidth}%)`
            }}
          >
            {singers.map((singer, index) => (
              <div key={singer.id} className="singer-slide">
                <div 
                  className="singer-card"
                  onClick={() => handleArtistClick(singer.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="singer-photo">
                    <img 
                      src={singer.photo || 'https://via.placeholder.com/200x200/FFD700/000?text=Artista'} 
                      alt={singer.name}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/200x200/FFD700/000?text=Artista';
                      }}
                    />
                  </div>
                  <div className="singer-info">
                    <h3>{singer.name}</h3>
                    {singer.categoryName && <p className="genre">{singer.categoryName}</p>}
                    {singer.genre && <p className="genre">{singer.genre}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <button 
          className="slider-btn next-btn" 
          onClick={nextSlide}
          disabled={singers.length <= slidesPerView || currentIndex >= maxIndex}
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default SingerSlider; 