
import React from 'react';
import { Waves, Skull, Layers } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  return (
    <section id="problema" className="py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 items-center mb-12">
          <div className="lg:w-2/3 text-center lg:text-left">
            <h2 className="text-amber-600 font-bold uppercase tracking-widest text-xs mb-2">Métodos Tradicionales</h2>
            <h3 className="text-4xl md:text-5xl font-bold font-heading text-slate-950 mb-4 uppercase">TE CUESTAN DINERO Y SALUD</h3>
            <p className="text-slate-600 text-lg leading-relaxed max-w-2xl">
              La minería tradicional tiene una falla física fundamental: depende de la gravedad, pero el oro más valioso es tan fino que la gravedad no lo afecta.
            </p>
          </div>
          <div className="lg:w-1/3 bg-slate-900 p-6 rounded-sm text-white text-center shadow-xl">
            <p className="text-xl font-heading font-bold italic">"Las alfombras saturadas detienen tu producción y pierdes el 40% en relaves."</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-slate-50 rounded-xl border border-slate-100 p-8 hover:border-red-200 transition group relative overflow-hidden">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center mb-4">
              <Layers className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold font-heading text-slate-900 mb-2 uppercase tracking-tight">ALFOMBRAS SATURADAS</h4>
            <p className="text-slate-500 text-sm leading-relaxed">
              El "barre" y las arcillas tapan las alfombras en minutos, creando una barrera lisa (efecto tobogán) que impide que el oro se asiente, obligándote a parar constantemente.
            </p>
          </div>

          <div className="bg-slate-50 rounded-xl border border-slate-100 p-8 hover:border-red-200 transition">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center mb-4">
              <Waves className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold font-heading text-slate-900 mb-2 uppercase tracking-tight">EL ORO "HARINA" SE ESCAPA</h4>
            <p className="text-slate-500 text-sm leading-relaxed">
              Las partículas de menos de 50 micras y el "oro loco" flotan por tensión superficial y son arrastrados por el agua hacia el relave.
            </p>
          </div>

          <div className="bg-slate-900 rounded-xl border border-slate-800 p-8 hover:bg-red-950/20 transition">
            <div className="w-12 h-12 bg-red-600 text-white rounded-lg flex items-center justify-center mb-4 shadow-lg">
              <Skull className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold font-heading text-amber-500 mb-2 uppercase tracking-tight">VENENO INEFICIENTE</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              El mercurio no logra capturar las partículas microscópicas. No solo te enferma a ti y a tu familia, sino que es un método anticuado que bota dinero.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
