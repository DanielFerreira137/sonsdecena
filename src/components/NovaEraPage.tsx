import React, { useEffect } from 'react';
import { useAllLPs } from '../hooks/useAllLPs';
import LPSlider from './LPSlider';
import './NovaEraPage.css';

const NovaEraPage: React.FC = () => {
  const { lps: allLps, loading: lpsLoading, error: lpsError } = useAllLPs();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter LPs to only show those with novaEra === true
  const lps = allLps.filter(lp => lp.novaEra === true);

  return (
    <div className="nova-era-container">
      {/* Banner Hero Style */}
      <section className="nova-era-hero">
        <div className="nova-era-hero-content">
          <div className="nova-era-logo-container">
            <img 
              src="/nova_era_logo.png" 
              alt="Nova Era Music Logo" 
              className="nova-era-logo"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>
          <p className="nova-era-subtitle">Selo Digital Independente</p>
        </div>
      </section>

      {/* Seção de LPs e Álbuns - Logo após o banner */}
      <section className="nova-era-section nova-era-lps-section">
        <div className="nova-era-content-wrapper">
          <LPSlider lps={lps} loading={lpsLoading} error={lpsError} />
        </div>
      </section>

      {/* Seção 1 - Introdução */}
      <section className="nova-era-section nova-era-section-1">
        <div className="nova-era-content-wrapper">
          <div className="nova-era-text-content">
            <p className="nova-era-paragraph">
              A <strong>Nova Era Music</strong> é um selo digital independente, fundado e liderado por <strong>Rodrigo Di Giorgio</strong>, dedicado ao desenvolvimento, lançamento e promoção de projetos musicais autorais.
            </p>
            <p className="nova-era-paragraph">
              Com uma visão contemporânea e focada no digital, a Nova Era Music aposta em artistas com identidade própria, liberdade criativa e vontade de explorar novos caminhos sonoros. O selo trabalha a música não apenas como lançamento, mas como expressão artística, posicionamento e construção de carreira.
            </p>
            <p className="nova-era-paragraph">
              A trabalhar em parceria com os <strong>Sons de Cena</strong>, a Nova Era Music funciona como uma curadoria ativa de talento, ligando artistas emergentes e independentes a novas oportunidades no mercado musical.
            </p>
          </div>
        </div>
      </section>

      {/* Seção 2 - O que é */}
      <section className="nova-era-section nova-era-section-2">
        <div className="nova-era-content-wrapper">
          <div className="nova-era-text-content">
            <h2 className="nova-era-section-title">O que é a Nova Era Music</h2>
            <p className="nova-era-paragraph">
              A Nova Era Music nasce da necessidade de criar um espaço onde a música é pensada de forma estratégica e criativa ao mesmo tempo.
            </p>
            <p className="nova-era-paragraph">
              Aqui, cada projeto é tratado com atenção ao detalhe, estética, conceito e presença digital.
            </p>
            
            <div className="nova-era-features-grid">
              <div className="nova-era-feature-item">
                <span className="feature-icon">🎧</span>
                <p className="feature-text">Selo digital focado em lançamentos online</p>
              </div>
              <div className="nova-era-feature-item">
                <span className="feature-icon">🎶</span>
                <p className="feature-text">Desenvolvimento de artistas independentes</p>
              </div>
              <div className="nova-era-feature-item">
                <span className="feature-icon">🚀</span>
                <p className="feature-text">Estratégia, identidade e visão de futuro</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção 3 - Visão Artística */}
      <section className="nova-era-section nova-era-section-3">
        <div className="nova-era-content-wrapper">
          <div className="nova-era-text-content">
            <h2 className="nova-era-section-title">Visão Artística</h2>
            <p className="nova-era-paragraph">
              A <strong>Nova Era Music</strong> e os <strong>Sons de Cena</strong> acreditam numa nova forma de estar na música:
            </p>
            <p className="nova-era-highlight-text">
              menos fórmulas, mais verdade.<br />
              Menos ruído, mais identidade.
            </p>
            <p className="nova-era-paragraph">
              O selo acompanha artistas que cruzam géneros, desafiam padrões e encaram a música como linguagem pessoal e cultural.
            </p>
          </div>
        </div>
      </section>

      {/* Seção 4 - Parceria */}
      <section className="nova-era-section nova-era-section-4">
        <div className="nova-era-content-wrapper">
          <div className="nova-era-text-content">
            <h2 className="nova-era-section-title">Nova Era Music no Sons de Cena</h2>
            <p className="nova-era-paragraph">
              No Sons de Cena, a Nova Era Music apresenta os seus artistas e projetos como parte de uma vitrine musical ativa, facilitando o contacto com programadores, promotores, eventos e profissionais da indústria.
            </p>
            <p className="nova-era-paragraph">
              Esta parceria reforça o objetivo comum:
            </p>
            <p className="nova-era-highlight-text">
              dar visibilidade a talento real, disponível e pronto para palco, palco digital ou novos formatos.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NovaEraPage;

