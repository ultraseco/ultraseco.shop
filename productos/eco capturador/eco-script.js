// Mobile Menu Toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// ROI Calculator Logic
const roiInputs = {
    toneladas: document.getElementById('roi-toneladas'),
    ley: document.getElementById('roi-ley'),
    precio: document.getElementById('roi-precio')
};

const roiResults = {
    current: document.getElementById('res-current'),
    eco: document.getElementById('res-eco'),
    extra: document.getElementById('res-extra')
};

const calculateROI = () => {
    const toneladas = parseFloat(roiInputs.toneladas.value) || 0;
    const ley = parseFloat(roiInputs.ley.value) || 0;
    const precio = parseFloat(roiInputs.precio.value) || 0;

    const currentRecovery = toneladas * ley * 0.50;
    const ecoRecovery = currentRecovery * 1.40;
    const extraGold = ecoRecovery - currentRecovery;
    const extraMoney = extraGold * precio;

    roiResults.current.textContent = currentRecovery.toFixed(2) + ' gr';
    roiResults.eco.textContent = ecoRecovery.toFixed(2) + ' gr';
    roiResults.extra.textContent = '+ $' + extraMoney.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + ' USD';
};

// Add event listeners to inputs for real-time calculation
Object.values(roiInputs).forEach(input => {
    input.addEventListener('input', calculateROI);
});

// Initial calculation
calculateROI();

// Button animation (mock AI analysis)
document.getElementById('btn-calculate').addEventListener('click', () => {
    const btn = document.getElementById('btn-calculate');
    const originalText = btn.innerHTML;

    btn.innerHTML = '<i data-lucide="loader-2" class="animate-spin"></i> Analizando...';
    lucide.createIcons();

    setTimeout(() => {
        btn.innerHTML = originalText;
        lucide.createIcons();
        calculateROI();
        alert('Cálculo actualizado con parámetros optimizados.');
    }, 1500);
});
