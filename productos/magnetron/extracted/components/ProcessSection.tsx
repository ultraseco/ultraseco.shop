
import React, { useState, useEffect } from 'react';
import { Droplet, Sparkles, Magnet, Target, Loader2, RefreshCw } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export const ProcessSection: React.FC = () => {
  const [infographicUrl, setInfographicUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const steps = [
    { 
      id: "01", 
      title: "Activar el Agua", 
      desc: "Disolver una pequeña cantidad de polva. El agua parecerá clara, pero estará cargada de nanopartículas.", 
      icon: <Droplet className="w-5 h-5" />, 
      color: "bg-sky-500" 
    },
    { 
      id: "02", 
      title: "Piel Magnética", 
      desc: "Al procesar, las nanopartículas cubren instantáneamente cualquier partícula de oro, volviéndola magnética.", 
      icon: <Sparkles className="w-5 h-5" />, 
      color: "bg-amber-500" 
    },
    { 
      id: "03", 
      title: "Extraer con Imán", 
      desc: "Introduce una herramienta magnética. Los racimos de Magnetron™ saltarán limpiamente hacia el imán.", 
      icon: <Magnet className="w-5 h-5" />, 
      color: "bg-slate-900" 
    },
    { 
      id: "04", 
      title: "Cosechar", 
      desc: "Libera la carga. Obtienes un concentrado de alta pureza en segundos, listo para la separación final.", 
      icon: <Target className="w-5 h-5" />, 
      color: "bg-green-600" 
    }
  ];

  const generateInfographic = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      // Prompt mejorado para una sola imagen de alto impacto visual (Macro extraction shot)
      const prompt = `Extreme close-up macro photography of a neodymium magnet hovering over clear water. 
      Black magnetic sand clusters are jumping out of the water, clinging to the magnet. 
      Tiny, brilliant specks of gold are visible embedded within the black magnetic clusters.
      The water is crystal clear. High speed photography freezing the action. 
      Cinematic lighting, scientific lab setting, 8k resolution, photorealistic.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: prompt }] },
        config: { imageConfig: { aspectRatio: "16:9" } }
      });

      const part = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
      if (part?.inlineData) {
        setInfographicUrl(`data:image/png;base64,${part.inlineData.data}`);
      }
    } catch (err) {
      setError("Error al generar visualización.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    generateInfographic();
  }, []);

  return (
    <section id="proceso" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-amber-600 font-bold uppercase tracking-widest text-[10px] mb-2">Método Verificado</h2>
          <h3 className="text-3xl md:text-4xl font-bold font-heading text-slate-900 uppercase">4 PASOS HACIA LA RENTABILIDAD</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((step) => (
            <div key={step.id} className="relative p-6 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 font-heading text-4xl font-bold text-slate-300 group-hover:text-indigo-200 transition">{step.id}</div>
              <div className={`w-10 h-10 ${step.color} rounded-lg flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition`}>
                {step.icon}
              </div>
              <h4 className="text-lg font-bold font-heading text-slate-900 mb-2 group-hover:text-indigo-700 transition uppercase">{step.title}</h4>
              <p className="text-slate-500 text-xs leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="relative rounded-2xl overflow-hidden aspect-video bg-slate-900 shadow-2xl max-w-5xl mx-auto border-4 border-white ring-1 ring-slate-200 group">
          {isLoading ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900">
              <Loader2 className="w-10 h-10 text-indigo-500 animate-spin mb-4" />
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Generando simulación microscópica...</p>
            </div>
          ) : infographicUrl ? (
            <>
              <img src={infographicUrl} className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition duration-1000" alt="Magnetron process flow" />
              {/* Cinematic Vignette */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(15,23,42,0.6)_100%)] pointer-events-none"></div>
              {/* Gradient Integration */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent pointer-events-none"></div>
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
               <button onClick={generateInfographic} className="flex items-center gap-2 text-indigo-400 hover:text-white transition font-bold text-sm"><RefreshCw className="w-4 h-4" /> Generar Resultados</button>
            </div>
          )}
          
          <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col md:flex-row justify-between items-end gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                <p className="text-white/80 font-mono text-[10px] uppercase tracking-widest">Live Capture Feed</p>
              </div>
              <p className="text-white font-heading font-bold text-2xl uppercase tracking-tight mb-2">Momento de Extracción</p>
              <p className="text-slate-300 text-sm max-w-lg leading-relaxed border-l-2 border-amber-500 pl-4">
                La evidencia es visible: los aglomerados magnéticos negros permiten recuperar el oro invisible sin usar químicos tóxicos.
              </p>
            </div>
             {infographicUrl && (
              <div className="flex flex-col gap-2">
                 <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 text-xs font-bold rounded uppercase flex items-center gap-2">
                    <Target className="w-4 h-4 text-amber-500" /> Eficiencia: 99.8%
                 </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
