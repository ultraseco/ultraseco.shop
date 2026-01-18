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

                        // NUEVO: Cerrar y limpiar el carrito inmediatamente
                        console.log('🧹 Cerrando carrito y programando limpieza...');

                        // Cerrar el carrito visualmente de inmediato
                        setTimeout(function () {
                            const cartToggle = document.querySelector('[data-element="toggle"]');
                            if (cartToggle) {
                                cartToggle.click(); // Cierra el carrito
                                console.log('✅ Carrito cerrado');
                            }

                            // Limpiar después de 3 segundos (cuando ya está en Shopify)
                            setTimeout(function () {
                                clearShopifyCart(ui);
                            }, 3000);
                        }, 500);
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
 * Actualiza el badge del carrito en el header
 * @param {Object} ui - El objeto ShopifyBuy.UI con el modelo del carrito
 */
function updateHeaderCartBadge(ui) {
    const badge = document.getElementById('cart-badge');
    if (!badge) {
        console.warn('⚠️ Badge element not found');
        return;
    }

    let itemCount = 0;

    try {
        // Método 1: Usar el modelo del carrito de Shopify SDK
        if (ui && ui.components && ui.components.cart && ui.components.cart[0]) {
            const cartModel = ui.components.cart[0].model;

            // El modelo tiene una propiedad lineItemCount que tiene el conteo total
            if (cartModel && typeof cartModel.lineItemCount !== 'undefined') {
                itemCount = cartModel.lineItemCount;
                console.log('✅ Cart count from SDK model:', itemCount);
            }
            // Fallback: contar manualmente los lineItems
            else if (cartModel && cartModel.lineItems && Array.isArray(cartModel.lineItems)) {
                itemCount = cartModel.lineItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
                console.log('✅ Cart count from lineItems:', itemCount);
            }
        }
    } catch (e) {
        console.warn('⚠️ Error accessing Shopify cart model:', e.message);
    }

    // Actualizar el badge del header
    if (itemCount > 0) {
        badge.textContent = itemCount;
        badge.style.display = 'block';
        console.log('🔢 Badge del header mostrado:', itemCount);
    } else {
        badge.textContent = '0';
        badge.style.display = 'none';
        console.log('🔢 Badge del header ocultado (count = 0)');
    }
}

/**
 * Crea el carrito flotante de Shopify
 */
function createShopifyCart(ui) {
    // El carrito se crea automáticamente con los productos
    console.log('✅ Carrito de Shopify listo');

    // Guardar referencia global para el overlay personalizado
    globalUI = ui;

    // Monitorear cambios en el carrito y actualizar el badge del header
    setTimeout(function () {
        // Observar cambios en el toggle de Shopify
        const shopifyToggle = document.querySelector('[data-element="toggle"]');
        if (shopifyToggle) {
            // Observer para detectar cambios en el contador
            const observer = new MutationObserver(function () {
                updateHeaderCartBadge(ui);
            });

            observer.observe(shopifyToggle, {
                childList: true,
                subtree: true,
                characterData: true
            });

            // Actualización inicial
            updateHeaderCartBadge(ui);

            console.log('👀 Observer del badge del header configurado');
        }

        // También actualizar periódicamente por si acaso
        setInterval(function () { updateHeaderCartBadge(ui); }, 1000);
    }, 2000);

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

        // Actualizar el badge del header
        setTimeout(function () {
            updateHeaderCartBadge(ui);
        }, 500);

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
        // Buscar cualquier clave que contenga:
        // - 'shopify' (case insensitive)
        // - El dominio de Shopify (cx0msw-x8.myshopify.com)
        // - 'checkout'
        // - 'cart'
        const lowerKey = key.toLowerCase();
        if (lowerKey.includes('shopify') ||
            key.includes('cx0msw-x8.myshopify.com') ||
            lowerKey.includes('checkout') ||
            (lowerKey.includes('cart') && !key.includes('ultraSecoCart'))) {
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

/**
 * Renderiza el overlay del carrito con los productos actuales
 */
function renderCartOverlay(ui) {
    let overlay = document.getElementById('cart-overlay');

    // Crear el overlay si no existe
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'cart-overlay';
        overlay.className = 'cart-overlay';
        overlay.innerHTML = `
            <div class="cart-sidebar">
                <div class="cart-header">
                    <h2><i class="fas fa-shopping-cart"></i> Carrito</h2>
                    <button class="cart-close" onclick="window.ShopifyUltraSeco.closeCart()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="cart-content" id="cart-content">
                    <div class="cart-loading">
                        <i class="fas fa-spinner"></i>
                        <p>Cargando carrito...</p>
                    </div>
                </div>
                <div class="cart-footer" id="cart-footer" style="display: none;">
                    <div class="cart-subtotal">
                        <span class="cart-subtotal-label">Total:</span>
                        <span class="cart-subtotal-amount" id="cart-total">$0.00</span>
                    </div>
                    <button class="cart-checkout-btn" id="cart-checkout-btn">
                        <i class="fas fa-lock"></i>
                        Finalizar Compra en Shopify
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);

        // Cerrar al hacer clic en el backdrop
        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) {
                window.ShopifyUltraSeco.closeCart();
            }
        });
    }

    // Mostrar el overlay
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Obtener datos del carrito
    const content = document.getElementById('cart-content');
    const footer = document.getElementById('cart-footer');

    try {
        if (ui && ui.components && ui.components.cart && ui.components.cart[0]) {
            const cartModel = ui.components.cart[0].model;

            if (cartModel && cartModel.lineItems && cartModel.lineItems.length > 0) {
                // Renderizar items
                let itemsHTML = '<div class="cart-items">';
                let total = 0;

                cartModel.lineItems.forEach(function (item) {
                    const variant = item.variant;
                    const product = variant.product || {};

                    // Debug: Log complete item structure
                    console.log('📦 Cart Item Debug:', {
                        item: item,
                        variant: variant,
                        product: product,
                        variantImage: variant.image,
                        productImages: product.images
                    });

                    // Obtener imagen - intentar múltiples fuentes
                    let image = '';

                    // Método 1: variant.image.src
                    if (variant.image && variant.image.src) {
                        image = variant.image.src;
                        console.log('✅ Imagen desde variant.image.src:', image);
                    }
                    // Método 2: variant.imageVariant
                    else if (variant.imageVariant && variant.imageVariant.src) {
                        image = variant.imageVariant.src;
                        console.log('✅ Imagen desde variant.imageVariant.src:', image);
                    }
                    // Método 3: product.images array
                    else if (product.images && product.images.length > 0 && product.images[0].src) {
                        image = product.images[0].src;
                        console.log('✅ Imagen desde product.images[0].src:', image);
                    }
                    // Método 4: attrs.image (Shopify SDK legacy)
                    else if (variant.attrs && variant.attrs.image && variant.attrs.image.src) {
                        image = variant.attrs.image.src;
                        console.log('✅ Imagen desde variant.attrs.image.src:', image);
                    }
                    // Método 5: Buscar en toda la estructura del item
                    else if (item.image && item.image.src) {
                        image = item.image.src;
                        console.log('✅ Imagen desde item.image.src:', image);
                    }

                    if (!image) {
                        console.warn('❌ No se pudo encontrar imagen para:', item.title || 'Unknown product');
                    }

                    // Obtener título del producto
                    const productTitle = product.title || item.title || 'Producto';
                    const variantTitle = variant.title !== 'Default Title' ? variant.title : '';

                    const quantity = item.quantity;
                    const unitPrice = parseFloat(variant.price.amount || variant.price || 0);
                    const lineTotal = (unitPrice * quantity);
                    total += lineTotal;

                    // Determinar ícono y color según категория del producto
                    let placeholderIcon = 'fa-box';
                    let placeholderColor = '#2563eb';

                    const titleLower = productTitle.toLowerCase();
                    if (titleLower.includes('estuco') || titleLower.includes('fortificador') || titleLower.includes('solucion') || titleLower.includes('pintura') || titleLower.includes('nano aditivo')) {
                        placeholderIcon = 'fa-hard-hat';
                        placeholderColor = '#f59e0b'; // Naranja construcción
                    } else if (titleLower.includes('champu') || titleLower.includes('cera')) {
                        placeholderIcon = 'fa-car';
                        placeholderColor = '#3b82f6'; // Azul vehicular
                    } else if (titleLower.includes('escudo')) {
                        placeholderIcon = 'fa-home';
                        placeholderColor = '#10b981'; // Verde hogar
                    }

                    itemsHTML += `
                        <div class="cart-item">
                            <div class="cart-item-image">
                                ${image ?
                            `<img src="${image}" alt="${productTitle}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                                     <div style="display: none; background: linear-gradient(135deg, ${placeholderColor}22, ${placeholderColor}44); height: 100%; align-items: center; justify-content: center; border-radius: 8px;">
                                         <i class="fas ${placeholderIcon}" style="color: ${placeholderColor}; font-size: 28px;"></i>
                                     </div>`
                            :
                            `<div style="background: linear-gradient(135deg, ${placeholderColor}22, ${placeholderColor}44); height: 100%; display: flex; align-items: center; justify-content: center; border-radius: 8px;">
                                         <i class="fas ${placeholderIcon}" style="color: ${placeholderColor}; font-size: 28px;"></i>
                                     </div>`}
                            </div>
                            <div class="cart-item-details">
                                <h3 class="cart-item-title">${productTitle}</h3>
                                ${variantTitle ? `<p class="cart-item-variant">${variantTitle}</p>` : ''}
                                <div class="cart-item-footer">
                                    <div class="cart-item-quantity">
                                        <button onclick="window.ShopifyUltraSeco.updateQuantity('${item.id}', ${quantity - 1})">
                                            <i class="fas fa-minus"></i>
                                        </button>
                                        <span>${quantity}</span>
                                        <button onclick="window.ShopifyUltraSeco.updateQuantity('${item.id}', ${quantity + 1})">
                                            <i class="fas fa-plus"></i>
                                        </button>
                                    </div>
                                    <span class="cart-item-price">$${lineTotal.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    `;
                });

                itemsHTML += '</div>';
                content.innerHTML = itemsHTML;

                // Mostrar footer con total
                document.getElementById('cart-total').textContent = '$' + total.toFixed(2);
                footer.style.display = 'block';

                // Configurar botón de checkout
                const checkoutBtn = document.getElementById('cart-checkout-btn');
                checkoutBtn.onclick = function () {
                    // Obtener URL de checkout del modelo
                    const checkoutUrl = cartModel.checkoutUrl || cartModel.webUrl;
                    if (checkoutUrl) {
                        window.open(checkoutUrl, '_blank');
                        window.ShopifyUltraSeco.closeCart();
                    } else {
                        console.error('No checkout URL available');
                        alert('Error: No se pudo obtener el enlace de checkout');
                    }
                };

            } else {
                // Carrito vacío
                content.innerHTML = `
                    <div class="cart-empty">
                        <i class="fas fa-shopping-cart"></i>
                        <h3>Carrito Vacío</h3>
                        <p>No hay productos en tu carrito</p>
                    </div>
                `;
                footer.style.display = 'none';
            }
        } else {
            content.innerHTML = `
                <div class="cart-empty">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h3>Error</h3>
                    <p>No se pudo cargar el carrito</p>
                </div>
            `;
            footer.style.display = 'none';
        }
    } catch (error) {
        console.error('Error renderizando carrito:', error);
        content.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Error</h3>
                <p>Hubo un problema al cargar el carrito</p>
                <p style="font-size: 0.8em; opacity: 0.6; margin-top: 0.5rem;">${error.message}</p>
            </div>
        `;
        footer.style.display = 'none';
    }
}

/**
 * Guarda referencia global del UI para uso posterior
 */
let globalUI = null;

/**
 * Actualiza la cantidad de un item en el carrito
 */
function updateCartItemQuantity(lineItemId, newQuantity) {
    if (!globalUI || !globalUI.components || !globalUI.components.cart || !globalUI.components.cart[0]) {
        console.error('UI no disponible');
        return;
    }

    if (newQuantity < 1) {
        // Remover item
        globalUI.components.cart[0].updateProperties(lineItemId, { quantity: 0 });
    } else {
        // Actualizar cantidad
        globalUI.components.cart[0].updateProperties(lineItemId, { quantity: newQuantity });
    }

    // Re-renderizar después de un breve delay
    setTimeout(function () {
        renderCartOverlay(globalUI);
        updateHeaderCartBadge(globalUI);
    }, 300);
}

// Exportar funciones para uso global
window.ShopifyUltraSeco = {
    PRODUCT_IDS: PRODUCT_IDS,
    init: initShopifyBuyButton,

    /**
     * Abre el overlay del carrito personalizado
     */
    openCart: function () {
        console.log('🛒 Abriendo carrito personalizado');
        if (globalUI) {
            renderCartOverlay(globalUI);
        } else {
            console.warn('⚠️ UI de Shopify aún no está lista');
            alert('Por favor espera un momento mientras carga el carrito');
        }
    },

    /**
     * Cierra el overlay del carrito
     */
    closeCart: function () {
        const overlay = document.getElementById('cart-overlay');
        if (overlay) {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    },

    /**
     * Actualiza la cantidad de un producto
     */
    updateQuantity: function (lineItemId, newQuantity) {
        updateCartItemQuantity(lineItemId, newQuantity);
    }
};

console.log('📦 Shopify Integration Script Loaded');
