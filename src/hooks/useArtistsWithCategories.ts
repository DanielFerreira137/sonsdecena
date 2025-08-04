import { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import { collection, getDocs, getDoc } from 'firebase/firestore';

interface Category {
  id: string;
  category: string;
}

interface Singer {
  id: string;
  name: string;
  photo: string;
  genre?: string;
  description?: string;
  category?: any; // Firestore reference
  categoryName?: string; // Resolved category name
}

export const useArtistsWithCategories = () => {
  const [artists, setArtists] = useState<Singer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const snapshot = await getDocs(collection(firestore, 'singers'));
        const artistsData: Singer[] = [];
        
        for (const docSnapshot of snapshot.docs) {
          const data = docSnapshot.data();
          
          // Resolver referência da categoria se existir
          if (data.category) {
            try {
              const categoryDoc = await getDoc(data.category);
              if (categoryDoc.exists()) {
                const categoryData = categoryDoc.data() as Category;
                data.categoryName = categoryData.category;
              }
            } catch (categoryError) {
              console.warn('Error fetching category for artist:', docSnapshot.id, categoryError);
              data.categoryName = 'Categoria não encontrada';
            }
          }
          
          artistsData.push({ 
            id: docSnapshot.id, 
            ...data 
          } as Singer);
        }
        
        setArtists(artistsData);
      } catch (err: any) {
        console.error('Error fetching artists with categories:', err);
        setError(err.message || 'Erro ao carregar artistas');
      } finally {
        setLoading(false);
      }
    };
    
    fetchArtists();
  }, []);
  
  return { artists, loading, error };
}; 