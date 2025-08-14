import { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

interface SocialLinks {
  facebook?: string;
  instagram?: string;
  youtube?: string;
}

export const useSocialLinks = () => {
  const [socialLinks, setSocialLinks] = useState<SocialLinks>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Buscar configurações das redes sociais
        const configDoc = await getDoc(doc(firestore, 'config', 'social'));
        
        if (configDoc.exists()) {
          const data = configDoc.data() as SocialLinks;
          console.log('Social links from Firebase:', data);
          setSocialLinks(data);
        } else {
          // Valores padrão se não existir configuração
          console.log('No social config found, using defaults');
          setSocialLinks({
            facebook: 'https://facebook.com',
            instagram: 'https://instagram.com',
            youtube: 'https://youtube.com'
          });
        }
      } catch (err: any) {
        console.error('Error fetching social links:', err);
        setError(err.message || 'Erro ao carregar links sociais');
        // Valores padrão em caso de erro
        setSocialLinks({
          facebook: 'https://facebook.com',
          instagram: 'https://instagram.com',
          youtube: 'https://youtube.com'
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchSocialLinks();
  }, []);
  
  return { socialLinks, loading, error };
}; 