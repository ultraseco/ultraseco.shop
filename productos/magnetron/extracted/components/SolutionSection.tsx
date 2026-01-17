
import React from 'react';
import { ShieldCheck, Crosshair, DollarSign, Zap } from 'lucide-react';

export const SolutionSection: React.FC = () => {
  return (
    <section id="solucion" className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
               <h2 className="text-indigo-600 font-bold uppercase tracking-widest text-xs mb-2">La Solución Inteligente</h2>
               <h3 className="text-4xl font-bold font-heading text-slate-900 uppercase tracking-tight leading-none">
                 MAGNETRON™<br />CAPTURA ACTIVA
               </h3>
            </div>
            
            <div className="flex gap-5 items-start group">
              <div className="flex-shrink-0 w-12 h-12 bg-sky-500/10 border border-sky-500/20 rounded-xl flex items-center justify-center text-sky-600 group-hover:bg-sky-500 group-hover:text-white transition">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold font-heading text-slate-900 uppercase">ESCUDO ANTI-LODO</h4>
                <p className="text-slate-600 text-sm mt-1">
                  Su tecnología super-hidrofóbica repele el agua y el "barre", manteniendo las superficies de captura limpias y activas por mucho más tiempo, sin saturarse.
                </p>
              </div>
            </div>

            <div className="flex gap-5 items-start group">
              <div className="flex-shrink-0 w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-500 group-hover:text-white transition">
                <Crosshair className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold font-heading text-slate-900 uppercase">CAPTURA ACTIVA (TIPO DRONES)</h4>
                <p className="text-slate-600 text-sm mt-1">
                  Las nanopartículas actúan como "drones" autónomos que buscan y atrapan hasta la partícula de oro más pequeña en toda la columna de agua, garantizando que nada se escape.
                </p>
              </div>
            </div>

            <div className="flex gap-5 items-start group">
              <div className="flex-shrink-0 w-12 h-12 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center justify-center text-green-600 group-hover:bg-green-500 group-hover:text-white transition">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold font-heading text-slate-900 uppercase">GANANCIA 100% SEGURA</h4>
                <p className="text-slate-600 text-sm mt-1">
                  Reemplaza un veneno por tecnología de punta. Recupera tu inversión rápidamente al aumentar drásticamente la extracción en un ambiente seguro.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 p-1 rounded-2xl shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-slate-900 to-slate-900"></div>
            <div className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-8 h-full relative border border-white/10">
                <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center text-slate-900 mb-6 shadow-[0_0_30px_rgba(245,158,11,0.3)] animate-pulse">
                    <Zap className="w-8 h-8 fill-current" />
                </div>
                <h4 className="text-white font-heading font-bold text-3xl mb-4 uppercase">COBERTURA TOTAL 3D</h4>
                <p className="text-slate-300 text-base mb-8 leading-relaxed">
                A diferencia de las alfombras (2D), Magnetron™ trabaja en las 3 dimensiones: captura el oro que flota en la superficie, el que viaja en suspensión y el que se asienta en el fondo.
                </p>
                <div className="inline-block bg-white/10 px-4 py-2 rounded text-xs font-bold text-white uppercase tracking-wider border border-white/20">
                    Tecnología Patentada
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
