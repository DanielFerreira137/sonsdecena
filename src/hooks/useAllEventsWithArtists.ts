import { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import { collection, getDocs, getDoc, query, orderBy } from 'firebase/firestore';

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
  date: any; // Firestore timestamp
  address?: string;
  singer?: any; // Firestore reference
  description?: string;
  price?: string;
  image?: string;
  artist?: Artist; // Resolved artist data
}

export const useAllEventsWithArtists = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('🔍 Buscando todos os eventos...');
        
        // Buscar todos os eventos ordenados por data (mais próximos primeiro)
        const eventsRef = collection(firestore, 'events');
        const q = query(eventsRef, orderBy('date', 'asc'));
        const snapshot = await getDocs(q);
        
        console.log('📊 Total de eventos encontrados:', snapshot.docs.length);
        
        const eventsData: Event[] = [];
        
        for (const docSnapshot of snapshot.docs) {
          const data = docSnapshot.data();
          
          // Resolver referência do artista se existir
          let artistData: Artist | undefined;
          if (data.singer) {
            try {
              const artistDoc = await getDoc(data.singer);
              if (artistDoc.exists()) {
                const artistInfo = artistDoc.data() as any;
                artistData = {
                  id: artistDoc.id,
                  name: artistInfo.name || 'Artista Desconhecido',
                  photo: artistInfo.photo || '',
                  genre: artistInfo.genre,
                  categoryName: artistInfo.categoryName
                };
                console.log('🎵 Artista encontrado para evento:', artistData.name);
              }
            } catch (artistError) {
              console.warn('Error fetching artist for event:', docSnapshot.id, artistError);
            }
          }
          
          console.log('🎵 Evento encontrado:', {
            id: docSnapshot.id,
            name: data.name,
            date: data.date,
            address: data.address,
            artist: artistData?.name
          });
          
          eventsData.push({
            id: docSnapshot.id,
            ...data,
            artist: artistData
          } as Event);
        }
        
        console.log('✅ Eventos processados:', eventsData);
        setEvents(eventsData);
      } catch (err: any) {
        console.error('❌ Error fetching events:', err);
        setError(err.message || 'Erro ao carregar eventos');
      } finally {
        setLoading(false);
      }
    };
    
    fetchEvents();
  }, []);
  
  return { events, loading, error };
}; 