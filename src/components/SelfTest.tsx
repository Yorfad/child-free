import React, { useState } from 'react';
import { testQuestions } from '../data/hubData';
import { Brain, ArrowLeft, ArrowRight, RotateCcw, AlertCircle, BarChart2 } from 'lucide-react';

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
      alignmentDesc = 'Tu mentalidad, valores y metas de vida se alinean casi por completo con el estilo de vida libre de hijos. Valoras profundamente la soberanía sobre tu tiempo, la autonomía financiera y el desarrollo personal sin las demandas ineludibles de la crianza. Es probable que encuentres una profunda paz y realización en una vida childfree.';
      alignmentColor = 'text-[var(--accent-violet)] border-[rgba(139,92,246,0.3)] bg-[rgba(139,92,246,0.03)]';
    } else if (totalScore >= 50) {
      alignmentTitle = 'Preferencia Childfree Moderada / Indecisión';
      alignmentDesc = 'Muestras una fuerte afinidad por la libertad y los beneficios de una vida sin hijos, pero también valoras aspectos familiares tradicionales o sientes el peso de las expectativas sociales. Estás en una etapa saludable de cuestionamiento; la autocomprensión continua te ayudará a consolidar tu decisión definitiva.';
      alignmentColor = 'text-[var(--accent-cyan)] border-[rgba(6,182,212,0.3)] bg-[rgba(6,182,212,0.03)]';
    } else if (totalScore >= 20) {
      alignmentTitle = 'Preferencia Parental Moderada';
      alignmentDesc = 'Tu personalidad tiende hacia la calidez familiar, el deseo de legar y la crianza activa, aunque todavía valoras tu independencia. Ser padre o madre podría traerte mucha satisfacción, siempre que logres mantener un balance saludable para no perder tu individualidad.';
      alignmentColor = 'text-[var(--accent-pink)] border-[rgba(236,72,153,0.3)] bg-[rgba(236,72,153,0.03)]';
    } else {
      alignmentTitle = 'Alineación Parental Fuerte';
      alignmentDesc = 'Tu proyecto de vida gira sólidamente en torno a la familia tradicional y la paternidad. Tienes la disposición mental para asumir las demandas, sacrificios y ruidos cotidianos que implica cuidar de niños. Crias con convicción y consideras que el rol de padre/madre es fundamental en tu felicidad.';
      alignmentColor = 'text-[var(--accent-emerald)] border-[rgba(16,185,129,0.3)] bg-[rgba(16,185,129,0.03)]';
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
        <h2 className="text-3xl font-bold mb-3">Test de Autoconocimiento</h2>
        <p className="text-[var(--text-secondary)] text-sm">
          Un cuestionario reflexivo diseñado para evaluar qué tan alineado está tu proyecto de vida con el estilo de vida Childfree.
        </p>
      </div>

      {/* STEP -1: INTRO */}
      {currentStep === -1 && (
        <div className="glass-card p-8 text-center bg-gradient-to-br from-[var(--card-bg)] to-transparent">
          <div className="w-16 h-16 rounded-2xl bg-[rgba(139,92,246,0.1)] flex items-center justify-center text-[var(--accent-violet)] mx-auto mb-6">
            <Brain size={32} />
          </div>
          <h3 className="text-2xl font-bold mb-4">¿Es el estilo de vida Childfree para ti?</h3>
          <p className="text-sm text-[var(--text-secondary)] mb-8 leading-relaxed max-w-xl mx-auto">
            Este test consta de 10 preguntas cuidadosamente redactadas sobre tres pilares esenciales: Estilo de Vida, Estabilidad Emocional y Finanzas Personales. 
            No hay respuestas correctas ni incorrectas, solo honestidad sobre tus propios límites y anhelos.
          </p>

          <div className="grid-container grid-cols-3 gap-4 text-left mb-8 max-w-lg mx-auto text-xs">
            <div className="p-3 bg-white/5 rounded-lg border border-white/5">
              <span className="font-bold text-[var(--accent-violet)] block mb-1">Estilo de Vida</span>
              Tu necesidad de tiempo libre y flexibilidad diaria.
            </div>
            <div className="p-3 bg-white/5 rounded-lg border border-white/5">
              <span className="font-bold text-[var(--accent-pink)] block mb-1">Carga Emocional</span>
              Cómo manejas el estrés y el ruido del hogar.
            </div>
            <div className="p-3 bg-white/5 rounded-lg border border-white/5">
              <span className="font-bold text-[var(--accent-emerald)] block mb-1">Finanzas</span>
              Tus prioridades de ahorro e inversión a largo plazo.
            </div>
          </div>

          <button 
            onClick={() => setCurrentStep(0)} 
            className="btn-primary px-8 py-3"
          >
            Comenzar Cuestionario
            <ArrowRight size={18} />
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
              className="text-xs text-[var(--text-secondary)] hover:text-white flex items-center gap-1.5 bg-transparent border-none cursor-pointer"
            >
              <ArrowLeft size={14} /> Volver
            </button>
            <span className="text-xs font-bold text-[var(--text-muted)]">
              Pregunta {currentStep + 1} de {testQuestions.length}
            </span>
          </div>

          <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mb-8">
            <div 
              className="h-full bg-gradient-to-r from-[var(--accent-violet)] to-[var(--accent-pink)] transition-all duration-300"
              style={{ width: `${((currentStep) / testQuestions.length) * 100}%` }}
            />
          </div>

          {/* Question Text */}
          <h3 className="text-xl md:text-2xl font-bold mb-8 text-[var(--text-primary)] leading-snug">
            {testQuestions[currentStep].text}
          </h3>

          {/* Options list */}
          <div className="flex flex-col gap-4">
            {testQuestions[currentStep].options.map((option, index) => (
              <div
                key={index}
                onClick={() => handleSelectOption(option.points)}
                className="glass-card p-5 glass-card-interactive border border-white/5 hover:border-[var(--accent-violet)] hover:bg-[rgba(139,92,246,0.05)] transition-all flex items-center justify-between"
              >
                <span className="text-sm font-medium leading-relaxed pr-4 text-[var(--text-secondary)] hover:text-white">
                  {option.text}
                </span>
                <ArrowRight size={14} className="text-[var(--text-muted)] shrink-0" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 10: RESULTS */}
      {currentStep === testQuestions.length && results && (
        <div className="glass-card p-8 animate-fade-in flex flex-col gap-8">
          {/* Header Results */}
          <div className="text-center pb-6 border-b border-white/5">
            <span className="px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
              Resultado del Análisis
            </span>
            <div className={`mt-6 p-4 rounded-xl border font-bold text-2xl md:text-3xl ${results.alignmentColor}`}>
              {results.alignmentTitle}
            </div>
            <p className="mt-4 text-sm text-[var(--text-secondary)] leading-relaxed max-w-xl mx-auto font-light">
              {results.alignmentDesc}
            </p>
          </div>

          {/* Three pillars metrics */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-5 flex items-center gap-1.5">
              <BarChart2 size={15} /> Desglose de Compatibilidad por Pilar
            </h4>

            <div className="flex flex-col gap-5">
              {/* Pillar 1: Lifestyle */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-semibold text-[var(--text-primary)]">Autonomía y Estilo de Vida</span>
                  <span className="font-bold text-[var(--accent-violet)]">{results.lifestylePct}%</span>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[var(--accent-violet)] transition-all duration-1000"
                    style={{ width: `${results.lifestylePct}%` }}
                  />
                </div>
                <span className="text-[9px] text-[var(--text-muted)] mt-0.5 block">
                  Evalúa tu necesidad de flexibilidad diaria, viajes improvisados, silencio y toma de decisiones individuales.
                </span>
              </div>

              {/* Pillar 2: Financial */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-semibold text-[var(--text-primary)]">Independencia Financiera</span>
                  <span className="font-bold text-[var(--accent-emerald)]">{results.financialPct}%</span>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[var(--accent-emerald)] transition-all duration-1000"
                    style={{ width: `${results.financialPct}%` }}
                  />
                </div>
                <span className="text-[9px] text-[var(--text-muted)] mt-0.5 block">
                  Mide tu enfoque en el ahorro a largo plazo, la inversión compuesta y la aversión a gastos forzados de crianza.
                </span>
              </div>

              {/* Pillar 3: Emotional */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-semibold text-[var(--text-primary)]">Estabilidad Emocional vs. Carga de Cuidado</span>
                  <span className="font-bold text-[var(--accent-pink)]">{results.emotionalPct}%</span>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[var(--accent-pink)] transition-all duration-1000"
                    style={{ width: `${results.emotionalPct}%` }}
                  />
                </div>
                <span className="text-[9px] text-[var(--text-muted)] mt-0.5 block">
                  Mide tu tolerancia al ruido continuo, el caos, el sacrificio de identidad y la demanda de paciencia constante.
                </span>
              </div>
            </div>
          </div>

          {/* Reflexive advice */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex gap-3 text-xs text-[var(--text-secondary)]">
            <AlertCircle size={18} className="text-[var(--accent-cyan)] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[var(--text-primary)] block mb-1">Recordatorio Ético y Social</span>
              <p className="leading-relaxed font-light">
                La decisión de procrear o no procrear no es una competencia matemática. Este test provee un marco de reflexión basado en tendencias estadísticas, pero tu propia conciencia es el árbitro final. No dejes que ni la presión familiar natalista ni las modas de internet decidan sobre tu cuerpo y futuro.
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-center mt-4">
            <button 
              onClick={handleRestart}
              className="btn-secondary py-3 px-6 text-xs font-semibold flex items-center gap-1.5"
            >
              <RotateCcw size={14} />
              Reiniciar Cuestionario
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
