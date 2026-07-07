import React, { useState } from 'react';
import { booksData, glossaryData } from '../data/hubData';

export const Resources: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'books' | 'glossary' | 'communities'>('books');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter terms if on glossary tab
  const filteredTerms = React.useMemo(() => {
    if (activeSection !== 'glossary') return [];
    return glossaryData.filter(g => 
      g.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
      g.definition.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [activeSection, searchTerm]);

  // Book cover color generator (determines beautiful gradients for the CSS cover)
  const getBookCoverGradient = (index: number) => {
    const gradients = [
      'linear-gradient(135deg, #2d261f 0%, #1e1915 100%)', // Muted brown/gold
      'linear-gradient(135deg, #3d231e 0%, #201311 100%)', // Muted terracotta
      'linear-gradient(135deg, #1d2b21 0%, #0d1711 100%)', // Muted sage
      'linear-gradient(135deg, #1f282e 0%, #0e1417 100%)'  // Muted slate
    ];
    return gradients[index % gradients.length];
  };

  return (
    <div className="animate-fade-in py-8 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4 font-serif uppercase tracking-wider">Recursos y Biblioteca de Consulta</h2>
        <p className="text-[var(--text-secondary)] max-w-xl mx-auto text-sm">
          Encuentra libros clave, terminología demográfica y comunidades de apoyo en línea para profundizar en el entendimiento de la decisión.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-2 mb-8 bg-[rgba(255,255,255,0.02)] p-1 border border-[var(--border-color)] max-w-lg mx-auto">
        <button
          onClick={() => setActiveSection('books')}
          className={`flex-1 py-2.5 px-4 text-xs font-semibold border-none cursor-pointer text-center ${
            activeSection === 'books' 
              ? 'bg-[var(--accent-gold)] text-black font-serif' 
              : 'bg-transparent text-[var(--text-secondary)] hover:text-white'
          }`}
        >
          Libros Clave
        </button>
        <button
          onClick={() => setActiveSection('glossary')}
          className={`flex-1 py-2.5 px-4 text-xs font-semibold border-none cursor-pointer text-center ${
            activeSection === 'glossary' 
              ? 'bg-[var(--accent-rust)] text-white font-serif' 
              : 'bg-transparent text-[var(--text-secondary)] hover:text-white'
          }`}
        >
          Glosario DINK/Childfree
        </button>
        <button
          onClick={() => setActiveSection('communities')}
          className={`flex-1 py-2.5 px-4 text-xs font-semibold border-none cursor-pointer text-center ${
            activeSection === 'communities' 
              ? 'bg-[var(--accent-sage)] text-white font-serif' 
              : 'bg-transparent text-[var(--text-secondary)] hover:text-white'
          }`}
        >
          Comunidades
        </button>
      </div>

      {/* SECTION 1: BOOKS */}
      {activeSection === 'books' && (
        <div className="grid-container grid-cols-1 grid-cols-2 gap-8">
          {booksData.map((book, index) => (
            <div key={index} className="glass-card p-6 flex flex-col sm:flex-row gap-6 items-start">
              {/* CSS Stylized Book Cover */}
              <div 
                className="w-full sm:w-32 aspect-[3/4] shrink-0 flex flex-col justify-between p-4 relative overflow-hidden text-white font-serif border border-[var(--border-color)]"
                style={{ background: getBookCoverGradient(index) }}
              >
                {/* Decorative spine pattern */}
                <div className="absolute top-0 left-0 bottom-0 w-2 bg-black/25"></div>
                <div className="text-[8px] tracking-widest font-light uppercase opacity-75 pl-1.5">Ensayo</div>
                <div className="font-bold text-xs leading-tight line-clamp-3 mt-4 pl-1.5">{book.title}</div>
                <div className="text-[8px] font-medium opacity-90 truncate pl-1.5 mt-auto">{book.author}</div>
              </div>

              {/* Book Info */}
              <div className="flex-1 flex flex-col justify-between h-full">
                <div>
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <h3 className="text-lg font-bold text-white leading-tight font-serif">{book.title}</h3>
                    <span className="text-[10px] text-[var(--text-muted)] font-semibold shrink-0 font-mono">({book.year})</span>
                  </div>
                  <span className="text-xs text-[var(--accent-gold)] font-medium block mb-3 font-serif">por {book.author}</span>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-light mb-4">
                    {book.description}
                  </p>
                </div>

                {/* Tags and Link */}
                <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-[var(--border-color)] w-full">
                  <div className="flex flex-wrap gap-1.5">
                    {book.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="text-[9px] font-semibold bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-secondary)] px-2 py-0.5 rounded-none font-mono">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  {book.link && (
                    <a 
                      href={book.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-xs text-[var(--accent-gold)] hover:text-[var(--accent-rust)] hover:underline font-bold"
                    >
                      Conseguir →
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SECTION 2: GLOSSARY */}
      {activeSection === 'glossary' && (
        <div className="flex flex-col gap-6">
          {/* Search glossary */}
          <div className="relative max-w-md mx-auto w-full mb-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar término en el glosario..."
              className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] py-2.5 px-4 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-rust)] transition-colors"
            />
          </div>

          <div className="grid-container grid-cols-1 grid-cols-2 gap-6">
            {filteredTerms.length > 0 ? (
              filteredTerms.map((term, index) => (
                <div key={index} className="glass-card p-6 border-t-2 border-t-[var(--accent-rust)]">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-base font-bold text-white font-serif uppercase tracking-wider">
                      {term.term}
                    </h3>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-light mb-4">
                    {term.definition}
                  </p>
                  {term.origin && (
                    <div className="text-[10px] text-[var(--text-muted)] font-light leading-relaxed">
                      <strong>Origen/Contexto:</strong> {term.origin}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="col-span-2 glass-card text-center py-12 text-[var(--text-muted)] text-xs">
                No se encontraron términos que coincidan con la búsqueda.
              </div>
            )}
          </div>
        </div>
      )}

      {/* SECTION 3: COMMUNITIES */}
      {activeSection === 'communities' && (
        <div className="grid-container grid-cols-1 grid-cols-3 gap-6">
          {/* Community 1: Reddit */}
          <div className="glass-card p-6 flex flex-col justify-between text-center">
            <div>
              <h3 className="font-bold text-base mb-3 font-serif">Comunidad Reddit r/childfree</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-light mb-6">
                Una de las comunidades más grandes del mundo en internet (más de 1.5 millones de miembros) para debatir, desahogarse, compartir anécdotas y encontrar apoyo social.
              </p>
            </div>
            <a 
              href="https://www.reddit.com/r/childfree/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-secondary py-2 text-xs font-semibold justify-center"
            >
              Visitar Subreddit →
            </a>
          </div>

          {/* Community 2: Childfree Connection */}
          <div className="glass-card p-6 flex flex-col justify-between text-center">
            <div>
              <h3 className="font-bold text-base mb-3 font-serif">The Childfree Connection</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-light mb-6">
                Una plataforma y red social informativa internacional enfocada en educar, derribar estigmas y conectar a solteros y parejas que eligen activamente una vida libre de hijos.
              </p>
            </div>
            <a 
              href="https://www.thechildfreeconnection.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-secondary py-2 text-xs font-semibold justify-center"
            >
              Ir a la web →
            </a>
          </div>

          {/* Community 3: DINK Community */}
          <div className="glass-card p-6 flex flex-col justify-between text-center">
            <div>
              <h3 className="font-bold text-base mb-3 font-serif">Foros DINK y Estilo de Vida</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-light mb-6">
                Espacios de discusión y comunidades locales enfocados en la optimización financiera, viajes de lujo, ahorro e inversiones para parejas del tipo Doble Ingreso Sin Hijos.
              </p>
            </div>
            <a 
              href="https://www.reddit.com/r/dinks/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-secondary py-2 text-xs font-semibold justify-center"
            >
              Comunidad DINK →
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
