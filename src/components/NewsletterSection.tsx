import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { firestore } from '../firebase';
import './NewsletterSection.css';

const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!email.trim()) {
      setStatus('error');
      return;
    }

    setIsSubmitting(true);
    setStatus('idle');

    try {
      await addDoc(collection(firestore, 'newsletterSubscriptions'), {
        email: email.trim(),
        createdAt: new Date()
      });

      setStatus('success');
      setEmail('');
    } catch (error) {
      console.error('Erro ao guardar subscrição da newsletter:', error);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="newsletter-section">
      <div className="newsletter-container">
        <div className="newsletter-content">
          <h2 className="newsletter-title">🔔 Fica em Sintonia</h2>
          <p className="newsletter-description">
            A cena não pára e tu não vais querer perder o próximo som. Subscreve a newsletter Sons de Cena e recebe:
          </p>
          <ul className="newsletter-benefits">
            <li>🎶 Novos lançamentos antes de toda a gente.</li>
            <li>🎤 Artistas em destaque.</li>
            <li>📅 Eventos, colaborações e oportunidades.</li>
          </ul>
          <p className="newsletter-highlight">Liga-te ao ritmo. Sem spam, só som.</p>

          <form className="newsletter-form" onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="newsletter-email">
              Email
            </label>
            <input
              id="newsletter-email"
              type="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="o.teu@email.com"
              required
              className="newsletter-input"
            />
            <button type="submit" className="newsletter-button" disabled={isSubmitting}>
              {isSubmitting ? 'A ligar-te...' : 'Quero ouvir primeiro!'}
            </button>
          </form>

          {status === 'success' && (
            <p className="newsletter-message success">✅ Estás em sintonia. Fica atento às próximas novidades.</p>
          )}
          {status === 'error' && (
            <p className="newsletter-message error">❌ Não foi possível guardar o teu email. Tenta novamente.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;

