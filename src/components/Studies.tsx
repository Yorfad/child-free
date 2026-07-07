import React, { useState, useMemo } from 'react';
import { studiesData } from '../data/hubData';
import { Search, Filter, GraduationCap, ChevronDown, ChevronUp, ExternalLink, Calendar, User } from 'lucide-react';

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
      case 'Psicología': return 'bg-[rgba(139,92,246,0.1)] text-[var(--accent-violet)] border-[rgba(139,92,246,0.2)]';
      case 'Sociología': return 'bg-[rgba(236,72,153,0.1)] text-[var(--accent-pink)] border-[rgba(236,72,153,0.2)]';
      case 'Economía': return 'bg-[rgba(16,185,129,0.1)] text-[var(--accent-emerald)] border-[rgba(16,185,129,0.2)]';
      case 'Medio Ambiente': return 'bg-[rgba(6,182,212,0.1)] text-[var(--accent-cyan)] border-[rgba(6,182,212,0.2)]';
      default: return 'bg-white/5 text-[var(--text-secondary)] border-white/10';
    }
  };

  return (
    <div className="animate-fade-in py-8 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4">Estudios Científicos y Evidencia</h2>
        <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
          Explora investigaciones sociológicas, demográficas y psicológicas publicadas en revistas científicas revisadas por pares.
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="glass-card mb-8 p-6 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Search bar */}
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por título, autor o palabras clave..."
            className="w-full bg-[var(--bg-primary)] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-violet)] transition-colors"
          />
        </div>

        {/* Filter Pill List */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs text-[var(--text-muted)] font-medium flex items-center gap-1.5 mr-2">
            <Filter size={14} /> Filtrar:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all duration-200 cursor-pointer ${
                selectedCategory === cat 
                  ? 'bg-[var(--accent-violet)] text-white border-[var(--accent-violet)]'
                  : 'bg-[rgba(255,255,255,0.02)] text-[var(--text-secondary)] border-white/5 hover:bg-white/5 hover:text-white'
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
                className={`glass-card p-6 border-l-4 transition-all duration-300 ${
                  isExpanded ? 'border-l-[var(--accent-violet)] bg-[rgba(20,28,54,0.4)]' : 'border-l-[rgba(255,255,255,0.15)]'
                }`}
              >
                {/* Header */}
                <div 
                  onClick={() => toggleExpand(study.id)} 
                  className="flex justify-between items-start gap-4 cursor-pointer"
                >
                  <div className="flex-1">
                    <span className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border mb-3 ${getCategoryColor(study.category)}`}>
                      {study.category}
                    </span>
                    <h3 className="text-lg md:text-xl font-bold text-[var(--text-primary)] hover:text-[var(--accent-violet)] transition-colors leading-snug">
                      {study.title}
                    </h3>
                    
                    {/* Meta info */}
                    <div className="flex flex-wrap gap-4 mt-3 text-xs text-[var(--text-muted)] font-light">
                      <span className="flex items-center gap-1">
                        <User size={13} /> {study.authors}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={13} /> {study.year}
                      </span>
                      <span className="flex items-center gap-1 font-medium text-[rgba(255,255,255,0.4)]">
                        <GraduationCap size={13} /> {study.source}
                      </span>
                    </div>
                  </div>

                  {/* Expand icon */}
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[var(--text-secondary)] shrink-0 transition-colors hover:bg-white/10 hover:text-white">
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </div>

                {/* Short Summary (always visible) */}
                <p className="mt-4 text-sm text-[var(--text-secondary)] leading-relaxed">
                  {study.summary}
                </p>

                {/* Expanded Section */}
                {isExpanded && (
                  <div className="mt-6 pt-6 border-t border-white/5 animate-fade-in">
                    {/* Methodology */}
                    <div className="mb-5">
                      <h4 className="text-xs text-[var(--accent-cyan)] font-bold uppercase tracking-wider mb-2">Metodología</h4>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                        {study.methodology}
                      </p>
                    </div>

                    {/* Key Findings */}
                    <div className="mb-6">
                      <h4 className="text-xs text-[var(--accent-pink)] font-bold uppercase tracking-wider mb-3">Hallazgos Clave</h4>
                      <ul className="flex flex-col gap-2.5">
                        {study.keyFindings.map((finding, idx) => (
                          <li key={idx} className="text-sm text-[var(--text-secondary)] flex items-start gap-2.5 leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-pink)] shrink-0 mt-2"></span>
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
                          className="btn-secondary py-2 px-4 text-xs font-semibold flex items-center gap-1.5"
                        >
                          Ir al artículo original
                          <ExternalLink size={12} />
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
            <GraduationCap size={48} className="mx-auto mb-4 opacity-30" />
            <p className="text-lg font-semibold">No se encontraron estudios</p>
            <p className="text-sm mt-1">Prueba refinando los filtros o cambiando tu búsqueda.</p>
          </div>
        )}
      </div>
    </div>
  );
};
