import { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import { collection, getDocs, query, where, doc } from 'firebase/firestore';

interface Event {
  id: string;
  name?: string;
  date: any; // Firestore timestamp
  address?: string;
  singer?: any; // Firestore reference
  description?: string;
  price?: string;
  image?: string;
}

export const useEventsForArtist = (artistId: string) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!artistId) {
      setEvents([]);
      setLoading(false);
      return;
    }

    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('🔍 Buscando eventos para o artista:', artistId);
        
        // Criar referência do documento do artista
        const artistRef = doc(firestore, 'singers', artistId);
        console.log('📄 Referência do artista criada:', artistRef.path);
        
        // Buscar eventos onde o singer é igual à referência do artista
        const eventsRef = collection(firestore, 'events');
        const q = query(eventsRef, where('singer', '==', artistRef));
        const snapshot = await getDocs(q);
        
        console.log('📊 Total de eventos encontrados:', snapshot.docs.length);
        
        const eventsData: Event[] = [];
        
        snapshot.docs.forEach((doc) => {
          const data = doc.data();
          console.log('🎵 Evento encontrado:', {
            id: doc.id,
            name: data.name,
            date: data.date,
            address: data.address,
            singer: data.singer,
            price: data.price
          });
          
          eventsData.push({
            id: doc.id,
            ...data
          } as Event);
        });
        
        // Ordenar eventos por data (mais recentes primeiro)
        eventsData.sort((a, b) => {
          if (a.date && b.date) {
            return b.date.toDate() - a.date.toDate();
          }
          return 0;
        });
        
        console.log('✅ Eventos processados e ordenados:', eventsData);
        setEvents(eventsData);
      } catch (err: any) {
        console.error('❌ Error fetching events for artist:', err);
        setError(err.message || 'Erro ao carregar eventos');
      } finally {
        setLoading(false);
      }
    };
    
    fetchEvents();
  }, [artistId]);
  
  return { events, loading, error };
}; 