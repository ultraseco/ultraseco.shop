/**
 * Cloudflare Worker — Formulario Ultra Seco → Neon DB
 * VERSIÓN DEFINITIVA Y VALIDADA
 */
const ALLOWED_ORIGINS = ['https://ultraseco.github.io', 'https://ultraseco.shop', 'https://www.ultraseco.shop', 'http://ultraseco.shop', 'http://www.ultraseco.shop', 'http://localhost:3000', 'http://127.0.0.1:5500', 'http://localhost:8080', 'http://127.0.0.1:8080', 'http://localhost:5500'];

const HOST = "ep-little-sound-acmvj9id-pooler.sa-east-1.aws.neon.tech";
const PASS = "npg_fdsCKZE0T2oI"; // API Auth de Neon
const CONN_STR = `postgresql://neondb_owner:${PASS}@${HOST}/neondb?sslmode=require&channel_binding=require`;

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const isAllowed = ALLOWED_ORIGINS.includes(origin);
    
    const cors = {
      'Access-Control-Allow-Origin': isAllowed || origin === 'null' || !origin ? origin || '*' : ALLOWED_ORIGINS[0],
      'Access-Control-Allow-Methods': 'POST, OPTIONS, GET',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    
    // Solo bloqueamos si hay un origin explícito que no está en la lista (y no es local)
    if (origin && origin !== 'null' && !isAllowed && !origin.includes('localhost') && !origin.includes('127.0.0.1')) {
        return new Response(JSON.stringify({ success: false, error: 'Origin not allowed' }), { status: 403, headers: { 'Content-Type': 'application/json' } });
    }
    if (request.method === 'GET') {
      try {
        const sql = `SELECT * FROM postulaciones ORDER BY created_at DESC;`;
        const res = await fetch(`https://${HOST}/sql`, {
          method: 'POST',
          headers: {
            'Neon-Connection-String': CONN_STR,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ query: sql, params: [] })
        });
        const result = await res.json();
        if (!res.ok) {
          return new Response(JSON.stringify({ success: false, error: result.message || result.error }), { status: res.status, headers: { ...cors, 'Content-Type': 'application/json' } });
        }
        return new Response(JSON.stringify({ success: true, data: result.rows || [] }), { status: 200, headers: { ...cors, 'Content-Type': 'application/json' } });
      } catch (err) {
        return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500, headers: { ...cors, 'Content-Type': 'application/json' } });
      }
    }

    if (request.method !== 'POST') return new Response('Method Not Allowed', { status: 405, headers: cors });

    try {
      const data = await request.json();
      
      // Manejar acciones administrativas (Aprobar Vendedor)
      if (data.action === 'update_aprobado') {
        const sql = `UPDATE postulaciones SET aprobado = $1 WHERE id = $2;`;
        const params = [data.aprobado === true, data.id];
        
        const res = await fetch(`https://${HOST}/sql`, {
          method: 'POST',
          headers: {
            'Neon-Connection-String': CONN_STR,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ query: sql, params: params })
        });
        
        const result = await res.json();
        if (!res.ok) throw new Error(result.message || "Error al actualizar en Neon");
        
        return new Response(JSON.stringify({ success: true }), { 
          status: 200, 
          headers: { ...cors, 'Content-Type': 'application/json' } 
        });
      }

      const sql = `
        INSERT INTO postulaciones (
          nombres_completos, apellidos_completos, cedula_identidad, fecha_nacimiento,
          nacionalidad, domicilio, telefono_movil, correo_electronico,
          vehiculo_propio, vehiculo_modelo_year, zona_ventas, experiencia_ferretera,
          clientes_principales, cantidad_clientes, volumen_facturacion,
          referencia_1_nombre, referencia_1_telefono, referencia_1_relacion,
          referencia_2_nombre, referencia_2_telefono, referencia_2_relacion,
          foto_cedula, foto_rif
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23) 
        RETURNING id;
      `;

      const values = [
        data.nombres_completos || "",
        data.apellidos_completos || "",
        data.cedula_identidad || "",
        data.fecha_nacimiento || null,
        data.nacionalidad || "",
        data.domicilio || "",
        data.telefono_movil || "",
        data.correo_electronico || "",
        data.vehiculo_propio === true,
        data.vehiculo_modelo_year || "",
        data.zona_ventas || "",
        data.experiencia_ferretera || "",
        data.clientes_principales || "",
        data.cantidad_clientes ? parseInt(data.cantidad_clientes) : null,
        data.volumen_facturacion || "",
        data.referencia_1_nombre || "",
        data.referencia_1_telefono || "",
        data.referencia_1_relacion || "",
        data.referencia_2_nombre || "",
        data.referencia_2_telefono || "",
        data.referencia_2_relacion || "",
        data.foto_cedula || null,
        data.foto_rif || null
      ];

      const res = await fetch(`https://${HOST}/sql`, {
        method: 'POST',
        headers: {
          'Neon-Connection-String': CONN_STR,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: sql, params: values })
      });

      const result = await res.json();

      if (!res.ok) {
        return new Response(JSON.stringify({ 
          success: false, 
          error: result.message || result.error || "Error en la API de Neon",
          detail: result 
        }), {
          status: res.status,
          headers: { ...cors, 'Content-Type': 'application/json' }
        });
      }

      return new Response(JSON.stringify({ success: true, id: result.rows?.[0]?.id }), {
        status: 201,
        headers: { ...cors, 'Content-Type': 'application/json' }
      });

    } catch (err) {
      return new Response(JSON.stringify({ success: false, error: err.message }), {
        status: 500,
        headers: { ...cors, 'Content-Type': 'application/json' }
      });
    }
  },
};
