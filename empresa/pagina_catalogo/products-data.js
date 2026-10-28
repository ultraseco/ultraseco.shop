/**
 * ULTRASECO.SHOP - BASE DE DATOS COMERCIAL DE LOS 12 PRODUCTOS
 * Extraído directamente del ecosistema real de Ultraseco.
 * Sin datos ficticios: precios y presentaciones verificados en portal_precios.csv, docs/precios.md y fichas oficiales.
 */

window.PRODUCTS_CATALOG_DATA = [
  {
    id: 'estuco',
    name: 'Estuco Súper Hidrofóbico',
    category: 'Construcción',
    description: 'Pasta bloqueadora de humedad ascendente y salitre para frisados.',
    image: '../images/estuco.jpg',
    detailUrl: '../estuco.html',
    presentations: [
      { label: '1/4 de galón', price: 6.40, sku: 'ESTUCO-1/4' },
      { label: '1 galón', price: 19.00, sku: 'ESTUCO-GAL' },
      { label: 'Cuñete (4 galones)', price: 100.00, sku: 'ESTUCO-CUN' }
    ],
    taxRate: 0.16
  },
  {
    id: 'solucion-interior',
    name: 'Solución Interior',
    category: 'Construcción',
    description: 'Nanotecnología hidrofóbica invisible para paredes y techos interiores.',
    image: '../images/interiores.jpg',
    detailUrl: '../interiores.html',
    presentations: [
      { label: '1 Litro', price: 13.99, sku: 'US-INT-1L' },
      { label: '1 Litro (Atomizador)', price: 14.99, sku: 'US-INT-1L-ATOM' },
      { label: '1 galón (3.785L)', price: 38.00, sku: 'US-INT-GAL' },
      { label: 'Cuñete (18L)', price: 170.00, sku: 'US-INT-CUN' }
    ],
    taxRate: 0.16
  },
  {
    id: 'solucion-exterior',
    name: 'Solución Exterior',
    category: 'Construcción',
    description: 'Blindaje invisible para fachadas, muros y piedras con máxima resistencia UV.',
    image: '../images/exteriores.jpg',
    detailUrl: '../exteriores.html',
    presentations: [
      { label: '1 Litro', price: 16.99, sku: 'US-EXT-1L' },
      { label: '1 Litro (Atomizador)', price: 17.99, sku: 'US-EXT-1L-ATOM' },
      { label: '1 galón (3.785L)', price: 48.00, sku: 'US-EXT-GAL' },
      { label: 'Cuñete (18L)', price: 217.50, sku: 'US-EXT-CUN' }
    ],
    taxRate: 0.16
  },
  {
    id: 'fortificador',
    name: 'Fortificador de Superficies',
    category: 'Construcción',
    description: 'Consolidante nanotecnológico para concreto y pisos arenosos deleznables.',
    image: '../images/fortificador.jpg',
    detailUrl: '../fortificador.html',
    presentations: [
      { label: '1 Litro', price: 19.00, sku: 'US-FORT-1L' },
      { label: '1 galón', price: 52.00, sku: 'US-FORT-GAL' },
      { label: 'Cuñete', price: 254.50, sku: 'US-FORT-CUN' }
    ],
    taxRate: 0.16
  },
  {
    id: 'pintura',
    name: 'Pintura Súper Hidrofóbica',
    category: 'Construcción',
    description: 'Pintura elastomérica impermeable con nanotecnología autolimpiable.',
    image: '../images/pintura.jpg',
    detailUrl: '../pintura.html',
    presentations: [
      { label: '1 galón', price: 34.00, sku: 'PINT-GAL' }
    ],
    taxRate: 0.16
  },
  {
    id: 'nanoshield',
    name: 'Nanoshield (Nano Aditivo para Concreto)',
    category: 'Construcción',
    description: 'Impermeabilización integral para mezclas de concreto y morteros desde el fraguado.',
    image: '../images/aditivo.png',
    detailUrl: '../nano-aditivo.html',
    presentations: [
      { label: '600 gramos', price: 15.00, sku: 'NANO-ADIT-600G' },
      { label: '500 gramos', price: 22.00, sku: 'NANO-ADIT-500G' }
    ],
    taxRate: 0.16
  },
  {
    id: 'nano-cera-protectora',
    name: 'Nano Cera Protectora',
    category: 'Hogar & Vehicular',
    description: 'Cera hidrofóbica y sellador protector para acabados brillantes y cristales.',
    image: '../images/cera.jpg',
    detailUrl: '../cera.html',
    presentations: [
      { label: '500 ml', price: 15.00, sku: 'CERA-500ML' },
      { label: '1 Litro', price: 13.00, sku: 'CERA-1L' }
    ],
    taxRate: 0.16
  },
  {
    id: 'escudo-ceramico',
    name: 'Escudo Cerámico',
    category: 'Hogar',
    description: 'Revestimiento cerámico ultrabrillante y antisarro para vidrios y porcelanato.',
    image: '../images/escudo.jpg',
    detailUrl: '../escudo.html',
    presentations: [
      { label: '1 Litro', price: 45.00, sku: 'ESCUDO-1L' }
    ],
    taxRate: 0.16
  },
  {
    id: 'concentrado-espuma-f3',
    name: 'Concentrado Espuma F3',
    category: 'Soluciones Contra el Fuego',
    description: 'Espuma extintora biodegradable libre de flúor (Fluorine-Free) para fuegos clase A y B.',
    image: '../images/ultra-f3.jpg',
    detailUrl: '../f3.html',
    presentations: [
      { label: 'Cuñete (18L)', price: 450.00, sku: 'F3-CONC-CUN' },
      { label: 'Tambor (200L)', price: 4800.00, sku: 'F3-CONC-TAM' }
    ],
    taxRate: 0.16
  },
  {
    id: 'extintor-f3',
    name: 'Extintor F3',
    category: 'Soluciones Contra el Fuego',
    description: 'Extintor portátil de última generación equipado con tecnología Ultra F3 biodegradable.',
    image: '../images/extintor_f3.png',
    detailUrl: '../f3.html',
    presentations: [
      { label: 'Portátil 2.5 Gal (6L)', price: null, pendingNote: 'Cotizar con asesor', sku: 'EXT-F3-6L' },
      { label: 'Portátil 9 Litros', price: null, pendingNote: 'Cotizar con asesor', sku: 'EXT-F3-9L' }
    ],
    taxRate: 0.16,
    isQuoteOnly: true
  },
  {
    id: 'solucion-extintores-f3',
    name: 'Solución para Extintores F3',
    category: 'Soluciones Contra el Fuego',
    description: 'Agente extintor listo para carga y recarga de extintores portátiles y rodantes.',
    image: '../images/ultra-f3-ar.jpg',
    detailUrl: '../f3.html',
    presentations: [
      { label: 'Cuñete (18L)', price: 450.00, sku: 'F3-RECARGA-CUN' },
      { label: 'Tambor (200L)', price: 4800.00, sku: 'F3-RECARGA-TAM' }
    ],
    taxRate: 0.16
  },
  {
    id: 'shampoo-nano-concentrado',
    name: 'Shampoo Nano Concentrado',
    category: 'Cuidado Vehicular',
    description: 'Lavado activo que encapsula la suciedad con efecto cera hidrofóbica instantáneo.',
    image: '../images/champu.png',
    detailUrl: '../champu.html',
    presentations: [
      { label: '1 Litro', price: 12.00, sku: 'CHAMPU-1L' },
      { label: '1 galón', price: 35.00, sku: 'CHAMPU-GAL' }
    ],
    taxRate: 0.16
  }
];
