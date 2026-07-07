import { useState } from 'react';
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

  // Navigation Items list - pure text labels, no icons
  const navItems = [
    { id: 'dashboard', label: 'Inicio' },
    { id: 'statistics', label: 'Estadísticas' },
    { id: 'studies', label: 'Estudios' },
    { id: 'testimonials', label: 'Testimonios' },
    { id: 'calculator', label: 'Calculadora' },
    { id: 'selftest', label: 'Test' },
    { id: 'resources', label: 'Recursos' },
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
      <header className="sticky top-0 z-50 bg-[rgba(20,18,16,0.9)] backdrop-blur-md border-b border-[var(--border-color)] px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo Brand */}
          <div 
            onClick={() => handleTabChange('dashboard')} 
            className="cursor-pointer"
          >
            <span className="font-serif font-semibold text-xl tracking-wider text-white uppercase block">
              Decisión Libre
            </span>
            <span className="text-[10px] text-[var(--text-muted)] font-medium block tracking-widest uppercase -mt-0.5">
              Estudios & Recursos
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={`nav-link border-none bg-transparent cursor-pointer text-xs font-semibold ${
                  activeTab === item.id ? 'active' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button - clean typographic characters */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center bg-transparent border border-[var(--border-color)] text-white cursor-pointer font-sans text-lg hover:border-[var(--accent-gold)]"
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[73px] z-40 bg-[var(--bg-primary)] p-4 border-t border-[var(--border-color)] animate-fade-in md:hidden flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={`w-full py-4 px-5 text-left font-serif font-medium text-base transition-all cursor-pointer ${
                  isActive 
                    ? 'bg-[var(--bg-secondary)] text-[var(--accent-gold)] border-l-2 border-[var(--accent-gold)] border-t-none border-b-none border-r-none' 
                    : 'bg-transparent text-[var(--text-secondary)] border-none hover:text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-6xl mx-auto py-8">
        {renderActiveComponent()}
      </main>

      {/* Footer */}
      <footer className="mt-auto py-12 px-6 border-t border-[var(--border-color)] bg-[var(--bg-secondary)]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-white text-base uppercase tracking-wider">Decisión Libre</span>
              <span className="text-[9px] text-[var(--text-muted)] border border-[var(--border-color)] px-1.5 py-0.5 rounded-none font-mono">v1.0.0</span>
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

        <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-[var(--border-color)] text-center text-[10px] text-[var(--text-muted)] leading-relaxed font-light">
          <p>
            <strong>Descargo de responsabilidad:</strong> La información provista en este sitio web es estrictamente para fines informativos, de reflexión y divulgación general. No constituye asesoramiento psicológico, médico, reproductivo o financiero profesional. Cada individuo y pareja es el único soberano de sus decisiones vitales y de planificación familiar.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
