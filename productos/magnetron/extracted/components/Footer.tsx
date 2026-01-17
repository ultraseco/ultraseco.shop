
import React from 'react';
import { Magnet, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12 border-b border-slate-800 pb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <Magnet className="w-8 h-8 text-indigo-500" />
              <span className="text-2xl font-bold font-heading tracking-tight text-white">
                MAGNETRON<span className="text-indigo-500">™</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Líderes mundiales en nanotecnología magnética aplicada a la minería sostenible y eficiente. Recuperando el futuro, un micrón a la vez.
            </p>
            <div className="flex gap-4">
               {/* Placeholders for social icons */}
               {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full bg-slate-800 hover:bg-indigo-600 transition cursor-pointer"></div>)}
            </div>
          </div>

          <div>
            <h5 className="text-white font-bold mb-6 font-heading">PRODUCTOS</h5>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-indigo-400 transition">Magnetron™ Polvo 1Kg</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition">Magnetron™ Líquido Concentrado</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition">Separadores Magnéticos</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition">Kits de Inicio</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-bold mb-6 font-heading">EMPRESA</h5>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-indigo-400 transition">Sobre Nosotros</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition">Sustentabilidad</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition">Proyectos</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition">Blog Minero</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-bold mb-6 font-heading">CONTACTO</h5>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-indigo-500" /> info@magnetron.tech</li>
              <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-indigo-500" /> +57 (300) 123-4567</li>
              <li className="flex items-center gap-3"><MapPin className="w-4 h-4 text-indigo-500" /> Medellín, Colombia</li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:row justify-between items-center text-xs opacity-60">
          <p>© 2026 Ultra Seco Ecosystem. Todos los derechos reservados.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#">Términos y Condiciones</a>
            <a href="#">Política de Privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
