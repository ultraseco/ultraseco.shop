
import React, { useState, useEffect } from 'react';
import { ArrowRight, Zap, Loader2, RefreshCw } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export const Hero: React.FC = () => {
  const [bgUrl, setBgUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const generateHeroImage = async () => {
    setIsLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      // Prompt ajustado para realismo extremo: Agua clara, oro fino escaso, aglomerados magnéticos
      const prompt = `Hyper-realistic macro photography, top-down view of a black mining pan (batea) slightly submerged in crystal clear river water. Inside the pan, very fine 24k gold dust (flour gold) is sparsely visible, forming small, tight clusters attached to black magnetic sand. The gold is NOT abundant, it looks like tiny brilliant specks. The water is transparent and pristine. Sunlight reflects on the water ripples. High contrast, scientific documentary style, 8k resolution.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: prompt }] },
        config: { imageConfig: { aspectRatio: "16:9" } }
      });

      const part = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
      if (part?.inlineData) {
        setBgUrl(`data:image/png;base64,${part.inlineData.data}`);
      }
    } catch (err) {
      console.error("Error generating hero image:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    generateHeroImage();
  }, []);

  return (
    <section className="relative h-[90vh] flex items-end overflow-hidden bg-slate-900">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center bg-slate-900">
            <div className="text-center">
              <Loader2 className="w-12 h-12 text-amber-500 animate-spin mx-auto mb-4" />
              <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Sintetizando entorno realista...</p>
            </div>
          </div>
        ) : bgUrl ? (
          <>
            <img 
              src={bgUrl} 
              alt="Oro fino en agua clara" 
              className="w-full h-full object-cover transition-opacity duration-1000 opacity-90" 
            />
            {/* Integration Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-transparent to-transparent"></div>
            {/* Bottom Fade to White Integration */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent"></div>
          </>
        ) : (
          <div className="w-full h-full bg-slate-800 flex items-center justify-center">
             <button onClick={generateHeroImage} className="text-indigo-400 font-bold flex items-center gap-2 hover:text-white transition"><RefreshCw /> Reintentar</button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pb-20 md:pb-24">
        <div className="max-w-2xl text-white">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/50 text-amber-400 text-[10px] font-bold uppercase tracking-widest mb-4 backdrop-blur-md">
            <Zap className="w-3 h-3 fill-current" /> Nanotecnología de Precisión
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold font-heading leading-none mb-6 tracking-tight">
            ORO INVISIBLE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-500 to-amber-200">
              CAPTURA REAL
            </span>
          </h1>
          
          <p className="text-base md:text-lg text-slate-300 mb-8 max-w-lg leading-relaxed font-light">
            No pierda lo que no puede ver. Nuestra tecnología aglomera el <strong>oro harina microscópico</strong> en agua cristalina, recuperando la riqueza que la gravedad ignora.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-sm transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] flex items-center justify-center gap-2 uppercase tracking-widest text-xs group">
              COMPRAR TECNOLOGÍA <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </button>
            <button 
              onClick={generateHeroImage}
              className="px-6 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 text-white font-medium rounded-sm transition uppercase tracking-widest text-xs flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" /> REGENERAR VISTA
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
