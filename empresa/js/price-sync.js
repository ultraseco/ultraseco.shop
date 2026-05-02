/**
 * Ultra Seco - Price Synchronization Engine (Universal v3.0.0)
 * This script synchronizes product prices across all pages using data/products.json as the source.
 * It also synchronizes with catalog.js if present.
 */

(function() {
    console.log('🔄 Ultra Seco: Iniciando motor de sincronización universal v3.0.0...');

    const DATA_SOURCE = "../data/products.json";
    
    // Snapshot de emergencia (Sincronizado con Neon DB v3.0.0)
    const LOCAL_FALLBACK = [
        {"id":1,"nombre":"Ultra Seco Solución Interior","presentacion":"1 Litro","precio":"15.99"},
        {"id":2,"nombre":"Ultra Seco Solución Interior","presentacion":"1 Litro (Atomizador)","precio":"14.99"},
        {"id":3,"nombre":"Ultra Seco Solución Interior","presentacion":"Galón (3.785L)","precio":"43.00"},
        {"id":4,"nombre":"Ultra Seco Solución Interior","presentacion":"Cuñete (18L)","precio":"194.00"},
        {"id":5,"nombre":"Ultra Seco Solución Exterior","presentacion":"1 Litro","precio":"19.50"},
        {"id":6,"nombre":"Ultra Seco Solución Exterior","presentacion":"1 Litro (Atomizador)","precio":"17.99"},
        {"id":7,"nombre":"Ultra Seco Solución Exterior","presentacion":"Galón (3.785L)","precio":"54.00"},
        {"id":8,"nombre":"Ultra Seco Solución Exterior","presentacion":"Cuñete (18L)","precio":"250.00"},
        {"id":9,"nombre":"Fortificador de Superficies","presentacion":"1 Litro","precio":"21.00"},
        {"id":10,"nombre":"Fortificador de Superficies","presentacion":"Galón","precio":"57.00"},
        {"id":11,"nombre":"Fortificador de Superficies","presentacion":"Cuñete","precio":"270.00"},
        {"id":12,"nombre":"Pintura Súper Hidrofóbica","presentacion":"Galón","precio":"37.00"},
        {"id":13,"nombre":"Estuco Súper Hidrofóbico","presentacion":"1/4 Galón","precio":"7.50"},
        {"id":14,"nombre":"Estuco Súper Hidrofóbico","presentacion":"Galón","precio":"22.00"},
        {"id":15,"nombre":"Nano Aditivo para Concreto","presentacion":"500gr","precio":"22.00"},
        {"id":16,"nombre":"Escudo Cerámico","presentacion":"1 Litro","precio":"7.00"},
        {"id":17,"nombre":"Cera Nano Protectora","presentacion":"1 Litro","precio":"13.00"},
        {"id":18,"nombre":"Champú Nano-Concentrado","presentacion":"1 Litro","precio":"15.00"},
        {"id":19,"nombre":"Champú Nano-Concentrado","presentacion":"Galón","precio":"35.00"},
        {"id":20,"nombre":"Eco Capturador (Minería)","presentacion":"1 Litro","precio":"85.00"},
        {"id":21,"nombre":"Eco Capturador (Minería)","presentacion":"Galón","precio":"320.00"},
        {"id":22,"nombre":"Eco Capturador (Minería)","presentacion":"Cuñete","precio":"1500.00"},
        {"id":23,"nombre":"Ultra F3 (Anti-Fuego)","presentacion":"Cuñete (18L)","precio":"450.00"},
        {"id":24,"nombre":"Ultra F3 (Anti-Fuego)","presentacion":"Tambor (200L)","precio":"4800.00"},
        {"id":25,"nombre":"Aditivo Asfáltico","presentacion":"Tambor (200L)","precio":"3500.00"},
        {"id":26,"nombre":"Aditivo Asfáltico","presentacion":"Granel (1000L)","precio":"16000.00"},
        {"id":27,"nombre":"Eco Capturador Magnetron","presentacion":"1 Litro","precio":"95.00"},
        {"id":28,"nombre":"Eco Capturador Magnetron","presentacion":"Galón","precio":"345.00"},
        {"id":29,"nombre":"Eco Capturador Magnetron","presentacion":"Cuñete","precio":"1650.00"}
    ];

    const VERSION = '3.0.0';
    const CACHE_KEY = `ultraseco_prices_v${VERSION}`;
    const CACHE_TTL = 1000 * 60 * 5; // 5 minutos

    async function fetchPrices() {
        console.log(`🚀 PriceSync Engine v${VERSION} - Iniciando...`);
        
        // Limpiar versiones anteriores de caché
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('ultraseco_prices_v') && key !== CACHE_KEY) {
                localStorage.removeItem(key);
                console.log(`🧹 Caché antigua eliminada: ${key}`);
            }
        }

        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
            const { data, timestamp } = JSON.parse(cached);
            if (Date.now() - timestamp < CACHE_TTL) {
                console.log('📦 Usando precios de caché local');
                return data;
            }
        }

        try {
            console.log('📡 Intentando sincronizar con la API...');
            const response = await fetch('/api/products').catch(() => null);
            
            if (response && response.ok) {
                const data = await response.json();
                localStorage.setItem(CACHE_KEY, JSON.stringify({
                    data,
                    timestamp: Date.now()
                }));
                console.log('✅ Precios sincronizados con la API');
                return data;
            }
            throw new Error('API no disponible');
        } catch (error) {
            console.warn('⚠️ No se pudo conectar con la API. Usando snapshot de emergencia.');
            return LOCAL_FALLBACK;
        }
    }

    function syncUI(products) {
        if (!products || !Array.isArray(products)) return;

        const clean = (s) => (s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, " ").trim();

        console.log('🎨 Actualizando interfaz con los siguientes precios:');
        console.table(products.map(p => ({
            Nombre: p.nombre,
            Pres: p.presentacion,
            Precio: `$${p.precio}`
        })));

        // 1. Sincronizar con window.products (catalog.js)
        if (window.products && Array.isArray(window.products)) {
            window.products.forEach(p => {
                const dbProduct = products.find(dbP => 
                    dbP.nombre.toLowerCase().includes(p.name.toLowerCase()) && 
                    (p.presentation ? dbP.presentacion.toLowerCase().includes(p.presentation.toLowerCase()) : true)
                );
                if (dbProduct) {
                    p.price = parseFloat(dbProduct.precio);
                }
            });
            console.log('✅ Catalog.js sincronizado');
        }

        // 2. Sincronizar elementos HTML con data-sync-product
        const elements = document.querySelectorAll('[data-sync-product]');
        elements.forEach(el => {
            const productName = el.getAttribute('data-sync-product');
            
            // Caso 1: El elemento es un SELECT (Menú desplegable)
            if (el.tagName === 'SELECT') {
                const options = el.querySelectorAll('option');
                options.forEach(opt => {
                    const optionText = opt.textContent || opt.innerText;
                    // Buscar coincidencia por presentación en el texto de la opción o valor
                    const product = products.find(p => {
                        const dbName = clean(p.nombre);
                        const targetName = clean(productName);
                        const dbPres = clean(p.presentacion);
                        const targetPres = clean(optionText);
                        const targetValue = clean(opt.value);

                        return dbName.includes(targetName) && 
                               (targetPres.includes(dbPres) || 
                                dbPres.includes(targetPres.split(' ')[0]) ||
                                targetValue.includes(dbPres));
                    });
                    
                    if (product) {
                        const price = parseFloat(product.precio).toFixed(2);
                        opt.setAttribute('data-price', product.precio);
                        // Actualizar el texto de la opción para mostrar el precio nuevo si tiene formato Ref. o $
                        if (optionText.includes('Ref.')) {
                            opt.textContent = `${product.presentacion} - Ref. ${price}`;
                        } else if (optionText.includes('$')) {
                            opt.textContent = `${product.presentacion} - $${price}`;
                        }
                    }
                });
                
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
                        const targetName = clean(productName);
                        const dbPres = clean(p.presentacion);
                        const targetPres = clean(pres);
                        return dbName.includes(targetName) && (!pres || dbPres.includes(targetPres) || targetPres.includes(dbPres));
                    });
                    if (product) {
                        priceEl.innerHTML = `$${parseFloat(product.precio).toFixed(2)}`;
                        priceEl.setAttribute('data-price', product.precio);
                    }
                });
            } 
            // Caso 3: Otros elementos (SPAN, P, etc.)
            else {
                const presentation = el.getAttribute('data-sync-pres');
                const product = products.find(p => {
                    const dbName = clean(p.nombre);
                    const targetName = clean(productName);
                    const dbPres = clean(p.presentacion);
                    const targetPres = clean(presentation);
                    return dbName.includes(targetName) && (!presentation || dbPres.includes(targetPres) || targetPres.includes(dbPres));
                });
                if (product) {
                    let value = product.precio;
                    if (el.innerHTML.includes('Ref.')) {
                        el.innerHTML = `Ref. ${parseFloat(value).toFixed(2)}`;
                    } else {
                        el.innerHTML = `$${parseFloat(value).toFixed(2)}`;
                    }
                    el.setAttribute('data-price', value);
                }
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

})();
