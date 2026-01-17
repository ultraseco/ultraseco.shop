// Shopping Cart & E-commerce Logic

// Product Database (Placeholders - User to update)
const PRODUCTS_DB = {
    // Division Industria
    'eco-capturador': {
        id: 'eco-capturador',
        name: 'Eco Capturador',
        category: 'industria',
        priceRetail: 0, // PRECIO AQUI (Ej: 150.00)
        unit: 'Litro'
    },
    'ultra-f3': {
        id: 'ultra-f3',
        name: 'Ultra F3',
        category: 'industria',
        priceRetail: 0, // PRECIO AQUI
        unit: 'Litro'
    },
    // Division Construccion
    'estuco': {
        id: 'estuco',
        name: 'Estuco Bloqueador',
        category: 'construccion',
        priceRetail: 0, // PRECIO AQUI
        unit: 'Galón'
    },
    'fortificador': {
        id: 'fortificador',
        name: 'Fortificador',
        category: 'construccion',
        priceRetail: 0, // PRECIO AQUI
        unit: 'Galón'
    },
    'exteriores': {
        id: 'exteriores',
        name: 'Solución Exteriores',
        category: 'construccion',
        priceRetail: 0, // PRECIO AQUI
        unit: 'Galón'
    },
    'interiores': {
        id: 'interiores',
        name: 'Solución Interiores',
        category: 'construccion',
        priceRetail: 0, // PRECIO AQUI
        unit: 'Galón'
    },
    'pintura': {
        id: 'pintura',
        name: 'Pintura Super Hidrofóbica',
        category: 'construccion',
        priceRetail: 0, // PRECIO AQUI
        unit: 'Galón'
    },
    'aditivo': {
        id: 'aditivo',
        name: 'Nano Aditivo',
        category: 'construccion',
        priceRetail: 0, // PRECIO AQUI
        unit: 'Litro'
    },
    // Division Vehicular
    'champu': {
        id: 'champu',
        name: 'Champú Nano-Concentrado',
        category: 'vehicular',
        priceRetail: 0, // PRECIO AQUI
        unit: 'Litro'
    },
    // Division Hogar
    'cera': {
        id: 'cera',
        name: 'Cera Nano Protectora',
        category: 'hogar',
        priceRetail: 0, // PRECIO AQUI
        unit: 'Litro'
    },
    'suavizante': {
        id: 'suavizante',
        name: 'Suavizante Secado Flash',
        category: 'hogar',
        priceRetail: 0, // PRECIO AQUI
        unit: 'Litro'
    },
    'escudo': {
        id: 'escudo',
        name: 'Escudo Cerámico',
        category: 'hogar',
        priceRetail: 0, // PRECIO AQUI
        unit: 'Litro'
    }
};

// Cart State
let cart = JSON.parse(localStorage.getItem('ultra_cart')) || [];
let customerType = 'detal'; // 'detal' or 'mayor'

// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    renderCartIcon();
    injectProductControls();
    setupModals();
    updateToggleUI(); // Init UI
});

function setCustomerType(type) {
    customerType = type;
    updateToggleUI();

    // Re-render all product actions
    const cards = document.querySelectorAll('.feature-card');
    cards.forEach(card => {
        const titleEl = card.querySelector('h3');
        if (!titleEl) return;
        const key = findProductKey(titleEl.innerText);
        const container = card.querySelector('.product-actions');
        if (key && container) {
            renderProductAction(key, container);
        }
    });
}

function updateToggleUI() {
    const btnDetal = document.getElementById('btn-detal');
    const btnMayor = document.getElementById('btn-mayor');

    if (!btnDetal || !btnMayor) return;

    if (customerType === 'detal') {
        btnDetal.style.background = '#2563eb';
        btnDetal.style.color = 'white';

        btnMayor.style.background = 'transparent';
        btnMayor.style.color = 'rgba(255,255,255,0.7)';
    } else {
        btnMayor.style.background = '#2563eb';
        btnMayor.style.color = 'white';

        btnDetal.style.background = 'transparent';
        btnDetal.style.color = 'rgba(255,255,255,0.7)';
    }
}

// --- UI INJECTION ---

function injectProductControls() {
    // Find all product cards or detail pages
    // In index.html, products are in .feature-card
    // We need a way to identify them. The user might need to add IDs or data attributes.
    // For now, let's try to match by title or link.

    const cards = document.querySelectorAll('.feature-card');
    cards.forEach(card => {
        const titleEl = card.querySelector('h3');
        if (!titleEl) return;

        const title = titleEl.innerText;
        const productKey = findProductKey(title);

        if (productKey) {
            const container = document.createElement('div');
            container.className = 'product-actions mt-4';
            container.id = `actions-${productKey}`;
            card.appendChild(container);
            renderProductAction(productKey, container);
        }
    });

    // Also check for product detail pages (single product)
    // Usually they have a specific section or we can inject into a specific ID if it existed.
    // For now, we focus on index.html cards.
}

function findProductKey(title) {
    for (const [key, prod] of Object.entries(PRODUCTS_DB)) {
        if (title.includes(prod.name) || prod.name.includes(title)) return key;
    }
    return null;
}

function renderProductAction(key, container) {

    container.innerHTML = html;
}

// --- CART LOGIC ---

function addToCart(key) {
    const product = PRODUCTS_DB[key];
    const existing = cart.find(item => item.id === key);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
    showToast(`Agregado: ${product.name}`);
}

function removeFromCart(key) {
    cart = cart.filter(item => item.id !== key);
    updateCart();
}

function updateCart() {
    localStorage.setItem('ultra_cart', JSON.stringify(cart));
    renderCartIcon();
    renderCartModal();
}

function renderCartIcon() {
    // Check if icon exists, if not create it
    let iconContainer = document.getElementById('cart-icon-container');
    if (!iconContainer) {
        const nav = document.querySelector('nav ul');
        if (nav) {
            const li = document.createElement('li');
            li.id = 'cart-icon-container';
            li.innerHTML = `
                <button onclick="toggleCart()" class="nav-button relative">
                    <i class="fa-solid fa-cart-shopping"></i>
                    <span id="cart-count" class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center hidden">0</span>
                </button>
            `;
            nav.appendChild(li);
        }
    }

    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById('cart-count');
    if (badge) {
        badge.innerText = count;
        badge.classList.toggle('hidden', count === 0);
    }
}

// --- MODALS ---

function setupModals() {
    // Cart Modal
    if (!document.getElementById('cart-modal')) {
        const modal = document.createElement('div');
        modal.id = 'cart-modal';
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 hidden z-50 flex justify-end';
        modal.innerHTML = `
            <div class="bg-white w-full max-w-md h-full shadow-2xl flex flex-col animate-slide-in-right">
                <div class="p-4 bg-slate-800 text-white flex justify-between items-center">
                    <h2 class="text-xl font-bold">Carrito de Compras</h2>
                    <button onclick="toggleCart()" class="text-white hover:text-gray-300"><i class="fa-solid fa-times"></i></button>
                </div>
                <div id="cart-items" class="flex-1 p-4 overflow-y-auto space-y-4">
                    <!-- Items go here -->
                </div>
                <div class="p-4 border-t border-gray-200 bg-gray-50">
                    <div class="flex justify-between text-lg font-bold mb-4">
                        <span>Total:</span>
                        <span id="cart-total">$0.00</span>
                    </div>
                    <button onclick="proceedToCheckout()" class="w-full bg-green-600 text-white font-bold py-3 rounded hover:bg-green-700 transition">
                        Procesar Compra
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    // Payment Modal
    if (!document.getElementById('payment-modal')) {
        const pModal = document.createElement('div');
        pModal.id = 'payment-modal';
        pModal.className = 'fixed inset-0 bg-black bg-opacity-50 hidden z-50 flex items-center justify-center p-4';
        pModal.innerHTML = `
            <div class="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div class="p-6">
                    <h2 class="text-2xl font-bold mb-4 text-slate-800">Métodos de Pago</h2>
                    <p class="mb-4 text-slate-600">Por favor realice el pago a una de las siguientes cuentas y envíe el comprobante.</p>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div class="border rounded-lg p-2">
                            <h4 class="font-bold text-center mb-2">Pago en Divisas ($)</h4>
                            <img src="../productos/pago en$.jpg" alt="Pago Divisas" class="w-full h-auto object-contain rounded">
                        </div>
                        <div class="border rounded-lg p-2">
                            <h4 class="font-bold text-center mb-2">Pago en Bolívares (Bs)</h4>
                            <img src="../productos/precios y presentaciones/pago bs.jpg" alt="Pago Bolívares" class="w-full h-auto object-contain rounded">
                        </div>
                    </div>
                    
                    <div class="text-center">
                        <a href="https://wa.me/584146023797?text=Hola,%20adjunto%20comprobante%20de%20pago%20por%20compra%20web." target="_blank" class="cta-button inline-block">
                            <i class="fa-brands fa-whatsapp"></i> Enviar Comprobante
                        </a>
                        <button onclick="closePaymentModal()" class="block w-full mt-4 text-gray-500 hover:text-gray-700 text-sm">Cerrar</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(pModal);
    }
}

function toggleCart() {
    const modal = document.getElementById('cart-modal');
    modal.classList.toggle('hidden');
    renderCartModal();
}

function renderCartModal() {
    const container = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');

    if (cart.length === 0) {
        container.innerHTML = '<p class="text-center text-gray-500 mt-10">Tu carrito está vacío.</p>';
        totalEl.innerText = '$0.00';
        return;
    }

    let total = 0;
    container.innerHTML = cart.map(item => {
        const itemTotal = item.priceRetail * item.quantity;
        total += itemTotal;
        return `
            <div class="flex justify-between items-center border-b pb-2">
                <div>
                    <h4 class="font-bold text-slate-800">${item.name}</h4>
                    <p class="text-sm text-gray-500">$${item.priceRetail.toFixed(2)} x ${item.quantity}</p>
                </div>
                <div class="flex items-center gap-2">
                    <span class="font-bold text-blue-600">$${itemTotal.toFixed(2)}</span>
                    <button onclick="removeFromCart('${item.id}')" class="text-red-400 hover:text-red-600">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');

    totalEl.innerText = `$${total.toFixed(2)}`;
}

function proceedToCheckout() {
    toggleCart(); // Close cart
    document.getElementById('payment-modal').classList.remove('hidden');
}

function closePaymentModal() {
    document.getElementById('payment-modal').classList.add('hidden');
}

function openQuoteModal(productName) {
    const msg = `Hola, estoy interesado en solicitar cotización para: ${productName}`;
    window.open(`https://wa.me/584146023797?text=${encodeURIComponent(msg)}`, '_blank');
}

// Toast Notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 right-4 bg-slate-800 text-white px-4 py-2 rounded shadow-lg z-50 animate-fade-in-up';
    toast.innerText = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}
