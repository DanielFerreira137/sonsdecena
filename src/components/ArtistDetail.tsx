import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useArtistsWithCategories } from '../hooks/useArtistsWithCategories';
import { useEventsForArtist } from '../hooks/useEventsForArtist';
import './ArtistDetail.css';



const ArtistDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { artists: singers, loading, error } = useArtistsWithCategories();
  const { events, loading: eventsLoading, error: eventsError } = useEventsForArtist(id || '');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBackClick = () => {
    navigate(-1);
  };

  // Find the specific artist from the fetched artists
  const artist = singers.find(singer => singer.id === id);

  // Format date function
  const formatDate = (date: any) => {
    if (!date) return 'Data não definida';
    try {
      const dateObj = date.toDate ? date.toDate() : new Date(date);
      return dateObj.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Data inválida';
    }
  };

  if (loading) {
    return (
      <div className="artist-detail-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Carregando artista...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="artist-detail-container">
        <div className="artist-not-found">
          <h2>Erro ao carregar artista</h2>
          <p>{error}</p>
          <button onClick={handleBackClick} className="back-btn">
            Voltar
          </button>
        </div>
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="artist-detail-container">
        <div className="artist-not-found">
          <h2>Artista não encontrado</h2>
          <p>O artista que você está procurando não existe.</p>
          <button onClick={handleBackClick} className="back-btn">
            Voltar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="artist-detail-container">
      <div className="artist-detail-wrapper">
        <div className="artist-detail-content">
          <button onClick={handleBackClick} className="back-btn">
            ← Voltar
          </button>
          
          <div className="artist-detail-layout">
            {/* Coluna da Esquerda: Foto + Eventos */}
            <div className="artist-left-column">
              <div className="artist-detail-photo">
                <img 
                  src={artist.photo || 'https://via.placeholder.com/400x400/FFD700/000?text=Artista'} 
                  alt={artist.name}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/400x400/FFD700/000?text=Artista';
                  }}
                />
              </div>

              {/* Seção de Eventos */}
              <div className="events-section">
                <h2>Eventos</h2>
                
                {eventsLoading && (
                  <div className="events-loading">
                    <div className="spinner"></div>
                    <p>Carregando eventos...</p>
                  </div>
                )}

                {eventsError && (
                  <div className="events-error">
                    <p>Erro ao carregar eventos: {eventsError}</p>
                  </div>
                )}

                {!eventsLoading && !eventsError && events.length === 0 && (
                  <div className="no-events">
                    <p>Nenhum evento encontrado para este artista.</p>
                  </div>
                )}

                {!eventsLoading && !eventsError && events.length > 0 && (
                  <div className="events-list">
                    {events.map((event) => (
                      <div key={event.id} className="event-card">
                        {event.image && (
                          <div className="event-image">
                            <img 
                              src={event.image} 
                              alt={event.name || 'Evento'}
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = 'https://via.placeholder.com/300x200/FFD700/000?text=Evento';
                              }}
                            />
                          </div>
                        )}
                        <div className="event-info">
                          <h3>{event.name || 'Evento'}</h3>
                          <p className="event-date">
                            <strong>Data:</strong> {formatDate(event.date)}
                          </p>
                          {event.address && (
                            <p className="event-address">
                              <strong>Local:</strong> {event.address}
                            </p>
                          )}
                          {event.price && (
                            <p className="event-price">
                              <strong>Preço:</strong> {event.price}
                            </p>
                          )}
                          {event.description && (
                            <p className="event-description">{event.description}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Coluna da Direita: Informações do Artista */}
            <div className="artist-right-column">
              <div className="artist-detail-info">
                <div className="artist-name-section">
                  <h1>{artist.name}</h1>
                  {artist.email && (
                    <a href={`mailto:${artist.email}`} className="contact-btn">
                      Entrar em Contacto
                    </a>
                  )}
                </div>
                {artist.categoryName && (
                  <div className="artist-genre">
                    <span>{artist.categoryName}</span>
                    {/* Ícones Sociais */}
                    <div className="artist-social-icons">
                      {artist.facebook && (
                        <a href={`https://${artist.facebook}`} target="_blank" rel="noopener noreferrer" className="social-icon">
                          <i className="fab fa-facebook-f"></i>
                        </a>
                      )}
                      {artist.instagram && (
                        <a href={`https://${artist.instagram}`} target="_blank" rel="noopener noreferrer" className="social-icon">
                          <i className="fab fa-instagram"></i>
                        </a>
                      )}
                      {artist.spotify && (
                        <a href={`https://${artist.spotify}`} target="_blank" rel="noopener noreferrer" className="social-icon">
                          <i className="fab fa-spotify"></i>
                        </a>
                      )}
                      {artist.youtube && (
                        <a href={`https://${artist.youtube}`} target="_blank" rel="noopener noreferrer" className="social-icon">
                          <i className="fab fa-youtube"></i>
                        </a>
                      )}
                    </div>
                  </div>
                )}
                {artist.genre && <p className="artist-genre">{artist.genre}</p>}
                
                {artist.description && (
                  <div className="artist-description">
                    <h3>Sobre o Artista</h3>
                    <p>{artist.description}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistDetail; 