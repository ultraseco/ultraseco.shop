/**
 * Ultra Seco - Price Synchronization Engine (Universal v3.1.0)
 * Sincroniza los precios en tiempo real con Neon DB (/api/products), data/products.json y catalog.js
 */

(function() {
    console.log('🔄 Ultra Seco: Iniciando motor de sincronización universal v3.1.0...');

    const DATA_SOURCE = "data/products.json";
    const ALT_DATA_SOURCE = "../data/products.json";
    
    // Snapshot de emergencia (Sincronizado con Neon DB)
    const LOCAL_FALLBACK = [
    {
        "id": 16,
        "nombre": "Ultra Seco Solución Interior",
        "presentacion": "1 Litro",
        "precio": "15.99",
        "costo": "0.00",
        "precio_mayor": "14.50",
        "precio_dist": "0.00",
        "stock": 100,
        "categoria": "Construcción",
        "activo": true,
        "fecha_creacion": "2026-04-27T21:12:36.815Z",
        "fecha_act": "2026-11-19T16:11:31.887Z"
    },
    {
        "id": 17,
        "nombre": "Ultra Seco Solución Interior",
        "presentacion": "Cuñete (18L)",
        "precio": "194.00",
        "costo": "0.00",
        "precio_mayor": "0.00",
        "precio_dist": "0.00",
        "stock": 100,
        "categoria": "Construcción",
        "activo": true,
        "fecha_creacion": "2026-04-27T21:12:36.815Z",
        "fecha_act": "2026-11-19T16:11:32.312Z"
    },
    {
        "id": 18,
        "nombre": "Ultra Seco Solución Exterior",
        "presentacion": "1 Litro",
        "precio": "19.50",
        "costo": "0.00",
        "precio_mayor": "0.00",
        "precio_dist": "0.00",
        "stock": 100,
        "categoria": "Construcción",
        "activo": true,
        "fecha_creacion": "2026-04-27T21:12:36.815Z",
        "fecha_act": "2026-11-19T16:11:32.443Z"
    },
    {
        "id": 19,
        "nombre": "Fortificador de Superficies",
        "presentacion": "Galón",
        "precio": "57.00",
        "costo": "0.00",
        "precio_mayor": "0.00",
        "precio_dist": "0.00",
        "stock": 100,
        "categoria": "Construcción",
        "activo": true,
        "fecha_creacion": "2026-04-27T21:12:36.815Z",
        "fecha_act": "2026-11-19T16:11:32.573Z"
    },
    {
        "id": 20,
        "nombre": "Fortificador de Superficies",
        "presentacion": "Cuñete",
        "precio": "270.00",
        "costo": "0.00",
        "precio_mayor": "0.00",
        "precio_dist": "0.00",
        "stock": 100,
        "categoria": "Construcción",
        "activo": true,
        "fecha_creacion": "2026-04-27T21:12:36.815Z",
        "fecha_act": "2026-11-19T16:11:32.702Z"
    },
    {
        "id": 21,
        "nombre": "Pintura Súper Hidrofóbica",
        "presentacion": "Galón",
        "precio": "37.00",
        "costo": "0.00",
        "precio_mayor": "0.00",
        "precio_dist": "0.00",
        "stock": 100,
        "categoria": "Construcción",
        "activo": true,
        "fecha_creacion": "2026-04-27T21:12:36.815Z",
        "fecha_act": "2026-11-19T16:11:32.834Z"
    },
    {
        "id": 22,
        "nombre": "Fortificador de Superficies",
        "presentacion": "1 Litro",
        "precio": "21.00",
        "costo": "0.00",
        "precio_mayor": "0.00",
        "precio_dist": "0.00",
        "stock": 100,
        "categoria": "Construcción",
        "activo": true,
        "fecha_creacion": "2026-04-27T21:12:36.815Z",
        "fecha_act": "2026-11-19T16:11:32.964Z"
    },
    {
        "id": 23,
        "nombre": "Ultra Seco Solución Interior",
        "presentacion": "1 Litro (Atomizador)",
        "precio": "14.99",
        "costo": "0.00",
        "precio_mayor": "0.00",
        "precio_dist": "0.00",
        "stock": 100,
        "categoria": "Construcción",
        "activo": true,
        "fecha_creacion": "2026-04-27T21:12:36.815Z",
        "fecha_act": "2026-11-19T16:11:33.093Z"
    },
    {
        "id": 24,
        "nombre": "Ultra Seco Solución Interior",
        "presentacion": "Galón (3.785L)",
        "precio": "43.00",
        "costo": "0.00",
        "precio_mayor": "0.00",
        "precio_dist": "0.00",
        "stock": 100,
        "categoria": "Construcción",
        "activo": true,
        "fecha_creacion": "2026-04-27T21:12:36.815Z",
        "fecha_act": "2026-11-19T16:11:33.223Z"
    },
    {
        "id": 25,
        "nombre": "Ultra Seco Solución Exterior",
        "presentacion": "1 Litro (Atomizador)",
        "precio": "17.99",
        "costo": "0.00",
        "precio_mayor": "0.00",
        "precio_dist": "0.00",
        "stock": 100,
        "categoria": "Construcción",
        "activo": true,
        "fecha_creacion": "2026-04-27T21:12:36.815Z",
        "fecha_act": "2026-11-19T16:11:33.354Z"
    },
    {
        "id": 26,
        "nombre": "Ultra Seco Solución Exterior",
        "presentacion": "Galón (3.785L)",
        "precio": "54.00",
        "costo": "0.00",
        "precio_mayor": "0.00",
        "precio_dist": "0.00",
        "stock": 100,
        "categoria": "Construcción",
        "activo": true,
        "fecha_creacion": "2026-04-27T21:12:36.815Z",
        "fecha_act": "2026-11-19T16:11:33.483Z"
    },
    {
        "id": 27,
        "nombre": "Ultra Seco Solución Exterior",
        "presentacion": "Cuñete (18L)",
        "precio": "250.00",
        "costo": "0.00",
        "precio_mayor": "0.00",
        "precio_dist": "0.00",
        "stock": 100,
        "categoria": "Construcción",
        "activo": true,
        "fecha_creacion": "2026-04-27T21:12:36.815Z",
        "fecha_act": "2026-11-19T16:11:33.612Z"
    },
    {
        "id": 28,
        "nombre": "Champú Nano-Concentrado",
        "presentacion": "Galón",
        "precio": "35.00",
        "costo": "0.00",
        "precio_mayor": "0.00",
        "precio_dist": "0.00",
        "stock": 100,
        "categoria": "Vehicular",
        "activo": true,
        "fecha_creacion": "2026-04-27T21:12:36.815Z",
        "fecha_act": "2026-11-19T16:11:33.744Z"
    },
    {
        "id": 29,
        "nombre": "Eco Capturador (Minería)",
        "presentacion": "1 Litro",
        "precio": "85.00",
        "costo": "0.00",
        "precio_mayor": "0.00",
        "precio_dist": "0.00",
        "stock": 100,
        "categoria": "Industria",
        "activo": true,
        "fecha_creacion": "2026-04-27T21:12:36.815Z",
        "fecha_act": "2026-11-19T16:11:33.874Z"
    },
    {
        "id": 30,
        "nombre": "Escudo Cerámico",
        "presentacion": "1 Litro",
        "precio": "7.00",
        "costo": "0.00",
        "precio_mayor": "0.00",
        "precio_dist": "0.00",
        "stock": 100,
        "categoria": "Hogar",
        "activo": true,
        "fecha_creacion": "2026-04-27T21:12:36.815Z",
        "fecha_act": "2026-11-19T16:11:34.003Z"
    },
    {
        "id": 31,
        "nombre": "Estuco Súper Hidrofóbico",
        "presentacion": "Galón",
        "precio": "25.00",
        "costo": "0.00",
        "precio_mayor": "0.00",
        "precio_dist": "0.00",
        "stock": 100,
        "categoria": "Construcción",
        "activo": true,
        "fecha_creacion": "2026-04-27T21:12:36.815Z",
        "fecha_act": "2026-11-19T16:11:34.132Z"
    },
    {
        "id": 32,
        "nombre": "Eco Capturador (Minería)",
        "presentacion": "Galón",
        "precio": "320.00",
        "costo": "0.00",
        "precio_mayor": "0.00",
        "precio_dist": "0.00",
        "stock": 100,
        "categoria": "Industria",
        "activo": true,
        "fecha_creacion": "2026-04-27T21:12:36.815Z",
        "fecha_act": "2026-11-19T16:11:34.260Z"
    },
    {
        "id": 33,
        "nombre": "Nano Aditivo para Concreto",
        "presentacion": "600gr",
        "precio": "22.00",
        "costo": "0.00",
        "precio_mayor": "0.00",
        "precio_dist": "0.00",
        "stock": 100,
        "categoria": "Construcción",
        "activo": true,
        "fecha_creacion": "2026-04-27T21:12:36.815Z",
        "fecha_act": "2026-11-19T16:11:34.389Z"
    },
    {
        "id": 34,
        "nombre": "Cera Nano Protectora",
        "presentacion": "500ml",
        "precio": "15.00",
        "costo": "0.00",
        "precio_mayor": "0.00",
        "precio_dist": "0.00",
        "stock": 100,
        "categoria": "Hogar",
        "activo": true,
        "fecha_creacion": "2026-04-27T21:12:36.815Z",
        "fecha_act": "2026-11-19T16:11:34.518Z"
    },
    {
        "id": 35,
        "nombre": "Eco Capturador (Minería)",
        "presentacion": "Cuñete",
        "precio": "1500.00",
        "costo": "0.00",
        "precio_mayor": "0.00",
        "precio_dist": "0.00",
        "stock": 100,
        "categoria": "Industria",
        "activo": true,
        "fecha_creacion": "2026-04-27T21:12:36.815Z",
        "fecha_act": "2026-11-19T16:11:34.647Z"
    },
    {
        "id": 36,
        "nombre": "Ultra F3 (Anti-Fuego)",
        "presentacion": "Tambor (200L)",
        "precio": "4800.00",
        "costo": "0.00",
        "precio_mayor": "0.00",
        "precio_dist": "0.00",
        "stock": 100,
        "categoria": "Industria",
        "activo": true,
        "fecha_creacion": "2026-04-27T21:12:36.815Z",
        "fecha_act": "2026-11-19T16:11:34.776Z"
    },
    {
        "id": 37,
        "nombre": "Ultra F3 (Anti-Fuego)",
        "presentacion": "Cuñete (18L)",
        "precio": "220.00",
        "costo": "0.00",
        "precio_mayor": "0.00",
        "precio_dist": "0.00",
        "stock": 100,
        "categoria": "Industria",
        "activo": true,
        "fecha_creacion": "2026-04-27T21:12:36.815Z",
        "fecha_act": "2026-11-19T16:11:34.904Z"
    },
    {
        "id": 38,
        "nombre": "Aditivo Asfáltico",
        "presentacion": "Granel (1000L)",
        "precio": "16000.00",
        "costo": "0.00",
        "precio_mayor": "0.00",
        "precio_dist": "0.00",
        "stock": 100,
        "categoria": "Industria",
        "activo": true,
        "fecha_creacion": "2026-04-27T21:12:36.815Z",
        "fecha_act": "2026-11-19T16:11:35.037Z"
    },
    {
        "id": 39,
        "nombre": "Aditivo Asfáltico",
        "presentacion": "Tambor (200L)",
        "precio": "3500.00",
        "costo": "0.00",
        "precio_mayor": "0.00",
        "precio_dist": "0.00",
        "stock": 100,
        "categoria": "Industria",
        "activo": true,
        "fecha_creacion": "2026-04-27T21:12:36.815Z",
        "fecha_act": "2026-11-19T16:11:35.166Z"
    },
    {
        "id": 40,
        "nombre": "Champú Nano-Concentrado",
        "presentacion": "1 Litro",
        "precio": "12.00",
        "costo": "0.00",
        "precio_mayor": "0.00",
        "precio_dist": "0.00",
        "stock": 100,
        "categoria": "Vehicular",
        "activo": true,
        "fecha_creacion": "2026-04-27T21:12:36.815Z",
        "fecha_act": "2026-11-19T16:11:35.294Z"
    },
    {
        "id": 41,
        "nombre": "Eco Capturador Magnetron",
        "presentacion": "1 Litro",
        "precio": "95.00",
        "costo": "0.00",
        "precio_mayor": "0.00",
        "precio_dist": "0.00",
        "stock": 100,
        "categoria": "Industria",
        "activo": true,
        "fecha_creacion": "2026-04-27T21:12:36.815Z",
        "fecha_act": "2026-11-19T16:11:35.423Z"
    },
    {
        "id": 42,
        "nombre": "Eco Capturador Magnetron",
        "presentacion": "Galón",
        "precio": "345.00",
        "costo": "0.00",
        "precio_mayor": "0.00",
        "precio_dist": "0.00",
        "stock": 100,
        "categoria": "Industria",
        "activo": true,
        "fecha_creacion": "2026-04-27T21:12:36.815Z",
        "fecha_act": "2026-11-19T16:11:35.551Z"
    },
    {
        "id": 43,
        "nombre": "Estuco Súper Hidrofóbico",
        "presentacion": "1/4 Galón",
        "precio": "8.50",
        "costo": "0.00",
        "precio_mayor": "0.00",
        "precio_dist": "0.00",
        "stock": 100,
        "categoria": "Construcción",
        "activo": true,
        "fecha_creacion": "2026-04-27T21:12:36.815Z",
        "fecha_act": "2026-11-19T16:11:35.679Z"
    },
    {
        "id": 44,
        "nombre": "Eco Capturador Magnetron",
        "presentacion": "Cuñete",
        "precio": "1652.00",
        "costo": "0.00",
        "precio_mayor": "0.00",
        "precio_dist": "0.00",
        "stock": 100,
        "categoria": "Industria",
        "activo": true,
        "fecha_creacion": "2026-04-27T21:12:36.815Z",
        "fecha_act": "2026-11-19T16:11:35.809Z"
    },
    {
        "id": 45,
        "nombre": "Pintura Súper Hidrofóbica",
        "presentacion": "Cuñete (18L)",
        "precio": "148.00",
        "costo": "0.00",
        "precio_mayor": "0.00",
        "precio_dist": "0.00",
        "stock": 100,
        "categoria": "Construccion",
        "activo": true,
        "fecha_creacion": "2026-05-02T21:59:37.782Z",
        "fecha_act": "2026-11-19T16:11:35.937Z"
    },
    {
        "id": 46,
        "nombre": "Extintor F3",
        "presentacion": "Portátil 10 Lb (4 Lts)",
        "precio": "83.00",
        "costo": "0.00",
        "precio_mayor": "0.00",
        "precio_dist": "0.00",
        "stock": 0,
        "categoria": "Soluciones Contra el Fuego",
        "activo": true,
        "fecha_creacion": "2026-11-11T18:17:32.665Z",
        "fecha_act": "2026-11-19T16:11:36.065Z"
    }
];

    const VERSION = '3.1.0';
    const CACHE_KEY = 'ultraseco_prices_v' + VERSION;
    const CACHE_TTL = 1000 * 60; // 1 minuto para reflejar cambios rápidos

    async function fetchPrices() {
        console.log('🚀 PriceSync Engine v' + VERSION + ' - Iniciando...');
        
        // Limpiar versiones anteriores de caché
        try {
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith('ultraseco_prices_v') && key !== CACHE_KEY) {
                    localStorage.removeItem(key);
                }
            }
        } catch(e) {}

        try {
            const cached = localStorage.getItem(CACHE_KEY);
            if (cached) {
                const parsed = JSON.parse(cached);
                if (Date.now() - parsed.timestamp < CACHE_TTL && Array.isArray(parsed.data) && parsed.data.length > 0) {
                    console.log('📦 Usando precios de caché local reciente');
                    return parsed.data;
                }
            }
        } catch(e) {}

        // 1. Intentar API en vivo (Neon DB)
        try {
            console.log('📡 Intentando sincronizar con la API (/api/products)...');
            const response = await fetch('/api/products').catch(() => null);
            if (response && response.ok) {
                const data = await response.json();
                if (Array.isArray(data) && data.length > 0) {
                    try {
                        localStorage.setItem(CACHE_KEY, JSON.stringify({ data: data, timestamp: Date.now() }));
                    } catch(e) {}
                    console.log('✅ Precios sincronizados con la API');
                    return data;
                }
            }
        } catch (error) {
            console.warn('⚠️ No se pudo conectar con la API en vivo:', error);
        }

        // 2. Intentar archivo JSON estático local
        try {
            const localResp = await fetch(DATA_SOURCE).catch(() => fetch(ALT_DATA_SOURCE)).catch(() => null);
            if (localResp && localResp.ok) {
                const data = await localResp.json();
                if (Array.isArray(data) && data.length > 0) {
                    console.log('✅ Precios sincronizados con ' + DATA_SOURCE);
                    return data;
                }
            }
        } catch (e) {}

        // 3. Fallback a snapshot
        console.warn('ℹ️ Usando snapshot de emergencia.');
        return LOCAL_FALLBACK;
    }

    function formatPriceNum(num) {
        const n = parseFloat(num);
        if (isNaN(n)) return num;
        return (Math.abs(n - Math.round(n)) < 0.005) ? Math.round(n).toString() : n.toFixed(2);
    }

    function formatPriceWithIVA(price) {
        const p = parseFloat(price);
        if (isNaN(p)) return price;
        return 'Ref. ' + formatPriceNum(p);
    }

    window.formatPriceNum = window.formatPriceNum || formatPriceNum;
    window.formatPriceWithIVA = window.formatPriceWithIVA || formatPriceWithIVA;

    function syncUI(products) {
        if (!products || !Array.isArray(products)) return;

        const clean = (s) => (s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, " ").trim();

        // 1. Sincronizar con window.products (catalog.js)
        if (window.products && Array.isArray(window.products)) {
            window.products.forEach(p => {
                if (Array.isArray(p.options)) {
                    p.options.forEach(opt => {
                        const matching = products.filter(dbP => {
                            const dbName = clean(dbP.nombre);
                            const pName = clean(p.name);
                            return dbName.includes(pName) || pName.includes(dbName);
                        }).sort((a, b) => (b.presentacion || '').length - (a.presentacion || '').length);

                        const match = matching.find(dbP => {
                            const dbPres = clean(dbP.presentacion);
                            const optLbl = clean(opt.label);
                            return optLbl === dbPres || optLbl.includes(dbPres) || dbPres.includes(optLbl);
                        });
                        if (match) {
                            opt.price = parseFloat(match.precio);
                        }
                    });
                }
            });
            console.log('✅ Catalog.js sincronizado');
        }

        // 2. Sincronizar elementos HTML con data-sync-product
        const elements = document.querySelectorAll('[data-sync-product]');
        elements.forEach(el => {
            const productName = el.getAttribute('data-sync-product');
            const cleanTargetName = clean(productName);
            
            // Caso 1: El elemento es un SELECT (Menú desplegable)
            if (el.tagName === 'SELECT') {
                const options = el.querySelectorAll('option');

                // Si el select solo tiene una opción que dice "Cargando..."
                if (options.length <= 1 && options[0] && (options[0].textContent.includes('Cargando') || options[0].value === '')) {
                    const matchingProducts = products.filter(p => clean(p.nombre).includes(cleanTargetName));
                    if (matchingProducts.length > 0) {
                        el.innerHTML = matchingProducts.map(p => 
                            '<option value="' + p.presentacion + '" data-price="' + p.precio + '">' + p.presentacion + ' - Ref. ' + formatPriceNum(p.precio) + '</option>'
                        ).join('');
                    }
                } else {
                    const matchingProducts = products.filter(p => {
                        const dbName = clean(p.nombre);
                        return dbName.includes(cleanTargetName) || cleanTargetName.includes(dbName);
                    }).sort((a, b) => (b.presentacion || '').length - (a.presentacion || '').length);

                    options.forEach(opt => {
                        const optionText = opt.textContent || opt.innerText;
                        const targetPres = clean(optionText);
                        const targetValue = clean(opt.value);

                        const product = matchingProducts.find(p => {
                            const dbPres = clean(p.presentacion);
                            if (targetValue && (targetValue === dbPres || dbPres.includes(targetValue))) return true;
                            if (targetPres.includes(dbPres)) return true;
                            return false;
                        });
                        
                        if (product) {
                            opt.setAttribute('data-price', product.precio);
                            if (optionText.includes('Ref.') || optionText.includes('+ IVA=') || optionText.includes('$')) {
                                opt.textContent = product.presentacion + ' - Ref. ' + formatPriceNum(product.precio);
                            }
                        }
                    });
                }
                
                // Disparar el evento change para actualizar el precio mostrado al lado si existe
                el.dispatchEvent(new Event('change'));
            } 
            // Caso 2: El elemento es un encabezado o contenedor, buscar precios dentro de él
            else if (el.tagName === 'H1' || el.tagName === 'H2' || el.tagName === 'H3' || el.tagName === 'DIV') {
                const priceElements = el.parentElement.querySelectorAll('.price, [data-price], .product-price');
                priceElements.forEach(priceEl => {
                    const pres = priceEl.getAttribute('data-sync-pres') || '';
                    const product = products.find(p => {
                        const dbName = clean(p.nombre);
                        const dbPres = clean(p.presentacion);
                        const targetPres = clean(pres);
                        return (dbName.includes(cleanTargetName) || cleanTargetName.includes(dbName)) && (!pres || dbPres.includes(targetPres) || targetPres.includes(dbPres));
                    });
                    if (product) {
                        priceEl.innerHTML = formatPriceWithIVA(product.precio);
                        priceEl.setAttribute('data-price', product.precio);
                    }
                });
            } 
            // Caso 3: Otros elementos (SPAN, P, etc.)
            else {
                const presentation = el.getAttribute('data-sync-pres');
                const product = products.find(p => {
                    const dbName = clean(p.nombre);
                    const dbPres = clean(p.presentacion);
                    const targetPres = clean(presentation);
                    return (dbName.includes(cleanTargetName) || cleanTargetName.includes(dbName)) && (!presentation || dbPres.includes(targetPres) || targetPres.includes(dbPres));
                });
                if (product) {
                    let value = product.precio;
                    el.innerHTML = formatPriceWithIVA(value);
                    el.setAttribute('data-price', value);
                }
            }
        });

        // 3. Sincronizar elementos con [data-sync-price]
        const priceSyncElements = document.querySelectorAll('[data-sync-price]');
        priceSyncElements.forEach(el => {
            const productName = el.getAttribute('data-sync-price');
            const product = products.find(p => clean(p.nombre).includes(clean(productName)) || clean(productName).includes(clean(p.nombre)));
            if (product) {
                el.innerHTML = formatPriceWithIVA(product.precio);
                el.setAttribute('data-price', product.precio);
            }
        });

        // Disparar evento de actualización para otros scripts
        document.dispatchEvent(new CustomEvent('prices-updated', { detail: products }));
    }

    // Inicializar
    window.addEventListener('DOMContentLoaded', async () => {
        const products = await fetchPrices();
        syncUI(products);
    });

    // Fallback por si DOMContentLoaded ya pasó
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        fetchPrices().then(syncUI);
    }

    // Exportar para llamadas manuales si se requiere
    window.UltraSecoPriceSync = {
        fetchPrices: fetchPrices,
        syncUI: syncUI,
        formatPriceNum: formatPriceNum,
        formatPriceWithIVA: formatPriceWithIVA
    };

})();
