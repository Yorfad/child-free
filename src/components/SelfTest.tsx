import React, { useState } from 'react';
import { testQuestions } from '../data/hubData';

export const SelfTest: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(-1); // -1 is intro, 0-9 questions, 10 results
  const [answers, setAnswers] = useState<number[]>([]); // stores point values chosen for each question

  const handleSelectOption = (points: number) => {
    const nextAnswers = [...answers, points];
    setAnswers(nextAnswers);
    
    if (currentStep < testQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(testQuestions.length); // go to results
    }
  };

  const handleGoBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setAnswers(answers.slice(0, -1));
    } else if (currentStep === 0) {
      setCurrentStep(-1);
      setAnswers([]);
    }
  };

  const handleRestart = () => {
    setCurrentStep(-1);
    setAnswers([]);
  };

  // Result Calculations
  const results = React.useMemo(() => {
    if (currentStep !== testQuestions.length) return null;

    const totalScore = answers.reduce((sum, val) => sum + val, 0);
    const maxPossible = testQuestions.length * 10; // 100 points

    // Category scores: lifestyle (Q1, 4, 6, 7 = max 40), financial (Q2, 8, 10 = max 30), emotional (Q3, 5, 9 = max 30)
    let lifestyleScore = 0;
    let financialScore = 0;
    let emotionalScore = 0;

    testQuestions.forEach((q, idx) => {
      const pts = answers[idx];
      if (q.category === 'lifestyle') lifestyleScore += pts;
      if (q.category === 'financial') financialScore += pts;
      if (q.category === 'emotional') emotionalScore += pts;
    });

    const lifestylePct = Math.round((lifestyleScore / 40) * 100);
    const financialPct = Math.round((financialScore / 30) * 100);
    const emotionalPct = Math.round((emotionalScore / 30) * 100);

    let alignmentTitle = '';
    let alignmentDesc = '';
    let alignmentColor = '';

    if (totalScore >= 80) {
      alignmentTitle = 'Alineación Childfree Fuerte';
      alignmentDesc = 'Tu mentalidad, valores y metas de vida se alinean por completo con el estilo de vida libre de hijos. Valoras profundamente la soberanía sobre tu tiempo, la autonomía financiera y el desarrollo personal sin las demandas ineludibles de la crianza. Es probable que encuentres una profunda paz y realización en una vida childfree.';
      alignmentColor = 'text-[var(--accent-gold)] border-[var(--accent-gold)] bg-[var(--bg-tertiary)]';
    } else if (totalScore >= 50) {
      alignmentTitle = 'Preferencia Childfree Moderada / Indecisión';
      alignmentDesc = 'Muestras una fuerte afinidad por la libertad y los beneficios de una vida sin hijos, pero también valoras aspectos familiares tradicionales o sientes el peso de las expectativas sociales. Estás en una etapa saludable de cuestionamiento; la autocomprensión continua te ayudará a consolidar tu decisión definitiva.';
      alignmentColor = 'text-[var(--accent-slate)] border-[var(--accent-slate)] bg-[var(--bg-tertiary)]';
    } else if (totalScore >= 20) {
      alignmentTitle = 'Preferencia Parental Moderada';
      alignmentDesc = 'Tu personalidad tiende hacia la calidez familiar, el deseo de legar y la crianza activa, aunque todavía valoras tu independencia. Ser padre o madre podría traerte mucha satisfacción, siempre que logres mantener un balance saludable para no perder tu individualidad.';
      alignmentColor = 'text-[var(--accent-rust)] border-[var(--accent-rust)] bg-[var(--bg-tertiary)]';
    } else {
      alignmentTitle = 'Alineación Parental Fuerte';
      alignmentDesc = 'Tu proyecto de vida gira sólidamente en torno a la familia tradicional y la paternidad. Tienes la disposición mental para asumir las demandas, sacrificios y ruidos cotidianos que implica cuidar de niños. Crias con convicción y consideras que el rol de padre/madre es fundamental en tu felicidad.';
      alignmentColor = 'text-[var(--accent-sage)] border-[var(--accent-sage)] bg-[var(--bg-tertiary)]';
    }

    return {
      totalScore,
      maxPossible,
      lifestylePct,
      financialPct,
      emotionalPct,
      alignmentTitle,
      alignmentDesc,
      alignmentColor
    };
  }, [answers, currentStep]);

  return (
    <div className="animate-fade-in py-8 px-4 max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-3 font-serif uppercase tracking-wider">Test de Autoconocimiento</h2>
        <p className="text-[var(--text-secondary)] text-xs font-light">
          Un cuestionario reflexivo diseñado para evaluar qué tan alineado está tu proyecto de vida con el estilo de vida Childfree.
        </p>
      </div>

      {/* STEP -1: INTRO */}
      {currentStep === -1 && (
        <div className="glass-card p-8 text-center">
          <h3 className="text-2xl font-bold mb-4 font-serif">¿Es el estilo de vida Childfree para ti?</h3>
          <p className="text-sm text-[var(--text-secondary)] mb-8 leading-relaxed max-w-xl mx-auto font-light">
            Este test consta de 10 preguntas sobre tres pilares esenciales: Estilo de Vida, Estabilidad Emocional y Finanzas Personales. 
            No hay respuestas correctas ni incorrectas, solo honestidad sobre tus propios límites y anhelos.
          </p>

          <div className="grid-container grid-cols-3 gap-4 text-left mb-8 max-w-lg mx-auto text-xs">
            <div className="p-4 bg-[var(--bg-primary)] border border-[var(--border-color)]">
              <span className="font-bold text-[var(--accent-gold)] font-serif block mb-1 uppercase tracking-wider">Estilo de Vida</span>
              <p className="font-light text-[var(--text-secondary)]">Tu necesidad de tiempo libre y flexibilidad diaria.</p>
            </div>
            <div className="p-4 bg-[var(--bg-primary)] border border-[var(--border-color)]">
              <span className="font-bold text-[var(--accent-rust)] font-serif block mb-1 uppercase tracking-wider">Carga Emocional</span>
              <p className="font-light text-[var(--text-secondary)]">Cómo manejas el estrés y el ruido del hogar.</p>
            </div>
            <div className="p-4 bg-[var(--bg-primary)] border border-[var(--border-color)]">
              <span className="font-bold text-[var(--accent-sage)] font-serif block mb-1 uppercase tracking-wider">Finanzas</span>
              <p className="font-light text-[var(--text-secondary)]">Tus prioridades de ahorro e inversión a largo plazo.</p>
            </div>
          </div>

          <button 
            onClick={() => setCurrentStep(0)} 
            className="btn-primary px-8 py-3"
          >
            Comenzar Cuestionario →
          </button>
        </div>
      )}

      {/* STEPS 0 to 9: QUESTIONS */}
      {currentStep >= 0 && currentStep < testQuestions.length && (
        <div className="glass-card p-6 md:p-8">
          {/* Top Progress bar */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <button 
              onClick={handleGoBack}
              className="text-xs text-[var(--text-secondary)] hover:text-white flex items-center gap-1.5 bg-transparent border-none cursor-pointer font-serif"
            >
              ← Volver
            </button>
            <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider font-mono">
              Pregunta {currentStep + 1} de {testQuestions.length}
            </span>
          </div>

          <div className="w-full bg-[var(--bg-primary)] h-1 overflow-hidden mb-8">
            <div 
              className="h-full bg-[var(--accent-gold)] transition-all duration-300"
              style={{ width: `${((currentStep) / testQuestions.length) * 100}%` }}
            />
          </div>

          {/* Question Text */}
          <h3 className="text-xl md:text-2xl font-bold mb-8 text-[var(--text-primary)] leading-snug font-serif">
            {testQuestions[currentStep].text}
          </h3>

          {/* Options list */}
          <div className="flex flex-col gap-4">
            {testQuestions[currentStep].options.map((option, index) => (
              <div
                key={index}
                onClick={() => handleSelectOption(option.points)}
                className="glass-card p-5 glass-card-interactive border border-[var(--border-color)] hover:border-[var(--accent-gold)] hover:bg-[var(--bg-tertiary)] transition-all flex items-center justify-between"
              >
                <span className="text-sm font-medium leading-relaxed pr-4 text-[var(--text-secondary)]">
                  {option.text}
                </span>
                <span className="text-[var(--text-muted)] text-xs">→</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 10: RESULTS */}
      {currentStep === testQuestions.length && results && (
        <div className="glass-card p-8 animate-fade-in flex flex-col gap-8">
          {/* Header Results */}
          <div className="text-center pb-6 border-b border-[var(--border-color)]">
            <span className="px-3.5 py-1 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
              Resultado del Análisis
            </span>
            <div className={`mt-6 p-4 border font-bold text-2xl md:text-3xl font-serif ${results.alignmentColor}`}>
              {results.alignmentTitle}
            </div>
            <p className="mt-4 text-sm text-[var(--text-secondary)] leading-relaxed max-w-xl mx-auto font-light">
              {results.alignmentDesc}
            </p>
          </div>

          {/* Three pillars metrics */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-5 font-serif">
              Desglose de Compatibilidad por Pilar:
            </h4>

            <div className="flex flex-col gap-5">
              {/* Pillar 1: Lifestyle */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1 font-serif">
                  <span className="font-semibold text-[var(--text-primary)]">Autonomía y Estilo de Vida</span>
                  <span className="font-bold text-[var(--accent-gold)] font-mono">{results.lifestylePct}%</span>
                </div>
                <div className="w-full bg-[var(--bg-primary)] h-1.5 overflow-hidden">
                  <div 
                    className="h-full bg-[var(--accent-gold)] transition-all duration-1000"
                    style={{ width: `${results.lifestylePct}%` }}
                  />
                </div>
                <span className="text-[10px] text-[var(--text-muted)] mt-1 block font-light leading-relaxed">
                  Evalúa tu necesidad de flexibilidad diaria, viajes improvisados, silencio y toma de decisiones individuales.
                </span>
              </div>

              {/* Pillar 2: Financial */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1 font-serif">
                  <span className="font-semibold text-[var(--text-primary)]">Independencia Financiera</span>
                  <span className="font-bold text-[var(--accent-sage)] font-mono">{results.financialPct}%</span>
                </div>
                <div className="w-full bg-[var(--bg-primary)] h-1.5 overflow-hidden">
                  <div 
                    className="h-full bg-[var(--accent-sage)] transition-all duration-1000"
                    style={{ width: `${results.financialPct}%` }}
                  />
                </div>
                <span className="text-[10px] text-[var(--text-muted)] mt-1 block font-light leading-relaxed">
                  Mide tu enfoque en el ahorro a largo plazo, la inversión compuesta y la aversión a gastos forzados de crianza.
                </span>
              </div>

              {/* Pillar 3: Emotional */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1 font-serif">
                  <span className="font-semibold text-[var(--text-primary)]">Estabilidad Emocional vs. Carga de Cuidado</span>
                  <span className="font-bold text-[var(--accent-rust)] font-mono">{results.emotionalPct}%</span>
                </div>
                <div className="w-full bg-[var(--bg-primary)] h-1.5 overflow-hidden">
                  <div 
                    className="h-full bg-[var(--accent-rust)] transition-all duration-1000"
                    style={{ width: `${results.emotionalPct}%` }}
                  />
                </div>
                <span className="text-[10px] text-[var(--text-muted)] mt-1 block font-light leading-relaxed">
                  Mide tu tolerancia al ruido continuo, el caos, el sacrificio de identidad y la demanda de paciencia constante.
                </span>
              </div>
            </div>
          </div>

          {/* Reflexive advice */}
          <div className="p-4 bg-[var(--bg-primary)] border border-[var(--border-color)] text-xs text-[var(--text-secondary)]">
            <div>
              <span className="font-bold text-[var(--accent-gold)] font-serif block mb-1 uppercase tracking-wider">Recordatorio Ético y Social</span>
              <p className="leading-relaxed font-light">
                La decisión de procrear o no procrear no es una competencia matemática. Este test provee un marco de reflexión basado en tendencias estadísticas, pero tu propia conciencia es el árbitro final. No dejes que ni la presión familiar natalista ni las modas de internet decidan sobre tu cuerpo y futuro.
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-center mt-4">
            <button 
              onClick={handleRestart}
              className="btn-secondary py-3 px-6 text-xs font-semibold"
            >
              Reiniciar Cuestionario
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
