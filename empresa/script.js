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

    async function analyzeImageWithGemini(file) {
        // 1. Mostrar estado de "Escaneando..." en la UI
        const resultSection = document.getElementById('result-content');
        const step1Section = document.getElementById('asesor-step-1');
        const resultDesc = document.getElementById('diagnosis-desc');
        const titleDiv = document.getElementById('diagnosis-title');
        const productsDiv = document.getElementById('recommended-products');
        const stepsList = document.getElementById('protocol-steps');

        // Switch View
        step1Section.classList.add('hidden');
        resultSection.classList.remove('hidden');

        // Add Scanning Effect
        document.querySelector('.hero-content')?.classList.add('scanning-effect');

        titleDiv.innerText = "🔄 Escaneando Superficie...";
        resultDesc.innerHTML = '<div style="text-align: center;"><i class="fa-solid fa-satellite-dish fa-spin" style="font-size: 2rem; color: var(--primary-color);"></i><br><br><span class="animate-pulse">Analizando patología estructural a nivel de píxel...</span></div>';

        // Hide previous results
        if (productsDiv) productsDiv.innerHTML = '';
        if (stepsList) stepsList.innerHTML = '';

        // 2. Convertir imagen a Base64
        const base64Image = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result.split(',')[1]); // Quitar el header data:image...
            reader.readAsDataURL(file);
        });

        // 3. Preparar el Payload para Gemini 2.5 Flash
        const payload = {
            contents: [{
                parts: [
                    { text: visionSystemPrompt },
                    { inline_data: { mime_type: file.type, data: base64Image } }
                ]
            }]
        };

        // 4. Llamar a la API
        const API_KEY = "AIzaSyC5X0qazPsUbwqo0jfDDSMhV7V-Y9ZIICo";
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errText = await response.text();
                throw new Error(`Google API Error: ${errText}`);
            }

            const data = await response.json();
            const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "No se pudo generar un diagnóstico. Intente nuevamente.";

            // 5. Renderizar el Diagnóstico del Experto
            renderDiagnosis(aiResponse);

        } catch (error) {
            console.error("Error de visión:", error);
            titleDiv.innerText = "❌ Error de Conexión";
            resultDesc.innerText = `No pudimos conectar con el laboratorio central. Error: ${error.message}`;
            document.querySelector('.hero-content')?.classList.remove('scanning-effect');
        }
    }

    function renderDiagnosis(markdownText) {
        const titleDiv = document.getElementById('diagnosis-title');
        const resultDesc = document.getElementById('diagnosis-desc');
        const stepsContainer = document.querySelector('.glass-panel ul#protocol-steps')?.parentElement;

        document.querySelector('.hero-content')?.classList.remove('scanning-effect');

        titleDiv.innerText = "✅ Análisis Completado";

        // Simple Markdown Parsing
        let formattedText = markdownText
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
            .replace(/\n\n/g, '<br><br>')
            .replace(/\n/g, '<br>');

        resultDesc.innerHTML = `<div style="text-align: left; background: rgba(255,255,255,0.6); padding: 1.5rem; border-radius: 12px; border-left: 4px solid var(--primary-color);">${formattedText}</div>`;

        // Hide the rigid "steps" list since the AI response contains everything
        if (stepsContainer) stepsContainer.style.display = 'none';
    }

    window.asesor = {
        // Main function called by UI buttons
        nextStep: function (problemType) {
            // Check if file is uploaded first
            const fileInput = document.getElementById('file-input');

            if (fileInput && fileInput.files.length > 0) {
                // Priority: Analyze Image
                analyzeImageWithGemini(fileInput.files[0]);
            } else if (problemType && problemType !== 'custom') {
                // Fallback: Legacy Text/Button Logic (if you want to keep manual selection working)
                // For now, let's redirect manual clicks to a "text analysis" or just prompt for photo
                alert("💡 Tip Ultra Seco: Para un diagnóstico más preciso, por favor sube una foto de tu problema.");
                document.getElementById('drop-zone').click();
            } else {
                // Clicked "Analizar con IA" without photo
                alert("⚠️ Por favor sube una foto o selecciona una categoría.");
            }
        },

        reset: function () {
            document.getElementById('result-content').classList.add('hidden');
            document.getElementById('asesor-step-1').classList.remove('hidden');

            // Show the static steps container again for next time
            const stepsContainer = document.querySelector('.glass-panel ul#protocol-steps')?.parentElement;
            if (stepsContainer) stepsContainer.style.display = 'block';

            // Reset inputs
            const fileInput = document.getElementById('file-input');
            if (fileInput) fileInput.value = '';
            const descInput = document.getElementById('problem-desc');
            if (descInput) descInput.value = '';
            const previewContainer = document.getElementById('preview-container');
            if (previewContainer) {
                previewContainer.innerHTML = '';
                previewContainer.style.display = 'none';
            }
        }
    };

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

// Mobile Menu Toggle Function
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const icon = menuToggle.querySelector('i');
    
    navLinks.classList.toggle('active');
    
    // Change icon
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
}

// Close mobile menu when clicking on a nav item
document.addEventListener('DOMContentLoaded', () => {
    const navButtons = document.querySelectorAll('.nav-links button, .nav-links a');
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Close mobile menu
            const navLinks = document.querySelector('.nav-links');
            const menuToggle = document.querySelector('.mobile-menu-toggle');
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
});
