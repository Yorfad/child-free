import React from 'react';
import { Coins, Leaf, Clock, ArrowRight, Brain, BookOpen, Calculator, MessageSquare } from 'lucide-react';

interface DashboardProps {
  setActiveTab: (tab: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ setActiveTab }) => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="text-center py-12 md:py-20 max-w-4xl mx-auto px-4">
        <span className="px-4 py-1.5 rounded-full bg-[rgba(139,92,246,0.1)] border border-[rgba(139,92,246,0.2)] text-[var(--accent-violet)] text-sm font-medium inline-block mb-6">
          Biblioteca de Información y Autoconocimiento
        </span>
        <h1 className="mb-6 font-extrabold leading-tight">
          La elección consciente de <br />
          <span className="gradient-text gradient-violet-pink">No Tener Hijos</span>
        </h1>
        <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto font-light">
          Un espacio neutral respaldado por ciencia, datos demográficos y testimonios reales para explorar, reflexionar y entender el estilo de vida Childfree.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button 
            onClick={() => setActiveTab('selftest')} 
            className="btn-primary"
          >
            Realizar Test de Compatibilidad
            <ArrowRight size={18} />
          </button>
          <button 
            onClick={() => setActiveTab('studies')} 
            className="btn-secondary"
          >
            Ver Estudios Científicos
          </button>
        </div>
      </section>

      {/* High-Impact Stat Cards */}
      <section className="py-8 px-4 max-w-6xl mx-auto">
        <h2 className="text-center text-2xl md:text-3xl mb-10 font-bold">
          Métricas de Impacto Childfree
        </h2>
        <div className="grid-container grid-cols-1 grid-cols-3">
          {/* Card 1: Economic */}
          <div className="glass-card flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[rgba(16,185,129,0.1)] flex items-center justify-center text-[var(--accent-emerald)] mb-6">
                <Coins size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Ahorro Económico</h3>
              <p className="text-[var(--text-muted)] text-sm mb-4">Por hijo criado hasta los 18 años</p>
              <div className="text-4xl font-bold font-display text-[var(--accent-emerald)] my-4">
                $250,000+ <span className="text-lg font-light text-[var(--text-secondary)]">USD</span>
              </div>
              <p className="text-sm">
                Basado en datos de costos promedio de crianza en países de ingresos altos (vivienda, educación, salud, comida).
              </p>
            </div>
            <button 
              onClick={() => setActiveTab('calculator')} 
              className="mt-6 flex items-center gap-2 text-xs text-[var(--accent-emerald)] hover:underline font-semibold bg-transparent border-none cursor-pointer self-start"
            >
              Calcular tu ahorro <ArrowRight size={12} />
            </button>
          </div>

          {/* Card 2: Environment */}
          <div className="glass-card flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[rgba(6,182,212,0.1)] flex items-center justify-center text-[var(--accent-cyan)] mb-6">
                <Leaf size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Huella Climática</h3>
              <p className="text-[var(--text-muted)] text-sm mb-4">Ahorro anual de carbono por persona</p>
              <div className="text-4xl font-bold font-display text-[var(--accent-cyan)] my-4">
                58.6 <span className="text-lg font-light text-[var(--text-secondary)]">Tons CO₂e</span>
              </div>
              <p className="text-sm">
                Estudio publicado en <em>Environmental Research Letters</em>. Equivale a decenas de veces más impacto que llevar una dieta vegetal.
              </p>
            </div>
            <button 
              onClick={() => setActiveTab('statistics')} 
              className="mt-6 flex items-center gap-2 text-xs text-[var(--accent-cyan)] hover:underline font-semibold bg-transparent border-none cursor-pointer self-start"
            >
              Ver comparativa <ArrowRight size={12} />
            </button>
          </div>

          {/* Card 3: Quality Time */}
          <div className="glass-card flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[rgba(139,92,246,0.1)] flex items-center justify-center text-[var(--accent-violet)] mb-6">
                <Clock size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Tiempo Libre y Energía</h3>
              <p className="text-[var(--text-muted)] text-sm mb-4">Tiempo libre directo en 18 años</p>
              <div className="text-4xl font-bold font-display text-[var(--accent-violet)] my-4">
                26,000+ <span className="text-lg font-light text-[var(--text-secondary)]">Horas</span>
              </div>
              <p className="text-sm">
                Tiempo promedio estimado dedicado exclusivamente al cuidado directo de niños, tareas escolares e intendencia adicional.
              </p>
            </div>
            <button 
              onClick={() => setActiveTab('testimonials')} 
              className="mt-6 flex items-center gap-2 text-xs text-[var(--accent-violet)] hover:underline font-semibold bg-transparent border-none cursor-pointer self-start"
            >
              Leer testimonios <ArrowRight size={12} />
            </button>
          </div>
        </div>
      </section>

      {/* Information Modules/Cards */}
      <section className="py-12 px-4 max-w-6xl mx-auto">
        <div className="glass-card bg-[linear-gradient(135deg,rgba(13,19,38,0.7)_0%,rgba(20,28,54,0.4)_100%)] p-8 md:p-12 mb-12">
          <div className="max-w-3xl">
            <h2 className="text-3xl mb-6">El Auge Demográfico de la Libre Elección</h2>
            <p className="text-base text-[var(--text-secondary)] mb-6 leading-relaxed">
              En las últimas décadas, el porcentaje de adultos en edad reproductiva que eligen activamente no tener descendencia ha crecido exponencialmente. Lo que antes era considerado una anomalía o un tabú insalvable, hoy se consolida como una alternativa de vida respetable, saludable e impulsada por una profunda autorreflexión.
            </p>
            <div className="grid-container grid-cols-1 grid-cols-2 gap-6 mt-8">
              <div className="flex gap-4">
                <div className="text-[var(--accent-pink)] mt-1"><Brain size={20} /></div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">Decisión Reflexionada</h4>
                  <p className="text-sm">Los estudios muestran que las personas childfree suelen tomar la decisión de manera planificada y consciente, sopesando pros y contras de forma analítica.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-[var(--accent-pink)] mt-1"><BookOpen size={20} /></div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">Mitos Desmentidos</h4>
                  <p className="text-sm">La ciencia social demuestra que la vejez sin hijos no se correlaciona con mayor soledad ni con infelicidad general con respecto a los padres.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Nav Grid */}
        <h3 className="text-xl mb-6 font-bold text-center">Explora las Secciones</h3>
        <div className="grid-container grid-cols-1 grid-cols-4 gap-6">
          <div 
            onClick={() => setActiveTab('studies')} 
            className="glass-card glass-card-interactive text-center py-8 hover:border-[var(--accent-violet)]"
          >
            <Brain size={32} className="mx-auto mb-4 text-[var(--accent-violet)]" />
            <h4 className="font-bold mb-2">Estudios Científicos</h4>
            <p className="text-xs">Estudios académicos reales resumidos de forma clara.</p>
          </div>
          <div 
            onClick={() => setActiveTab('calculator')} 
            className="glass-card glass-card-interactive text-center py-8 hover:border-[var(--accent-pink)]"
          >
            <Calculator size={32} className="mx-auto mb-4 text-[var(--accent-pink)]" />
            <h4 className="font-bold mb-2">Calculadora Financiera</h4>
            <p className="text-xs">Simula los gastos de crianza y el potencial de inversión.</p>
          </div>
          <div 
            onClick={() => setActiveTab('testimonials')} 
            className="glass-card glass-card-interactive text-center py-8 hover:border-[var(--accent-cyan)]"
          >
            <MessageSquare size={32} className="mx-auto mb-4 text-[var(--accent-cyan)]" />
            <h4 className="font-bold mb-2">Testimonios Reales</h4>
            <p className="text-xs">Entrevistas a DINKs, seniors 70+ y padres arrepentidos.</p>
          </div>
          <div 
            onClick={() => setActiveTab('resources')} 
            className="glass-card glass-card-interactive text-center py-8 hover:border-[var(--accent-emerald)]"
          >
            <BookOpen size={32} className="mx-auto mb-4 text-[var(--accent-emerald)]" />
            <h4 className="font-bold mb-2">Libros y Recursos</h4>
            <p className="text-xs">Glosario de términos (DINK, DINKWAD) y lecturas clave.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
