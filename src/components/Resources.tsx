import React, { useState } from 'react';
import { booksData, glossaryData } from '../data/hubData';
import { BookOpen, HelpCircle, Users, ExternalLink, Hash, Bookmark } from 'lucide-react';

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
      'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', // Indigo to Violet
      'linear-gradient(135deg, #db2777 0%, #e11d48 100%)', // Pink to Rose
      'linear-gradient(135deg, #0891b2 0%, #0d9488 100%)', // Cyan to Teal
      'linear-gradient(135deg, #b91c1c 0%, #c2410c 100%)'  // Red to Orange
    ];
    return gradients[index % gradients.length];
  };

  return (
    <div className="animate-fade-in py-8 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4">Recursos y Biblioteca de Consulta</h2>
        <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
          Encuentra libros clave, terminología demográfica y comunidades de apoyo en línea para profundizar en el entendimiento de la decisión.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-2 mb-8 bg-[rgba(255,255,255,0.02)] p-1 rounded-xl border border-white/5 max-w-lg mx-auto">
        <button
          onClick={() => setActiveSection('books')}
          className={`flex-1 py-2.5 px-4 text-xs font-semibold rounded-lg transition-all duration-200 border-none cursor-pointer flex items-center justify-center gap-2 ${
            activeSection === 'books' 
              ? 'bg-[var(--accent-violet)] text-white shadow-lg shadow-violet-500/20' 
              : 'bg-transparent text-[var(--text-secondary)] hover:text-white'
          }`}
        >
          <BookOpen size={14} />
          Libros Clave
        </button>
        <button
          onClick={() => setActiveSection('glossary')}
          className={`flex-1 py-2.5 px-4 text-xs font-semibold rounded-lg transition-all duration-200 border-none cursor-pointer flex items-center justify-center gap-2 ${
            activeSection === 'glossary' 
              ? 'bg-[var(--accent-pink)] text-white shadow-lg shadow-pink-500/20' 
              : 'bg-transparent text-[var(--text-secondary)] hover:text-white'
          }`}
        >
          <HelpCircle size={14} />
          Glosario DINK/Childfree
        </button>
        <button
          onClick={() => setActiveSection('communities')}
          className={`flex-1 py-2.5 px-4 text-xs font-semibold rounded-lg transition-all duration-200 border-none cursor-pointer flex items-center justify-center gap-2 ${
            activeSection === 'communities' 
              ? 'bg-[var(--accent-cyan)] text-white shadow-lg shadow-cyan-500/20' 
              : 'bg-transparent text-[var(--text-secondary)] hover:text-white'
          }`}
        >
          <Users size={14} />
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
                className="w-full sm:w-32 aspect-[3/4] rounded-xl shrink-0 flex flex-col justify-between p-4 shadow-lg relative overflow-hidden text-white font-display border border-white/10"
                style={{ background: getBookCoverGradient(index) }}
              >
                {/* Decorative spine pattern */}
                <div className="absolute top-0 left-0 bottom-0 w-2.5 bg-black/15 shadow-inner"></div>
                <div className="text-[10px] tracking-widest font-light uppercase opacity-75">Ensayo</div>
                <div className="font-bold text-sm leading-tight line-clamp-3 mt-4 pl-1">{book.title}</div>
                <div className="text-[9px] font-medium opacity-90 truncate pl-1">{book.author}</div>
              </div>

              {/* Book Info */}
              <div className="flex-1 flex flex-col justify-between h-full">
                <div>
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <h3 className="text-lg font-bold text-white leading-tight">{book.title}</h3>
                    <span className="text-[10px] text-[var(--text-muted)] font-semibold shrink-0 font-display">({book.year})</span>
                  </div>
                  <span className="text-xs text-[var(--accent-violet)] font-medium block mb-3">por {book.author}</span>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-light mb-4">
                    {book.description}
                  </p>
                </div>

                {/* Tags and Link */}
                <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-white/5 w-full">
                  <div className="flex flex-wrap gap-1.5">
                    {book.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="text-[9px] font-semibold bg-white/5 border border-white/5 text-[var(--text-secondary)] px-2 py-0.5 rounded flex items-center gap-0.5">
                        <Hash size={8} /> {tag}
                      </span>
                    ))}
                  </div>
                  {book.link && (
                    <a 
                      href={book.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-xs text-[var(--accent-violet)] hover:text-[var(--accent-pink)] hover:underline font-bold flex items-center gap-1"
                    >
                      Conseguir
                      <ExternalLink size={11} />
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
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-pink)] transition-colors"
            />
          </div>

          <div className="grid-container grid-cols-1 grid-cols-2 gap-6">
            {filteredTerms.length > 0 ? (
              filteredTerms.map((term, index) => (
                <div key={index} className="glass-card p-6 border-t-2 border-t-[var(--accent-pink)]">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-base font-bold text-white font-display flex items-center gap-1.5">
                      <Bookmark size={14} className="text-[var(--accent-pink)]" />
                      {term.term}
                    </h3>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-light mb-4">
                    {term.definition}
                  </p>
                  {term.origin && (
                    <div className="text-[10px] text-[var(--text-muted)] italic">
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
              <div className="w-12 h-12 rounded-xl bg-[rgba(236,72,153,0.1)] flex items-center justify-center text-[var(--accent-pink)] mx-auto mb-4">
                <Users size={24} />
              </div>
              <h3 className="font-bold text-base mb-2">Comunidad Reddit r/childfree</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-light mb-6">
                Una de las comunidades más grandes del mundo en internet (más de 1.5 millones de miembros) para debatir, desahogarse, compartir anécdotas y encontrar apoyo social.
              </p>
            </div>
            <a 
              href="https://www.reddit.com/r/childfree/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-secondary py-2 text-xs font-semibold flex items-center justify-center gap-1.5"
            >
              Visitar Subreddit
              <ExternalLink size={12} />
            </a>
          </div>

          {/* Community 2: Childfree Connection */}
          <div className="glass-card p-6 flex flex-col justify-between text-center">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[rgba(139,92,246,0.1)] flex items-center justify-center text-[var(--accent-violet)] mx-auto mb-4">
                <BookOpen size={24} />
              </div>
              <h3 className="font-bold text-base mb-2">The Childfree Connection</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-light mb-6">
                Una plataforma y red social informativa internacional enfocada en educar, derribar estigmas y conectar a solteros y parejas que eligen activamente una vida libre de hijos.
              </p>
            </div>
            <a 
              href="https://www.thechildfreeconnection.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-secondary py-2 text-xs font-semibold flex items-center justify-center gap-1.5"
            >
              Ir a la web
              <ExternalLink size={12} />
            </a>
          </div>

          {/* Community 3: DINK Community */}
          <div className="glass-card p-6 flex flex-col justify-between text-center">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[rgba(6,182,212,0.1)] flex items-center justify-center text-[var(--accent-cyan)] mx-auto mb-4">
                <Users size={24} />
              </div>
              <h3 className="font-bold text-base mb-2">Foros DINK y Estilo de Vida</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-light mb-6">
                Espacios de discusión y comunidades locales enfocados en la optimización financiera, viajes de lujo, ahorro e inversiones para parejas del tipo Doble Ingreso Sin Hijos.
              </p>
            </div>
            <a 
              href="https://www.reddit.com/r/dinks/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-secondary py-2 text-xs font-semibold flex items-center justify-center gap-1.5"
            >
              Comunidad DINK
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
