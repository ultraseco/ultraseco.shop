const formData = new FormData();
formData.append("access_key", "90cf94ad-7965-4028-9c93-35a264600232");
formData.append("cliente_nombre", "Test User");
formData.append("cliente_email", "test@example.com");
formData.append("cliente_id", "V-12345678");
formData.append("cliente_telefono", "04141234567");
formData.append("metodo_pago", "efectivo");
formData.append("subject", "Prueba desde script");

fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body: formData
})
.then(res => res.json())
.then(data => console.log("Web3Forms Response:", data))
.catch(err => console.error("Error:", err));
