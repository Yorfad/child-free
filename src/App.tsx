import { useState } from 'react';
import { Menu, X, Brain, HelpCircle, BarChart2, MessageSquare, Calculator as CalcIcon, BookOpen, Compass } from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { Statistics } from './components/Statistics';
import { Studies } from './components/Studies';
import { Testimonials } from './components/Testimonials';
import { Calculator } from './components/Calculator';
import { SelfTest } from './components/SelfTest';
import { Resources } from './components/Resources';

function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Navigation Items list
  const navItems = [
    { id: 'dashboard', label: 'Inicio', icon: Compass },
    { id: 'statistics', label: 'Estadísticas', icon: BarChart2 },
    { id: 'studies', label: 'Estudios', icon: Brain },
    { id: 'testimonials', label: 'Testimonios', icon: MessageSquare },
    { id: 'calculator', label: 'Calculadora', icon: CalcIcon },
    { id: 'selftest', label: 'Test', icon: HelpCircle },
    { id: 'resources', label: 'Recursos', icon: BookOpen },
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render active component
  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard setActiveTab={handleTabChange} />;
      case 'statistics':
        return <Statistics />;
      case 'studies':
        return <Studies />;
      case 'testimonials':
        return <Testimonials />;
      case 'calculator':
        return <Calculator />;
      case 'selftest':
        return <SelfTest />;
      case 'resources':
        return <Resources />;
      default:
        return <Dashboard setActiveTab={handleTabChange} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-[rgba(7,10,19,0.8)] backdrop-blur-md border-b border-white/5 px-4 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo Brand */}
          <div 
            onClick={() => handleTabChange('dashboard')} 
            className="flex items-center gap-2.5 cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[var(--accent-violet)] to-[var(--accent-pink)] flex items-center justify-center text-white shadow-md shadow-violet-500/20">
              <Brain size={20} />
            </div>
            <div>
              <span className="font-display font-extrabold text-lg tracking-tight bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                Decisión Libre
              </span>
              <span className="text-[10px] text-[var(--text-muted)] font-medium block -mt-1">
                Childfree Info Hub
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`nav-link flex items-center gap-2 border-none bg-transparent cursor-pointer text-xs font-semibold ${
                    activeTab === item.id ? 'active' : ''
                  }`}
                >
                  <Icon size={14} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-white/5 border border-white/5 text-[var(--text-primary)] cursor-pointer"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[73px] z-40 bg-[var(--bg-primary)] p-4 border-t border-white/5 animate-fade-in md:hidden flex flex-col gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={`w-full py-4 px-5 rounded-xl border text-left font-display font-semibold text-sm flex items-center gap-3 transition-all cursor-pointer ${
                  isActive 
                    ? 'bg-gradient-to-r from-[var(--accent-violet)] to-[var(--accent-pink)] text-white border-none' 
                    : 'bg-white/5 text-[var(--text-secondary)] border-white/5 hover:bg-white/10'
                }`}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-6xl mx-auto py-6">
        {renderActiveComponent()}
      </main>

      {/* Footer */}
      <footer className="mt-auto py-12 px-4 border-t border-white/5 bg-[rgba(13,19,38,0.5)]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-white text-base">Decisión Libre</span>
              <span className="text-[10px] text-white/40 border border-white/10 px-1.5 py-0.5 rounded font-mono">v1.0.0</span>
            </div>
            <p className="text-xs text-[var(--text-muted)] text-center md:text-left mt-1">
              Plataforma de divulgación científica, demográfica y autoconocimiento sobre la elección childfree.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-xs text-[var(--text-muted)] font-medium">
            <button onClick={() => handleTabChange('studies')} className="hover:text-white bg-transparent border-none cursor-pointer">Ciencia</button>
            <button onClick={() => handleTabChange('calculator')} className="hover:text-white bg-transparent border-none cursor-pointer">Economía</button>
            <button onClick={() => handleTabChange('selftest')} className="hover:text-white bg-transparent border-none cursor-pointer">Test de afinidad</button>
            <button onClick={() => handleTabChange('resources')} className="hover:text-white bg-transparent border-none cursor-pointer">Recursos</button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-white/5 text-center text-[10px] text-[var(--text-muted)] leading-relaxed">
          <p>
            <strong>Descargo de responsabilidad:</strong> La información provista en este sitio web es estrictamente para fines informativos, de reflexión y divulgación general. No constituye asesoramiento psicológico, médico, reproductivo o financiero profesional. Cada individuo y pareja es el único soberano de sus decisiones vitales y de planificación familiar.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
