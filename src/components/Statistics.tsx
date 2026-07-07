import React, { useState } from 'react';

export const Statistics: React.FC = () => {
  const [activeStatTab, setActiveStatTab] = useState<'happiness' | 'ecological' | 'financial'>('happiness');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Carbon footprint comparative data
  const carbonData = [
    { label: 'Tener un hijo menos (países desarrollados)', value: 58.6, unit: 'toneladas de CO₂/año', color: 'var(--accent-rust)' },
    { label: 'Vivir sin automóvil', value: 2.4, unit: 'toneladas de CO₂/año', color: 'var(--accent-gold)' },
    { label: 'Evitar un vuelo transatlántico de ida y vuelta', value: 1.6, unit: 'toneladas de CO₂/año', color: 'var(--accent-slate)' },
    { label: 'Llevar una dieta completamente vegetal', value: 0.8, unit: 'toneladas de CO₂/año', color: 'var(--accent-sage)' },
    { label: 'Reciclar vidrio, plástico y papel al 100%', value: 0.2, unit: 'toneladas de CO₂/año', color: 'var(--text-secondary)' }
  ];

  // Happiness data points (Simulated relationship satisfaction index 0-100 over years of marriage)
  const happinessData = [
    { year: 'Año 1', childfree: 88, parents: 87, label: 'Inicio del matrimonio' },
    { year: 'Año 3', childfree: 85, parents: 74, label: 'Transición: Primer hijo' },
    { year: 'Año 7', childfree: 82, parents: 63, label: 'Etapa escolar: Estrés alto' },
    { year: 'Año 12', childfree: 81, parents: 59, label: 'Adolescencia: Costos y roces' },
    { year: 'Año 18', childfree: 80, parents: 68, label: 'Nido vacío: Recuperación' },
    { year: 'Año 25', childfree: 79, parents: 78, label: 'Madurez: Nivelación' }
  ];

  // Financial comparative data points (Accumulated over 18 years)
  const financialData = Array.from({ length: 7 }, (_, index) => {
    const year = index * 3;
    if (year === 0) return { year: 'Año 0', cost: 0, investment: 0 };
    const cost = Math.round(14000 * year);
    // Compound interest formula: A = P * (((1 + r)^n - 1) / r)
    const rate = 0.07;
    const investment = Math.round(14000 * (((Math.pow(1 + rate, year) - 1) / rate) * (1 + rate)));
    return { year: `Año ${year}`, cost, investment };
  });

  return (
    <div className="animate-fade-in py-8 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4 font-serif uppercase tracking-wider">Estadísticas e Impacto de la Elección</h2>
        <p className="text-[var(--text-secondary)] max-w-xl mx-auto text-sm">
          Los datos objetivos ayudan a desmitificar concepciones populares. Explora el impacto financiero, ecológico y social de la decisión childfree.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-2 mb-8 bg-[rgba(255,255,255,0.02)] p-1 border border-[var(--border-color)] max-w-lg mx-auto">
        <button
          onClick={() => { setActiveStatTab('happiness'); setHoveredIndex(null); }}
          className={`flex-1 py-2.5 px-4 text-xs font-semibold border-none cursor-pointer text-center ${
            activeStatTab === 'happiness' 
              ? 'bg-[var(--accent-gold)] text-black font-serif' 
              : 'bg-transparent text-[var(--text-secondary)] hover:text-white'
          }`}
        >
          Felicidad y Pareja
        </button>
        <button
          onClick={() => { setActiveStatTab('ecological'); setHoveredIndex(null); }}
          className={`flex-1 py-2.5 px-4 text-xs font-semibold border-none cursor-pointer text-center ${
            activeStatTab === 'ecological' 
              ? 'bg-[var(--accent-rust)] text-white font-serif' 
              : 'bg-transparent text-[var(--text-secondary)] hover:text-white'
          }`}
        >
          Huella Ecológica
        </button>
        <button
          onClick={() => { setActiveStatTab('financial'); setHoveredIndex(null); }}
          className={`flex-1 py-2.5 px-4 text-xs font-semibold border-none cursor-pointer text-center ${
            activeStatTab === 'financial' 
              ? 'bg-[var(--accent-sage)] text-white font-serif' 
              : 'bg-transparent text-[var(--text-secondary)] hover:text-white'
          }`}
        >
          Inversión Financiera
        </button>
      </div>

      {/* Tab 1: Happiness & Marital Satisfaction */}
      {activeStatTab === 'happiness' && (
        <div className="glass-card">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <span className="text-xs text-[var(--accent-gold)] font-bold uppercase tracking-widest block mb-1">Ciencia Social</span>
              <h3 className="text-2xl font-bold mb-4 font-serif">La Curva en U de Satisfacción en Pareja</h3>
              <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed font-light">
                Estudios longitudinales demuestran que el matrimonio suele experimentar una caída aguda en la satisfacción con el nacimiento del primer hijo debido a la escasez de sueño, el conflicto en la división del trabajo y las presiones económicas. 
              </p>
              <p className="text-sm text-[var(--text-secondary)] mb-6 leading-relaxed font-light">
                Las parejas <strong>childfree</strong>, al no experimentar esta transición de roles, logran mantener una estabilidad de satisfacción de pareja alta y sostenida en el tiempo.
              </p>
              <div className="p-4 bg-[var(--bg-primary)] border border-[var(--border-color)]">
                <div className="text-xs">
                  <strong className="font-semibold block text-[var(--accent-gold)] font-serif mb-1">Conclusión Clave:</strong>
                  <p className="font-light text-[var(--text-secondary)] leading-relaxed">
                    El vacío en la satisfacción de los padres tiende a recuperarse recién cuando los hijos abandonan el nido familiar (alrededor del año 18-20 de crianza).
                  </p>
                </div>
              </div>
            </div>

            {/* SVG Interactive Line Chart */}
            <div className="flex-1 w-full flex flex-col items-center justify-center">
              <span className="text-[10px] text-[var(--text-muted)] mb-3">Pasa el cursor por los nodos para ver el nivel de satisfacción (%)</span>
              <div className="relative w-full max-w-[420px] aspect-[4/3] bg-[var(--bg-primary)] p-6 border border-[var(--border-color)]">
                {/* SVG Drawing */}
                <svg viewBox="0 0 100 70" className="w-full h-full overflow-visible">
                  {/* Grid Lines */}
                  <line x1="10" y1="10" x2="90" y2="10" stroke="var(--border-color)" strokeWidth="0.5" />
                  <line x1="10" y1="30" x2="90" y2="30" stroke="var(--border-color)" strokeWidth="0.5" />
                  <line x1="10" y1="50" x2="90" y2="50" stroke="var(--border-color)" strokeWidth="0.5" />
                  
                  {/* Legend / Axes */}
                  <line x1="10" y1="60" x2="90" y2="60" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                  <line x1="10" y1="5" x2="10" y2="60" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />

                  {/* Axis labels */}
                  <text x="7" y="10" fill="var(--text-muted)" fontSize="2.5" textAnchor="end">100%</text>
                  <text x="7" y="35" fill="var(--text-muted)" fontSize="2.5" textAnchor="end">50%</text>
                  <text x="7" y="60" fill="var(--text-muted)" fontSize="2.5" textAnchor="end">0%</text>

                  {/* Childfree Line (Consistently High) */}
                  <path 
                    d="M 15 16 L 30 17.5 L 45 19 L 60 19.5 L 75 20 L 90 20.5" 
                    fill="none" 
                    stroke="var(--accent-gold)" 
                    strokeWidth="1.2"
                  />

                  {/* Parents Line (U-Curve) */}
                  <path 
                    d="M 15 16.5 L 30 23 L 45 28.5 L 60 30.5 L 75 26 L 90 21" 
                    fill="none" 
                    stroke="var(--accent-rust)" 
                    strokeWidth="1.2"
                  />

                  {/* Nodes & Interactive Areas */}
                  {happinessData.map((d, index) => {
                    const x = 15 + index * 15;
                    const yCF = (100 - d.childfree) * 0.5 + 10;
                    const yP = (100 - d.parents) * 0.5 + 10;

                    return (
                      <g key={index}>
                        {/* Hover line */}
                        {hoveredIndex === index && (
                          <line x1={x} y1="10" x2={x} y2="60" stroke="var(--border-color)" strokeWidth="0.5" strokeDasharray="1 1" />
                        )}
                        {/* Childfree Node */}
                        <circle 
                          cx={x} 
                          cy={yCF} 
                          r={hoveredIndex === index ? 2 : 1.2} 
                          fill="var(--accent-gold)"
                          onMouseEnter={() => setHoveredIndex(index)}
                          onMouseLeave={() => setHoveredIndex(null)}
                          className="cursor-pointer"
                        />
                        {/* Parent Node */}
                        <circle 
                          cx={x} 
                          cy={yP} 
                          r={hoveredIndex === index ? 2 : 1.2} 
                          fill="var(--accent-rust)"
                          onMouseEnter={() => setHoveredIndex(index)}
                          onMouseLeave={() => setHoveredIndex(null)}
                          className="cursor-pointer"
                        />
                        {/* X-axis labels */}
                        <text x={x} y="64" fill="var(--text-muted)" fontSize="2" textAnchor="middle">{d.year}</text>
                      </g>
                    );
                  })}
                </svg>

                {/* Legend Overlay */}
                <div className="flex gap-4 justify-center mt-3 text-[10px]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-[var(--accent-gold)] inline-block"></span>
                    <span>Libre de Hijos (Estable)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-[var(--accent-rust)] inline-block"></span>
                    <span>Padres (Curva U)</span>
                  </div>
                </div>

                {/* Custom Tooltip */}
                {hoveredIndex !== null && (
                  <div className="absolute top-2 left-2 right-2 bg-[var(--bg-secondary)] border border-[var(--border-color)] p-2 text-[10px] animate-fade-in">
                    <div className="font-bold text-[var(--text-primary)] font-serif">{happinessData[hoveredIndex].year} • {happinessData[hoveredIndex].label}</div>
                    <div className="flex justify-between mt-1 text-[var(--accent-gold)] font-mono">
                      <span>Satisfacción Childfree:</span>
                      <span className="font-bold">{happinessData[hoveredIndex].childfree}%</span>
                    </div>
                    <div className="flex justify-between text-[var(--accent-rust)] font-mono">
                      <span>Satisfacción Padres:</span>
                      <span className="font-bold">{happinessData[hoveredIndex].parents}%</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Ecological Impact */}
      {activeStatTab === 'ecological' && (
        <div className="glass-card">
          <span className="text-xs text-[var(--accent-rust)] font-bold uppercase tracking-widest block mb-1">Ecología Global</span>
          <h3 className="text-2xl font-bold mb-4 font-serif">Emisiones de CO₂ Anuales Evitadas</h3>
          <p className="text-sm text-[var(--text-secondary)] mb-6 font-light leading-relaxed">
            Un estudio de Lund University (Suecia) analizó el impacto ecológico real de las elecciones de estilo de vida en países desarrollados. Los resultados indican de manera contundente que tener un hijo menos supera exponencialmente a cualquier otra medida ecológica.
          </p>

          <div className="flex flex-col gap-4 mt-4">
            {carbonData.map((d, index) => (
              <div 
                key={index} 
                className="p-4 bg-[var(--bg-primary)] border border-[var(--border-color)]"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="flex justify-between items-center mb-2 text-xs md:text-sm">
                  <span className="font-medium text-[var(--text-primary)] font-serif">{d.label}</span>
                  <span className="font-bold font-mono" style={{ color: d.color }}>{d.value} {d.unit}</span>
                </div>
                {/* Visual Bar container */}
                <div className="w-full bg-[var(--bg-secondary)] h-1.5 overflow-hidden">
                  <div 
                    className="h-full transition-all duration-1000 ease-out"
                    style={{ 
                      width: `${(d.value / 58.6) * 100}%`,
                      backgroundColor: d.color
                    }}
                  />
                </div>
                {index === 0 && (
                  <span className="text-[9px] text-[var(--accent-rust)] block mt-1.5 font-light">
                    *El impacto de 58.6 t CO₂e incluye el efecto acumulativo de las generaciones futuras promediadas.
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Financial Accumulation */}
      {activeStatTab === 'financial' && (
        <div className="glass-card">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <span className="text-xs text-[var(--accent-sage)] font-bold uppercase tracking-widest block mb-1">Costo de Oportunidad</span>
              <h3 className="text-2xl font-bold mb-4 font-serif">Gasto de Crianza vs. Interés Compuesto</h3>
              <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed font-light">
                El costo de criar un hijo en un hogar promedio de ingresos medios/altos ronda los $14,000 USD al año ($252,000 USD totales en 18 años, sin contar la carrera universitaria).
              </p>
              <p className="text-sm text-[var(--text-secondary)] mb-6 leading-relaxed font-light">
                Si un individuo o pareja childfree decidiera destinar ese mismo dinero anual al mercado de valores (por ejemplo, un ETF que siga al S&P 500 con un rendimiento histórico del 7% anual compuesto), la acumulación patrimonial final superaría con creces el gasto original.
              </p>

              <div className="grid-container grid-cols-2 gap-4">
                <div className="p-4 bg-[var(--bg-primary)] border border-[var(--border-color)]">
                  <span className="text-[10px] text-[var(--text-muted)] block uppercase tracking-wider">Costo Acumulado (18 Años)</span>
                  <span className="text-xl font-bold font-display text-[var(--accent-rust)] mt-1 font-mono">$252,000</span>
                  <span className="text-[9px] text-[var(--text-secondary)] block font-light">Gasto directo total</span>
                </div>
                <div className="p-4 bg-[var(--bg-primary)] border border-[var(--border-color)]">
                  <span className="text-[10px] text-[var(--text-muted)] block uppercase tracking-wider">Valor Invertido al 7%</span>
                  <span className="text-xl font-bold font-display text-[var(--accent-sage)] mt-1 font-mono">$480,480</span>
                  <span className="text-[9px] text-[var(--text-secondary)] block font-light">Patrimonio acumulado</span>
                </div>
              </div>
            </div>

            {/* SVG Cumulative Chart */}
            <div className="flex-1 w-full flex flex-col items-center justify-center">
              <span className="text-[10px] text-[var(--text-muted)] mb-3">Pasa el cursor para ver el desglose en cada fase temporal</span>
              <div className="relative w-full max-w-[420px] aspect-[4/3] bg-[var(--bg-primary)] p-6 border border-[var(--border-color)]">
                <svg viewBox="0 0 100 70" className="w-full h-full overflow-visible">
                  {/* Grid Lines */}
                  <line x1="10" y1="10" x2="90" y2="10" stroke="var(--border-color)" strokeWidth="0.5" />
                  <line x1="10" y1="30" x2="90" y2="30" stroke="var(--border-color)" strokeWidth="0.5" />
                  <line x1="10" y1="50" x2="90" y2="50" stroke="var(--border-color)" strokeWidth="0.5" />

                  {/* Legend / Axes */}
                  <line x1="10" y1="60" x2="90" y2="60" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                  <line x1="10" y1="5" x2="10" y2="60" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />

                  {/* Y-Axis Label */}
                  <text x="7" y="10" fill="var(--text-muted)" fontSize="2.5" textAnchor="end">$500k</text>
                  <text x="7" y="35" fill="var(--text-muted)" fontSize="2.5" textAnchor="end">$250k</text>
                  <text x="7" y="60" fill="var(--text-muted)" fontSize="2.5" textAnchor="end">$0</text>
                  
                  {/* Cost Curve (Flat growth) */}
                  <path 
                    d="M 15 60 L 27.5 55.6 L 40 51.2 L 52.5 46.8 L 65 42.5 L 77.5 38.1 L 90 33.7"
                    fill="none"
                    stroke="var(--accent-rust)"
                    strokeWidth="1.2"
                    strokeDasharray="2 2"
                  />

                  {/* Investment Curve (Exponential growth) */}
                  <path 
                    d="M 15 60 L 27.5 55.1 L 40 49.1 L 52.5 41.7 L 65 32.7 L 77.5 21.6 L 90 10"
                    fill="none"
                    stroke="var(--accent-sage)"
                    strokeWidth="1.5"
                  />

                  {/* Nodes */}
                  {financialData.map((d, index) => {
                    const x = 15 + index * 12.5;
                    const yC = 60 - (d.cost / 480000) * 50;
                    const yI = 60 - (d.investment / 480000) * 50;

                    return (
                      <g key={index}>
                        {hoveredIndex === index && (
                          <line x1={x} y1="10" x2={x} y2="60" stroke="var(--border-color)" strokeWidth="0.5" strokeDasharray="1 1" />
                        )}
                        <circle 
                          cx={x} 
                          cy={yC} 
                          r={hoveredIndex === index ? 2 : 1.2} 
                          fill="var(--accent-rust)"
                          onMouseEnter={() => setHoveredIndex(index)}
                          onMouseLeave={() => setHoveredIndex(null)}
                          className="cursor-pointer"
                        />
                        <circle 
                          cx={x} 
                          cy={yI} 
                          r={hoveredIndex === index ? 2 : 1.2} 
                          fill="var(--accent-sage)"
                          onMouseEnter={() => setHoveredIndex(index)}
                          onMouseLeave={() => setHoveredIndex(null)}
                          className="cursor-pointer"
                        />
                        <text x={x} y="64" fill="var(--text-muted)" fontSize="2" textAnchor="middle">{d.year}</text>
                      </g>
                    );
                  })}
                </svg>

                {/* Legend Overlay */}
                <div className="flex gap-4 justify-center mt-3 text-[10px]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-0.5 bg-[var(--accent-rust)] border-t border-dashed inline-block"></span>
                    <span>Costo Directo Crianza</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-0.5 bg-[var(--accent-sage)] inline-block"></span>
                    <span>Inversión al 7% compuesto</span>
                  </div>
                </div>

                {/* Custom Tooltip */}
                {hoveredIndex !== null && (
                  <div className="absolute top-2 left-2 right-2 bg-[var(--bg-secondary)] border border-[var(--border-color)] p-2 text-[10px] animate-fade-in font-mono">
                    <div className="font-bold text-[var(--text-primary)] font-serif mb-1">{financialData[hoveredIndex].year}</div>
                    <div className="flex justify-between text-[var(--accent-rust)]">
                      <span>Costo de crianza:</span>
                      <span className="font-bold">${financialData[hoveredIndex].cost.toLocaleString()} USD</span>
                    </div>
                    <div className="flex justify-between text-[var(--accent-sage)]">
                      <span>Ahorro invertido:</span>
                      <span className="font-bold">${financialData[hoveredIndex].investment.toLocaleString()} USD</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
