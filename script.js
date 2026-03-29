// Define showPage globally so it's available immediately
window.showPage = function (pageId, activeButton) {
    const pages = document.querySelectorAll('.page-content');
    const navButtons = document.querySelectorAll('.nav-button');

    // Hide all pages
    pages.forEach(page => {
        page.classList.add('hidden');
    });

    // Show target page
    const targetPage = document.getElementById(`page-${pageId}`);
    if (targetPage) {
        targetPage.classList.remove('hidden');
        // Scroll to top of the page
        window.scrollTo(0, 0);
    }

    // Update nav buttons
    navButtons.forEach(btn => btn.classList.remove('active'));

    if (activeButton) {
        activeButton.classList.add('active');
    } else {
        // Try to find the button if not passed
        const btn = document.querySelector(`.nav-button[data-page="${pageId}"]`);
        if (btn) btn.classList.add('active');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Navigation Logic
    const navButtons = document.querySelectorAll('.nav-button');

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const pageId = button.getAttribute('data-page');
            if (pageId) {
                showPage(pageId, button);
            }
        });
    });

    // Handle hash navigation (e.g. #productos)
    function handleHash() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            showPage(hash);
        }
    }

    window.addEventListener('hashchange', handleHash);
    handleHash(); // Check on load

    // Division Navigation Logic (Products Page)
    const divisionButtons = document.querySelectorAll('.division-nav-button');
    const divisionContents = document.querySelectorAll('.division-content');

    divisionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const divisionId = button.getAttribute('data-division');

            // Update buttons
            divisionButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Show content
            divisionContents.forEach(content => {
                content.classList.add('hidden');
                if (content.id === `division-${divisionId}`) {
                    content.classList.remove('hidden');
                }
            });
        });
    });

    // ==========================================
    // AI ADVISOR LOGIC
    // ==========================================

    // ==========================================
    // AI VISION ADVISOR LOGIC (GEMINI 2.5)
    // ==========================================

    const visionSystemPrompt = `
Actúa como el Ingeniero Forense de Estructuras de Ultra Seco (Especialista en Patologías del Concreto).
Tu misión es analizar la imagen subida por el cliente y detectar patologías de humedad.

ANALIZA LA IMAGEN BUSCANDO ESTOS SIGNOS:
1. "Eflorescencia/Salitre" (Polvo blanco, cristales): Indica humedad ascendente o filtración interna. -> Solución: Estuco Bloqueador + Solución.
2. "Bio-film/Moho" (Manchas negras/verdes): Indica condensación o falta de ventilación. -> Solución: Limpieza profunda + Solución Interior (Nano-blindaje).
3. "Falla de Adhesión" (Pintura descascarada/burbujas): Indica presión de vapor interna. -> Solución: Raspar + Fortificador + Estuco.
4. "Fisuras/Grietas": Daño físico. -> Solución: Fortificador (como puente de adherencia) + Mortero.

FORMATO DE RESPUESTA (Solo devuelve esto, corto y directo, usa Markdown):
"🔍 **Diagnóstico Detectado:** [Nombre Técnico del Problema]
⚠️ **Nivel de Riesgo:** [Bajo/Medio/Crítico]
🧪 **Solución Ultra Seco:**
1. [Paso 1]
2. [Producto Recomendado]
💡 **Tip Experto:** [Un consejo breve sobre aplicación]"

Si la imagen NO es de una pared, techo o piso, responde: "⚠️ Error de Escaneo: Por favor sube una foto clara de la superficie afectada (Pared, Techo o Piso)."
`;

    // File Upload Preview & Logic
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const previewContainer = document.getElementById('preview-container');

    if (dropZone) {
        dropZone.addEventListener('click', () => fileInput.click());

        fileInput.addEventListener('change', (e) => {
            const files = Array.from(e.target.files);
            if (files.length > 0) {
                previewContainer.innerHTML = '';
                previewContainer.style.display = 'grid';

                files.forEach(file => {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const img = document.createElement('img');
                        img.src = e.target.result;
                        img.style.width = '100%';
                        img.style.height = '150px';
                        img.style.objectFit = 'cover';
                        img.style.borderRadius = '8px';
                        img.style.border = '1px solid var(--glass-border)';
                        previewContainer.appendChild(img);
                    };
                    reader.readAsDataURL(file);
                });
            }
        });
    }

    /* ==========================================
       LOGICA DE ASESOR INTERNO DESHABILITADA
       ==========================================

    async function analyzeImageWithGemini(file) {
        ...
    }

    function renderDiagnosis(markdownText) {
        ...
    }

    window.asesor = {
        ...
    };
    */

    // Sticky Header Scroll Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});

// Mobile menu logic moved to mobile-menu.js
