import React, { useState, useMemo } from 'react';
import { studiesData } from '../data/hubData';

export const Studies: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [expandedStudyId, setExpandedStudyId] = useState<string | null>(null);

  // Available categories
  const categories = ['Todos', 'Psicología', 'Sociología', 'Economía', 'Medio Ambiente'];

  // Toggle study expansion
  const toggleExpand = (id: string) => {
    if (expandedStudyId === id) {
      setExpandedStudyId(null);
    } else {
      setExpandedStudyId(id);
    }
  };

  // Filter and search logic
  const filteredStudies = useMemo(() => {
    return studiesData.filter((study) => {
      const matchesCategory = selectedCategory === 'Todos' || study.category === selectedCategory;
      const matchesSearch = 
        study.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        study.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
        study.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        study.source.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  // Color mapper for categories
  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Psicología': return 'bg-[var(--bg-tertiary)] text-[var(--accent-gold)] border-[var(--border-color)]';
      case 'Sociología': return 'bg-[var(--bg-tertiary)] text-[var(--accent-rust)] border-[var(--border-color)]';
      case 'Economía': return 'bg-[var(--bg-tertiary)] text-[var(--accent-sage)] border-[var(--border-color)]';
      case 'Medio Ambiente': return 'bg-[var(--bg-tertiary)] text-[var(--accent-slate)] border-[var(--border-color)]';
      default: return 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border-[var(--border-color)]';
    }
  };

  return (
    <div className="animate-fade-in py-8 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4 font-serif uppercase tracking-wider">Estudios Científicos y Evidencia</h2>
        <p className="text-[var(--text-secondary)] max-w-xl mx-auto text-sm">
          Explora investigaciones sociológicas, demográficas y psicológicas publicadas en revistas científicas revisadas por pares.
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="glass-card mb-8 p-6 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Search bar */}
        <div className="flex-1">
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por título, autor o revista científica..."
            className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] py-3 px-4 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-gold)] transition-colors"
          />
        </div>

        {/* Filter Pill List */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs text-[var(--text-muted)] font-medium mr-2 font-serif uppercase tracking-wider">
            Filtrar:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-[10px] font-semibold border transition-all duration-200 cursor-pointer ${
                selectedCategory === cat 
                  ? 'bg-[var(--accent-gold)] text-black border-[var(--accent-gold)]'
                  : 'bg-transparent text-[var(--text-secondary)] border-[var(--border-color)] hover:border-[var(--accent-gold)] hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Studies Listing */}
      <div className="flex flex-col gap-6">
        {filteredStudies.length > 0 ? (
          filteredStudies.map((study) => {
            const isExpanded = expandedStudyId === study.id;
            return (
              <div 
                key={study.id} 
                className={`glass-card p-6 border-l-2 transition-all duration-300 ${
                  isExpanded ? 'border-l-[var(--accent-gold)] bg-[var(--bg-secondary)]' : 'border-l-[var(--border-color)]'
                }`}
              >
                {/* Header */}
                <div 
                  onClick={() => toggleExpand(study.id)} 
                  className="flex justify-between items-start gap-4 cursor-pointer"
                >
                  <div className="flex-1">
                    <span className={`inline-block px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest border mb-3 ${getCategoryColor(study.category)}`}>
                      {study.category}
                    </span>
                    <h3 className="text-xl font-bold text-[var(--text-primary)] hover:text-[var(--accent-gold)] transition-colors leading-snug font-serif">
                      {study.title}
                    </h3>
                    
                    {/* Meta info */}
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-[10px] text-[var(--text-muted)] font-light font-sans uppercase tracking-wider">
                      <span><strong>Autores:</strong> {study.authors}</span>
                      <span>•</span>
                      <span><strong>Año:</strong> {study.year}</span>
                      <span>•</span>
                      <span><strong>Revista:</strong> {study.source}</span>
                    </div>
                  </div>

                  {/* Expand indicator - clean text chevron */}
                  <div className="w-8 h-8 flex items-center justify-center text-[var(--text-secondary)] shrink-0 transition-colors hover:text-white font-sans text-xs">
                    {isExpanded ? '▲' : '▼'}
                  </div>
                </div>

                {/* Short Summary (always visible) */}
                <p className="mt-4 text-sm text-[var(--text-secondary)] leading-relaxed font-light">
                  {study.summary}
                </p>

                {/* Expanded Section */}
                {isExpanded && (
                  <div className="mt-6 pt-6 border-t border-[var(--border-color)] animate-fade-in">
                    {/* Methodology */}
                    <div className="mb-5">
                      <h4 className="text-[10px] text-[var(--accent-slate)] font-bold uppercase tracking-wider mb-2 font-serif">Metodología</h4>
                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-light">
                        {study.methodology}
                      </p>
                    </div>

                    {/* Key Findings */}
                    <div className="mb-6">
                      <h4 className="text-[10px] text-[var(--accent-rust)] font-bold uppercase tracking-wider mb-3 font-serif">Hallazgos Clave</h4>
                      <ul className="flex flex-col gap-2">
                        {study.keyFindings.map((finding, idx) => (
                          <li key={idx} className="text-xs text-[var(--text-secondary)] flex items-start gap-2 leading-relaxed font-light">
                            <span className="text-[var(--accent-rust)] shrink-0 mt-0.5">•</span>
                            <span>{finding}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Footer Actions */}
                    {study.link && (
                      <div className="flex justify-end">
                        <a 
                          href={study.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="btn-secondary py-2 px-4 text-xs font-semibold"
                        >
                          Ir al artículo original →
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="glass-card text-center py-12 text-[var(--text-muted)]">
            <p className="text-lg font-semibold font-serif uppercase tracking-wider">No se encontraron estudios</p>
            <p className="text-xs mt-2 font-light">Prueba refinando los filtros o cambiando tu búsqueda.</p>
          </div>
        )}
      </div>
    </div>
  );
};
