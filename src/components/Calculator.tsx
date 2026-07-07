import React, { useState, useMemo } from 'react';
import { PiggyBank, TrendingUp, Info, Scale, Clock, Car, ShieldAlert, Heart } from 'lucide-react';

// Birth/Delivery Options in Guatemala
const BIRTH_OPTIONS = [
  { id: 'public', label: 'Público / IGSS', cost: 1000, desc: 'Costos mínimos de insumos básicos en hospitales estatales.' },
  { id: 'mid-private', label: 'Sanatorio Privado Medio', cost: 22000, desc: 'Parto o cesárea programada en clínicas privadas de zona 1, 9 o 11.' },
  { id: 'high-private', label: 'Hospital Privado Premium', cost: 48000, desc: 'Parto o cesárea con pediatra de cabecera y emergencias en zona 10, 14 o 15.' }
];

// Education Tiers in Guatemala
const EDUCATION_TIERS = [
  { id: 'public', label: 'Pública / Sin Colegiatura', monthly: 150, desc: 'Matrícula gratis. Q150/mes estimado para útiles, uniformes y actividades.' },
  { id: 'colonia', label: 'Privada Económica (Colegio de Colonia)', monthly: 1100, desc: 'Colegio local o religioso (Don Bosco, Salesiano, Monte María, etc.) con bus.' },
  { id: 'mid-private', label: 'Privada Media (Suizo / Austriaco / Metropolitano)', monthly: 3500, desc: 'Educación bilingüe, matrícula anual prorrateada, bus escolar y útiles.' },
  { id: 'high-bilingual', label: 'Bilingüe Premium (Colegio Americano / Maya)', monthly: 8800, desc: 'Colegios internacionales de alto prestigio en zona 15/16. Matrícula y cuotas premium.' }
];

// Housing Tiers (Extra room required for a child)
const HOUSING_TIERS = [
  { id: 'none', label: 'Ya tengo espacio (Sin costo extra)', monthly: 0, desc: 'No necesitas cambiar de vivienda.' },
  { id: 'periphery', label: 'Sector Periferia (Mixco / San Cristóbal / Carretera)', monthly: 1800, desc: 'Costo extra de alquiler o hipoteca por 1 habitación adicional en periferia.' },
  { id: 'central', label: 'Sector Céntrico (Zonas 10 / 14 / 15 / 16)', monthly: 3800, desc: 'Costo extra por un cuarto adicional en edificios residenciales céntricos.' }
];

// Nanny & Babysitter Help
const NANNY_OPTIONS = [
  { id: 'none', label: 'Sin ayuda (Cuidado familiar)', monthly: 0, desc: 'Los padres se organizan para el cuidado diario.' },
  { id: 'part-time', label: 'Ayuda por Días o Media Jornada', monthly: 1800, desc: 'Empleada doméstica o niñera por días para apoyo básico de limpieza y cuidado.' },
  { id: 'full-time', label: 'Niñera Tiempo Completo (Prestaciones)', monthly: 4500, desc: 'Niñera con dormida, incluyendo alimentación extra, aguinaldo, bono 14 e IGSS.' }
];

// Healthcare Tiers
const HEALTH_TIERS = [
  { id: 'public', label: 'Salud Pública o IGSS', monthly: 0, desc: 'Servicios estatales o cobertura del seguro social obligatorio.' },
  { id: 'mid-insurance', label: 'Seguro Médico Privado Medio', monthly: 700, desc: 'Póliza de gastos médicos de aseguradora local (G&T, El Roble) y pediatra privado.' },
  { id: 'premium-health', label: 'Seguro Premium + Especialistas', monthly: 1800, desc: 'Seguro médico de alta cobertura, vacunas importadas y consultas frecuentes.' }
];

export const Calculator: React.FC = () => {
  // Family Income Slider (Quetzales)
  const [familyIncome, setFamilyIncome] = useState<number>(22000); // Decent middle-class joint salary

  // Selection States
  const [birthOption, setBirthOption] = useState<string>('mid-private');
  const [educationTier, setEducationTier] = useState<string>('mid-private');
  const [housingTier, setHousingTier] = useState<string>('periphery');
  const [nannyOption, setNannyOption] = useState<string>('part-time');
  const [healthTier, setHealthTier] = useState<string>('mid-insurance');

  // Sliders in GTQ
  const [foodCost, setFoodCost] = useState<number>(2000); // Monthly food budget per child
  const [leisureCost, setLeisureCost] = useState<number>(1000); // Clothes, toys, birthday parties, extras
  const [trafficHours, setTrafficHours] = useState<number>(2); // Commute hours lost daily for school run
  const [investmentReturn, setInvestmentReturn] = useState<number>(8); // Annual return in %

  // Find cost data
  const selectedBirth = useMemo(() => BIRTH_OPTIONS.find(b => b.id === birthOption) || BIRTH_OPTIONS[1], [birthOption]);
  const selectedEducation = useMemo(() => EDUCATION_TIERS.find(e => e.id === educationTier) || EDUCATION_TIERS[2], [educationTier]);
  const selectedHousing = useMemo(() => HOUSING_TIERS.find(h => h.id === housingTier) || HOUSING_TIERS[1], [housingTier]);
  const selectedNanny = useMemo(() => NANNY_OPTIONS.find(n => n.id === nannyOption) || NANNY_OPTIONS[1], [nannyOption]);
  const selectedHealth = useMemo(() => HEALTH_TIERS.find(h => h.id === healthTier) || HEALTH_TIERS[1], [healthTier]);

  // Calculations (Monthly)
  const monthlyRaisingCost = useMemo(() => {
    return (
      foodCost +
      selectedEducation.monthly +
      selectedHousing.monthly +
      selectedNanny.monthly +
      selectedHealth.monthly +
      leisureCost
    );
  }, [foodCost, selectedEducation.monthly, selectedHousing.monthly, selectedNanny.monthly, selectedHealth.monthly, leisureCost]);

  // Commute Fuel cost estimate (Q32/gallon, average vehicle uses 1/3 gallon per hour idling/crawling in Guatemalan traffic)
  const monthlyGasCost = useMemo(() => {
    if (trafficHours === 0) return 0;
    // 20 school days per month * hours * (1/3 gal/hour) * Q32/gal
    return Math.round(20 * trafficHours * (1 / 3) * 32);
  }, [trafficHours]);

  const totalMonthlyCost = useMemo(() => {
    return monthlyRaisingCost + monthlyGasCost;
  }, [monthlyRaisingCost, monthlyGasCost]);

  // 18 Years calculations
  const total18YearsCost = useMemo(() => {
    return (selectedBirth.cost) + (totalMonthlyCost * 12 * 18);
  }, [selectedBirth.cost, totalMonthlyCost]);

  // Compound Investment Potential
  const potentialWealth = useMemo(() => {
    const r = investmentReturn / 100;
    const monthlyRate = r / 12;
    const months = 18 * 12;

    if (r === 0) return total18YearsCost;

    // Future Value of a Monthly Annuity: FV = PMT * [((1+r)^n - 1) / r] + Birth Cost compounded
    const compoundBirth = selectedBirth.cost * Math.pow(1 + r, 18);
    const compoundAnnuity = totalMonthlyCost * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    return Math.round(compoundBirth + compoundAnnuity);
  }, [totalMonthlyCost, selectedBirth.cost, investmentReturn, total18YearsCost]);

  const wealthDifference = useMemo(() => {
    return potentialWealth - total18YearsCost;
  }, [potentialWealth, total18YearsCost]);

  // Traffic lost time metrics
  const trafficMetrics = useMemo(() => {
    // 200 school days a year * 18 years = 3600 days. Commute time.
    const totalHoursLost = trafficHours * 200 * 18;
    const totalDaysLost = Math.round(totalHoursLost / 24);
    return {
      hours: totalHoursLost,
      days: totalDaysLost
    };
  }, [trafficHours]);

  // Financial Diagnostics
  const diagnostics = useMemo(() => {
    const netIncome = familyIncome - totalMonthlyCost;
    const percentageOfIncome = Math.round((totalMonthlyCost / familyIncome) * 100);
    
    // In Guatemala, a standard emergency pediatric hospitalization (appendicitis, bronchiolitis, fractures) costs ~Q60,000.
    const recommendedEmergencyFund = 60000;
    
    let riskLevel: 'Bajo' | 'Medio' | 'Alto' = 'Bajo';
    let diagnosticMsg = '';
    let diagnosticColor = '';

    if (netIncome < 3000) {
      riskLevel = 'Alto';
      diagnosticMsg = '⚠️ Riesgo Financiero Alto: Tras restar los gastos del niño, te quedan menos de Q3,000 libres al mes. Ante un imprevisto de salud o accidente de Q50k+, te verás obligado a recurrir a préstamos bancarios de consumo o tarjetas de crédito con tasas de interés usureras (18% al 32% anual en Guatemala).';
      diagnosticColor = 'border-red-500/30 bg-red-500/5 text-red-400';
    } else if (netIncome < 8000) {
      riskLevel = 'Medio';
      diagnosticMsg = '⚡ Riesgo Financiero Moderado: Tu presupuesto es funcional para el día a día, pero tu capacidad de construir un fondo de emergencia sólido es lenta. Se recomienda contratar un seguro médico privado robusto de inmediato para no descapitalizarte ante accidentes.';
      diagnosticColor = 'border-amber-500/30 bg-amber-500/5 text-amber-400';
    } else {
      riskLevel = 'Bajo';
      diagnosticMsg = '✅ Finanzas Resilientes: Tus ingresos netos mensuales te permiten cubrir los gastos de crianza y mantener un ahorro mensual holgado para imprevistos, reduciendo la probabilidad de endeudamiento a cero.';
      diagnosticColor = 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400';
    }

    return {
      netIncome,
      percentageOfIncome,
      recommendedEmergencyFund,
      riskLevel,
      diagnosticMsg,
      diagnosticColor
    };
  }, [familyIncome, totalMonthlyCost]);

  // Pie chart calculation
  const pieData = useMemo(() => {
    const total = monthlyRaisingCost || 1;
    const circum = 1000;

    const foodStroke = (foodCost / total) * circum;
    const eduStroke = (selectedEducation.monthly / total) * circum;
    const housingStroke = (selectedHousing.monthly / total) * circum;
    const nannyStroke = (selectedNanny.monthly / total) * circum;
    const healthStroke = (selectedHealth.monthly / total) * circum;
    const leisureStroke = (leisureCost / total) * circum;

    return {
      foodStroke,
      eduStroke,
      housingStroke,
      nannyStroke,
      healthStroke,
      leisureStroke,
      foodPct: Math.round((foodCost / total) * 100),
      eduPct: Math.round((selectedEducation.monthly / total) * 100),
      housingPct: Math.round((selectedHousing.monthly / total) * 100),
      nannyPct: Math.round((selectedNanny.monthly / total) * 100),
      healthPct: Math.round((selectedHealth.monthly / total) * 100),
      leisurePct: Math.round((leisureCost / total) * 100)
    };
  }, [foodCost, selectedEducation.monthly, selectedHousing.monthly, selectedNanny.monthly, selectedHealth.monthly, leisureCost, monthlyRaisingCost]);

  return (
    <div className="animate-fade-in py-8 px-4 max-w-6xl mx-auto">
      {/* Title */}
      <div className="text-center mb-10">
        <span className="px-4 py-1.5 rounded-full bg-[rgba(139,92,246,0.1)] border border-[rgba(139,92,246,0.2)] text-[var(--accent-violet)] text-xs font-semibold inline-block mb-3 uppercase tracking-wider">
          Enfoque Local: Guatemala
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Calculadora de Crianza y Oportunidad Financiera</h2>
        <p className="text-[var(--text-secondary)] max-w-2xl mx-auto text-sm leading-relaxed">
          Simulación detallada de gastos en el contexto guatemalteco. Analiza cómo inciden la educación privada, los partos, el tráfico vehicular metropolitano y la carga médica en tu presupuesto familiar.
        </p>
      </div>

      <div className="grid-container grid-cols-1 grid-cols-2 gap-8 items-start">
        
        {/* ================= COLUMN 1: CONFIGURATION ================= */}
        <div className="flex flex-col gap-6 w-full">
          
          {/* Section: Income & Basic Sliders */}
          <div className="glass-card p-6 flex flex-col gap-5">
            <h3 className="text-lg font-bold border-b border-white/5 pb-2.5 text-white flex items-center gap-2">
              <Scale size={18} className="text-[var(--accent-violet)]" />
              1. Ingresos y Gastos Básicos
            </h3>

            {/* Income Slider */}
            <div>
              <div className="flex justify-between items-center text-sm">
                <span className="font-semibold text-[var(--text-primary)]">Ingreso Mensual Familiar Combinado</span>
                <span className="text-[var(--accent-violet)] font-bold font-display">Q{familyIncome.toLocaleString()} / mes</span>
              </div>
              <input 
                type="range"
                min="8000"
                max="80000"
                step="1000"
                value={familyIncome}
                onChange={(e) => setFamilyIncome(Number(e.target.value))}
              />
              <p className="text-[10px] text-[var(--text-muted)]">Sueldo neto mensual sumado de ambos padres trabajando.</p>
            </div>

            {/* Food Cost */}
            <div>
              <div className="flex justify-between items-center text-sm">
                <span className="font-semibold text-[var(--text-primary)]">Alimentación, Fórmulas y Pañales</span>
                <span className="text-[var(--accent-pink)] font-bold font-display">Q{foodCost.toLocaleString()} / mes</span>
              </div>
              <input 
                type="range"
                min="800"
                max="5000"
                step="100"
                value={foodCost}
                onChange={(e) => setFoodCost(Number(e.target.value))}
              />
              <p className="text-[10px] text-[var(--text-muted)]">Súper, mercados locales, leches de fórmula y pañales.</p>
            </div>

            {/* Leisure & Clothes */}
            <div>
              <div className="flex justify-between items-center text-sm">
                <span className="font-semibold text-[var(--text-primary)]">Ropa, Ocio y Fiestas infantiles</span>
                <span className="text-[var(--accent-emerald)] font-bold font-display">Q{leisureCost.toLocaleString()} / mes</span>
              </div>
              <input 
                type="range"
                min="300"
                max="4000"
                step="100"
                value={leisureCost}
                onChange={(e) => setLeisureCost(Number(e.target.value))}
              />
              <p className="text-[10px] text-[var(--text-muted)]">Zapatos, juguetes, salidas, regalos y la obligatoria piñata de cumpleaños.</p>
            </div>
          </div>

          {/* Section: Selectors for birth, education, housing, nanny, health */}
          <div className="glass-card p-6 flex flex-col gap-5">
            <h3 className="text-lg font-bold border-b border-white/5 pb-2.5 text-white flex items-center gap-2">
              <Heart size={18} className="text-[var(--accent-pink)]" />
              2. Servicios, Cuidado y Educación
            </h3>

            {/* Birth Select */}
            <div>
              <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-2">Gasto de Parto y Nacimiento</label>
              <select 
                value={birthOption}
                onChange={(e) => setBirthOption(e.target.value)}
                className="w-full bg-[var(--bg-secondary)] text-white border border-white/5 rounded-xl p-3 text-sm focus:outline-none focus:border-[var(--accent-pink)]"
              >
                {BIRTH_OPTIONS.map(o => (
                  <option key={o.id} value={o.id}>{o.label} (Q{o.cost.toLocaleString()})</option>
                ))}
              </select>
              <p className="text-[10px] text-[var(--text-muted)] mt-1.5">{selectedBirth.desc}</p>
            </div>

            {/* Education Select */}
            <div>
              <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-2">Educación Escolar Privada/Pública</label>
              <select 
                value={educationTier}
                onChange={(e) => setEducationTier(e.target.value)}
                className="w-full bg-[var(--bg-secondary)] text-white border border-white/5 rounded-xl p-3 text-sm focus:outline-none focus:border-[var(--accent-pink)]"
              >
                {EDUCATION_TIERS.map(o => (
                  <option key={o.id} value={o.id}>{o.label} (Q{o.monthly.toLocaleString()} / mes)</option>
                ))}
              </select>
              <p className="text-[10px] text-[var(--text-muted)] mt-1.5">{selectedEducation.desc}</p>
            </div>

            {/* Nanny Select */}
            <div>
              <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-2">Cuidado y Niñera Doméstica</label>
              <select 
                value={nannyOption}
                onChange={(e) => setNannyOption(e.target.value)}
                className="w-full bg-[var(--bg-secondary)] text-white border border-white/5 rounded-xl p-3 text-sm focus:outline-none focus:border-[var(--accent-pink)]"
              >
                {NANNY_OPTIONS.map(o => (
                  <option key={o.id} value={o.id}>{o.label} {o.monthly > 0 ? `(Q${o.monthly.toLocaleString()} / mes)` : ''}</option>
                ))}
              </select>
              <p className="text-[10px] text-[var(--text-muted)] mt-1.5">{selectedNanny.desc}</p>
            </div>

            {/* Housing Select */}
            <div>
              <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-2">Vivienda (Habitación adicional para el bebé)</label>
              <select 
                value={housingTier}
                onChange={(e) => setHousingTier(e.target.value)}
                className="w-full bg-[var(--bg-secondary)] text-white border border-white/5 rounded-xl p-3 text-sm focus:outline-none focus:border-[var(--accent-pink)]"
              >
                {HOUSING_TIERS.map(o => (
                  <option key={o.id} value={o.id}>{o.label} {o.monthly > 0 ? `(Q${o.monthly.toLocaleString()} / mes)` : ''}</option>
                ))}
              </select>
              <p className="text-[10px] text-[var(--text-muted)] mt-1.5">{selectedHousing.desc}</p>
            </div>

            {/* Healthcare Select */}
            <div>
              <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-2">Seguro Médico y Pediatría</label>
              <select 
                value={healthTier}
                onChange={(e) => setHealthTier(e.target.value)}
                className="w-full bg-[var(--bg-secondary)] text-white border border-white/5 rounded-xl p-3 text-sm focus:outline-none focus:border-[var(--accent-pink)]"
              >
                {HEALTH_TIERS.map(o => (
                  <option key={o.id} value={o.id}>{o.label} {o.monthly > 0 ? `(Q${o.monthly.toLocaleString()} / mes)` : ''}</option>
                ))}
              </select>
              <p className="text-[10px] text-[var(--text-muted)] mt-1.5">{selectedHealth.desc}</p>
            </div>
          </div>

          {/* Section: Traffic and Commute */}
          <div className="glass-card p-6 flex flex-col gap-5">
            <h3 className="text-lg font-bold border-b border-white/5 pb-2.5 text-white flex items-center gap-2">
              <Car size={18} className="text-[var(--accent-cyan)]" />
              3. Factor Tráfico Vehicular (Área Metropolitana)
            </h3>
            
            <div>
              <div className="flex justify-between items-center text-sm">
                <span className="font-semibold text-[var(--text-primary)]">Tiempo Diario en Tránsito para el Colegio</span>
                <span className="text-[var(--accent-cyan)] font-bold font-display">{trafficHours} horas / día</span>
              </div>
              <input 
                type="range"
                min="0"
                max="4"
                step="0.5"
                value={trafficHours}
                onChange={(e) => setTrafficHours(Number(e.target.value))}
              />
              <p className="text-[10px] text-[var(--text-muted)]">
                Horas promedio diarias metiendo/sacando al niño en embotellamientos (Roosevelt, C. a El Salvador, Zonas 15/16).
              </p>
            </div>

            {trafficHours > 0 && (
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex gap-3 text-xs text-[var(--text-secondary)]">
                <Clock size={16} className="text-[var(--accent-cyan)] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block mb-0.5">Tiempo e Impacto del Tráfico (18 Años):</span>
                  Perderás aproximadamente <strong className="text-[var(--accent-cyan)]">{trafficMetrics.hours.toLocaleString()} horas</strong> de tu vida metido en el tráfico. Esto equivale a <strong className="text-[var(--accent-cyan)]">{trafficMetrics.days} días enteros</strong> (las 24 horas del día) sentado en el carro. 
                  Adicionalmente gastarás alrededor de <strong className="text-[var(--accent-cyan)]">Q{monthlyGasCost.toLocaleString()} mensuales</strong> adicionales en gasolina por ralentí y distancias cortas.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ================= COLUMN 2: DIAGNOSTICS & RESULTS ================= */}
        <div className="flex flex-col gap-6 w-full sticky top-24">
          
          {/* Main Financial stats */}
          <div className="glass-card p-6 bg-gradient-to-br from-[var(--card-bg)] to-[rgba(139,92,246,0.03)] border-[rgba(139,92,246,0.15)]">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
              <PiggyBank size={20} className="text-[var(--accent-violet)]" />
              Resumen Financiero Proyectado
            </h3>

            <div className="flex flex-col gap-4">
              {/* Monthly Stats */}
              <div className="flex justify-between items-center p-3.5 rounded-xl bg-white/5 border border-white/5">
                <div>
                  <span className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-wider block">Gasto Mensual Estimado</span>
                  <span className="text-xl font-bold font-display text-[var(--text-primary)]">Q{totalMonthlyCost.toLocaleString()}</span>
                  <span className="text-[9px] text-[var(--text-muted)] block">Incluye gasolina por tráfico</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-wider block">Costo Nacimiento</span>
                  <span className="text-xl font-bold font-display text-[var(--accent-pink)]">Q{selectedBirth.cost.toLocaleString()}</span>
                  <span className="text-[9px] text-[var(--text-muted)] block">{selectedBirth.label}</span>
                </div>
              </div>

              {/* Total 18 years */}
              <div className="p-4 rounded-xl bg-white/5 border border-[rgba(236,72,153,0.2)]">
                <span className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-wider block">Costo Total de Crianza (18 Años)</span>
                <span className="text-3xl font-bold font-display text-[var(--accent-pink)]">Q{total18YearsCost.toLocaleString()}</span>
                <span className="text-[10px] text-[var(--text-secondary)] block mt-1 font-light">
                  Suma de parto, mensualidades escolares, comida, vivienda adicional, gasolina y ocio.
                </span>
              </div>
            </div>
          </div>

          {/* Emergency Diagnosis Block */}
          <div className={`glass-card p-6 border ${diagnostics.diagnosticColor}`}>
            <h3 className="text-base font-bold mb-3 flex items-center gap-2 text-white">
              <ShieldAlert size={18} />
              Diagnóstico Financiero y Prevención de Deudas
            </h3>

            <div className="flex flex-col gap-4 text-xs">
              <p className="leading-relaxed font-light">
                {diagnostics.diagnosticMsg}
              </p>

              <div className="grid-container grid-cols-2 gap-4 mt-2">
                <div className="p-3 rounded-lg bg-white/5 border border-white/5 text-center">
                  <span className="text-[9px] text-[var(--text-muted)] uppercase tracking-wider block">Fondo de Emergencia Recomendado</span>
                  <span className="text-base font-bold text-white font-display">Q{diagnostics.recommendedEmergencyFund.toLocaleString()}</span>
                  <span className="text-[8px] text-[var(--text-muted)] block mt-0.5">Para accidentes o enfermedades</span>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/5 text-center">
                  <span className="text-[9px] text-[var(--text-muted)] uppercase tracking-wider block">Remanente Neto Mensual</span>
                  <span className="text-base font-bold text-white font-display">Q{diagnostics.netIncome.toLocaleString()}</span>
                  <span className="text-[8px] text-[var(--text-muted)] block mt-0.5">Dinero libre para los padres / mes</span>
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 flex justify-between items-center text-[10px]">
                <span>Porcentaje del ingreso absorbido por el hijo:</span>
                <span className="font-bold text-lg">{diagnostics.percentageOfIncome}%</span>
              </div>
            </div>
          </div>

          {/* SVG Pie Chart Distribution */}
          <div className="glass-card p-5 flex flex-col sm:flex-row gap-5 items-center">
            {/* SVG Donut */}
            <div className="relative w-36 h-36 shrink-0">
              <svg viewBox="0 0 360 360" className="w-full h-full -rotate-90">
                <circle cx="180" cy="180" r="140" fill="none" stroke="var(--accent-pink)" strokeWidth="32" strokeDasharray={`${pieData.foodStroke} 1000`} strokeDashoffset={0} />
                <circle cx="180" cy="180" r="140" fill="none" stroke="var(--accent-violet)" strokeWidth="32" strokeDasharray={`${pieData.eduStroke} 1000`} strokeDashoffset={`-${pieData.foodStroke}`} />
                <circle cx="180" cy="180" r="140" fill="none" stroke="var(--accent-cyan)" strokeWidth="32" strokeDasharray={`${pieData.housingStroke} 1000`} strokeDashoffset={`-${pieData.foodStroke + pieData.eduStroke}`} />
                <circle cx="180" cy="180" r="140" fill="none" stroke="var(--accent-emerald)" strokeWidth="32" strokeDasharray={`${pieData.nannyStroke} 1000`} strokeDashoffset={`-${pieData.foodStroke + pieData.eduStroke + pieData.housingStroke}`} />
                <circle cx="180" cy="180" r="140" fill="none" stroke="#a78bfa" strokeWidth="32" strokeDasharray={`${pieData.healthStroke} 1000`} strokeDashoffset={`-${pieData.foodStroke + pieData.eduStroke + pieData.housingStroke + pieData.nannyStroke}`} />
                <circle cx="180" cy="180" r="140" fill="none" stroke="#f472b6" strokeWidth="32" strokeDasharray={`${pieData.leisureStroke} 1000`} strokeDashoffset={`-${pieData.foodStroke + pieData.eduStroke + pieData.housingStroke + pieData.nannyStroke + pieData.healthStroke}`} />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-[8px] text-[var(--text-muted)] font-bold uppercase tracking-wide">Crianza</span>
                <span className="text-base font-bold font-display">Q{monthlyRaisingCost.toLocaleString()}</span>
                <span className="text-[8px] text-[var(--text-muted)]">Q/mes</span>
              </div>
            </div>

            {/* Legends */}
            <div className="flex-1 w-full flex flex-col gap-1.5 text-[10px]">
              <span className="font-bold text-white block mb-1">Presupuesto mensual:</span>
              <div className="flex justify-between border-b border-white/5 pb-0.5">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded bg-[var(--accent-pink)]"></span> Alimentación ({pieData.foodPct}%)</span>
                <strong>Q{foodCost.toLocaleString()}</strong>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-0.5">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded bg-[var(--accent-violet)]"></span> Educación ({pieData.eduPct}%)</span>
                <strong>Q{selectedEducation.monthly.toLocaleString()}</strong>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-0.5">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded bg-[var(--accent-cyan)]"></span> Vivienda ({pieData.housingPct}%)</span>
                <strong>Q{selectedHousing.monthly.toLocaleString()}</strong>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-0.5">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded bg-[var(--accent-emerald)]"></span> Niñera ({pieData.nannyPct}%)</span>
                <strong>Q{selectedNanny.monthly.toLocaleString()}</strong>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-0.5">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded bg-[#a78bfa]"></span> Salud ({pieData.healthPct}%)</span>
                <strong>Q{selectedHealth.monthly.toLocaleString()}</strong>
              </div>
              <div className="flex justify-between">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded bg-[#f472b6]"></span> Ocio ({pieData.leisurePct}%)</span>
                <strong>Q{leisureCost.toLocaleString()}</strong>
              </div>
            </div>
          </div>

          {/* Compound Interest Opportunity block */}
          <div className="glass-card p-6 bg-gradient-to-br from-[var(--card-bg)] to-[rgba(16,185,129,0.03)] border-[rgba(16,185,129,0.15)] flex flex-col gap-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <TrendingUp size={18} className="text-[var(--accent-emerald)]" />
              Costo de Oportunidad e Inversión
            </h3>

            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center p-3.5 rounded-xl bg-white/5 border border-[rgba(16,185,129,0.2)]">
                <div>
                  <span className="text-[9px] text-[var(--text-muted)] font-bold uppercase tracking-wider block">Valor Compuesto Compra ETF (S&P 500)</span>
                  <span className="text-2xl font-bold font-display text-[var(--accent-emerald)]">Q{potentialWealth.toLocaleString()}</span>
                  <span className="text-[9px] text-[var(--text-muted)] block">Simulación a 18 años con retorno de {investmentReturn}%</span>
                </div>
                <div className="text-right">
                  <span className="text-[8px] text-[var(--text-muted)] font-bold block">Intereses compuestos</span>
                  <span className="text-xs font-semibold text-[var(--accent-cyan)]">Q{wealthDifference.toLocaleString()}</span>
                </div>
              </div>

              {/* Slider for returns */}
              <div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[var(--text-secondary)]">Rendimiento Anual Histórico del Mercado</span>
                  <span className="font-bold text-[var(--accent-emerald)]">{investmentReturn}% anual</span>
                </div>
                <input 
                  type="range"
                  min="0"
                  max="15"
                  step="0.5"
                  value={investmentReturn}
                  onChange={(e) => setInvestmentReturn(Number(e.target.value))}
                />
              </div>
            </div>
          </div>

          {/* Info disclaimer */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex gap-3 text-xs text-[var(--text-secondary)]">
            <Info size={16} className="text-[var(--accent-cyan)] shrink-0 mt-0.5" />
            <p className="leading-relaxed font-light">
              <strong>Nota de Emergencia Médica en Guatemala:</strong> Una estadía en cuidados intensivos neonatales (UCIN) en hospitales como El Pilar o Herrera Llerandi cuesta entre Q10,000 y Q25,000 diarios. Sin un seguro privado con coberturas altas, una complicación de parto común puede generar deudas de por vida en Guatemala.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
