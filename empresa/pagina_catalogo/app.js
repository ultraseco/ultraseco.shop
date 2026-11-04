/**
 * ULTRASECO.SHOP - APLICACIÓN REACT DEL CATÁLOGO COMERCIAL OFICIAL
 * Componentes modulares, estado reactivo de presentaciones y precios.
 * Precompilado a React.createElement para funcionar tanto en servidor como localmente (file://) sin bloqueos CORS.
 */

const { useState, useEffect } = React;
const h = React.createElement;

const BASE_PATH =
  typeof window !== 'undefined' && window.ULTRASECO_BASE_PATH !== undefined
    ? window.ULTRASECO_BASE_PATH
    : typeof window !== 'undefined' &&
      window.location &&
      (window.location.pathname.includes('/pagina_catalogo') ||
        window.location.href.includes('/pagina_catalogo/'))
    ? '../'
    : '';

// --- FORMATO DE PRECIOS ---
function formatPriceNum(num) {
  if (num === null || num === undefined) return null;
  const n = parseFloat(num);
  if (isNaN(n)) return null;
  return (Math.abs(n - Math.round(n)) < 0.005) ? Math.round(n).toString() : n.toFixed(2);
}

// ==========================================================================
// 1. COMPONENTE: Header
// ==========================================================================
function Header({ cartCount }) {
  return h(
    'header',
    { className: 'site-header' },
    h(
      'div',
      { className: 'header-container' },
      // Marca / Logo
      h(
        'div',
        { className: 'header-brand' },
        h(
          'a',
          { href: '#inicio', title: 'Ultraseco.shop - Catálogo Oficial' },
          h('img', {
            src: `${BASE_PATH}images/logo.png`,
            alt: 'Logo Ultraseco',
            className: 'brand-logo',
            onError: (e) => { e.target.src = 'images/logo.png'; }
          })
        )
      ),
      // Navegación Horizontal
      h(
        'nav',
        null,
        h(
          'ul',
          { className: 'header-nav' },
          h(
            'li',
            null,
            h(
              'a',
              { href: '#catalogo', className: 'nav-item-link' },
              h('i', { className: 'fa-solid fa-shapes' }),
              ' Catálogo'
            )
          ),
          h(
            'li',
            null,
            h(
              'a',
              { href: `${BASE_PATH}asesor.html`, className: 'nav-item-link ai-agent-link' },
              h('i', { className: 'fa-solid fa-brain' }),
              ' Agente de IA'
            )
          ),
          h(
            'li',
            null,
            h(
              'a',
              {
                href: 'https://wa.me/584146023797?text=Hola%20Ultraseco!%20Deseo%20información%20sobre%20sus%20productos.',
                target: '_blank',
                rel: 'noopener noreferrer',
                className: 'nav-item-link'
              },
              h('i', { className: 'fa-brands fa-whatsapp', style: { color: 'var(--wa-green)' } }),
              ' Contáctenos'
            )
          )
        )
      ),
      // Carrito de Compras Real
      h(
        'div',
        { style: { display: 'flex', alignItems: 'center', gap: '0.75rem' } },
        h(
          'a',
          {
            href: `${BASE_PATH}carrito.html`,
            className: 'header-cart-btn',
            title: 'Ir a mi carrito de compras'
          },
          h('i', { className: 'fa-solid fa-cart-shopping' }),
          h('span', null, 'Carrito'),
          cartCount > 0 && h('span', { className: 'cart-counter' }, cartCount)
        )
      )
    )
  );
}

// ==========================================================================
// 2. COMPONENTE: Hero
// ==========================================================================
function Hero() {
  const scrollToCatalog = () => {
    const el = document.getElementById('catalogo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return h(
    'section',
    { className: 'hero-section', id: 'inicio' },
    h(
      'div',
      { className: 'hero-banner-container' },
      // Cartel Ultraseco abarcando el horizontal de la sección
      h(
        'div',
        { className: 'hero-logo-banner-wrap' },
        h('img', {
          src: `${BASE_PATH}images/cartel%20ultraseco.png`,
          alt: 'Cartel Ultraseco',
          className: 'hero-logo-banner-img',
          onError: (e) => {
            if (e.target.src.includes('%20')) {
              e.target.src = `${BASE_PATH}images/cartel ultraseco.png`;
            } else {
              e.target.src = `${BASE_PATH}images/logo.png`;
            }
          }
        })
      ),
      // Contenido de texto principal
      h(
        'div',
        { className: 'hero-banner-text-content' },
        h(
          'div',
          { className: 'hero-tag' },
          h('i', { className: 'fa-solid fa-shield-halved' }),
          h('span', null, 'Ciencia de Protección y Blindaje Molecular')
        ),
        h(
          'h1',
          { className: 'hero-headline' },
          'Soluciones Avanzadas contra la ',
          h('span', { className: 'hero-headline-accent' }, 'Humedad y el Fuego')
        ),
        h(
          'p',
          { className: 'hero-subheadline' },
          'Tecnología desarrollada para sellar, consolidar y proteger superficies de concreto, fachadas e instalaciones industriales. Fórmulas de alta durabilidad al detal y al mayor.'
        ),
        h(
          'div',
          { className: 'hero-actions' },
          h(
            'button',
            { className: 'btn-primary-explore', onClick: scrollToCatalog },
            h('span', null, 'Explorar productos'),
            h('i', { className: 'fa-solid fa-arrow-down' })
          ),
          h(
            'a',
            { href: `${BASE_PATH}asesor.html`, className: 'btn-secondary-ai' },
            h('i', { className: 'fa-solid fa-brain' }),
            h('span', null, 'Diagnosticar con IA')
          )
        )
      )
    )
  );
}

// ==========================================================================
// 3. COMPONENTE: ProductPrice
// ==========================================================================
function ProductPrice({ currentOption, taxRate = 0.16 }) {
  if (!currentOption || currentOption.price === null || currentOption.price === undefined) {
    return h(
      'div',
      { className: 'price-block' },
      h(
        'span',
        { className: 'price-pending-badge' },
        (currentOption && currentOption.pendingNote) || 'Cotizar con asesor'
      )
    );
  }

  const basePrice = parseFloat(currentOption.price);
  const basePriceFormatted = formatPriceNum(basePrice);
  const total = basePrice * (1 + (taxRate || 0.16));
  const totalFormatted = formatPriceNum(total);

  return h(
    'div',
    { className: 'price-block' },
    h('div', { className: 'price-ref-text' }, `ref. ${basePriceFormatted} + IVA`),
    h('div', { className: 'price-total-text' }, `Total: Ref. ${totalFormatted}`)
  );
}

// ==========================================================================
// 4. COMPONENTE: PresentationSelector
// ==========================================================================
function PresentationSelector({ presentations, selectedIndex, onChange, productId }) {
  if (!presentations || presentations.length === 0) return null;

  return h(
    'div',
    { className: 'presentation-selector-group' },
    h(
      'label',
      { className: 'presentation-label', htmlFor: `select-${productId}` },
      'Presentación:'
    ),
    h(
      'select',
      {
        id: `select-${productId}`,
        className: 'presentation-select',
        value: selectedIndex,
        onChange: (e) => onChange(Number(e.target.value))
      },
      presentations.map((opt, idx) =>
        h('option', { key: opt.sku || idx, value: idx }, opt.label)
      )
    )
  );
}

// ==========================================================================
// 5. COMPONENTE: PurchaseConfirmationModal
// ==========================================================================
function PurchaseConfirmationModal({ isOpen, onClose, itemData }) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !itemData) return null;

  const basePrice = parseFloat(itemData.precio) || 0;
  const qty = parseInt(itemData.cantidad, 10) || 1;
  const taxRate = itemData.taxRate || 0.16;
  const subtotalBase = basePrice * qty;
  const subtotalTotal = subtotalBase * (1 + taxRate);

  const basePriceFormatted = formatPriceNum(subtotalBase);
  const totalFormatted = formatPriceNum(subtotalTotal);

  return h(
    'div',
    {
      className: 'purchase-modal-backdrop',
      onClick: (e) => { if (e.target === e.currentTarget) onClose(); },
      role: 'dialog',
      'aria-modal': 'true',
      'aria-labelledby': 'purchase-modal-title'
    },
    h(
      'div',
      { className: 'purchase-modal-card' },
      // Botón para cerrar
      h(
        'button',
        {
          type: 'button',
          className: 'purchase-modal-close-btn',
          onClick: onClose,
          'aria-label': 'Cerrar ventana'
        },
        h('i', { className: 'fa-solid fa-xmark' })
      ),
      // Encabezado con Icono de Éxito
      h(
        'div',
        { className: 'purchase-modal-header' },
        h(
          'div',
          { className: 'purchase-modal-icon' },
          h('i', { className: 'fa-solid fa-circle-check' })
        ),
        h(
          'h3',
          { id: 'purchase-modal-title', className: 'purchase-modal-title' },
          '¡Producto agregado al carrito!'
        ),
        h(
          'p',
          { className: 'purchase-modal-subtitle' },
          'Se ha añadido a tu orden de compra satisfactoriamente.'
        )
      ),
      // Resumen del producto añadido
      h(
        'div',
        { className: 'purchase-modal-summary' },
        h(
          'div',
          { className: 'purchase-modal-thumb-wrap' },
          h('img', {
            src: itemData.imagen,
            alt: itemData.nombre,
            className: 'purchase-modal-thumb-img',
            onError: (e) => { e.target.src = `${BASE_PATH}images/logo.png`; }
          })
        ),
        h(
          'div',
          { className: 'purchase-modal-info' },
          h('div', { className: 'purchase-modal-prod-name' }, itemData.nombre),
          h(
            'div',
            { className: 'purchase-modal-prod-meta' },
            'Presentación: ',
            h('strong', null, itemData.presentacion),
            ' • Cantidad: ',
            h('strong', null, `${qty} ${qty > 1 ? 'unidades' : 'unidad'}`)
          ),
          h(
            'div',
            { className: 'purchase-modal-prod-pricing' },
            `Total: Ref. ${totalFormatted} `,
            h('span', null, `(Ref. ${basePriceFormatted} + IVA)`)
          )
        )
      ),
      // Pregunta para el cliente
      h(
        'p',
        { className: 'purchase-modal-prompt' },
        '¿Deseas tramitar tu compra ahora o agregar otro producto?'
      ),
      // Acciones Requeridas: Ir al carrito o Agregar otro producto
      h(
        'div',
        { className: 'purchase-modal-actions' },
        h(
          'a',
          { href: `${BASE_PATH}carrito.html`, className: 'btn-modal-go-cart' },
          h('i', { className: 'fa-solid fa-cart-shopping' }),
          h('span', null, 'Ir al carrito de compras')
        ),
        h(
          'button',
          {
            type: 'button',
            onClick: onClose,
            className: 'btn-modal-keep-shopping'
          },
          h('i', { className: 'fa-solid fa-plus' }),
          h('span', null, 'Agregar otro producto')
        )
      )
    )
  );
}

// ==========================================================================
// 6. COMPONENTE: ProductCard (Composición Abierta, Luminosa, Compra Directa)
// ==========================================================================
function ProductCard({ product, onAddToCart }) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const currentOption = product.presentations[selectedIdx] || product.presentations[0];
  const hasPrice = currentOption && currentOption.price !== null && currentOption.price !== undefined;

  const handleDecrement = () => setQuantity((prev) => Math.max(1, prev - 1));
  const handleIncrement = () => setQuantity((prev) => prev + 1);

  const handleBuy = () => {
    if (!hasPrice) return;
    onAddToCart({
      product,
      currentOption,
      quantity
    });
    setQuantity(1);
  };

  return h(
    'article',
    { className: 'product-item', id: `prod-${product.id}` },
    // Imagen real del envase
    h(
      'div',
      { className: 'product-image-wrap' },
      h('img', {
        src: product.image,
        alt: product.name,
        className: 'product-bottle-img',
        loading: 'lazy',
        onError: (e) => { e.target.src = `${BASE_PATH}images/logo.png`; }
      })
    ),
    // Categoría sutil
    h('div', { className: 'product-category-chip' }, product.category),
    // Nombre Comercial
    h('h3', { className: 'product-name' }, product.name),
    // Selector de Presentación
    h(PresentationSelector, {
      presentations: product.presentations,
      selectedIndex: selectedIdx,
      onChange: setSelectedIdx,
      productId: product.id
    }),
    // Precio e IVA Sincronizados
    h(ProductPrice, {
      currentOption: currentOption,
      taxRate: product.taxRate
    }),
    // Controles de Compra y Botón Comprar
    h(
      'div',
      { className: 'product-actions-group' },
      hasPrice
        ? h(
            'div',
            { className: 'product-qty-row' },
            // Stepper de Cantidad
            h(
              'div',
              { className: 'qty-stepper', 'aria-label': 'Selector de cantidad' },
              h(
                'button',
                {
                  type: 'button',
                  className: 'qty-btn',
                  onClick: handleDecrement,
                  disabled: quantity <= 1,
                  title: 'Disminuir cantidad',
                  'aria-label': 'Disminuir cantidad'
                },
                h('i', { className: 'fa-solid fa-minus' })
              ),
              h('span', { className: 'qty-value' }, quantity),
              h(
                'button',
                {
                  type: 'button',
                  className: 'qty-btn',
                  onClick: handleIncrement,
                  title: 'Aumentar cantidad',
                  'aria-label': 'Aumentar cantidad'
                },
                h('i', { className: 'fa-solid fa-plus' })
              )
            ),
            // Botón Comprar
            h(
              'button',
              {
                type: 'button',
                className: 'btn-buy-solid',
                onClick: handleBuy,
                title: `Comprar ${quantity} unidad(es) de ${product.name}`
              },
              h('i', { className: 'fa-solid fa-cart-shopping' }),
              h('span', null, 'Comprar')
            )
          )
        : h(
            'div',
            { className: 'product-qty-row' },
            h(
              'a',
              {
                href: `https://wa.me/584146023797?text=Hola%20Ultraseco!%20Deseo%20cotizar%20${encodeURIComponent(product.name)}`,
                target: '_blank',
                rel: 'noopener noreferrer',
                className: 'btn-quote-solid',
                title: 'Cotizar directamente con un asesor'
              },
              h('i', { className: 'fa-brands fa-whatsapp' }),
              h('span', null, 'Cotizar')
            )
          ),
      // Botón «Ver detalles»
      h(
        'a',
        {
          href: product.detailUrl,
          className: 'btn-view-details',
          title: `Ver detalles completos de ${product.name}`
        },
        h('span', null, 'Ver detalles'),
        h('i', { className: 'fa-solid fa-arrow-right' })
      )
    )
  );
}

// ==========================================================================
// 7. COMPONENTE: ProductCatalog
// ==========================================================================
function ProductCatalog({ products, onAddToCart }) {
  return h(
    'section',
    { className: 'catalog-section', id: 'catalogo' },
    h(
      'div',
      { className: 'catalog-header' },
      h(
        'div',
        { className: 'catalog-title-group' },
        h('h2', null, 'Catálogo de Soluciones'),
        h('p', null, 'Línea oficial de impermeabilización, recubrimientos y protección industrial.')
      ),
      h(
        'div',
        { className: 'catalog-counter-badge' },
        `${products.length} productos certificados`
      )
    ),
    h(
      'div',
      { className: 'catalog-grid' },
      products.map((product) =>
        h(ProductCard, {
          key: product.id,
          product: product,
          onAddToCart: onAddToCart
        })
      )
    )
  );
}

// ==========================================================================
// 8. COMPONENTE: WhatsAppWidget
// ==========================================================================
function WhatsAppWidget() {
  const waUrl = 'https://wa.me/584146023797?text=Hola%20Ultraseco!%20Me%20interesa%20consultar%20sobre%20sus%20productos.';

  return h(
    'a',
    {
      href: waUrl,
      target: '_blank',
      rel: 'noopener noreferrer',
      className: 'whatsapp-widget-float',
      'aria-label': 'Contactar a Ultraseco por WhatsApp',
      title: 'Atención directa por WhatsApp'
    },
    h('i', { className: 'fa-brands fa-whatsapp' })
  );
}

// ==========================================================================
// 9. COMPONENTE: Footer
// ==========================================================================
function Footer() {
  return h(
    'footer',
    { className: 'site-footer' },
    h(
      'div',
      { className: 'footer-container' },
      h(
        'div',
        { className: 'footer-brand-info' },
        h('img', {
          src: `${BASE_PATH}images/logo.png`,
          alt: 'Ultraseco',
          style: { height: '36px', objectFit: 'contain' },
          onError: (e) => { e.target.src = 'images/logo.png'; }
        }),
        h(
          'p',
          null,
          'Laboratorio venezolano de nanotecnología molecular aplicada a la construcción, la industria y la protección de superficies contra agua y fuego.'
        )
      ),
      h(
        'div',
        { className: 'footer-col' },
        h('h4', null, 'Productos'),
        h(
          'ul',
          null,
          h('li', null, h('a', { href: `${BASE_PATH}estuco.html` }, 'Estuco Súper Hidrofóbico')),
          h('li', null, h('a', { href: `${BASE_PATH}interiores.html` }, 'Solución Interior')),
          h('li', null, h('a', { href: `${BASE_PATH}exteriores.html` }, 'Solución Exterior')),
          h('li', null, h('a', { href: `${BASE_PATH}f3.html` }, 'Soluciones F3 Anti-Fuego'))
        )
      ),
      h(
        'div',
        { className: 'footer-col' },
        h('h4', null, 'Atención Técnica'),
        h(
          'ul',
          null,
          h('li', null, h('a', { href: `${BASE_PATH}asesor.html` }, h('i', { className: 'fa-solid fa-brain mr-1' }), ' Agente de IA')),
          h('li', null, h('a', { href: `${BASE_PATH}carrito.html` }, h('i', { className: 'fa-solid fa-cart-shopping mr-1' }), ' Mi Carrito')),
          h('li', null, h('a', { href: 'https://wa.me/584146023797', target: '_blank', rel: 'noopener noreferrer' }, h('i', { className: 'fa-brands fa-whatsapp mr-1' }), ' Asesoría WhatsApp'))
        )
      ),
      h(
        'div',
        { className: 'footer-col' },
        h('h4', null, 'Empresa'),
        h(
          'ul',
          null,
          h('li', null, h('span', { style: { fontSize: '0.85rem', color: 'var(--text-muted)' } }, 'Zona Industrial, Maracaibo, Zulia')),
          h('li', null, h('span', { style: { fontSize: '0.85rem', color: 'var(--text-muted)' } }, 'RIF: J-504413054')),
          h('li', null, h('a', { href: 'https://instagram.com/ultraseco', target: '_blank', rel: 'noopener noreferrer' }, h('i', { className: 'fa-brands fa-instagram mr-1' }), ' @ultraseco')),
          h('li', null, h('a', { href: `${BASE_PATH}portaladministrativo.html` }, h('i', { className: 'fa-solid fa-lock mr-1' }), ' Portal Interno')),
          h('li', null, h('a', { href: `${BASE_PATH}Formulario/index.html` }, h('i', { className: 'fa-solid fa-clipboard-list mr-1' }), ' Formulario de Postulacion'))
        )
      )
    ),
    h(
      'div',
      { className: 'footer-bottom' },
      h('div', null, '© 2026 Ultraseco.shop - Todos los derechos reservados.'),
      h(
        'div',
        { style: { display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' } },
        h(
          'a',
          { href: `${BASE_PATH}portaladministrativo.html`, style: { color: 'var(--text-muted)', textDecoration: 'none' } },
          h('i', { className: 'fa-solid fa-lock' }),
          ' Portal Interno'
        ),
        h(
          'a',
          { href: `${BASE_PATH}Formulario/index.html`, style: { color: 'var(--text-muted)', textDecoration: 'none' } },
          h('i', { className: 'fa-solid fa-clipboard-list' }),
          ' Formulario de Postulacion'
        )
      )
    )
  );
}

// ==========================================================================
// 10. COMPONENTE PRINCIPAL: App
// ==========================================================================
function App() {
  const [cartCount, setCartCount] = useState(0);
  const [purchaseModal, setPurchaseModal] = useState({ isOpen: false, itemData: null });

  // Sincronizar contador de carrito desde localStorage (miCarritoUltraSeco)
  const syncCartCount = () => {
    try {
      const saved = localStorage.getItem('miCarritoUltraSeco');
      if (saved) {
        const parsed = JSON.parse(saved);
        const count = parsed.reduce((sum, item) => sum + (parseInt(item.cantidad, 10) || 1), 0);
        setCartCount(count);
      } else {
        setCartCount(0);
      }
    } catch (e) {
      console.warn('No se pudo leer miCarritoUltraSeco:', e);
    }
  };

  useEffect(() => {
    syncCartCount();
    window.addEventListener('storage', syncCartCount);
    return () => window.removeEventListener('storage', syncCartCount);
  }, []);

  // Agregar producto al carrito y disparar modal de confirmación
  const handleAddToCart = ({ product, currentOption, quantity }) => {
    try {
      const saved = localStorage.getItem('miCarritoUltraSeco');
      let cart = saved ? JSON.parse(saved) : [];
      if (!Array.isArray(cart)) cart = [];

      const sku = currentOption.sku || `${product.id}-${currentOption.label}`;
      const existingIdx = cart.findIndex(
        (item) => item.id === sku || (item.id === product.id && item.presentacion === currentOption.label)
      );

      const qtyToAdd = parseInt(quantity, 10) || 1;
      const basePrice = parseFloat(currentOption.price) || 0;

      if (existingIdx >= 0) {
        cart[existingIdx].cantidad = (parseInt(cart[existingIdx].cantidad, 10) || 0) + qtyToAdd;
      } else {
        cart.push({
          id: sku,
          nombre: `${product.name} - ${currentOption.label}`,
          precio: basePrice,
          cantidad: qtyToAdd,
          imagen: product.image,
          presentacion: currentOption.label,
          productId: product.id,
          taxRate: product.taxRate || 0.16
        });
      }

      localStorage.setItem('miCarritoUltraSeco', JSON.stringify(cart));
      syncCartCount();

      // Abrir modal con la información del producto añadido
      setPurchaseModal({
        isOpen: true,
        itemData: {
          id: sku,
          nombre: product.name,
          presentacion: currentOption.label,
          precio: basePrice,
          cantidad: qtyToAdd,
          imagen: product.image,
          taxRate: product.taxRate || 0.16
        }
      });
    } catch (err) {
      console.error('Error al agregar al carrito:', err);
    }
  };

  const closePurchaseModal = () => {
    setPurchaseModal({ isOpen: false, itemData: null });
  };

  const products = window.PRODUCTS_CATALOG_DATA || [];

  return h(
    'div',
    { className: 'page-wrapper' },
    h(Header, { cartCount: cartCount }),
    h(Hero, null),
    h(ProductCatalog, { products: products, onAddToCart: handleAddToCart }),
    h(Footer, null),
    h(WhatsAppWidget, null),
    // Modal de Confirmación de Compra
    h(PurchaseConfirmationModal, {
      isOpen: purchaseModal.isOpen,
      onClose: closePurchaseModal,
      itemData: purchaseModal.itemData
    })
  );
}

// Montar aplicación React 18
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(h(App, null));
}
