const WORKER_URL = "https://asesor-ultraseco.ultraseco-vzla.workers.dev";
const AVATAR_URL = "images/ultraseco_asesor.jpg";

async function enviarMensaje() {
    const input = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");
    const mensaje = input.value.trim();

    if (!mensaje) return;

    // 1. Mostrar mensaje del usuario
    chatBox.innerHTML += `
        <div class="msg-row user-row">
            <div class="msg user"><b>Tú:</b> ${escapeHtml(mensaje)}</div>
        </div>
    `;
    input.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;

    // 2. Mostrar estado de carga con avatar del asesor
    const tempId = "loading-" + Date.now();
    chatBox.innerHTML += `
        <div class="msg-row ai-row" id="${tempId}">
            <img src="${AVATAR_URL}" alt="Asesor Ultra Seco" class="msg-avatar shrink-0">
            <div class="msg ai"><i class="fa-solid fa-circle-notch fa-spin text-cyan-600 mr-2"></i><b>Asesor:</b> Escribiendo...</div>
        </div>
    `;
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        const response = await fetch(WORKER_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: mensaje })
        });

        if (!response.ok) throw new Error("Error en el Worker");

        const data = await response.json();
        
        // 3. Reemplazar "Escribiendo..." con la respuesta real
        const elementoFilaAI = document.getElementById(tempId);
        if (elementoFilaAI) {
            const replyText = data.reply ? data.reply : "No recibí una respuesta clara. Por favor intenta de nuevo.";
            elementoFilaAI.innerHTML = `
                <img src="${AVATAR_URL}" alt="Asesor Ultra Seco" class="msg-avatar shrink-0">
                <div class="msg ai"><b>Asesor:</b> ${formatearRespuesta(replyText)}</div>
            `;
        }

    } catch (error) {
        console.error(error);
        const elementoFilaAI = document.getElementById(tempId);
        if (elementoFilaAI) {
            elementoFilaAI.innerHTML = `
                <img src="${AVATAR_URL}" alt="Asesor Ultra Seco" class="msg-avatar shrink-0">
                <div class="msg ai text-red-600"><b>Asesor:</b> Error de conexión. Por favor intenta de nuevo o comunícate con nosotros por WhatsApp.</div>
            `;
        }
    }
    chatBox.scrollTop = chatBox.scrollHeight;
}

function formatearRespuesta(texto) {
    // Convierte saltos de línea y negritas en markdown simple
    let res = escapeHtml(texto);
    res = res.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    res = res.replace(/\n/g, '<br>');
    return res;
}

function escapeHtml(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function revisarEnter(event) {
    if (event.key === "Enter") enviarMensaje();
}
