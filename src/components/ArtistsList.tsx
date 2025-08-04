import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useArtistsWithCategories } from '../hooks/useArtistsWithCategories';
import './ArtistsList.css';



const ArtistsList: React.FC = () => {
  const navigate = useNavigate();
  const { artists: singers, loading, error } = useArtistsWithCategories();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleArtistClick = (artistId: string) => {
    navigate(`/artist/${artistId}`);
  };

  if (loading) {
    return (
      <div className="artists-list-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Procurando vozes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="artists-list-container">
        <div className="no-singers">
          <h3>Erro ao carregar artistas</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (singers.length === 0) {
    return (
      <div className="artists-list-container">
        <div className="no-singers">
          <h3>Nenhuma voz encontrada</h3>
          <p>Adicione artistas à sua coleção Firebase para vê-los aqui.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="artists-list-container">
      <div className="artists-page-wrapper">
        <div className="artists-header">
          <h1>Vozes da Cena</h1>
          <p>Descubra talentos que não cabem no silêncio</p>
        </div>
        
        <div className="artists-grid">
          {singers.map((singer) => (
            <div 
              key={singer.id} 
              className="artist-card"
              onClick={() => handleArtistClick(singer.id)}
              style={{ cursor: 'pointer' }}
            >
              <div className="artist-photo">
                <img 
                  src={singer.photo || 'https://via.placeholder.com/200x200/FFD700/000?text=Artista'} 
                  alt={singer.name}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/200x200/FFD700/000?text=Artista';
                  }}
                />
              </div>
              <div className="artist-info">
                <h3>{singer.name}</h3>
                {singer.categoryName && <p className="genre">{singer.categoryName}</p>}
                {singer.genre && <p className="genre">{singer.genre}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtistsList; 