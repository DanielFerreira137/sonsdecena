import React from 'react';
import './WikiPage.css';

const WikiPage: React.FC = () => {
  return (
    <div className="wiki-container">
      <div className="wiki-content">
        <header className="wiki-header">
          <h1>📚 Wiki - Documentação das Tabelas</h1>
          <p className="wiki-subtitle">Guia completo dos campos necessários para cada coleção no Firebase Console</p>
          <div className="wiki-info-box">
            <p>💡 <strong>Como usar:</strong> Acesse o Firebase Console → Firestore Database → Selecione a coleção → Clique em "Add document"</p>
          </div>
        </header>

        <section className="wiki-section">
          <h2>🎤 Coleção: <code>singers</code> (Artistas)</h2>
          <p className="wiki-description">Esta coleção armazena informações sobre os artistas da plataforma.</p>
          
          <div className="wiki-table">
            <table>
              <thead>
                <tr>
                  <th>Campo</th>
                  <th>Tipo</th>
                  <th>Obrigatório</th>
                  <th>Descrição</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>name</code></td>
                  <td>string</td>
                  <td>✅ Sim</td>
                  <td>Nome do artista</td>
                </tr>
                <tr>
                  <td><code>photo</code></td>
                  <td>string (URL)</td>
                  <td>✅ Sim</td>
                  <td>URL da foto do artista</td>
                </tr>
                <tr>
                  <td><code>genre</code></td>
                  <td>string</td>
                  <td>❌ Não</td>
                  <td>Género musical do artista</td>
                </tr>
                <tr>
                  <td><code>description</code></td>
                  <td>string</td>
                  <td>❌ Não</td>
                  <td>Descrição/biografia do artista</td>
                </tr>
                <tr>
                  <td><code>category</code></td>
                  <td>Reference</td>
                  <td>❌ Não</td>
                  <td>Referência para documento na coleção <code>categories</code></td>
                </tr>
                <tr>
                  <td><code>email</code></td>
                  <td>string</td>
                  <td>❌ Não</td>
                  <td>Email de contacto do artista</td>
                </tr>
                <tr>
                  <td><code>facebook</code></td>
                  <td>string</td>
                  <td>❌ Não</td>
                  <td>Link do Facebook (sem https://)</td>
                </tr>
                <tr>
                  <td><code>instagram</code></td>
                  <td>string</td>
                  <td>❌ Não</td>
                  <td>Link do Instagram (sem https://)</td>
                </tr>
                <tr>
                  <td><code>spotify</code></td>
                  <td>string</td>
                  <td>❌ Não</td>
                  <td>Link do Spotify (sem https://)</td>
                </tr>
                <tr>
                  <td><code>youtube</code></td>
                  <td>string</td>
                  <td>❌ Não</td>
                  <td>Link do YouTube (sem https://)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="wiki-example">
            <h3>📝 Como inserir no Firebase Console:</h3>
            <ol className="wiki-steps">
              <li>Vá para <strong>Firestore Database</strong> no Firebase Console</li>
              <li>Clique na coleção <code>singers</code> (ou crie se não existir)</li>
              <li>Clique em <strong>"Add document"</strong></li>
              <li>Adicione os campos um por um:</li>
            </ol>
            <div className="wiki-fields-list">
              <div className="wiki-field-item">
                <span className="field-name">Campo:</span> <code>name</code>
                <span className="field-type">Tipo:</span> <code>string</code>
                <span className="field-value">Exemplo:</span> "Nome do Artista"
              </div>
              <div className="wiki-field-item">
                <span className="field-name">Campo:</span> <code>photo</code>
                <span className="field-type">Tipo:</span> <code>string</code>
                <span className="field-value">Exemplo:</span> "https://exemplo.com/foto.jpg"
              </div>
              <div className="wiki-field-item">
                <span className="field-name">Campo:</span> <code>genre</code>
                <span className="field-type">Tipo:</span> <code>string</code>
                <span className="field-value">Exemplo:</span> "Hip-Hop"
              </div>
              <div className="wiki-field-item">
                <span className="field-name">Campo:</span> <code>description</code>
                <span className="field-type">Tipo:</span> <code>string</code>
                <span className="field-value">Exemplo:</span> "Descrição do artista..."
              </div>
              <div className="wiki-field-item">
                <span className="field-name">Campo:</span> <code>category</code>
                <span className="field-type">Tipo:</span> <code>reference</code>
                <span className="field-value">Como fazer:</span> Selecione tipo "Reference" → Escolha coleção "categories" → Selecione o documento
              </div>
              <div className="wiki-field-item">
                <span className="field-name">Campo:</span> <code>email</code>
                <span className="field-type">Tipo:</span> <code>string</code>
                <span className="field-value">Exemplo:</span> "artista@email.com"
              </div>
              <div className="wiki-field-item">
                <span className="field-name">Campo:</span> <code>facebook</code>
                <span className="field-type">Tipo:</span> <code>string</code>
                <span className="field-value">Exemplo:</span> "facebook.com/artista" (sem https://)
              </div>
              <div className="wiki-field-item">
                <span className="field-name">Campo:</span> <code>instagram</code>
                <span className="field-type">Tipo:</span> <code>string</code>
                <span className="field-value">Exemplo:</span> "instagram.com/artista" (sem https://)
              </div>
              <div className="wiki-field-item">
                <span className="field-name">Campo:</span> <code>spotify</code>
                <span className="field-type">Tipo:</span> <code>string</code>
                <span className="field-value">Exemplo:</span> "open.spotify.com/artist/..." (sem https://)
              </div>
              <div className="wiki-field-item">
                <span className="field-name">Campo:</span> <code>youtube</code>
                <span className="field-type">Tipo:</span> <code>string</code>
                <span className="field-value">Exemplo:</span> "youtube.com/@artista" (sem https://)
              </div>
            </div>
          </div>
        </section>

        <section className="wiki-section">
          <h2>💿 Coleção: <code>lps</code> (Álbuns/LPs)</h2>
          <p className="wiki-description">Esta coleção armazena informações sobre os álbuns e LPs dos artistas.</p>
          
          <div className="wiki-table">
            <table>
              <thead>
                <tr>
                  <th>Campo</th>
                  <th>Tipo</th>
                  <th>Obrigatório</th>
                  <th>Descrição</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>name</code></td>
                  <td>string</td>
                  <td>✅ Sim</td>
                  <td>Nome do álbum/LP</td>
                </tr>
                <tr>
                  <td><code>year</code></td>
                  <td>number</td>
                  <td>✅ Sim</td>
                  <td>Ano de lançamento</td>
                </tr>
                <tr>
                  <td><code>pre-save</code></td>
                  <td>boolean</td>
                  <td>✅ Sim</td>
                  <td>Se o álbum ainda não foi lançado (true = "Brevemente")</td>
                </tr>
                <tr>
                  <td><code>singer</code></td>
                  <td>Reference</td>
                  <td>✅ Sim</td>
                  <td>Referência para documento na coleção <code>singers</code></td>
                </tr>
                <tr>
                  <td><code>photo</code></td>
                  <td>string (URL)</td>
                  <td>❌ Não</td>
                  <td>URL da capa do álbum</td>
                </tr>
                <tr>
                  <td><code>nova-era</code></td>
                  <td>boolean</td>
                  <td>❌ Não</td>
                  <td>Se o álbum pertence ao selo Nova Era (padrão: false)</td>
                </tr>
                <tr>
                  <td><code>link1</code></td>
                  <td>string (URL)</td>
                  <td>❌ Não</td>
                  <td>Link principal (Spotify, Apple Music, etc.)</td>
                </tr>
                <tr>
                  <td><code>link2</code></td>
                  <td>string (URL)</td>
                  <td>❌ Não</td>
                  <td>Link secundário (outra plataforma)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="wiki-example">
            <h3>📝 Como inserir no Firebase Console:</h3>
            <ol className="wiki-steps">
              <li>Vá para a coleção <code>lps</code></li>
              <li>Clique em <strong>"Add document"</strong></li>
              <li>Adicione os campos:</li>
            </ol>
            <div className="wiki-fields-list">
              <div className="wiki-field-item">
                <span className="field-name">Campo:</span> <code>name</code>
                <span className="field-type">Tipo:</span> <code>string</code>
                <span className="field-value">Exemplo:</span> "Nome do Álbum"
              </div>
              <div className="wiki-field-item">
                <span className="field-name">Campo:</span> <code>year</code>
                <span className="field-type">Tipo:</span> <code>number</code>
                <span className="field-value">Exemplo:</span> 2024
              </div>
              <div className="wiki-field-item">
                <span className="field-name">Campo:</span> <code>pre-save</code>
                <span className="field-type">Tipo:</span> <code>boolean</code>
                <span className="field-value">Exemplo:</span> false (ou true para "Brevemente")
              </div>
              <div className="wiki-field-item">
                <span className="field-name">Campo:</span> <code>singer</code>
                <span className="field-type">Tipo:</span> <code>reference</code>
                <span className="field-value">Como fazer:</span> Selecione tipo "Reference" → Escolha coleção "singers" → Selecione o artista
              </div>
              <div className="wiki-field-item">
                <span className="field-name">Campo:</span> <code>photo</code>
                <span className="field-type">Tipo:</span> <code>string</code>
                <span className="field-value">Exemplo:</span> "https://exemplo.com/capa.jpg"
              </div>
              <div className="wiki-field-item">
                <span className="field-name">Campo:</span> <code>nova-era</code>
                <span className="field-type">Tipo:</span> <code>boolean</code>
                <span className="field-value">Exemplo:</span> true (se for do selo Nova Era) ou false
              </div>
              <div className="wiki-field-item">
                <span className="field-name">Campo:</span> <code>link1</code>
                <span className="field-type">Tipo:</span> <code>string</code>
                <span className="field-value">Exemplo:</span> "https://open.spotify.com/album/..."
              </div>
              <div className="wiki-field-item">
                <span className="field-name">Campo:</span> <code>link2</code>
                <span className="field-type">Tipo:</span> <code>string</code>
                <span className="field-value">Exemplo:</span> "https://music.apple.com/album/..."
              </div>
            </div>
          </div>
        </section>

        <section className="wiki-section">
          <h2>🎪 Coleção: <code>events</code> (Eventos)</h2>
          <p className="wiki-description">Esta coleção armazena informações sobre eventos e concertos.</p>
          
          <div className="wiki-table">
            <table>
              <thead>
                <tr>
                  <th>Campo</th>
                  <th>Tipo</th>
                  <th>Obrigatório</th>
                  <th>Descrição</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>name</code></td>
                  <td>string</td>
                  <td>❌ Não</td>
                  <td>Nome do evento</td>
                </tr>
                <tr>
                  <td><code>date</code></td>
                  <td>Timestamp</td>
                  <td>✅ Sim</td>
                  <td>Data e hora do evento (Firestore Timestamp)</td>
                </tr>
                <tr>
                  <td><code>singer</code></td>
                  <td>Reference</td>
                  <td>✅ Sim</td>
                  <td>Referência para documento na coleção <code>singers</code></td>
                </tr>
                <tr>
                  <td><code>address</code></td>
                  <td>string</td>
                  <td>❌ Não</td>
                  <td>Endereço/local do evento</td>
                </tr>
                <tr>
                  <td><code>description</code></td>
                  <td>string</td>
                  <td>❌ Não</td>
                  <td>Descrição do evento</td>
                </tr>
                <tr>
                  <td><code>price</code></td>
                  <td>string</td>
                  <td>❌ Não</td>
                  <td>Preço do bilhete (ex: "15€", "Gratuito")</td>
                </tr>
                <tr>
                  <td><code>image</code></td>
                  <td>string (URL)</td>
                  <td>❌ Não</td>
                  <td>URL da imagem do evento</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="wiki-example">
            <h3>📝 Como inserir no Firebase Console:</h3>
            <ol className="wiki-steps">
              <li>Vá para a coleção <code>events</code></li>
              <li>Clique em <strong>"Add document"</strong></li>
              <li>Adicione os campos:</li>
            </ol>
            <div className="wiki-fields-list">
              <div className="wiki-field-item">
                <span className="field-name">Campo:</span> <code>name</code>
                <span className="field-type">Tipo:</span> <code>string</code>
                <span className="field-value">Exemplo:</span> "Concerto de Verão"
              </div>
              <div className="wiki-field-item">
                <span className="field-name">Campo:</span> <code>date</code>
                <span className="field-type">Tipo:</span> <code>timestamp</code>
                <span className="field-value">Como fazer:</span> Selecione tipo "Timestamp" → Clique no calendário → Escolha data e hora
              </div>
              <div className="wiki-field-item">
                <span className="field-name">Campo:</span> <code>singer</code>
                <span className="field-type">Tipo:</span> <code>reference</code>
                <span className="field-value">Como fazer:</span> Selecione tipo "Reference" → Escolha coleção "singers" → Selecione o artista
              </div>
              <div className="wiki-field-item">
                <span className="field-name">Campo:</span> <code>address</code>
                <span className="field-type">Tipo:</span> <code>string</code>
                <span className="field-value">Exemplo:</span> "Rua Exemplo, 123, Lisboa"
              </div>
              <div className="wiki-field-item">
                <span className="field-name">Campo:</span> <code>description</code>
                <span className="field-type">Tipo:</span> <code>string</code>
                <span className="field-value">Exemplo:</span> "Descrição do evento..."
              </div>
              <div className="wiki-field-item">
                <span className="field-name">Campo:</span> <code>price</code>
                <span className="field-type">Tipo:</span> <code>string</code>
                <span className="field-value">Exemplo:</span> "15€" ou "Gratuito"
              </div>
              <div className="wiki-field-item">
                <span className="field-name">Campo:</span> <code>image</code>
                <span className="field-type">Tipo:</span> <code>string</code>
                <span className="field-value">Exemplo:</span> "https://exemplo.com/evento.jpg"
              </div>
            </div>
          </div>
        </section>

        <section className="wiki-section">
          <h2>🏷️ Coleção: <code>categories</code> (Categorias)</h2>
          <p className="wiki-description">Esta coleção armazena as categorias dos artistas.</p>
          
          <div className="wiki-table">
            <table>
              <thead>
                <tr>
                  <th>Campo</th>
                  <th>Tipo</th>
                  <th>Obrigatório</th>
                  <th>Descrição</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>category</code></td>
                  <td>string</td>
                  <td>✅ Sim</td>
                  <td>Nome da categoria (ex: "Hip-Hop", "R&B", "Pop")</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="wiki-example">
            <h3>📝 Como inserir no Firebase Console:</h3>
            <ol className="wiki-steps">
              <li>Vá para a coleção <code>categories</code></li>
              <li>Clique em <strong>"Add document"</strong></li>
              <li>Adicione o campo:</li>
            </ol>
            <div className="wiki-fields-list">
              <div className="wiki-field-item">
                <span className="field-name">Campo:</span> <code>category</code>
                <span className="field-type">Tipo:</span> <code>string</code>
                <span className="field-value">Exemplo:</span> "Hip-Hop", "R&B", "Pop", "Rock", etc.
              </div>
            </div>
          </div>
        </section>

        <section className="wiki-section">
          <h2>⚠️ Notas Importantes</h2>
          <div className="wiki-notes">
            <ul>
              <li><strong>Referências:</strong> Os campos <code>singer</code> e <code>category</code> devem ser referências do Firestore, não strings. Use <code>doc(firestore, 'singers', artistId)</code> para criar referências.</li>
              <li><strong>Timestamps:</strong> O campo <code>date</code> em eventos deve ser um Firestore Timestamp. Use <code>Timestamp.fromDate(new Date())</code> ou <code>serverTimestamp()</code>.</li>
              <li><strong>Nomes dos Campos:</strong> Use exatamente os nomes como aparecem na tabela acima. Os campos são:
                <ul>
                  <li><code>pre-save</code> (com hífen)</li>
                  <li><code>nova-era</code> (com hífen)</li>
                </ul>
              </li>
              <li><strong>Links Sociais:</strong> Os links de redes sociais devem ser inseridos sem o prefixo <code>https://</code> (ex: "instagram.com/artista" em vez de "https://instagram.com/artista").</li>
              <li><strong>Ordenação:</strong> Os LPs são ordenados por <code>year</code> (descendente) e os eventos por <code>date</code> (ascendente).</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default WikiPage;

