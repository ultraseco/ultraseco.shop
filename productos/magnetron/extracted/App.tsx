
import React, { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { ProblemSection } from './components/ProblemSection';
import { SolutionSection } from './components/SolutionSection';
import { ScienceSection } from './components/ScienceSection';
import { ProcessSection } from './components/ProcessSection';
import { Footer } from './components/Footer';
import { Magnet, Info, ShoppingCart, ChevronUp } from 'lucide-react';

const App: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-slate-50 selection:bg-indigo-500 selection:text-white">
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-14 items-center">
            <div className="flex items-center gap-2">
              <Magnet className="w-6 h-6 text-indigo-600" />
              <span className="text-xl font-bold font-heading tracking-tight text-slate-800">
                MAGNETRON<span className="text-indigo-600">™</span>
              </span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <a href="#problema" className="text-xs font-bold text-slate-600 hover:text-indigo-600 transition uppercase tracking-wider">Problema</a>
              <a href="#solucion" className="text-xs font-bold text-slate-600 hover:text-indigo-600 transition uppercase tracking-wider">Solución</a>
              <a href="#proceso" className="text-xs font-bold text-slate-600 hover:text-indigo-600 transition uppercase tracking-wider">Proceso</a>
              <button className="bg-indigo-600 text-white px-4 py-1.5 rounded-sm text-xs font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition flex items-center gap-2 uppercase tracking-widest">
                <ShoppingCart className="w-3.5 h-3.5" /> Comprar
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <Hero />
        <ProblemSection />
        <SolutionSection />
        <ScienceSection />
        <ProcessSection />

        {/* Final CTA Compacto */}
        <section className="py-12 bg-indigo-950 text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 uppercase tracking-tighter">¿LISTO PARA EL ORO 24K?</h2>
            <p className="text-base text-indigo-100 mb-8 max-w-xl mx-auto font-light">
              Elimine el mercurio hoy mismo. Magnetron™ es la única tecnología que garantiza la recuperación de oro harina visible y pesada.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button className="w-full sm:w-auto px-8 py-3 bg-indigo-500 hover:bg-indigo-400 text-white font-bold rounded-sm text-sm shadow-2xl transition flex items-center justify-center gap-2 uppercase tracking-wider">
                <ShoppingCart className="w-5 h-5" /> COMPRAR AHORA
              </button>
              <button className="w-full sm:w-auto px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-bold rounded-sm text-sm transition flex items-center justify-center gap-2 uppercase tracking-wider">
                <Info className="w-5 h-5" /> FICHA TÉCNICA
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Floating Action Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 bg-white border border-slate-200 rounded-full shadow-2xl text-indigo-600 hover:bg-indigo-50 transition-all z-40"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default App;
