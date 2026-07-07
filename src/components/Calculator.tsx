import React, { useState, useMemo } from 'react';
import { PiggyBank, TrendingUp, Info, Scale } from 'lucide-react';

type CurrencyCode = 'USD' | 'GTQ' | 'MXN' | 'EUR' | 'COP';

interface CurrencyInfo {
  symbol: string;
  rate: number;
  label: string;
}

const CURRENCIES: Record<CurrencyCode, CurrencyInfo> = {
  USD: { symbol: '$', rate: 1.0, label: 'USD ($)' },
  GTQ: { symbol: 'Q', rate: 7.73, label: 'GTQ (Q)' },
  MXN: { symbol: '$', rate: 17.50, label: 'MXN ($)' },
  EUR: { symbol: '€', rate: 0.92, label: 'EUR (€)' },
  COP: { symbol: '$', rate: 4100, label: 'COP ($)' },
};

export const Calculator: React.FC = () => {
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  
  // Slider states in currently selected currency
  const [foodCost, setFoodCost] = useState<number>(300);
  const [educationCost, setEducationCost] = useState<number>(400);
  const [healthcareCost, setHealthcareCost] = useState<number>(150);
  const [leisureCost, setLeisureCost] = useState<number>(150);
  const [investmentReturn, setInvestmentReturn] = useState<number>(7); // Annual return in %

  const currInfo = CURRENCIES[currency];
  const rate = currInfo.rate;
  const symbol = currInfo.symbol;

  const handleCurrencyChange = (newCurrency: CurrencyCode) => {
    const oldRate = CURRENCIES[currency].rate;
    const newRate = CURRENCIES[newCurrency].rate;
    const multiplier = newRate / oldRate;

    setFoodCost(prev => Math.round(prev * multiplier));
    setEducationCost(prev => Math.round(prev * multiplier));
    setHealthcareCost(prev => Math.round(prev * multiplier));
    setLeisureCost(prev => Math.round(prev * multiplier));
    setCurrency(newCurrency);
  };

  // Calculations
  const monthlyTotal = useMemo(() => {
    return foodCost + educationCost + healthcareCost + leisureCost;
  }, [foodCost, educationCost, healthcareCost, leisureCost]);

  const total18YearsCost = useMemo(() => {
    return monthlyTotal * 12 * 18;
  }, [monthlyTotal]);

  const potentialWealth = useMemo(() => {
    const r = investmentReturn / 100;
    const monthlyRate = r / 12;
    const months = 18 * 12; // 216 months

    if (r === 0) return total18YearsCost;

    // Future Value of a Monthly Annuity (Payments at end of period)
    const fv = monthlyTotal * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    return Math.round(fv);
  }, [monthlyTotal, investmentReturn, total18YearsCost]);

  const wealthDifference = useMemo(() => {
    return potentialWealth - total18YearsCost;
  }, [potentialWealth, total18YearsCost]);

  // SVG Pie/Donut Chart math
  const pieData = useMemo(() => {
    const total = monthlyTotal || 1;
    const circum = 1000;
    const foodStroke = (foodCost / total) * circum;
    const educationStroke = (educationCost / total) * circum;
    const healthcareStroke = (healthcareCost / total) * circum;
    const leisureStroke = (leisureCost / total) * circum;

    return {
      foodStroke,
      educationStroke,
      healthcareStroke,
      leisureStroke,
      foodPct: Math.round((foodCost / total) * 100),
      educationPct: Math.round((educationCost / total) * 100),
      healthcarePct: Math.round((healthcareCost / total) * 100),
      leisurePct: Math.round((leisureCost / total) * 100)
    };
  }, [foodCost, educationCost, healthcareCost, leisureCost, monthlyTotal]);

  return (
    <div className="animate-fade-in py-8 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4">Calculadora del Costo de Crianza</h2>
        <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
          ¿Cuánto cuesta criar a un hijo hasta los 18 años y qué pasaría si invirtieras esa cantidad en su lugar? Ajusta los controles para ver el impacto financiero en tiempo real.
        </p>
      </div>

      {/* Currency Switcher Tabs */}
      <div className="flex justify-center gap-2 mb-8 bg-[rgba(255,255,255,0.02)] p-1 rounded-xl border border-white/5 max-w-xl mx-auto">
        {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => (
          <button
            key={code}
            onClick={() => handleCurrencyChange(code)}
            className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-all duration-200 border-none cursor-pointer ${
              currency === code 
                ? 'bg-[var(--accent-violet)] text-white shadow-lg shadow-violet-500/20' 
                : 'bg-transparent text-[var(--text-secondary)] hover:text-white'
            }`}
          >
            {CURRENCIES[code].label}
          </button>
        ))}
      </div>

      <div className="grid-container grid-cols-1 grid-cols-2 gap-8 items-start">
        {/* Left Side: Sliders Input */}
        <div className="glass-card p-6 flex flex-col gap-6">
          <h3 className="text-xl font-bold border-b border-white/5 pb-3">Presupuesto Mensual Estimado</h3>

          {/* Slider 1: Food */}
          <div>
            <div className="flex justify-between items-center text-sm">
              <span className="font-semibold text-[var(--text-primary)]">Alimentación y Despensa</span>
              <span className="text-[var(--accent-pink)] font-bold font-display">{symbol}{foodCost.toLocaleString()} {currency}/mes</span>
            </div>
            <input 
              type="range"
              min={Math.round(50 * rate)}
              max={Math.round(1000 * rate)}
              step={Math.round(25 * rate) || 1}
              value={foodCost}
              onChange={(e) => setFoodCost(Number(e.target.value))}
            />
            <p className="text-[10px] text-[var(--text-muted)]">Súper, leche, pañales y comidas fuera de casa.</p>
          </div>

          {/* Slider 2: Education */}
          <div>
            <div className="flex justify-between items-center text-sm">
              <span className="font-semibold text-[var(--text-primary)]">Educación, Guardería y Cuidado</span>
              <span className="text-[var(--accent-violet)] font-bold font-display">{symbol}{educationCost.toLocaleString()} {currency}/mes</span>
            </div>
            <input 
              type="range"
              min={0}
              max={Math.round(2000 * rate)}
              step={Math.round(50 * rate) || 1}
              value={educationCost}
              onChange={(e) => setEducationCost(Number(e.target.value))}
            />
            <p className="text-[10px] text-[var(--text-muted)]">Mensualidades escolares, libros, niñeras e idiomas.</p>
          </div>

          {/* Slider 3: Healthcare */}
          <div>
            <div className="flex justify-between items-center text-sm">
              <span className="font-semibold text-[var(--text-primary)]">Salud y Seguros</span>
              <span className="text-[var(--accent-cyan)] font-bold font-display">{symbol}{healthcareCost.toLocaleString()} {currency}/mes</span>
            </div>
            <input 
              type="range"
              min={Math.round(20 * rate)}
              max={Math.round(600 * rate)}
              step={Math.round(10 * rate) || 1}
              value={healthcareCost}
              onChange={(e) => setHealthcareCost(Number(e.target.value))}
            />
            <p className="text-[10px] text-[var(--text-muted)]">Seguro médico, pediatras, medicinas y odontología.</p>
          </div>

          {/* Slider 4: Leisure/Extras */}
          <div>
            <div className="flex justify-between items-center text-sm">
              <span className="font-semibold text-[var(--text-primary)]">Ocio, Ropa y Actividades</span>
              <span className="text-[var(--accent-emerald)] font-bold font-display">{symbol}{leisureCost.toLocaleString()} {currency}/mes</span>
            </div>
            <input 
              type="range"
              min={Math.round(20 * rate)}
              max={Math.round(800 * rate)}
              step={Math.round(10 * rate) || 1}
              value={leisureCost}
              onChange={(e) => setLeisureCost(Number(e.target.value))}
            />
            <p className="text-[10px] text-[var(--text-muted)]">Ropa, juguetes, cumpleaños, vacaciones y deportes.</p>
          </div>

          {/* Slider 5: Investment Rate */}
          <div className="pt-4 border-t border-white/5">
            <div className="flex justify-between items-center text-sm">
              <span className="font-semibold text-[var(--accent-emerald)] flex items-center gap-1.5">
                <TrendingUp size={16} /> Tasa de Retorno Anual (Inversión)
              </span>
              <span className="text-[var(--accent-emerald)] font-bold font-display">{investmentReturn}% anual</span>
            </div>
            <input 
              type="range"
              min="0"
              max="15"
              step="0.5"
              value={investmentReturn}
              onChange={(e) => setInvestmentReturn(Number(e.target.value))}
            />
            <p className="text-[10px] text-[var(--text-muted)]">Rendimiento anual estimado de tu cartera de acciones/fondos indexados.</p>
          </div>
        </div>

        {/* Right Side: Projections and Charts */}
        <div className="flex flex-col gap-6 w-full">
          {/* Main Stat Blocks */}
          <div className="glass-card bg-[linear-gradient(135deg,rgba(13,19,38,0.8)_0%,rgba(7,10,19,0.5)_100%)] p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Scale size={18} className="text-[var(--accent-violet)]" /> 
              Resumen Proyectado (18 Años)
            </h3>

            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/5">
                <div>
                  <span className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-wider block">Gasto Mensual Estimado</span>
                  <span className="text-xl font-bold font-display text-[var(--text-primary)]">{symbol}{monthlyTotal.toLocaleString()} {currency}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-wider block">Gasto Total Acumulado</span>
                  <span className="text-xl font-bold font-display text-[var(--accent-pink)]">{symbol}{total18YearsCost.toLocaleString()} {currency}</span>
                </div>
              </div>

              <div className="flex justify-between items-center p-4 rounded-xl bg-[rgba(16,185,129,0.05)] border border-[rgba(16,185,129,0.2)]">
                <div>
                  <span className="text-xs text-[var(--text-secondary)] font-bold uppercase tracking-wider flex items-center gap-1 mb-1">
                    <PiggyBank size={14} className="text-[var(--accent-emerald)]" /> Valor Invertido Compound
                  </span>
                  <span className="text-3xl font-bold font-display text-[var(--accent-emerald)]">{symbol}{potentialWealth.toLocaleString()} {currency}</span>
                </div>
                <div className="text-right">
                  <span className="text-[9px] text-[var(--text-muted)] font-bold uppercase tracking-wider block">Intereses Ganados</span>
                  <span className="text-sm font-semibold font-display text-[var(--accent-cyan)]">+{symbol}{wealthDifference.toLocaleString()} {currency}</span>
                </div>
              </div>
            </div>
          </div>

          {/* SVG Pie Chart & Legends */}
          <div className="glass-card p-6 flex flex-col md:flex-row gap-6 items-center">
            {/* SVG Donut Chart */}
            <div className="relative w-40 h-40 shrink-0">
              <svg viewBox="0 0 360 360" className="w-full h-full -rotate-90">
                {/* SVG Donut circle radius: 159.155 matches a 1000px circumference */}
                {/* Food Segment */}
                <circle 
                  cx="180" cy="180" r="140" 
                  fill="none" 
                  stroke="var(--accent-pink)" 
                  strokeWidth="35" 
                  strokeDasharray={`${pieData.foodStroke} 1000`}
                  strokeDashoffset={0}
                />
                {/* Education Segment */}
                <circle 
                  cx="180" cy="180" r="140" 
                  fill="none" 
                  stroke="var(--accent-violet)" 
                  strokeWidth="35" 
                  strokeDasharray={`${pieData.educationStroke} 1000`}
                  strokeDashoffset={`-${pieData.foodStroke}`}
                />
                {/* Healthcare Segment */}
                <circle 
                  cx="180" cy="180" r="140" 
                  fill="none" 
                  stroke="var(--accent-cyan)" 
                  strokeWidth="35" 
                  strokeDasharray={`${pieData.healthcareStroke} 1000`}
                  strokeDashoffset={`-${pieData.foodStroke + pieData.educationStroke}`}
                />
                {/* Leisure Segment */}
                <circle 
                  cx="180" cy="180" r="140" 
                  fill="none" 
                  stroke="var(--accent-emerald)" 
                  strokeWidth="35" 
                  strokeDasharray={`${pieData.leisureStroke} 1000`}
                  strokeDashoffset={`-${pieData.foodStroke + pieData.educationStroke + pieData.healthcareStroke}`}
                />
              </svg>
              {/* Inner Circle Label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-wide">Total</span>
                <span className="text-lg font-bold font-display">{symbol}{monthlyTotal.toLocaleString()}</span>
                <span className="text-[9px] text-[var(--text-muted)]">{currency}/mes</span>
              </div>
            </div>

            {/* Legends */}
            <div className="flex-1 w-full flex flex-col gap-2 text-xs">
              <h4 className="font-bold mb-1 text-[var(--text-primary)]">Distribución del Gasto:</h4>
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded bg-[var(--accent-pink)]"></span>
                  <span>Alimentación</span>
                </div>
                <span className="font-bold text-[var(--text-secondary)]">{pieData.foodPct}% ({symbol}{foodCost.toLocaleString()})</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded bg-[var(--accent-violet)]"></span>
                  <span>Educación/Cuidado</span>
                </div>
                <span className="font-bold text-[var(--text-secondary)]">{pieData.educationPct}% ({symbol}{educationCost.toLocaleString()})</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded bg-[var(--accent-cyan)]"></span>
                  <span>Salud/Seguro</span>
                </div>
                <span className="font-bold text-[var(--text-secondary)]">{pieData.healthcarePct}% ({symbol}{healthcareCost.toLocaleString()})</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded bg-[var(--accent-emerald)]"></span>
                  <span>Ocio/Extra</span>
                </div>
                <span className="font-bold text-[var(--text-secondary)]">{pieData.leisurePct}% ({symbol}{leisureCost.toLocaleString()})</span>
              </div>
            </div>
          </div>

          {/* Info Banner */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex gap-3 text-xs text-[var(--text-secondary)]">
            <Info size={16} className="text-[var(--accent-cyan)] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Nota:</strong> Estos valores son estimados referenciales de costo de crianza promedio. En la realidad, factores como herencia, universidad privada ({symbol}{(100000 * rate).toLocaleString()}-{symbol}{(200000 * rate).toLocaleString()}+ adicionales), inflación acumulada y seguros universitarios pueden elevar significativamente esta cifra.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
