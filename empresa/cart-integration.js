function formatPriceNum(num) {
    const n = parseFloat(num);
    if (isNaN(n)) return num;
    return (Math.abs(n - Math.round(n)) < 0.005) ? Math.round(n).toString() : n.toFixed(2);
}

function formatPriceWithIVA(price) {
    const p = parseFloat(price);
    if (isNaN(p)) return price;
    const total = p * 1.16;
    return `Ref. ${formatPriceNum(p)} + IVA=${formatPriceNum(total)}`;
}

function updatePrice(productId) {
    const select = document.getElementById(`opt-${productId}`);
    const priceDisplay = document.getElementById(`price-${productId}`);
    const qtyInput = document.getElementById(`qty-${productId}`);

    if (select && priceDisplay) {
        const selectedOption = select.options[select.selectedIndex];
        const price = parseFloat(selectedOption.getAttribute('data-price'));
        const quantity = qtyInput ? (parseInt(qtyInput.value) || 1) : 1;
        priceDisplay.textContent = formatPriceWithIVA(price * quantity);
    }
}

function addToCartStatic(productId) {
    // Find product in global products array (from catalog.js)
    const product = products.find(p => p.id === productId);

    if (!product) {
        console.error('Product not found:', productId);
        return;
    }

    const select = document.getElementById(`opt-${productId}`);
    const qtyInput = document.getElementById(`qty-${productId}`);

    if (select && qtyInput) {
        const selectedIndex = select.selectedIndex;
        const quantity = parseInt(qtyInput.value) || 1;

        // Get the option object from the product data
        const option = product.options[selectedIndex];

        if (option) {
            addToCart(product, option, quantity);
        } else {
            console.error('Option not found');
        }
    }
}

// Initialize prices on load
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize prices for all selects that exist
    const selects = document.querySelectorAll('select[id^="opt-"]');
    selects.forEach(select => {
        const productId = select.id.replace('opt-', ''); // e.g. "estuco"

        // Find product in dynamic catalog
        const product = products.find(p => p.id === productId);

        if (product) {
            // Update the options in the select with the LATEST prices
            // This overwrites the hardcoded HTML prices
            Array.from(select.options).forEach((opt, index) => {
                if (product.options[index]) {
                    const currentPrice = product.options[index].price;
                    opt.setAttribute('data-price', currentPrice.toFixed(2));
                    // Optional: Update text if it contains price (e.g. "Galón - Ref. 19.00")
                    // We use regex to replace the price part
                    const text = opt.text;
                    const newText = text.replace(/\$\d+\.?\d*/, `Ref. ${currentPrice.toFixed(2)}`);
                    opt.text = newText;
                }
            });
        }

        // Trigger update to set initial price display
        updatePrice(productId);
    });

    // 2. Also update any static price displays that might not be linked to a select
    // (e.g. if there's just a <span>Ref. 19.00</span>)
});
