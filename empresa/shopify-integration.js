/**
 * Ultra Seco - Shopify Buy Button Integration
 * www.ultraseco.shop
 * 
 * Este archivo maneja la integración de Shopify Buy Buttons
 * Reemplaza los botones actuales con botones de compra de Shopify
 */

// =====================================
// CONFIGURACIÓN SHOPIFY - ULTRA SECO
// Actualizado automáticamente
// =====================================

// Configuración de Shopify
const SHOPIFY_CONFIG = {
    domain: 'cx0msw-x8.myshopify.com',
    storefrontAccessToken: '773b77ea4ed296a33ce95c09413cc67e'
};

// Mapeo de productos locales a IDs reales de Shopify
const PRODUCT_IDS = {
    // División Construcción
    'estuco': {
        shopifyId: '8837692686474',
        handle: 'estuco-bloqueador',
        title: 'Estuco Bloqueador Ultra Seco'
    },
    'fortificador': {
        shopifyId: '8837692719242',
        handle: 'fortificador',
        title: 'Fortificador de Superficies Ultra Seco'
    },
    'solucion-exterior': {
        shopifyId: '8837692752010',
        handle: 'solucion-exteriores',
        title: 'Solución Exteriores Ultra Seco'
    },
    'solucion-interior': {
        shopifyId: '8837692784778',
        handle: 'solucion-interiores',
        title: 'Solución Interiores Ultra Seco'
    },
    'pintura-hidrofobica': {
        shopifyId: '8837692817546',
        handle: 'pintura-hidrofobica',
        title: 'Pintura Super Hidrofóbica Ultra Seco'
    },
    'nano-aditivo': {
        shopifyId: '8837692850314',
        handle: 'nano-aditivo',
        title: 'Nano Aditivo Ultra Seco'
    },

    // División Vehicular
    'champu': {
        shopifyId: '8837692883082',
        handle: 'champu-nano',
        title: 'Champú Nano-Concentrado Ultra Seco'
    },

    // División Hogar
    'cera-protectora': {
        shopifyId: '8837692915850',
        handle: 'cera-nano',
        title: 'Cera Nano Protectora Ultra Seco'
    },
    'escudo-ceramico': {
        shopifyId: '8837692948618',
        handle: 'escudo-ceramico',
        title: 'Escudo Cerámico Ultra Seco'
    }
};

/**
 * Inicializa Shopify Buy Button SDK
 */
function initShopifyBuyButton() {
    if (typeof ShopifyBuy === 'undefined') {
        console.warn('Shopify Buy Button SDK aún no está cargado. Reintentando...');
        setTimeout(initShopifyBuyButton, 500);
        return;
    }

    console.log('✅ Shopify SDK cargado correctamente');

    const client = ShopifyBuy.buildClient({
        domain: SHOPIFY_CONFIG.domain,
        storefrontAccessToken: SHOPIFY_CONFIG.storefrontAccessToken
    });

    ShopifyBuy.UI.onReady(client).then(function (ui) {
        console.log('✅ Shopify Buy Button UI inicializado');

        // Crear Buy Buttons para cada producto
        Object.keys(PRODUCT_IDS).forEach(function (productKey) {
            const productConfig = PRODUCT_IDS[productKey];
            const containerId = 'shopify-' + productKey;
            const container = document.getElementById(containerId);

            if (container) {
                console.log('🛍️ Creando Buy Button para:', productConfig.title);
                createShopifyBuyButton(productKey, containerId, ui);
            }
        });

        // Crear carrito flotante
        createShopifyCart(ui);
    }).catch(function (error) {
        console.error('❌ Error al inicializar Shopify UI:', error);
    });
}

/**
 * Crea un botón de compra de Shopify para un producto específico
 */
function createShopifyBuyButton(productKey, containerId, ui) {
    const productConfig = PRODUCT_IDS[productKey];

    if (!productConfig) {
        console.error(`Producto ${productKey} no encontrado en configuración`);
        return;
    }

    ui.createComponent('product', {
        id: productConfig.shopifyId,
        node: document.getElementById(containerId),
        moneyFormat: '${{amount}}',
        options: {
            product: {
                styles: {
                    product: {
                        "@media (min-width: 601px)": {
                            "max-width": "100%",
                            "margin-left": "0",
                            "margin-bottom": "0"
                        },
                        "text-align": "left"
                    },
                    button: {
                        "font-family": "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                        "font-size": "14px",
                        "padding-top": "14px",
                        "padding-bottom": "14px",
                        "font-weight": "600",
                        "background": "linear-gradient(45deg, #2563eb, #4f46e5)",
                        "border-radius": "8px",
                        "box-shadow": "0 4px 15px rgba(37, 99, 235, 0.4)",
                        ":hover": {
                            "background": "linear-gradient(45deg, #1d4ed8, #3730a3)",
                            "box-shadow": "0 6px 20px rgba(37, 99, 235, 0.5)"
                        },
                        ":focus": {
                            "background": "linear-gradient(45deg, #1d4ed8, #3730a3)"
                        }
                    },
                    title: {
                        "display": "none"
                    },
                    price: {
                        "font-size": "16px",
                        "font-weight": "bold",
                        "color": "#2563eb"
                    },
                    compareAt: {
                        "font-size": "13px",
                        "color": "#64748b"
                    },
                    description: {
                        "display": "none"
                    }
                },
                text: {
                    button: "🛒 Comprar Ahora"
                },
                contents: {
                    img: false,
                    title: false,
                    price: true,
                    description: false,
                    button: true,
                    buttonWithQuantity: false,
                    quantity: false
                },
                width: "100%"
            },
            cart: {
                text: {
                    title: "Carrito de Compras - Ultra Seco",
                    total: "Total",
                    empty: "Tu carrito está vacío",
                    button: "Finalizar Compra en Shopify",
                    noteDescription: "Instrucciones especiales"
                },
                styles: {
                    button: {
                        "font-family": "Inter, sans-serif",
                        "background": "linear-gradient(45deg, #2563eb, #4f46e5)",
                        "border-radius": "8px",
                        ":hover": {
                            "background": "linear-gradient(45deg, #1d4ed8, #3730a3)"
                        }
                    },
                    cart: {
                        "background-color": "#ffffff"
                    },
                    footer: {
                        "background-color": "#ffffff"
                    }
                },
                popup: true,
                events: {
                    openCheckout: function () {
                        // Marcar cuando el usuario hace clic en "Finalizar Compra"
                        console.log('🛒 Usuario inició checkout');
                        localStorage.setItem('shopify_checkout_started', Date.now().toString());
                    }
                }
            },
            toggle: {
                styles: {
                    toggle: {
                        "background": "linear-gradient(45deg, #2563eb, #4f46e5)",
                        ":hover": {
                            "background": "linear-gradient(45deg, #1d4ed8, #3730a3)"
                        }
                    },
                    count: {
                        "font-size": "14px"
                    }
                }
            },
            modalProduct: {
                contents: {
                    img: true,
                    imgWithCarousel: true,
                    button: true,
                    buttonWithQuantity: true,
                    title: true,
                    price: true,
                    description: true
                },
                styles: {
                    product: {
                        "@media (min-width: 601px)": {
                            "max-width": "100%",
                            "margin-left": "0px",
                            "margin-bottom": "0px"
                        }
                    },
                    button: {
                        "font-family": "Inter, sans-serif",
                        "font-size": "16px",
                        "padding-top": "16px",
                        "padding-bottom": "16px",
                        "background": "linear-gradient(45deg, #2563eb, #4f46e5)",
                        "border-radius": "8px",
                        ":hover": {
                            "background": "linear-gradient(45deg, #1d4ed8, #3730a3)"
                        }
                    }
                },
                text: {
                    button: "Agregar al Carrito"
                }
            }
        }
    });
}

/**
 * Crea el carrito flotante de Shopify
 */
function createShopifyCart(ui) {
    // El carrito se crea automáticamente con los productos
    console.log('✅ Carrito de Shopify listo');

    // Detectar cuando el usuario va al checkout
    // Shopify SDK abre el checkout en una nueva ventana/tab
    // Cuando el usuario regresa, verificamos si completó la compra
    detectCheckoutCompletion(ui);
}

/**
 * Detecta cuando el usuario completa o abandona el checkout
 * y limpia el carrito si es necesario
 */
function detectCheckoutCompletion(ui) {
    // Método 1: Observer para detectar clics en el botón de checkout
    setTimeout(function () {
        const observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                mutation.addedNodes.forEach(function (node) {
                    if (node.nodeType === 1) {
                        // Buscar el botón de checkout
                        const checkoutButton = node.querySelector ? node.querySelector('[data-element="checkout.button"]') : null;
                        if (checkoutButton) {
                            checkoutButton.addEventListener('click', function () {
                                console.log('🛒 Checkout iniciado (DOM listener)');
                                localStorage.setItem('shopify_checkout_started', Date.now().toString());
                            });
                        }
                    }
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }, 2000);

    // Método 2: Guardar timestamp cuando el usuario hace clic en checkout
    window.addEventListener('beforeunload', function () {
        if (document.querySelector('[data-element="checkout"]')) {
            localStorage.setItem('shopify_checkout_started', Date.now().toString());
        }
    });

    // Cuando el usuario regresa a la página (después de estar en checkout)
    window.addEventListener('focus', function () {
        const checkoutStarted = localStorage.getItem('shopify_checkout_started');

        if (checkoutStarted) {
            // Si han pasado más de 2 segundos desde que fue al checkout
            const timeSinceCheckout = Date.now() - parseInt(checkoutStarted);

            if (timeSinceCheckout > 2000) {
                console.log('🔄 Usuario regresó desde checkout. Limpiando carrito...');

                // Limpiar el localStorage de Shopify
                localStorage.removeItem('shopify_checkout_started');

                // Vaciar el carrito automáticamente
                setTimeout(function () {
                    clearShopifyCart(ui);
                }, 1000);
            }
        }
    });

    // Detectar cuando el usuario navega desde otra pestaña
    document.addEventListener('visibilitychange', function () {
        if (!document.hidden) {
            const checkoutStarted = localStorage.getItem('shopify_checkout_started');

            if (checkoutStarted) {
                const timeSinceCheckout = Date.now() - parseInt(checkoutStarted);

                if (timeSinceCheckout > 2000) {
                    console.log('🔄 Usuario regresó desde otra pestaña. Limpiando carrito...');
                    localStorage.removeItem('shopify_checkout_started');

                    setTimeout(function () {
                        clearShopifyCart(ui);
                    }, 1000);
                }
            }
        }
    });
}

/**
 * Limpia el carrito de Shopify
 */
function clearShopifyCart(ui) {
    console.log('🧹 Iniciando limpieza del carrito...');

    try {
        // Verificar si el objeto UI está disponible
        if (!ui) {
            console.warn('⚠️ Objeto UI no disponible, limpiando manualmente...');
            clearCartManually();
            return;
        }

        // Intentar limpiar usando el modelo del carrito
        if (ui.model && Array.isArray(ui.model.cart)) {
            console.log('Limpiando modelo del carrito...');
            ui.model.cart.length = 0; // Vaciar el array sin perder la referencia
        }

        // Forzar actualización de la UI si está disponible
        if (ui.components && ui.components.cart && ui.components.cart[0]) {
            console.log('Actualizando componente del carrito...');

            // Intentar actualizar el modelo del cart component
            if (ui.components.cart[0].model && ui.components.cart[0].model.lineItems) {
                ui.components.cart[0].model.lineItems = [];
            }

            // Actualizar la vista
            if (typeof ui.components.cart[0].updateCart === 'function') {
                ui.components.cart[0].updateCart();
            }

            console.log('✅ Carrito limpiado exitosamente');
        }

        // Limpiar localStorage relacionado con Shopify
        clearCartManually();

    } catch (error) {
        console.error('❌ Error al limpiar carrito:', error);
        console.error('Stack:', error.stack);
        // Intentar limpieza manual como fallback
        clearCartManually();
    }
}

/**
 * Limpia el carrito manualmente eliminando datos de localStorage y recargando
 */
function clearCartManually() {
    console.log('🔧 Limpieza manual del carrito...');

    // Limpiar todos los datos relacionados con Shopify del localStorage
    const localStorageKeys = Object.keys(localStorage);
    let clearedKeys = 0;

    localStorageKeys.forEach(function (key) {
        if (key.startsWith('shopify-buy-ui') ||
            key.includes('Shopify') ||
            key === 'shopify_checkout_started' ||
            key === 'ultraSecoCart') {
            localStorage.removeItem(key);
            clearedKeys++;
            console.log('🗑️ Eliminado:', key);
        }
    });

    console.log(`✅ ${clearedKeys} claves eliminadas del localStorage`);

    // Recargar la página para asegurar que el carrito se vacíe completamente
    setTimeout(function () {
        console.log('🔄 Recargando página...');
        location.reload();
    }, 500);
}

// Inicializar cuando el DOM y el SDK estén listos
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
        // Esperar un poco para asegurar que el SDK de Shopify se cargó
        setTimeout(initShopifyBuyButton, 1000);
    });
} else {
    setTimeout(initShopifyBuyButton, 1000);
}

// Exportar funciones para uso global
window.ShopifyUltraSeco = {
    PRODUCT_IDS: PRODUCT_IDS,
    init: initShopifyBuyButton
};

console.log('📦 Shopify Integration Script Loaded');
