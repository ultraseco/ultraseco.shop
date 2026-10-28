/**
 * ULTRA SECO - MOTOR DEL CATÁLOGO INTERACTIVO
 * Manejo dinámico de productos, filtros, precios, IVA, modal y carrito.
 */

// 1. Detección Inteligente de Ruta (Subdirectorio vs Raíz)
const isSubdirectory = window.location.pathname.includes('/pagina_catalogo') || 
                      window.location.href.includes('/pagina_catalogo/');
const BASE_PATH = isSubdirectory ? '../' : './';

// 2. Base de Datos Completa de Productos Ultra Seco
const CATALOG_PRODUCTS = [
  {
    id: 'solucion-interior',
    name: 'Ultra Seco Solución Interior',
    category: 'construccion',
    categoryName: 'Construcción',
    subtitle: 'Nanotecnología hidrofóbica invisible para paredes y techos',
    description: 'Bloquea el salitre y la humedad por condensación sin alterar el color ni la textura. Fórmula transpirable al vapor de agua.',
    image: 'images/interiores.jpg',
    link: 'interiores.html',
    badge: 'Popular',
    tags: ['Repelente al Agua', 'Transpirable', 'Anti-Salitre'],
    specs: {
      rendimiento: '8 a 12 m² por litro según porosidad',
      secado: '2 a 4 horas al tacto (curado total 24h)',
      aplicacion: 'Brocha, rodillo o aspersor de baja presión',
      base: 'Nanopolímeros base solvente ecológico'
    },
    options: [
      { label: '1 Litro (Atomizador)', priceRetail: 14.99, priceWholesale: 12.74, sku: 'US-INT-1L-ATOM' },
      { label: '1 Litro', priceRetail: 15.99, priceWholesale: 13.59, sku: 'US-INT-1L' },
      { label: 'Galón (3.785L)', priceRetail: 43.00, priceWholesale: 36.55, sku: 'US-INT-GAL' },
      { label: 'Cuñete (18L)', priceRetail: 194.00, priceWholesale: 164.90, sku: 'US-INT-CUN' }
    ]
  },
  {
    id: 'solucion-exterior',
    name: 'Ultra Seco Solución Exterior',
    category: 'construccion',
    categoryName: 'Construcción',
    subtitle: 'Blindaje impermeable para fachadas, muros y piedra',
    description: 'Máxima resistencia a rayos UV, lluvias torrenciales y hongos. Efecto perla que hace resbalar el agua instantáneamente.',
    image: 'images/exteriores.jpg',
    link: 'exteriores.html',
    badge: 'Anti-UV',
    tags: ['Efecto Perla', 'Protección Solar UV', 'Fachadas'],
    specs: {
      rendimiento: '6 a 10 m² por litro',
      secado: '3 horas al tacto (curado 48h)',
      aplicacion: 'Aspersor, brocha o rodillo',
      base: 'Nanoresinas hidrófugas con estabilizador UV'
    },
    options: [
      { label: '1 Litro (Atomizador)', priceRetail: 17.99, priceWholesale: 15.29, sku: 'US-EXT-1L-ATOM' },
      { label: '1 Litro', priceRetail: 19.50, priceWholesale: 16.57, sku: 'US-EXT-1L' },
      { label: 'Galón (3.785L)', priceRetail: 54.00, priceWholesale: 45.90, sku: 'US-EXT-GAL' },
      { label: 'Cuñete (18L)', priceRetail: 250.00, priceWholesale: 212.50, sku: 'US-EXT-CUN' }
    ]
  },
  {
    id: 'estuco',
    name: 'Estuco Súper Hidrofóbico',
    category: 'construccion',
    categoryName: 'Construcción',
    subtitle: 'Pasta bloqueadora de humedad ascendente para frisados',
    description: 'Masilla lista para usar. Reemplaza el encamisado tradicional evitando que la pintura se abombe o desprenda.',
    image: 'images/estuco.jpg',
    link: 'estuco.html',
    badge: 'Cero Ampollas',
    tags: ['Frisado Blanco', 'Anti-Desprendimiento', 'Listo para Usar'],
    specs: {
      rendimiento: '1.2 a 1.5 kg por m² por milímetro de espesor',
      secado: 'Secado entre manos: 4 horas',
      aplicacion: 'Llana metálica o espátula flexible',
      base: 'Pasta acrílica con cargas nanométricas'
    },
    options: [
      { label: '1/4 Galón', priceRetail: 8.50, priceWholesale: 7.20, sku: 'ESTUCO-1/4' },
      { label: 'Galón', priceRetail: 22.00, priceWholesale: 19.00, sku: 'ESTUCO-GAL' },
      { label: 'Cuñete (4 galones)', priceRetail: 100.00, priceWholesale: 85.00, sku: 'ESTUCO-CUN' }
    ]
  },
  {
    id: 'fortificador',
    name: 'Fortificador de Superficies',
    category: 'construccion',
    categoryName: 'Construcción',
    subtitle: 'Consolidante nanotecnológico para concreto y pisos arenosos',
    description: 'Penetra profundamente en la microestructura cristalina para detener el desmoronamiento de pisos y paredes deleznables.',
    image: 'images/fortificador.jpg',
    link: 'fortificador.html',
    badge: 'Alta Resistencia',
    tags: ['Consolidante', 'Anti-Polvillo', 'Pisos y Muros'],
    specs: {
      rendimiento: '5 a 8 m² por litro según absorción',
      secado: '6 horas para tránsito peatonal',
      aplicacion: 'Aspersor o regadera de baja presión',
      base: 'Silicatos nanocoloidales reactivos'
    },
    options: [
      { label: '1 Litro', priceRetail: 21.00, priceWholesale: 17.85, sku: 'US-FORT-1L' },
      { label: 'Galón', priceRetail: 57.00, priceWholesale: 48.45, sku: 'US-FORT-GAL' },
      { label: 'Cuñete', priceRetail: 270.00, priceWholesale: 229.50, sku: 'US-FORT-CUN' }
    ]
  },
  {
    id: 'pintura-hidrofobica',
    name: 'Pintura Súper Hidrofóbica',
    category: 'construccion',
    categoryName: 'Construcción',
    subtitle: 'Pintura elastomérica impermeable con nanotecnología repelente',
    description: 'Acabado satinado mate de alta cobertura. El agua y el sucio resbalan limpiando la superficie al llover.',
    image: 'images/pintura.jpg',
    link: 'pintura.html',
    badge: 'Autolimpiable',
    tags: ['Lavable', 'Alta Cobertura', 'Anti-Hongos'],
    specs: {
      rendimiento: '30 a 35 m² por galón a 2 manos',
      secado: '1 hora al tacto, 4 horas para segunda mano',
      aplicacion: 'Rodillo de lana o pistola airless',
      base: 'Emulsión acrílica elastomérica modificada'
    },
    options: [
      { label: 'Galón', priceRetail: 37.00, priceWholesale: 31.45, sku: 'PINT-GAL' }
    ]
  },
  {
    id: 'nano-aditivo',
    name: 'Nano Aditivo para Concreto',
    category: 'construccion',
    categoryName: 'Construcción',
    subtitle: 'Cristales nanométricos para mezclas de concreto impermeables',
    description: 'Aditivo que sella los poros capilares desde el fraguado. Aumenta la resistencia y elimina la filtración de raíz.',
    image: 'images/aditivo.png',
    link: 'nano-aditivo.html',
    badge: 'Fórmula Pura',
    tags: ['Desde el Fraguado', 'Cero Filtraciones', 'Estructural'],
    specs: {
      rendimiento: '500g rinde para 4 sacos de cemento (42.5kg c/u)',
      secado: 'Fraguado según diseño de mezcla',
      aplicacion: 'Disolver en el agua de amasado',
      base: 'Nanopartículas cristalinas densificantes'
    },
    options: [
      { label: '500gr', priceRetail: 22.00, priceWholesale: 18.70, sku: 'ADITIVO-500G' }
    ]
  },
  {
    id: 'eco-capturador',
    name: 'Eco Capturador (Minería)',
    category: 'industria',
    categoryName: 'Industria',
    subtitle: 'Sustituto ecológico del mercurio para recuperación de oro',
    description: 'Aglomeración selectiva no contaminante con tasa de recuperación superior al 95%. Certificado biodegradable y seguro para el operador.',
    image: 'assets/hero-eco.jpg',
    link: 'eco.html',
    badge: 'Sin Mercurio 🌿',
    tags: ['Minería Verde', '+95% Oro', 'Biodegradable'],
    specs: {
      rendimiento: '1 Litro procesa hasta 5 toneladas de mineral concentrado',
      tiempoReaccion: 'Acción de aglomeración en menos de 15 minutos',
      aplicacion: 'Dosificación directa en batea o canalón helicoidal',
      base: 'Agentes tensoactivos biodegradables de origen vegetal'
    },
    options: [
      { label: '1 Litro', priceRetail: 85.00, priceWholesale: 72.25, sku: 'ECO-1L' },
      { label: 'Galón', priceRetail: 320.00, priceWholesale: 272.00, sku: 'ECO-GAL' },
      { label: 'Cuñete', priceRetail: 1500.00, priceWholesale: 1275.00, sku: 'ECO-CUN' }
    ]
  },
  {
    id: 'magnetron',
    name: 'Eco Capturador Magnetron',
    category: 'industria',
    categoryName: 'Industria',
    subtitle: 'Tecnología iónica avanzada para recuperación de oro y metales',
    description: 'Agente magnético-iónico para concentraciones de alta ley y arenas negras. Acelera la captura en corrientes de agua turbulenta.',
    image: 'images/magnetron/Gemini_Generated_Image_datubudatubudatu.png',
    link: 'magnetron.html',
    badge: 'Iónico Avanzado',
    tags: ['Alta Ley', 'Arenas Negras', 'Separación Rápida'],
    specs: {
      rendimiento: 'Concentración ultra densa: 1 Litro para 8 toneladas',
      tiempoReaccion: 'Aglomeración inmediata',
      aplicacion: 'Sistemas de flotación o canaletas magnéticas',
      base: 'Compuestos iónicos selectivos magnetizados'
    },
    options: [
      { label: '1 Litro', priceRetail: 95.00, priceWholesale: 80.75, sku: 'MAG-1L' },
      { label: 'Galón', priceRetail: 345.00, priceWholesale: 293.25, sku: 'MAG-GAL' },
      { label: 'Cuñete', priceRetail: 1650.00, priceWholesale: 1402.50, sku: 'MAG-CUN' }
    ]
  },
  {
    id: 'ultra-f3',
    name: 'Ultra F3 (Anti-Fuego Industrial)',
    category: 'industria',
    categoryName: 'Industria',
    subtitle: 'Espuma extintora biodegradable para incendios clase A y B',
    description: 'Libre de flúor (Fluorine-Free). Sofoca fuegos industriales, hidrocarburos y forestales en segundos sin contaminar acuíferos.',
    image: 'assets/hero-f3.jpg',
    link: 'f3.html',
    badge: 'Fluorine-Free 🔥',
    tags: ['Extinción Ultrarrápida', 'Clase A y B', 'Ecológico'],
    specs: {
      proporcion: 'Dosificación al 1%, 3% o 6% según riesgo',
      biodegradabilidad: '100% degradable en 28 días',
      certificacion: 'Norma NFPA y pruebas con Cuerpos de Bomberos',
      base: 'Proteínas hidrolizadas y surfactantes sintéticos biodegradables'
    },
    options: [
      { label: 'Cuñete (18L)', priceRetail: 450.00, priceWholesale: 382.50, sku: 'F3-CUN' },
      { label: 'Tambor (200L)', priceRetail: 4800.00, priceWholesale: 4080.00, sku: 'F3-TAM' }
    ]
  },
  {
    id: 'aditivo-asfaltico',
    name: 'Aditivo Asfáltico Ultra Seco',
    category: 'industria',
    categoryName: 'Industria',
    subtitle: 'Blindaje hidrofóbico y antienvejecimiento para pavimento',
    description: 'Previene la disgregación del asfalto provocada por el agua estancada y la radiación solar. Duplica la vida útil de carpetas viales.',
    image: 'images/aditivo_asfaltico.png',
    link: 'aditivo.html',
    badge: 'Vialidad Pesada',
    tags: ['Cero Baches', 'Antienvejecimiento', 'Alta Resistencia'],
    specs: {
      rendimiento: '0.5% al 1.5% del peso total del ligante asfáltico',
      resistencia: 'Estabilidad Marshall mejorada en un 35%',
      aplicacion: 'Inyección directa en planta de mezclado en caliente',
      base: 'Polímeros hidrofóbicos modificadores de reología'
    },
    options: [
      { label: 'Tambor (200L)', priceRetail: 3500.00, priceWholesale: 2975.00, sku: 'ASF-TAM' },
      { label: 'Granel (1000L)', priceRetail: 16000.00, priceWholesale: 13600.00, sku: 'ASF-TANK' }
    ]
  },
  {
    id: 'champu',
    name: 'Champú Nano-Concentrado',
    category: 'vehicular',
    categoryName: 'Vehicular',
    subtitle: 'Lavado activo que encapsula partículas de mugre con efecto cera',
    description: 'Lava y protege sin rayar la laca. Deja una película repelente al polvo y al agua que mantiene el vehículo limpio por más tiempo.',
    image: 'images/champu.png',
    link: 'champu.html',
    badge: 'Brillo Espejo',
    tags: ['pH Neutro', 'Anti-Rayas', 'Efecto Cera'],
    specs: {
      dilucion: '50ml por cada 10 litros de agua',
      espuma: 'Espuma densa lubricante para cañón foam o balde',
      seguridad: 'Seguro para cerámicas, vinilos y selladores previos',
      base: 'Surfactantes nanolipofílicos'
    },
    options: [
      { label: '1 Litro', priceRetail: 15.00, priceWholesale: 12.00, sku: 'CHAMPU-1L' },
      { label: 'Galón', priceRetail: 35.00, priceWholesale: 29.75, sku: 'CHAMPU-GAL' }
    ]
  },
  {
    id: 'cera-protectora',
    name: 'Cera Nano Protectora',
    category: 'vehicular',
    categoryName: 'Vehicular',
    subtitle: 'Sellador hidrofóbico para carrocerías, cristales y superficies',
    description: 'Crea una barrera repelente al agua y al polvo. Resiste múltiples lavados y proporciona un brillo profundo tipo espejo.',
    image: 'images/cera.jpg',
    link: 'cera.html',
    badge: 'Efecto Loto',
    tags: ['Hidrofóbico', 'Ultra Brillo', 'Fácil Aplicación'],
    specs: {
      durabilidad: 'Hasta 6 meses de repelencia hidrofóbica',
      rendimiento: '30ml rinden para un vehículo sedán completo',
      aplicacion: 'Microfibra limpia en movimientos circulares',
      base: 'Polímeros sintéticos hidrófobos de alta pureza'
    },
    options: [
      { label: '1 Litro', priceRetail: 13.00, priceWholesale: 11.05, sku: 'CERA-1L' }
    ]
  },
  {
    id: 'escudo-ceramico',
    name: 'Escudo Cerámico',
    category: 'hogar',
    categoryName: 'Hogar',
    subtitle: 'Protección cerámica para vidrios, mamparas de baño y topes',
    description: 'Evita la incrustación de sarro, jabón y manchas de agua dura en puertas de baño, cerámicas y encimeras de cocina.',
    image: 'images/escudo.jpg',
    link: 'escudo.html',
    badge: 'Anti-Sarro',
    tags: ['Baños y Vidrios', 'Fácil Limpieza', 'Nanocerámica'],
    specs: {
      durabilidad: 'De 6 a 12 meses según uso',
      rendimiento: '1 Litro rinde para más de 40 m² de vidrio o azulejo',
      aplicacion: 'Pulverizar sobre superficie limpia y lustrar con microfibra',
      base: 'Dióxido de silicio nanométrico (SiO2)'
    },
    options: [
      { label: '1 Litro', priceRetail: 7.00, priceWholesale: 5.95, sku: 'ESCUDO-1L' }
    ]
  },
  {
    id: 'suavizante',
    name: 'Suavizante Flash Nanotecnológico',
    category: 'hogar',
    categoryName: 'Hogar',
    subtitle: 'Suavizante textil concentrado con fragancia encapsulada',
    description: 'Fórmula de rápida acción que penetra las fibras de la ropa dejándolas suaves al tacto y con aroma fresco prolongado.',
    image: 'images/suavizante.png',
    link: 'suavizante.html',
    badge: 'Aroma Intenso',
    tags: ['Fragancia Prolongada', 'Cuidado de Fibras', 'Concentrado'],
    specs: {
      dosificacion: '1 tapa por carga completa de lavado (8-10 kg)',
      aroma: 'Microcápsulas de liberación prolongada por fricción',
      seguridad: 'Hipoalergénico, seguro para ropa delicada y de bebés',
      base: 'Compuestos catiónicos suavizantes biodegradables'
    },
    options: [
      { label: 'Galón', priceRetail: 12.00, priceWholesale: 10.20, sku: 'SUAV-GAL' }
    ]
  }
];

// 3. Estado de la Aplicación
const state = {
  searchQuery: '',
  activeDivision: 'all',
  priceMode: 'retail', // 'retail' o 'wholesale'
  sortBy: 'featured',
  selectedPresentations: {}, // { [productId]: optionIndex }
  selectedQuantities: {}, // { [productId]: quantity }
  cart: []
};

// Formateo de Precios con IVA (16%)
function formatPrice(val) {
  const n = parseFloat(val);
  if (isNaN(n)) return '0.00';
  return (Math.abs(n - Math.round(n)) < 0.005) ? Math.round(n).toString() : n.toFixed(2);
}

function getPriceDetails(priceUSD) {
  const p = parseFloat(priceUSD) || 0;
  const iva = p * 0.16;
  const total = p + iva;
  return {
    base: formatPrice(p),
    iva: formatPrice(iva),
    total: formatPrice(total),
    formatted: `Ref. ${formatPrice(p)} + IVA=${formatPrice(total)}`
  };
}

// 4. Inicialización
document.addEventListener('DOMContentLoaded', () => {
  initCart();
  initDefaults();
  renderDivisionCounts();
  renderCatalog();
  setupEventListeners();
});

function initDefaults() {
  CATALOG_PRODUCTS.forEach(prod => {
    state.selectedPresentations[prod.id] = 0;
    state.selectedQuantities[prod.id] = 1;
  });
}

// 5. Manejo de Carrito en LocalStorage (Compatible con carrito.html)
function initCart() {
  try {
    const saved = localStorage.getItem('miCarritoUltraSeco');
    if (saved) {
      state.cart = JSON.parse(saved);
    } else {
      state.cart = [];
    }
  } catch (e) {
    console.error('Error al cargar miCarritoUltraSeco:', e);
    state.cart = [];
  }
  updateCartBadge();
  renderCartDrawer();
}

function saveCart() {
  localStorage.setItem('miCarritoUltraSeco', JSON.stringify(state.cart));
  updateCartBadge();
  renderCartDrawer();
}

function updateCartBadge() {
  const badge = document.getElementById('cart-badge');
  const count = state.cart.reduce((sum, item) => sum + (parseInt(item.cantidad) || 1), 0);
  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  }
}

// Agregar al Carrito
function addToCart(productId) {
  const product = CATALOG_PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const optIndex = state.selectedPresentations[productId] || 0;
  const option = product.options[optIndex];
  const qty = parseInt(state.selectedQuantities[productId]) || 1;

  const unitPrice = state.priceMode === 'wholesale' ? option.priceWholesale : option.priceRetail;
  const itemId = `${product.id}-${option.sku.toLowerCase()}`;
  const itemName = `${product.name} - ${option.label}`;

  const existingIndex = state.cart.findIndex(i => i.id === itemId);
  if (existingIndex !== -1) {
    state.cart[existingIndex].cantidad += qty;
  } else {
    state.cart.push({
      id: itemId,
      nombre: itemName,
      precio: parseFloat(unitPrice),
      cantidad: qty,
      image: product.image
    });
  }

  saveCart();
  showToast(`¡Agregado al carrito: ${product.name} (${qty})!`);
  
  // Efecto visual en el botón del carrito
  const cartBtn = document.getElementById('nav-cart-btn');
  if (cartBtn) {
    cartBtn.style.transform = 'scale(1.15)';
    setTimeout(() => { cartBtn.style.transform = 'scale(1)'; }, 200);
  }
}

function updateCartItemQty(itemId, delta) {
  const index = state.cart.findIndex(i => i.id === itemId);
  if (index !== -1) {
    state.cart[index].cantidad += delta;
    if (state.cart[index].cantidad <= 0) {
      state.cart.splice(index, 1);
    }
    saveCart();
  }
}

function removeCartItem(itemId) {
  state.cart = state.cart.filter(i => i.id !== itemId);
  saveCart();
}

// 6. Renderizado de Contadores de Divisiones
function renderDivisionCounts() {
  const countAll = CATALOG_PRODUCTS.length;
  const countConstruccion = CATALOG_PRODUCTS.filter(p => p.category === 'construccion').length;
  const countIndustria = CATALOG_PRODUCTS.filter(p => p.category === 'industria').length;
  const countVehicular = CATALOG_PRODUCTS.filter(p => p.category === 'vehicular').length;
  const countHogar = CATALOG_PRODUCTS.filter(p => p.category === 'hogar').length;

  const elAll = document.getElementById('count-all');
  const elConst = document.getElementById('count-construccion');
  const elInd = document.getElementById('count-industria');
  const elVeh = document.getElementById('count-vehicular');
  const elHog = document.getElementById('count-hogar');

  if (elAll) elAll.textContent = countAll;
  if (elConst) elConst.textContent = countConstruccion;
  if (elInd) elInd.textContent = countIndustria;
  if (elVeh) elVeh.textContent = countVehicular;
  if (elHog) elHog.textContent = countHogar;
}

// 7. Filtros y Búsqueda de Productos
function getFilteredProducts() {
  let list = [...CATALOG_PRODUCTS];

  // Filtro por división
  if (state.activeDivision !== 'all') {
    list = list.filter(p => p.category === state.activeDivision);
  }

  // Búsqueda de texto
  if (state.searchQuery.trim() !== '') {
    const q = state.searchQuery.toLowerCase().trim();
    list = list.filter(p => {
      const matchName = p.name.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      const matchSub = p.subtitle.toLowerCase().includes(q);
      const matchTags = p.tags.some(t => t.toLowerCase().includes(q));
      return matchName || matchDesc || matchSub || matchTags;
    });
  }

  // Ordenamiento
  if (state.sortBy === 'price-asc') {
    list.sort((a, b) => {
      const priceA = state.priceMode === 'wholesale' ? a.options[0].priceWholesale : a.options[0].priceRetail;
      const priceB = state.priceMode === 'wholesale' ? b.options[0].priceWholesale : b.options[0].priceRetail;
      return priceA - priceB;
    });
  } else if (state.sortBy === 'price-desc') {
    list.sort((a, b) => {
      const priceA = state.priceMode === 'wholesale' ? a.options[0].priceWholesale : a.options[0].priceRetail;
      const priceB = state.priceMode === 'wholesale' ? b.options[0].priceWholesale : b.options[0].priceRetail;
      return priceB - priceA;
    });
  } else if (state.sortBy === 'name') {
    list.sort((a, b) => a.name.localeCompare(b.name));
  }

  return list;
}

// 8. Renderizado Principal de Tarjetas del Catálogo
function renderCatalog() {
  const container = document.getElementById('product-grid-container');
  const resultsCounter = document.getElementById('results-count');
  if (!container) return;

  const products = getFilteredProducts();

  if (resultsCounter) {
    resultsCounter.textContent = `Mostrando ${products.length} de ${CATALOG_PRODUCTS.length} productos`;
  }

  if (products.length === 0) {
    container.innerHTML = `
      <div class="catalog-empty-state" style="grid-column: 1 / -1;">
        <i class="fa-solid fa-magnifying-glass"></i>
        <h3>No encontramos productos que coincidan</h3>
        <p>Intenta con otros términos como "humedad", "piso", "concreto", "fuego" o "asfalto".</p>
        <button onclick="resetFilters()" class="btn-add-cart" style="margin: 1.5rem auto 0; display: inline-flex; width: auto; padding: 0.75rem 1.75rem;">
          <i class="fa-solid fa-rotate-left"></i> Restablecer Filtros
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = products.map(product => {
    const selectedOptIndex = state.selectedPresentations[product.id] || 0;
    const currentOption = product.options[selectedOptIndex] || product.options[0];
    const unitPrice = state.priceMode === 'wholesale' ? currentOption.priceWholesale : currentOption.priceRetail;
    const priceDetails = getPriceDetails(unitPrice);
    const quantity = state.selectedQuantities[product.id] || 1;

    // Badges de división
    let badgeClass = 'badge-construccion';
    if (product.category === 'industria') badgeClass = 'badge-industria';
    if (product.category === 'vehicular') badgeClass = 'badge-vehicular';
    if (product.category === 'hogar') badgeClass = 'badge-hogar';

    // Enlace de imagen con ruta inteligente
    const imgSrc = BASE_PATH + product.image;
    const detailLink = BASE_PATH + product.link;

    // Mensaje para WhatsApp Directo
    const waText = encodeURIComponent(
      `Hola Ultra Seco! Quisiera consultar/pedir el producto: *${product.name}*\n` +
      `Presentación: *${currentOption.label}*\n` +
      `Cantidad: *${quantity}*\n` +
      `Precio Unitario: *Ref. ${priceDetails.base} + IVA (${priceDetails.total})*`
    );
    const waUrl = `https://wa.me/584146023797?text=${waText}`;

    return `
      <article class="product-card" id="card-${product.id}">
        <!-- Header Multimedia -->
        <div class="card-media">
          <span class="card-badge-category ${badgeClass}">
            ${product.categoryName}
          </span>
          <button class="card-quick-view-btn" onclick="openQuickView('${product.id}')" title="Vista Rápida / Ficha">
            <i class="fa-solid fa-expand"></i>
          </button>
          <img src="${imgSrc}" alt="${product.name}" class="card-img" onerror="this.src='${BASE_PATH}images/logo.png'">
        </div>

        <!-- Contenido y Especificaciones -->
        <div class="card-content">
          <h3 class="card-title">${product.name}</h3>
          <div class="card-subtitle">${product.subtitle}</div>
          <p class="card-description">${product.description}</p>

          <!-- Chips de Características -->
          <div class="card-tags">
            ${product.tags.map(t => `<span class="card-tag"><i class="fa-solid fa-check mr-1" style="color:var(--primary-glow); font-size: 0.65rem;"></i>${t}</span>`).join('')}
          </div>

          <!-- Selector de Presentación -->
          <div class="card-presentation-box">
            <div class="presentation-label">
              <span>Presentación:</span>
              <span style="color: var(--primary-glow);">${currentOption.sku}</span>
            </div>
            <select class="presentation-select" onchange="onPresentationChange('${product.id}', this.value)">
              ${product.options.map((opt, idx) => {
                const optPrice = state.priceMode === 'wholesale' ? opt.priceWholesale : opt.priceRetail;
                const pInfo = getPriceDetails(optPrice);
                return `
                  <option value="${idx}" ${idx === selectedOptIndex ? 'selected' : ''}>
                    ${opt.label} — Ref. ${pInfo.base} + IVA (${pInfo.total})
                  </option>
                `;
              }).join('')}
            </select>
          </div>

          <!-- Caja de Precios con IVA Desglosado -->
          <div class="card-price-container">
            <div>
              <div class="price-main-val">
                Ref. ${priceDetails.base} <small>USD</small>
              </div>
            </div>
            <div class="price-tax-badge">
              + IVA (16%): Ref. ${priceDetails.iva}<br>
              <strong>Total: Ref. ${priceDetails.total}</strong>
            </div>
          </div>

          <!-- Fila de Acciones: Cantidad + Agregar + WhatsApp -->
          <div class="card-action-row">
            <div class="qty-stepper">
              <button class="qty-btn" onclick="changeQuantity('${product.id}', -1)" aria-label="Disminuir"><i class="fa-solid fa-minus"></i></button>
              <input type="number" class="qty-input" value="${quantity}" min="1" max="99" onchange="setQuantity('${product.id}', this.value)">
              <button class="qty-btn" onclick="changeQuantity('${product.id}', 1)" aria-label="Aumentar"><i class="fa-solid fa-plus"></i></button>
            </div>

            <button class="btn-add-cart" onclick="addToCart('${product.id}')">
              <i class="fa-solid fa-cart-shopping"></i> Agregar
            </button>

            <a href="${waUrl}" target="_blank" class="btn-whatsapp-direct" title="Pedir directo por WhatsApp">
              <i class="fa-brands fa-whatsapp"></i>
            </a>
          </div>

          <a href="${detailLink}" class="card-detail-link">
            Ver página y ficha técnica completa <i class="fa-solid fa-arrow-right ml-1"></i>
          </a>
        </div>
      </article>
    `;
  }).join('');
}

// 9. Eventos de Selección de Presentación y Cantidad
function onPresentationChange(productId, optionIndex) {
  state.selectedPresentations[productId] = parseInt(optionIndex);
  renderCatalog();
}

function changeQuantity(productId, delta) {
  const current = state.selectedQuantities[productId] || 1;
  const next = Math.max(1, current + delta);
  state.selectedQuantities[productId] = next;
  renderCatalog();
}

function setQuantity(productId, value) {
  const parsed = parseInt(value);
  state.selectedQuantities[productId] = isNaN(parsed) || parsed < 1 ? 1 : parsed;
  renderCatalog();
}

// 10. Drawer de Carrito Lateral
function renderCartDrawer() {
  const body = document.getElementById('drawer-items-body');
  const countEl = document.getElementById('drawer-item-count');
  const subtotalEl = document.getElementById('drawer-subtotal');
  const ivaEl = document.getElementById('drawer-iva');
  const totalEl = document.getElementById('drawer-total');
  const checkoutBtn = document.getElementById('drawer-checkout-btn');
  const waBtn = document.getElementById('drawer-wa-btn');

  if (!body) return;

  const totalItems = state.cart.reduce((sum, i) => sum + (parseInt(i.cantidad) || 1), 0);
  if (countEl) countEl.textContent = `(${totalItems})`;

  if (state.cart.length === 0) {
    body.innerHTML = `
      <div class="drawer-empty-msg">
        <i class="fa-solid fa-cart-shopping"></i>
        <h4>Tu carrito está vacío</h4>
        <p style="font-size:0.85rem; color:var(--text-subtle); margin-top: 0.5rem;">Explora los productos y agrega tus soluciones hidrofóbicas.</p>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = 'Ref. 0.00';
    if (ivaEl) ivaEl.textContent = 'Ref. 0.00';
    if (totalEl) totalEl.textContent = 'Ref. 0.00';
    if (checkoutBtn) checkoutBtn.style.opacity = '0.5';
    if (waBtn) waBtn.style.opacity = '0.5';
    return;
  }

  if (checkoutBtn) checkoutBtn.style.opacity = '1';
  if (waBtn) waBtn.style.opacity = '1';

  let subtotal = 0;

  body.innerHTML = state.cart.map(item => {
    const itemTotal = item.precio * item.cantidad;
    subtotal += itemTotal;
    const itemImg = item.image ? (BASE_PATH + item.image) : (BASE_PATH + 'images/logo.png');

    return `
      <div class="drawer-item">
        <img src="${itemImg}" alt="${item.nombre}" class="drawer-item-img" onerror="this.src='${BASE_PATH}images/logo.png'">
        <div class="drawer-item-info">
          <h4>${item.nombre}</h4>
          <div class="drawer-item-price">Ref. ${formatPrice(item.precio)} × ${item.cantidad} = Ref. ${formatPrice(itemTotal)}</div>
          <div style="display: flex; gap: 0.5rem; margin-top: 0.4rem; align-items: center;">
            <button class="qty-btn" style="width:22px; height:22px; border-radius:4px; background:rgba(255,255,255,0.1);" onclick="updateCartItemQty('${item.id}', -1)">-</button>
            <span style="font-size:0.85rem; font-weight:700;">${item.cantidad}</span>
            <button class="qty-btn" style="width:22px; height:22px; border-radius:4px; background:rgba(255,255,255,0.1);" onclick="updateCartItemQty('${item.id}', 1)">+</button>
          </div>
        </div>
        <button class="drawer-item-remove" onclick="removeCartItem('${item.id}')" title="Eliminar">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    `;
  }).join('');

  const iva = subtotal * 0.16;
  const grandTotal = subtotal + iva;

  if (subtotalEl) subtotalEl.textContent = `Ref. ${formatPrice(subtotal)}`;
  if (ivaEl) ivaEl.textContent = `Ref. ${formatPrice(iva)}`;
  if (totalEl) totalEl.textContent = `Ref. ${formatPrice(grandTotal)}`;

  // Actualizar enlace de WhatsApp del carrito completo
  if (waBtn) {
    const listSummary = state.cart.map(i => `• ${i.nombre} (x${i.cantidad}) = Ref. ${formatPrice(i.precio * i.cantidad)}`).join('\n');
    const fullWaMsg = encodeURIComponent(
      `Hola Ultra Seco! Quisiera procesar la compra de mi carrito:\n\n${listSummary}\n\n` +
      `Subtotal: Ref. ${formatPrice(subtotal)}\n` +
      `IVA (16%): Ref. ${formatPrice(iva)}\n` +
      `*Total a Pagar: Ref. ${formatPrice(grandTotal)} USD*\n\n` +
      `Por favor indíquenme los métodos de pago (Bs. / Zelle) y despacho.`
    );
    waBtn.onclick = () => {
      window.open(`https://wa.me/584146023797?text=${fullWaMsg}`, '_blank');
    };
  }
}

function toggleCartDrawer(open) {
  const overlay = document.getElementById('cart-drawer-overlay');
  const drawer = document.getElementById('cart-drawer');
  if (!overlay || !drawer) return;

  if (open) {
    overlay.classList.add('open');
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  } else {
    overlay.classList.remove('open');
    drawer.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// 11. Modal de Vista Rápida / Ficha Técnica
function openQuickView(productId) {
  const product = CATALOG_PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const modal = document.getElementById('quick-view-modal');
  const content = document.getElementById('quick-view-body');
  if (!modal || !content) return;

  const optIndex = state.selectedPresentations[product.id] || 0;
  const currentOption = product.options[optIndex];
  const unitPrice = state.priceMode === 'wholesale' ? currentOption.priceWholesale : currentOption.priceRetail;
  const priceDetails = getPriceDetails(unitPrice);
  const imgSrc = BASE_PATH + product.image;
  const detailLink = BASE_PATH + product.link;

  content.innerHTML = `
    <div class="modal-grid">
      <div class="modal-img-container">
        <img src="${imgSrc}" alt="${product.name}" onerror="this.src='${BASE_PATH}images/logo.png'">
      </div>
      <div class="modal-info-col">
        <span class="card-badge-category badge-${product.category}" style="display:inline-block; margin-bottom: 0.75rem;">
          ${product.categoryName}
        </span>
        <h2>${product.name}</h2>
        <p style="color:var(--accent-light); font-weight:600; margin-bottom:0.75rem;">${product.subtitle}</p>
        <p style="color:var(--text-muted); font-size:0.9rem; line-height:1.6;">${product.description}</p>

        <h4 style="margin-top:1.5rem; font-size:0.95rem; color:white; border-bottom:1px solid var(--border-light); padding-bottom:0.4rem;">
          Especificaciones Técnicas
        </h4>
        <ul class="modal-specs-list">
          ${product.specs.rendimiento ? `<li><i class="fa-solid fa-ruler-combined"></i> <strong>Rendimiento:</strong> ${product.specs.rendimiento}</li>` : ''}
          ${product.specs.secado ? `<li><i class="fa-solid fa-clock"></i> <strong>Secado:</strong> ${product.specs.secado}</li>` : ''}
          ${product.specs.aplicacion ? `<li><i class="fa-solid fa-paintbrush"></i> <strong>Aplicación:</strong> ${product.specs.aplicacion}</li>` : ''}
          ${product.specs.base ? `<li><i class="fa-solid fa-atom"></i> <strong>Composición:</strong> ${product.specs.base}</li>` : ''}
          ${product.specs.tiempoReaccion ? `<li><i class="fa-solid fa-bolt"></i> <strong>Reacción:</strong> ${product.specs.tiempoReaccion}</li>` : ''}
        </ul>

        <div style="background:rgba(0,0,0,0.3); padding:1rem; border-radius:12px; margin: 1.25rem 0; border:1px solid var(--border-light);">
          <div style="font-size:0.85rem; color:var(--text-subtle);">Precio Presentación (${currentOption.label}):</div>
          <div style="font-size:1.6rem; font-weight:800; color:var(--primary-glow);">
            Ref. ${priceDetails.base} <small style="font-size:0.9rem; color:var(--text-muted);">+ IVA = Ref. ${priceDetails.total}</small>
          </div>
        </div>

        <div style="display:flex; gap:0.75rem; flex-wrap:wrap;">
          <button class="btn-add-cart" style="flex:1; padding:0.85rem;" onclick="addToCart('${product.id}'); closeModal();">
            <i class="fa-solid fa-cart-shopping"></i> Agregar al Carrito
          </button>
          <a href="${detailLink}" class="ai-advisor-cta" style="padding:0.85rem 1.25rem;">
            Página Detallada <i class="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('quick-view-modal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// 12. Notificaciones Toast
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <i class="fa-solid fa-circle-check" style="color:var(--success); font-size:1.25rem;"></i>
    <span style="font-size:0.9rem; font-weight:500;">${message}</span>
    <button onclick="toggleCartDrawer(true)" style="background:rgba(255,255,255,0.1); border:none; color:white; padding:0.3rem 0.6rem; border-radius:4px; font-size:0.78rem; font-weight:600; cursor:pointer; margin-left:auto;">
      Ver Carrito
    </button>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(15px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// 13. Event Listeners y Filtros
function setupEventListeners() {
  // Input de Búsqueda
  const searchInput = document.getElementById('catalog-search-input');
  const clearBtn = document.getElementById('search-clear-btn');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      if (clearBtn) clearBtn.style.display = state.searchQuery ? 'block' : 'none';
      renderCatalog();
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      state.searchQuery = '';
      clearBtn.style.display = 'none';
      renderCatalog();
    });
  }

  // Pestañas de División
  const divisionButtons = document.querySelectorAll('.division-tab-btn');
  divisionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      divisionButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.activeDivision = btn.dataset.division || 'all';
      renderCatalog();
    });
  });

  // Toggle de Precios Detal / Mayor
  const priceModeButtons = document.querySelectorAll('.price-mode-btn');
  priceModeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      priceModeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.priceMode = btn.dataset.mode;
      renderCatalog();
      renderCartDrawer();
    });
  });

  // Selector de Orden
  const sortSelect = document.getElementById('catalog-sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      state.sortBy = e.target.value;
      renderCatalog();
    });
  }

  // Cierre de Drawer al hacer click en overlay
  const drawerOverlay = document.getElementById('cart-drawer-overlay');
  if (drawerOverlay) {
    drawerOverlay.addEventListener('click', () => toggleCartDrawer(false));
  }

  // Cierre de Modal al hacer click en overlay
  const modalOverlay = document.getElementById('quick-view-modal');
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  // Botón Checkout en Drawer redirige a carrito.html
  const checkoutBtn = document.getElementById('drawer-checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      window.location.href = BASE_PATH + 'carrito.html';
    });
  }
}

function resetFilters() {
  state.searchQuery = '';
  state.activeDivision = 'all';
  const searchInput = document.getElementById('catalog-search-input');
  if (searchInput) searchInput.value = '';
  const clearBtn = document.getElementById('search-clear-btn');
  if (clearBtn) clearBtn.style.display = 'none';

  const divisionButtons = document.querySelectorAll('.division-tab-btn');
  divisionButtons.forEach(b => {
    if (b.dataset.division === 'all') b.classList.add('active');
    else b.classList.remove('active');
  });

  renderCatalog();
}

// Exportación global para llamadas inline en HTML
window.addToCart = addToCart;
window.onPresentationChange = onPresentationChange;
window.changeQuantity = changeQuantity;
window.setQuantity = setQuantity;
window.updateCartItemQty = updateCartItemQty;
window.removeCartItem = removeCartItem;
window.toggleCartDrawer = toggleCartDrawer;
window.openQuickView = openQuickView;
window.closeModal = closeModal;
window.resetFilters = resetFilters;
