// Configuración Global de Ultra Seco
const ULTRA_SECO_CONFIG = {
    GEMINI_API_KEY: "AIzaSyDktH9b3TqQGCHIECiFuEajraCvOXpdRZY",
    CANDIDATE_MODELS: [
        "gemini-2.0-flash",
        "gemini-1.5-flash",
        "gemini-2.0-flash-lite-preview-02-05",
        "gemini-2.0-flash-lite",
        "gemini-1.5-pro",
        "gemini-1.5-flash-lite"
    ],

    // Función centralizada para llamar a Gemini con reintentos
    async callGemini(payload) {
        const apiKey = this.GEMINI_API_KEY;
        let lastError = "";
        const apiVersions = ['v1', 'v1beta']; // v1 suele ser más estable para llaves nuevas

        for (const model of this.CANDIDATE_MODELS) {
            for (const version of apiVersions) {
                try {
                    console.log(`Intentando: ${model} (${version})...`);
                    const url = `https://generativelanguage.googleapis.com/${version}/models/${model}:generateContent?key=${apiKey}`;
                    const response = await fetch(url, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                    });

                    if (response.ok) {
                        return await response.json();
                    } else {
                        const errorData = await response.json();
                        const msg = errorData.error?.message || response.statusText;

                        if (msg.includes("API key was reported as leaked")) {
                            throw new Error("API_KEY_LEAKED");
                        }

                        lastError = `${model}(${version}): ${msg}`;
                        console.warn(`Fallo ${lastError}`);
                    }
                } catch (err) {
                    if (err.message === "API_KEY_LEAKED") throw err;
                    lastError = `${model}(${version}): ${err.message}`;
                    console.error(`Error: ${lastError}`);
                }
            }
        }
        throw new Error(`Error Crítico: Ningún modelo funcionó (Último: ${lastError}). Verifique su clave en 'debug_api.html'.`);
    }
};

// Exportar para que sea accesible globalmente
window.ULTRA_SECO_CONFIG = ULTRA_SECO_CONFIG;
