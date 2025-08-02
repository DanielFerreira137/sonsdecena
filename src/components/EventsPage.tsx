import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAllEventsWithArtists } from '../hooks/useAllEventsWithArtists';
import './EventsPage.css';

interface Artist {
  id: string;
  name: string;
  photo: string;
  genre?: string;
  categoryName?: string;
}

interface Event {
  id: string;
  name?: string;
  date: any;
  address?: string;
  description?: string;
  price?: string;
  image?: string;
  artist?: Artist;
}

const EventsPage: React.FC = () => {
  const navigate = useNavigate();
  const { events, loading, error } = useAllEventsWithArtists();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  // Check if event is upcoming (within next 30 days)
  const isUpcoming = (date: any) => {
    if (!date) return false;
    try {
      const eventDate = date.toDate ? date.toDate() : new Date(date);
      const now = new Date();
      const thirtyDaysFromNow = new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000));
      return eventDate >= now && eventDate <= thirtyDaysFromNow;
    } catch (error) {
      return false;
    }
  };

  const handleArtistClick = (artistId: string) => {
    navigate(`/artist/${artistId}`);
  };

  const handleEventClick = (eventId: string) => {
    // Future: Navigate to event detail page
    console.log('Event clicked:', eventId);
  };

  if (loading) {
    return (
      <div className="events-page-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Procurando palcos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="events-page-container">
        <div className="events-error">
          <h2>Erro ao carregar eventos</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="events-page-container">
      <div className="events-page-wrapper">
        <div className="events-header">
          <h1>Palcos Iluminados</h1>
          <p>Descubra onde as vozes vão ocupar o espaço</p>
        </div>

        {events.length === 0 ? (
          <div className="no-events">
            <h3>Nenhum evento encontrado</h3>
            <p>Não há eventos programados no momento.</p>
          </div>
        ) : (
          <div className="events-grid">
            {events.map((event) => (
              <div key={event.id} className="event-card">
                {event.image && (
                  <div className="event-image">
                    <img 
                      src={event.image} 
                     
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/400x250/FFD700/000?text=Evento';
                      }}
                    />
                    {isUpcoming(event.date) && (
                      <div className="upcoming-badge">Próximo</div>
                    )}
                  </div>
                )}
                
                <div className="event-content">
                  <div className="event-header">
                    <h3>{event.name || 'Evento'}</h3>
                    {event.price && (
                      <span className="event-price-badge">{event.price}</span>
                    )}
                  </div>

                  <div className="event-date">
                    <strong>Data:</strong> {formatDate(event.date)}
                  </div>

                  {event.address && (
                    <div className="event-address">
                      <strong>Local:</strong> {event.address}
                    </div>
                  )}

                  {event.artist && (
                    <div className="event-artist-simple" onClick={() => handleArtistClick(event.artist!.id)}>
                    
                      <div className="artist-info">
                        <div className="artist-photo">
                          <img 
                            src={event.artist.photo || 'https://via.placeholder.com/40x40/FFD700/000?text=Artista'} 
                            alt={event.artist.name}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'https://via.placeholder.com/40x40/FFD700/000?text=Artista';
                            }}
                          />
                        </div>
                        <span className="artist-name">{event.artist.name}</span>
                      </div>
                    </div>
                  )}

                  {event.description && (
                    <div className="event-description">
                      <p>{event.description}</p>
                    </div>
                  )}

                  <button 
                    className="event-details-btn"
                    onClick={() => handleEventClick(event.id)}
                  >
                    Ver Detalhes
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage; 