/**
 * ULTRASECO.SHOP - APLICACIÓN REACT DEL CATÁLOGO COMERCIAL
 * Componentes modulares, estado reactivo de presentaciones y precios.
 * Arquitectura 100% aislada en pagina_catalogo/
 */

const { useState, useEffect } = React;

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
  return (
    <header className="site-header">
      <div className="header-container">
        {/* Marca / Logo */}
        <div className="header-brand">
          <a href="#inicio" title="Ultraseco.shop - Prototipo Catálogo">
            <img 
              src="../images/logo.png" 
              alt="Logo Ultraseco" 
              className="brand-logo" 
              onError={(e) => { e.target.src = 'images/logo.png'; }}
            />
          </a>
        </div>

        {/* Navegación Horizontal */}
        <nav>
          <ul className="header-nav">
            <li>
              <a href="#catalogo" className="nav-item-link">
                <i className="fa-solid fa-shapes"></i> Catálogo
              </a>
            </li>
            <li>
              <a href="../asesor.html" className="nav-item-link ai-agent-link">
                <i className="fa-solid fa-brain"></i> Agente de IA
              </a>
            </li>
            <li>
              <a 
                href="https://wa.me/584146023797?text=Hola%20Ultraseco!%20Deseo%20información%20sobre%20sus%20productos." 
                target="_blank" 
                rel="noopener noreferrer" 
                className="nav-item-link"
              >
                <i className="fa-brands fa-whatsapp" style={{ color: 'var(--wa-green)' }}></i> Contáctenos
              </a>
            </li>
          </ul>
        </nav>

        {/* Carrito de Compras Real */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <a 
            href="../carrito.html" 
            className="header-cart-btn" 
            title="Ir a mi carrito de compras"
          >
            <i className="fa-solid fa-cart-shopping"></i>
            <span>Carrito</span>
            {cartCount > 0 && (
              <span className="cart-counter">{cartCount}</span>
            )}
          </a>
        </div>
      </div>
    </header>
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

  return (
    <section className="hero-section" id="inicio">
      <div className="hero-banner-container">
        {/* Cartel Ultraseco abarcando el horizontal de la sección, con bordes definidos y sin marco tipo tarjeta */}
        <div className="hero-logo-banner-wrap">
          <img 
            src="../images/cartel%20ultraseco.png" 
            alt="Cartel Ultraseco" 
            className="hero-logo-banner-img"
            onError={(e) => { 
              if (e.target.src.includes('%20')) {
                e.target.src = '../images/cartel ultraseco.png';
              } else {
                e.target.src = '../images/logo.png'; 
              }
            }}
          />
        </div>

        {/* Texto que antes estaba a su izquierda, ahora posicionado debajo */}
        <div className="hero-banner-text-content">
          <div className="hero-tag">
            <i className="fa-solid fa-shield-halved"></i>
            <span>Ciencia de Protección y Blindaje Molecular</span>
          </div>

          <h1 className="hero-headline">
            Soluciones Avanzadas contra la <span className="hero-headline-accent">Humedad y el Fuego</span>
          </h1>

          <p className="hero-subheadline">
            Tecnología desarrollada para sellar, consolidar y proteger superficies de concreto, fachadas e instalaciones industriales. Fórmulas de alta durabilidad al detal y al mayor.
          </p>

          <div className="hero-actions">
            <button className="btn-primary-explore" onClick={scrollToCatalog}>
              <span>Explorar productos</span>
              <i className="fa-solid fa-arrow-down"></i>
            </button>

            <a href="../asesor.html" className="btn-secondary-ai">
              <i className="fa-solid fa-brain"></i>
              <span>Diagnosticar con IA</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================================================
// 3. COMPONENTE: ProductPrice
// ==========================================================================
function ProductPrice({ currentOption, taxRate = 0.16 }) {
  if (!currentOption || currentOption.price === null || currentOption.price === undefined) {
    return (
      <div className="price-block">
        <span className="price-pending-badge">
          {currentOption?.pendingNote || 'Cotizar con asesor'}
        </span>
      </div>
    );
  }

  const basePrice = parseFloat(currentOption.price);
  const basePriceFormatted = formatPriceNum(basePrice);
  const total = basePrice * (1 + (taxRate || 0.16));
  const totalFormatted = formatPriceNum(total);

  return (
    <div className="price-block">
      <div className="price-ref-text">
        ref. {basePriceFormatted} + IVA
      </div>
      <div className="price-total-text">
        Total: Ref. {totalFormatted}
      </div>
    </div>
  );
}

// ==========================================================================
// 4. COMPONENTE: PresentationSelector
// ==========================================================================
function PresentationSelector({ presentations, selectedIndex, onChange, productId }) {
  if (!presentations || presentations.length === 0) return null;

  return (
    <div className="presentation-selector-group">
      <label className="presentation-label" htmlFor={`select-${productId}`}>
        Presentación:
      </label>
      <select 
        id={`select-${productId}`}
        className="presentation-select" 
        value={selectedIndex} 
        onChange={(e) => onChange(Number(e.target.value))}
      >
        {presentations.map((opt, idx) => (
          <option key={opt.sku || idx} value={idx}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

// ==========================================================================
// 5. COMPONENTE: PurchaseConfirmationModal
// ==========================================================================
function PurchaseConfirmationModal({ isOpen, onClose, itemData }) {
  if (!isOpen || !itemData) return null;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const basePrice = parseFloat(itemData.precio) || 0;
  const qty = parseInt(itemData.cantidad) || 1;
  const taxRate = itemData.taxRate || 0.16;
  const subtotalBase = basePrice * qty;
  const subtotalTotal = subtotalBase * (1 + taxRate);

  const basePriceFormatted = formatPriceNum(subtotalBase);
  const totalFormatted = formatPriceNum(subtotalTotal);

  return (
    <div 
      className="purchase-modal-backdrop" 
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="purchase-modal-title"
    >
      <div className="purchase-modal-card">
        {/* Botón para cerrar */}
        <button 
          type="button" 
          className="purchase-modal-close-btn" 
          onClick={onClose}
          aria-label="Cerrar ventana"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        {/* Encabezado con Icono de Éxito */}
        <div className="purchase-modal-header">
          <div className="purchase-modal-icon">
            <i className="fa-solid fa-circle-check"></i>
          </div>
          <h3 id="purchase-modal-title" className="purchase-modal-title">
            ¡Producto agregado al carrito!
          </h3>
          <p className="purchase-modal-subtitle">
            Se ha añadido a tu orden de compra satisfactoriamente.
          </p>
        </div>

        {/* Resumen del producto añadido */}
        <div className="purchase-modal-summary">
          <div className="purchase-modal-thumb-wrap">
            <img 
              src={itemData.imagen} 
              alt={itemData.nombre} 
              className="purchase-modal-thumb-img"
              onError={(e) => { e.target.src = '../images/logo.png'; }}
            />
          </div>
          <div className="purchase-modal-info">
            <div className="purchase-modal-prod-name">{itemData.nombre}</div>
            <div className="purchase-modal-prod-meta">
              Presentación: <strong>{itemData.presentacion}</strong> &bull; Cantidad: <strong>{qty} {qty > 1 ? 'unidades' : 'unidad'}</strong>
            </div>
            <div className="purchase-modal-prod-pricing">
              Total: Ref. {totalFormatted} <span>(Ref. {basePriceFormatted} + IVA)</span>
            </div>
          </div>
        </div>

        {/* Pregunta para el cliente */}
        <p className="purchase-modal-prompt">
          ¿Deseas tramitar tu compra ahora o agregar otro producto?
        </p>

        {/* Acciones Requeridas: Ir al carrito o Agregar otro producto */}
        <div className="purchase-modal-actions">
          <a href="../carrito.html" className="btn-modal-go-cart">
            <i className="fa-solid fa-cart-shopping"></i>
            <span>Ir al carrito de compras</span>
          </a>

          <button 
            type="button" 
            onClick={onClose} 
            className="btn-modal-keep-shopping"
          >
            <i className="fa-solid fa-plus"></i>
            <span>Agregar otro producto</span>
          </button>
        </div>
      </div>
    </div>
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

  const handleDecrement = () => setQuantity(prev => Math.max(1, prev - 1));
  const handleIncrement = () => setQuantity(prev => prev + 1);

  const handleBuy = () => {
    if (!hasPrice) return;
    onAddToCart({
      product,
      currentOption,
      quantity
    });
    setQuantity(1); // Restablecer contador a 1 tras agregar
  };

  return (
    <article className="product-item" id={`prod-${product.id}`}>
      {/* Imagen real del envase */}
      <div className="product-image-wrap">
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-bottle-img"
          loading="lazy"
          onError={(e) => { e.target.src = '../images/logo.png'; }}
        />
      </div>

      {/* Categoría sutil */}
      <div className="product-category-chip">{product.category}</div>

      {/* Nombre Comercial */}
      <h3 className="product-name">{product.name}</h3>

      {/* Selector de Presentación */}
      <PresentationSelector 
        presentations={product.presentations} 
        selectedIndex={selectedIdx} 
        onChange={setSelectedIdx}
        productId={product.id}
      />

      {/* Precio e IVA Sincronizados (Fuente balanceada) */}
      <ProductPrice 
        currentOption={currentOption} 
        taxRate={product.taxRate} 
      />

      {/* Controles de Compra y Botón Comprar Azul Medianamente Oscuro */}
      <div className="product-actions-group">
        {hasPrice ? (
          <div className="product-qty-row">
            {/* Stepper de Cantidad */}
            <div className="qty-stepper" aria-label="Selector de cantidad">
              <button 
                type="button" 
                className="qty-btn" 
                onClick={handleDecrement}
                disabled={quantity <= 1}
                title="Disminuir cantidad"
                aria-label="Disminuir cantidad"
              >
                <i className="fa-solid fa-minus"></i>
              </button>
              <span className="qty-value">{quantity}</span>
              <button 
                type="button" 
                className="qty-btn" 
                onClick={handleIncrement}
                title="Aumentar cantidad"
                aria-label="Aumentar cantidad"
              >
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>

            {/* Botón Comprar: Azul Sólido Medianamente Oscuro con Ícono de Carrito */}
            <button 
              type="button" 
              className="btn-buy-solid" 
              onClick={handleBuy}
              title={`Comprar ${quantity} unidad(es) de ${product.name}`}
            >
              <i className="fa-solid fa-cart-shopping"></i>
              <span>Comprar</span>
            </button>
          </div>
        ) : (
          <div className="product-qty-row">
            <a 
              href={`https://wa.me/584146023797?text=Hola%20Ultraseco!%20Deseo%20cotizar%20${encodeURIComponent(product.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-quote-solid"
              title="Cotizar directamente con un asesor"
            >
              <i className="fa-brands fa-whatsapp"></i>
              <span>Cotizar</span>
            </a>
          </div>
        )}

        {/* Botón Exacto Complementario: «Ver detalles» */}
        <a 
          href={product.detailUrl} 
          className="btn-view-details"
          title={`Ver detalles completos de ${product.name}`}
        >
          <span>Ver detalles</span>
          <i className="fa-solid fa-arrow-right"></i>
        </a>
      </div>
    </article>
  );
}

// ==========================================================================
// 7. COMPONENTE: ProductCatalog
// ==========================================================================
function ProductCatalog({ products, onAddToCart }) {
  return (
    <section className="catalog-section" id="catalogo">
      <div className="catalog-header">
        <div className="catalog-title-group">
          <h2>Catálogo de Soluciones</h2>
          <p>Línea oficial de impermeabilización, recubrimientos y protección industrial.</p>
        </div>
        <div className="catalog-counter-badge">
          {products.length} productos certificados
        </div>
      </div>

      <div className="catalog-grid">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  );
}

// ==========================================================================
// 8. COMPONENTE: WhatsAppWidget
// ==========================================================================
function WhatsAppWidget() {
  const waUrl = "https://wa.me/584146023797?text=Hola%20Ultraseco!%20Me%20interesa%20consultar%20sobre%20sus%20productos.";

  return (
    <a 
      href={waUrl} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="whatsapp-widget-float" 
      aria-label="Contactar a Ultraseco por WhatsApp"
      title="Atención directa por WhatsApp"
    >
      <i className="fa-brands fa-whatsapp"></i>
    </a>
  );
}

// ==========================================================================
// 9. COMPONENTE: Footer
// ==========================================================================
function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-brand-info">
          <img 
            src="../images/logo.png" 
            alt="Ultraseco" 
            style={{ height: '36px', objectFit: 'contain' }} 
            onError={(e) => { e.target.src = 'images/logo.png'; }}
          />
          <p>
            Laboratorio venezolano de nanotecnología molecular aplicada a la construcción, la industria y la protección de superficies contra agua y fuego.
          </p>
        </div>

        <div className="footer-col">
          <h4>Productos</h4>
          <ul>
            <li><a href="../estuco.html">Estuco Súper Hidrofóbico</a></li>
            <li><a href="../interiores.html">Solución Interior</a></li>
            <li><a href="../exteriores.html">Solución Exterior</a></li>
            <li><a href="../f3.html">Soluciones F3 Anti-Fuego</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Atención Técnica</h4>
          <ul>
            <li><a href="../asesor.html"><i className="fa-solid fa-brain mr-1"></i> Agente de IA</a></li>
            <li><a href="../carrito.html"><i className="fa-solid fa-cart-shopping mr-1"></i> Mi Carrito</a></li>
            <li><a href="https://wa.me/584146023797" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-whatsapp mr-1"></i> Asesoría WhatsApp</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Empresa</h4>
          <ul>
            <li><span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Zona Industrial, Maracaibo, Zulia</span></li>
            <li><span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>RIF: J-504413054</span></li>
            <li><a href="https://instagram.com/ultraseco" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-instagram mr-1"></i> @ultraseco</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div>&copy; 2026 Ultraseco.shop - Todos los derechos reservados.</div>
        <div>Prototipo de Catálogo en Evaluación Independiente.</div>
      </div>
    </footer>
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
        const count = parsed.reduce((sum, item) => sum + (parseInt(item.cantidad) || 1), 0);
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
      const existingIdx = cart.findIndex(item => item.id === sku || (item.id === product.id && item.presentacion === currentOption.label));

      const qtyToAdd = parseInt(quantity, 10) || 1;
      const basePrice = parseFloat(currentOption.price) || 0;

      if (existingIdx >= 0) {
        cart[existingIdx].cantidad = (parseInt(cart[existingIdx].cantidad, 10) || 0) + qtyToAdd;
      } else {
        cart.push({
          id: sku,
          nombre: product.name,
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

  return (
    <div className="page-wrapper">
      {/* Banner de Prototipo Independiente */}
      <div className="prototype-notice-bar">
        <span><strong>Prototipo Comercial:</strong> Entorno de evaluación aislado en <code>pagina_catalogo/</code>. La tienda principal continúa intacta.</span>
      </div>

      <Header cartCount={cartCount} />
      <Hero />
      <ProductCatalog products={products} onAddToCart={handleAddToCart} />
      <Footer />
      <WhatsAppWidget />

      {/* Modal de Confirmación de Compra */}
      <PurchaseConfirmationModal 
        isOpen={purchaseModal.isOpen} 
        onClose={closePurchaseModal} 
        itemData={purchaseModal.itemData} 
      />
    </div>
  );
}

// Montar aplicación React 18
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}
