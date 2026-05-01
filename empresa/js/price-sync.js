/**
 * Ultra Seco - Price Synchronization Engine (Universal v2)
 * This script synchronizes product prices across all pages using data/products.json as the source.
 * It also synchronizes with catalog.js if present.
 */

(function() {
    console.log('🔄 Ultra Seco: Iniciando motor de sincronización universal...');

    const DATA_SOURCE = '../data/products.json';
    const CACHE_KEY = 'ultraseco_prices';
    const CACHE_TTL = 1000 * 60 * 30; // 30 minutos

    async function fetchPrices() {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
            const { data, timestamp } = JSON.parse(cached);
            if (Date.now() - timestamp < CACHE_TTL) {
                return data;
            }
        }

        try {
            // Intentar varios paths posibles, priorizando la API en vivo
            const paths = ['/api/products', DATA_SOURCE, 'data/products.json', '../empresa/data/products.json'];
            let products = null;

            for (const path of paths) {
                try {
                    const response = await fetch(path);
                    if (response.ok) {
                        products = await response.json();
                        break;
                    }
                } catch (e) {}
            }

            if (!products) throw new Error('No se pudo encontrar el archivo de productos.');
            
            localStorage.setItem(CACHE_KEY, JSON.stringify({
                data: products,
                timestamp: Date.now()
            }));

            return products;
        } catch (error) {
            console.error('❌ Error al sincronizar precios:', error);
            return cached ? JSON.parse(cached).data : null;
        }
    }

    function syncPriceData(products) {
        if (!products) return;

        // 1. Sincronizar con window.products (catalog.js)
        if (window.products && Array.isArray(window.products)) {
            console.log('📦 Sincronizando con el catálogo dinámico...');
            window.products.forEach(localProduct => {
                // Buscamos coincidencia en el JSON (por nombre o id si existiera)
                const remoteData = products.filter(p => 
                    p.nombre.toLowerCase().includes(localProduct.id.replace(/-/g, ' ')) ||
                    localProduct.name.toLowerCase().includes(p.nombre.toLowerCase())
                );

                if (remoteData.length > 0) {
                    // Actualizamos las opciones (Galón, Cuñete, etc.)
                    localProduct.options.forEach(opt => {
                        const match = remoteData.find(r => 
                            r.presentacion.toLowerCase().includes(opt.label.toLowerCase()) ||
                            opt.label.toLowerCase().includes(r.presentacion.toLowerCase())
                        );
                        if (match) {
                            opt.price = parseFloat(match.precio);
                        }
                    });
                }
            });
            // Disparar evento para que el carrito se entere si es necesario
            document.dispatchEvent(new CustomEvent('prices-updated'));
        }

        // 2. Sincronizar elementos del DOM (Static)
        const elements = document.querySelectorAll('[data-sync-product]');
        elements.forEach(el => {
            const productName = el.getAttribute('data-sync-product');
            const presentation = el.getAttribute('data-sync-pres');
            const priceType = el.getAttribute('data-sync-type') || 'precio';

            const product = products.find(p => 
                p.nombre.toLowerCase().includes(productName.toLowerCase()) && 
                (!presentation || p.presentacion.toLowerCase().includes(presentation.toLowerCase()))
            );

            if (product) {
                let value = product[priceType] || product.precio;
                if (value) {
                    const formatted = `Ref. ${parseFloat(value).toFixed(2)}`;
                    
                    if (el.innerHTML !== formatted) {
                        el.style.transition = 'all 0.5s ease';
                        el.style.opacity = '0.5';
                        setTimeout(() => {
                            el.innerHTML = formatted;
                            el.style.opacity = '1';
                        }, 500);
                    }
                }
            }
        });
    }

    // Ejecutar inmediatamente y en cada carga
    fetchPrices().then(syncPriceData);
    
    // Dejar disponible globalmente
    window.updateSystemPrices = () => fetchPrices().then(syncPriceData);

})();
