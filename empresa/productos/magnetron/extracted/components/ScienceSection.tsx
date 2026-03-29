
import React from 'react';
import { Zap, Hexagon, Droplet } from 'lucide-react';

export const ScienceSection: React.FC = () => {
  return (
    <section className="py-20 bg-slate-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-amber-500 font-bold uppercase tracking-widest text-xs mb-2">Ingeniería Molecular</h2>
          <h3 className="text-4xl md:text-5xl font-bold font-heading mb-4 uppercase">¿CÓMO FUNCIONA?</h3>
          <p className="text-slate-400 max-w-2xl mx-auto">Cada partícula está diseñada para la máxima eficiencia con una estructura de 3 capas.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <div className="flex justify-center relative">
             {/* Science Visualization */}
            <div className="relative w-72 h-72 md:w-96 md:h-96 group cursor-pointer">
              {/* Layer 3: Surface */}
              <div className="absolute inset-0 rounded-full border-4 border-sky-400/30 bg-sky-900/10 animate-[spin_10s_linear_infinite] group-hover:border-sky-400 transition-colors"></div>
              <div className="absolute inset-0 rounded-full border border-sky-400/50 scale-110 opacity-30"></div>
              
              {/* Layer 2: Ceramic */}
              <div className="absolute inset-8 rounded-full border-8 border-slate-600 bg-slate-800/80 flex items-center justify-center shadow-2xl">
                 {/* Layer 1: Core */}
                 <div className="w-32 h-32 rounded-full bg-gradient-to-br from-amber-400 via-amber-600 to-amber-800 shadow-[0_0_50px_rgba(245,158,11,0.5)] flex items-center justify-center relative z-10 group-hover:scale-110 transition duration-500">
                    <Zap className="w-12 h-12 text-white fill-white drop-shadow-lg" />
                 </div>
              </div>
              
              {/* Labels */}
              <div className="absolute top-0 right-0 transform translate-x-4 translate-y-4 bg-slate-900 border border-sky-500 px-3 py-1 rounded text-[10px] font-bold text-sky-400 uppercase shadow-xl">Superficie Activa</div>
              <div className="absolute bottom-1/2 left-0 transform -translate-x-6 bg-slate-900 border border-slate-500 px-3 py-1 rounded text-[10px] font-bold text-slate-300 uppercase shadow-xl">Blindaje Cerámico</div>
              <div className="absolute bottom-10 right-10 bg-slate-900 border border-amber-500 px-3 py-1 rounded text-[10px] font-bold text-amber-500 uppercase shadow-xl">Núcleo Magnético</div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center font-bold font-heading text-lg border border-amber-500/50">1</div>
              <div>
                <h4 className="text-lg font-bold font-heading text-amber-500 uppercase mb-1">Núcleo Magnético (Tracción)</h4>
                <p className="text-slate-400 text-sm leading-relaxed">Un corazón de alta potencia magnética diseñado específicamente para la tracción extrema.</p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
              <div className="w-10 h-10 rounded-full bg-slate-500/20 text-slate-300 flex items-center justify-center font-bold font-heading text-lg border border-slate-500/50">2</div>
              <div>
                <h4 className="text-lg font-bold font-heading text-slate-200 uppercase mb-1">Blindaje Cerámico (Resistencia)</h4>
                <p className="text-slate-400 text-sm leading-relaxed">Protección contra la abrasión y la corrosión. Resiste aguas ácidas y entornos hostiles.</p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
              <div className="w-10 h-10 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold font-heading text-lg border border-sky-500/50">3</div>
              <div>
                <h4 className="text-lg font-bold font-heading text-sky-400 uppercase mb-1">Superficie Activa (Caza Oro)</h4>
                <p className="text-slate-400 text-sm leading-relaxed">Recubrimiento inteligente que busca y envuelve obsesivamente cualquier partícula de oro.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bonus Features Row */}
        <div className="grid md:grid-cols-2 gap-6 pt-10 border-t border-slate-800">
          <div className="bg-slate-900 p-6 rounded-lg border border-slate-800 flex gap-4 items-center">
             <div className="bg-indigo-500/20 p-3 rounded-lg text-indigo-400"><Droplet className="w-6 h-6" /></div>
             <div>
               <h4 className="font-heading font-bold uppercase text-white mb-1">Agua como Herramienta</h4>
               <p className="text-xs text-slate-400">Al disolver Magnetron™, el agua se convierte en un "fluido magnético" que atrapa el oro al instante.</p>
             </div>
          </div>
          <div className="bg-slate-900 p-6 rounded-lg border border-slate-800 flex gap-4 items-center">
             <div className="bg-amber-500/20 p-3 rounded-lg text-amber-500"><Hexagon className="w-6 h-6" /></div>
             <div>
               <h4 className="font-heading font-bold uppercase text-white mb-1">El "Efecto Racimo"</h4>
               <p className="text-xs text-slate-400">Lo invisible se vuelve visible. El oro microscópico se agrupa en racimos negros y pesados fáciles de extraer.</p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};
