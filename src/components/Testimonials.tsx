import React, { useState, useMemo } from 'react';
import { testimonialsData } from '../data/hubData';
import { Quote, MessageSquare, MapPin, User, ChevronRight, BookOpen } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const [selectedProfile, setSelectedProfile] = useState<string>('Todos');
  const [selectedStoryId, setSelectedStoryId] = useState<string>(testimonialsData[0]?.id || '');

  // Available filter options
  const filters = ['Todos', 'Senior (60+)', 'DINK', 'Profesional', 'Padre/Madre Arrepentido'];

  // Filtered list
  const filteredTestimonials = useMemo(() => {
    if (selectedProfile === 'Todos') return testimonialsData;
    return testimonialsData.filter((t) => t.profile === selectedProfile);
  }, [selectedProfile]);

  // Find currently selected story details
  const activeStory = useMemo(() => {
    return testimonialsData.find((t) => t.id === selectedStoryId) || testimonialsData[0];
  }, [selectedStoryId]);

  // Style mapper for profile tags
  const getProfileTagStyle = (profile: string) => {
    switch (profile) {
      case 'Senior (60+)': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'DINK': return 'bg-pink-500/10 text-pink-400 border-pink-500/20';
      case 'Profesional': return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
      case 'Padre/Madre Arrepentido': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      default: return 'bg-white/5 text-white/40 border-white/10';
    }
  };

  return (
    <div className="animate-fade-in py-8 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4">Testimonios y Voces Reales</h2>
        <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
          Lee reflexiones honestas e historias de vida de personas que han transitado la decisión childfree en diferentes etapas de la vida, así como la cruda realidad de la paternidad.
        </p>
      </div>

      {/* Filter list */}
      <div className="flex justify-center flex-wrap gap-2 mb-8 bg-[rgba(255,255,255,0.02)] p-1.5 rounded-xl border border-white/5 max-w-2xl mx-auto">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => {
              setSelectedProfile(filter);
              // Reset active story if current is not in filtered list
              const currentFiltered = testimonialsData.filter((t) => filter === 'Todos' || t.profile === filter);
              if (currentFiltered.length > 0 && !currentFiltered.some(t => t.id === selectedStoryId)) {
                setSelectedStoryId(currentFiltered[0].id);
              }
            }}
            className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-all duration-200 cursor-pointer ${
              selectedProfile === filter 
                ? 'bg-[var(--accent-violet)] text-white border-[var(--accent-violet)] shadow-lg shadow-violet-500/20'
                : 'bg-transparent text-[var(--text-secondary)] border-transparent hover:text-white hover:bg-white/5'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Two Column Layout: List on Left, Active Story on Right */}
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Left Side: Story Picker List */}
        <div className="w-full md:w-1/3 flex flex-col gap-3">
          <span className="text-xs text-[var(--text-muted)] font-bold uppercase tracking-wider mb-1">
            Testimonios ({filteredTestimonials.length})
          </span>
          {filteredTestimonials.length > 0 ? (
            filteredTestimonials.map((t) => {
              const isActive = t.id === selectedStoryId;
              return (
                <div
                  key={t.id}
                  onClick={() => setSelectedStoryId(t.id)}
                  className={`glass-card p-4 glass-card-interactive flex justify-between items-center transition-all ${
                    isActive 
                      ? 'border-[var(--accent-violet)] bg-[rgba(139,92,246,0.1)] translate-x-1' 
                      : 'hover:bg-white/5 border-white/5'
                  }`}
                >
                  <div className="truncate">
                    <h4 className={`font-bold text-sm ${isActive ? 'text-[var(--accent-violet)]' : 'text-white'}`}>
                      {t.name}, {t.age} años
                    </h4>
                    <span className="text-[10px] text-[var(--text-muted)] block mt-0.5">{t.profile}</span>
                  </div>
                  <ChevronRight size={16} className={`shrink-0 ${isActive ? 'text-[var(--accent-violet)]' : 'text-[var(--text-muted)]'}`} />
                </div>
              )
            })
          ) : (
            <div className="glass-card p-6 text-center text-xs text-[var(--text-muted)]">
              No hay testimonios para este filtro.
            </div>
          )}
        </div>

        {/* Right Side: Active Story Details */}
        <div className="w-full md:w-2/3">
          {activeStory ? (
            <div className="glass-card p-8 relative overflow-hidden bg-gradient-to-br from-[var(--card-bg)] to-[rgba(20,28,54,0.3)] min-h-[400px] flex flex-col justify-between">
              {/* Giant Decorative Quote Mark */}
              <div className="absolute top-4 right-6 text-white/5 select-none pointer-events-none">
                <Quote size={120} style={{ transform: 'rotate(180deg)' }} />
              </div>

              <div>
                {/* Header Profile Info */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/5 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[var(--accent-violet)]/10 flex items-center justify-center text-[var(--accent-violet)]">
                      <User size={20} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white leading-none mb-1">{activeStory.name}</h3>
                      <span className="text-xs text-[var(--text-secondary)] flex items-center gap-1">
                        {activeStory.age} años {activeStory.location && `• `}
                        {activeStory.location && <><MapPin size={10} /> {activeStory.location}</>}
                      </span>
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold border ${getProfileTagStyle(activeStory.profile)}`}>
                    {activeStory.profile}
                  </span>
                </div>

                {/* Highlight Quote */}
                <div className="relative mb-6">
                  <p className="text-lg md:text-xl font-display font-semibold italic text-[var(--text-primary)] pl-6 border-l-2 border-[var(--accent-violet)] leading-relaxed">
                    "{activeStory.quote}"
                  </p>
                </div>

                {/* Full Story */}
                <div className="text-sm md:text-base text-[var(--text-secondary)] leading-relaxed space-y-4">
                  <h4 className="text-xs font-bold text-[var(--accent-cyan)] uppercase tracking-wider flex items-center gap-1.5 mb-2">
                    <BookOpen size={13} /> Historia Completa
                  </h4>
                  <p className="whitespace-pre-line font-light">
                    {activeStory.story}
                  </p>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="mt-8 pt-4 border-t border-white/5 text-[10px] text-[var(--text-muted)] flex items-center gap-1.5">
                <MessageSquare size={12} />
                <span>Testimonio transcrito y traducido bajo consentimiento o recolectado de foros públicos de discusión neutral.</span>
              </div>
            </div>
          ) : (
            <div className="glass-card text-center py-20 text-[var(--text-muted)]">
              <MessageSquare size={48} className="mx-auto mb-4 opacity-30" />
              <p>Selecciona una historia a la izquierda para ver los detalles.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
