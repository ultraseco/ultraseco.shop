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

// ==========================================
// LOGICA DE CARRITO PERSONALIZADO (CARRITO MANUAL)
// ==========================================
window.agregarAlCarritoManual = function(botonHTML) {
    // 0. Prevenir acciones por defecto por si el botón está dentro de un <form> (no debería, pero por si acaso)
    if (window.event) { window.event.preventDefault(); }

    // 1. Encontrar el contenedor "padre" del producto desde donde se hizo clic
    const contenedor = botonHTML.closest('.producto-contenedor') || botonHTML.closest('div[id^="prod"]'); // Un fallback si cambia la clase
    
    // Si no encuentra el contenedor, mostramos error (y tal vez falten clases)
    if (!contenedor) {
        console.error("No se encontró el contenedor del producto. Asegúrate de tener la clase '.producto-contenedor' o un ID válido.");
        return;
    }

    // 2. Capturar los valores del producto
    // Buscar <select> para nombre de la variante y forzar ID único si falta
    const selectElem = contenedor.querySelector('select');
    let varianteSeleccionada = "";
    if (selectElem && selectElem.options[selectElem.selectedIndex]) {
        varianteSeleccionada = selectElem.options[selectElem.selectedIndex].text.split('-')[0].trim();
    }
    
    // Obtener un ID único. Si es 'sin-id', lo basamos en la URL y la variante seleccionada para que no se sobreescriban
    let idProducto = contenedor.id;
    if (!idProducto || idProducto === 'sin-id') {
        const urlBase = window.location.pathname.split('/').pop().replace('.html', '');
        idProducto = `prod-${urlBase}-${varianteSeleccionada.replace(/\s+/g, '-').toLowerCase()}`;
    }

    const nombreElem = contenedor.querySelector('.producto-nombre') || contenedor.querySelector('h2');
    const h1Elem = document.querySelector('h1');
    
    // Preferir el <h1> de la página si el nombre encontrado es muy genérico
    let nombreBase = nombreElem ? nombreElem.textContent.trim() : (h1Elem ? h1Elem.textContent.replace(/\n/g, ' ').trim() : document.title);
    if (nombreBase === 'Opciones de Compra' && h1Elem) {
        nombreBase = h1Elem.textContent.replace(/\n/g, ' ').trim();
    }

    const nombre = varianteSeleccionada ? `${nombreBase} - ${varianteSeleccionada}` : nombreBase;

    const precioElem = contenedor.querySelector('.producto-precio') || contenedor.querySelector('[id^="price"]');
    const cantidadElem = contenedor.querySelector('.producto-cantidad') || contenedor.querySelector('input[type="number"]');

    const precioTexto = precioElem ? precioElem.textContent : '0';
    const cantidad = cantidadElem ? parseInt(cantidadElem.value) || 1 : 1;
    
    // Limpiar el texto del precio (quitar el "$" y cualquier espacio) y convertir a número
    const precioNumerico = parseFloat(precioTexto.replace('$', '').trim());
    
    // 3. Crear el objeto JSON con la información
    const productoJSON = {
        id: idProducto,
        nombre: nombre,
        precio: isNaN(precioNumerico) ? 0 : precioNumerico,
        cantidad: cantidad
    };
    
    // 4. Lógica del localStorage
    let carrito = [];
    const carritoGuardado = localStorage.getItem('miCarritoUltraSeco');
    
    if (carritoGuardado) {
        try {
            carrito = JSON.parse(carritoGuardado);
        } catch (e) {
            console.error("Error leyendo el carrito guardado", e);
        }
    }
    
    // Verificamos si este producto ya está en el carrito
    const indiceProducto = carrito.findIndex(item => item.id === idProducto);
    
    if (indiceProducto !== -1) {
        carrito[indiceProducto].cantidad += cantidad;
    } else {
        carrito.push(productoJSON);
    }
    
    localStorage.setItem('miCarritoUltraSeco', JSON.stringify(carrito));
    
    // 5. Actualizar la interfaz visual (el contador)
    actualizarContadorCarrito();
    
    console.log(`¡${cantidad}x ${nombre} agregado al carrito con éxito! JSON actual:`, carrito);
    
    // 6. Redirigir a carrito.html como solicitó el usuario
    window.location.href = 'carrito.html';
};

window.actualizarContadorCarrito = function() {
    const carritoGuardado = localStorage.getItem('miCarritoUltraSeco');
    let totalArticulos = 0;
    
    if (carritoGuardado) {
        try {
            const carrito = JSON.parse(carritoGuardado);
            totalArticulos = carrito.reduce((total, producto) => total + producto.cantidad, 0);
        } catch (e) {
            console.error("Error al sumar artículos", e);
        }
    }
    
    // El badge del carrito actual parece usar el id "cart-badge"
    const contador = document.getElementById('cart-badge');
    if (contador) {
        contador.innerText = totalArticulos;
        contador.style.display = totalArticulos > 0 ? 'inline-block' : 'none';
        
        // Agregar pequeña animación
        contador.style.transform = 'scale(1.2)';
        setTimeout(() => {
            contador.style.transform = 'scale(1)';
        }, 150);
    }
};

// Ejecutar la actualización del contador al cargar la página por primera vez
document.addEventListener('DOMContentLoaded', window.actualizarContadorCarrito);
