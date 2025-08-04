import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useArtistsWithCategories } from '../hooks/useArtistsWithCategories';
import './SingerSlider.css';



const SingerSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const { artists: singers, loading, error } = useArtistsWithCategories();

  // Auto-slide effect (loop back to start when 2 slides left)
  useEffect(() => {
    if (singers.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex >= singers.length - 3) {
          return 0;
        }
        return prevIndex + 1;
      });
    }, 2000); // 2 seconds

    return () => clearInterval(interval);
  }, [singers.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex >= singers.length - 3) {
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
        
        <div className="slider-content">
          <div 
            className="slider-track"
            style={{ transform: `translateX(-${currentIndex * 33.333}%)` }}
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
        
        <button className="slider-btn next-btn" onClick={nextSlide}>
          ›
        </button>
      </div>
    </div>
  );
};

export default SingerSlider; 