import React, { useState, useMemo } from 'react';
import { testimonialsData } from '../data/hubData';

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
      case 'Senior (60+)': return 'bg-[var(--bg-tertiary)] text-[var(--accent-gold)] border-[var(--border-color)]';
      case 'DINK': return 'bg-[var(--bg-tertiary)] text-[var(--accent-rust)] border-[var(--border-color)]';
      case 'Profesional': return 'bg-[var(--bg-tertiary)] text-[var(--accent-slate)] border-[var(--border-color)]';
      case 'Padre/Madre Arrepentido': return 'bg-[var(--bg-tertiary)] text-[var(--accent-sage)] border-[var(--border-color)]';
      default: return 'bg-transparent text-[var(--text-muted)] border-[var(--border-color)]';
    }
  };

  return (
    <div className="animate-fade-in py-8 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4 font-serif uppercase tracking-wider">Testimonios y Voces Reales</h2>
        <p className="text-[var(--text-secondary)] max-w-xl mx-auto text-sm">
          Lee reflexiones honestas e historias de vida de personas que han transitado la decisión childfree en diferentes etapas de la vida, así como la cruda realidad de la paternidad.
        </p>
      </div>

      {/* Filter list */}
      <div className="flex justify-center flex-wrap gap-2 mb-8 bg-[rgba(255,255,255,0.02)] p-1.5 border border-[var(--border-color)] max-w-2xl mx-auto">
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
            className={`px-3 py-1.5 text-[10px] font-semibold border transition-all duration-200 cursor-pointer ${
              selectedProfile === filter 
                ? 'bg-[var(--accent-gold)] text-black border-[var(--accent-gold)]'
                : 'bg-transparent text-[var(--text-secondary)] border-transparent hover:text-white hover:bg-[var(--bg-tertiary)]'
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
          <span className="text-xs text-[var(--text-muted)] font-bold uppercase tracking-widest mb-1 font-serif">
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
                      ? 'border-[var(--accent-gold)] bg-[var(--bg-tertiary)] translate-x-1' 
                      : 'hover:bg-[var(--bg-tertiary)] border-[var(--border-color)]'
                  }`}
                >
                  <div className="truncate">
                    <h4 className={`font-bold text-sm font-serif ${isActive ? 'text-[var(--accent-gold)]' : 'text-white'}`}>
                      {t.name}, {t.age} años
                    </h4>
                    <span className="text-[10px] text-[var(--text-muted)] block mt-0.5 uppercase tracking-wider">{t.profile}</span>
                  </div>
                  <span className={`text-xs shrink-0 ${isActive ? 'text-[var(--accent-gold)]' : 'text-[var(--text-muted)]'}`}>→</span>
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
            <div className="glass-card p-8 min-h-[400px] flex flex-col justify-between">
              
              <div>
                {/* Header Profile Info */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[var(--border-color)] mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white font-serif mb-1">{activeStory.name}</h3>
                    <span className="text-xs text-[var(--text-secondary)] font-light">
                      {activeStory.age} años {activeStory.location && `• Area: ${activeStory.location}`}
                    </span>
                  </div>
                  <span className={`px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest border ${getProfileTagStyle(activeStory.profile)}`}>
                    {activeStory.profile}
                  </span>
                </div>

                {/* Highlight Quote */}
                <div className="relative mb-6">
                  <p className="text-lg md:text-xl font-serif italic text-[var(--text-primary)] pl-6 border-l-2 border-[var(--accent-gold)] leading-relaxed">
                    "{activeStory.quote}"
                  </p>
                </div>

                {/* Full Story */}
                <div className="text-sm md:text-base text-[var(--text-secondary)] leading-relaxed space-y-4">
                  <h4 className="text-[10px] font-bold text-[var(--accent-gold)] uppercase tracking-widest mb-3 font-serif">
                    Historia Completa
                  </h4>
                  <p className="whitespace-pre-line font-light">
                    {activeStory.story}
                  </p>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="mt-8 pt-4 border-t border-[var(--border-color)] text-[9px] text-[var(--text-muted)] leading-relaxed font-light">
                <span>Testimonio transcrito y traducido bajo consentimiento o recolectado de foros públicos de discusión neutral.</span>
              </div>
            </div>
          ) : (
            <div className="glass-card text-center py-20 text-[var(--text-muted)]">
              <p className="font-serif uppercase tracking-wider text-sm">Selecciona una historia a la izquierda para comenzar a leer.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
