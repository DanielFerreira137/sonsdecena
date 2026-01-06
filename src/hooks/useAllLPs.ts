import { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

interface LP {
  id: string;
  name: string;
  year: number;
  preSave: boolean;
  novaEra?: boolean;
  photo?: string;
  singer?: any; // Firestore reference
  link1?: string;
  link2?: string;
}

export const useAllLPs = () => {
  const [lps, setLps] = useState<LP[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLPs = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('🔍 Buscando todos os LPs...');
        
        // Buscar todos os LPs
        const lpsRef = collection(firestore, 'lps');
        const q = query(lpsRef, orderBy('year', 'desc'));
        const snapshot = await getDocs(q);
        
        console.log('📊 Total de LPs encontrados:', snapshot.docs.length);
        
        const lpsData: LP[] = [];
        
        snapshot.docs.forEach((doc) => {
          const data = doc.data();
          console.log('💿 LP encontrado:', {
            id: doc.id,
            name: data.name,
            year: data.year,
            preSave: data.preSave,
            singer: data.singer,
            link1: data.link1,
            link2: data.link2
          });
          
          // Handle novaEra field - check both camelCase and kebab-case, default to false
          const novaEraValue = data.novaEra !== undefined ? data.novaEra : (data['nova-era'] !== undefined ? data['nova-era'] : false);
          
          lpsData.push({
            id: doc.id,
            name: data.name || '',
            year: data.year || 0,
            preSave: data.preSave || data['pre-save'] || false, // Suporta ambos os formatos
            novaEra: novaEraValue,
            photo: data.photo || '',
            singer: data.singer,
            link1: data.link1 || '',
            link2: data.link2 || ''
          } as LP);
        });
        
        // Ordenar LPs por ano (mais recentes primeiro)
        lpsData.sort((a, b) => {
          return b.year - a.year;
        });
        
        console.log('✅ LPs processados e ordenados:', lpsData);
        setLps(lpsData);
      } catch (err: any) {
        console.error('❌ Error fetching all LPs:', err);
        setError(err.message || 'Erro ao carregar LPs');
      } finally {
        setLoading(false);
      }
    };
    
    fetchLPs();
  }, []);
  
  return { lps, loading, error };
};




