const HOST = "ep-little-sound-acmvj9id-pooler.sa-east-1.aws.neon.tech";
const PASS = "npg_fdsCKZE0T2oI"; // API Auth de Neon
const CONN_STR = `postgresql://neondb_owner:${PASS}@${HOST}/neondb?sslmode=require&channel_binding=require`;

async function executeSql(query, params = []) {
    const res = await fetch(`https://${HOST}/sql`, {
        method: 'POST',
        headers: {
            'Neon-Connection-String': CONN_STR,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query, params })
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Error en la Base de Datos");
    return result;
}

export default {
  async fetch(request, env) {
    const cors = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });

    const url = new URL(request.url);
    const action = url.searchParams.get('action');

    try {
        // ======================================================
        // RUTAS DE ADMINISTRACIÓN (NUEVAS)
        // ======================================================

        // --- CLIENTES ---
        if (action === 'get_clientes' && request.method === 'GET') {
            const result = await executeSql(`SELECT id, nombre_empresa, rif_cedula, telefono_whatsapp, direccion_recoleccion, ciudad_estado FROM clientes ORDER BY nombre_empresa ASC;`);
            return new Response(JSON.stringify(result.rows || []), { headers: { ...cors, 'Content-Type': 'application/json' } });
        }
        
        if (action === 'create_cliente' && request.method === 'POST') {
            const body = await request.json();
            const sql = `INSERT INTO clientes (nombre_empresa, rif_cedula, telefono_whatsapp, direccion_recoleccion, ciudad_estado) VALUES ($1,$2,$3,$4,$5) RETURNING id;`;
            const params = [body.nombre_empresa, body.rif_cedula, body.telefono_whatsapp, body.direccion_recoleccion, body.ciudad_estado];
            const result = await executeSql(sql, params);
            return new Response(JSON.stringify({ success: true, id: result.rows[0].id }), { headers: { ...cors, 'Content-Type': 'application/json' } });
        }

        if (action === 'update_cliente' && request.method === 'POST') {
            const body = await request.json();
            const sql = `UPDATE clientes SET nombre_empresa=$1, rif_cedula=$2, telefono_whatsapp=$3, direccion_recoleccion=$4, ciudad_estado=$5 WHERE id=$6;`;
            const params = [body.nombre_empresa, body.rif_cedula, body.telefono_whatsapp, body.direccion_recoleccion, body.ciudad_estado, body.id];
            await executeSql(sql, params);
            return new Response(JSON.stringify({ success: true }), { headers: { ...cors, 'Content-Type': 'application/json' } });
        }

        if (action === 'delete_cliente' && request.method === 'POST') {
            const body = await request.json();
            const sql = `DELETE FROM clientes WHERE id=$1;`;
            await executeSql(sql, [body.id]);
            return new Response(JSON.stringify({ success: true }), { headers: { ...cors, 'Content-Type': 'application/json' } });
        }

        // --- EXTINTORES ---
        if (action === 'get_extintores' && request.method === 'GET') {
            const sql = `
              SELECT e.id_qr, e.capacidad_libras, e.fecha_ultima_carga, e.fecha_vencimiento, e.estatus, c.nombre_empresa 
              FROM extintores e JOIN clientes c ON e.cliente_id = c.id 
              ORDER BY e.id_qr ASC;
            `;
            const result = await executeSql(sql);
            return new Response(JSON.stringify(result.rows || []), { headers: { ...cors, 'Content-Type': 'application/json' } });
        }
        
        if (action === 'create_extintor' && request.method === 'POST') {
            const body = await request.json();
            const sql = `INSERT INTO extintores (id_qr, cliente_id, capacidad_libras, fecha_ultima_carga, fecha_vencimiento, estatus) VALUES ($1,$2,$3,$4,$5,$6) RETURNING id_qr;`;
            const params = [body.id_qr, body.cliente_id, parseInt(body.capacidad_libras), body.fecha_ultima_carga, body.fecha_vencimiento, body.estatus || 'Activo'];
            const result = await executeSql(sql, params);
            return new Response(JSON.stringify({ success: true, id_qr: result.rows[0].id_qr }), { headers: { ...cors, 'Content-Type': 'application/json' } });
        }

        // ======================================================
        // RUTA ORIGINAL DE TRAZABILIDAD PÚBLICA (NO TOCAR)
        // ======================================================
        const idQr = url.searchParams.get('id_qr');
        if (idQr) {
            if (request.method === 'GET') {
                const sql = `
                SELECT 
                    e.id_qr, c.nombre_empresa, e.capacidad_libras, 
                    e.fecha_ultima_carga, e.fecha_vencimiento, e.estatus
                FROM extintores e
                LEFT JOIN clientes c ON e.cliente_id = c.id
                WHERE e.id_qr = $1;
                `;
                const result = await executeSql(sql, [idQr]);
                if (!result.rows || result.rows.length === 0) {
                    return new Response(JSON.stringify({ error: 'Extintor no encontrado en la base de datos' }), { status: 404, headers: { ...cors, 'Content-Type': 'application/json' } });
                }
                return new Response(JSON.stringify(result.rows[0]), { headers: { ...cors, 'Content-Type': 'application/json' } });
            }

            if (request.method === 'POST') {
                const sql = `UPDATE extintores SET estatus = 'Recarga_Autorizada' WHERE id_qr = $1;`;
                await executeSql(sql, [idQr]);
                return new Response(JSON.stringify({ success: true, message: 'Recarga autorizada exitosamente' }), { headers: { ...cors, 'Content-Type': 'application/json' } });
            }
        }

        return new Response(JSON.stringify({ error: 'Ruta no válida o faltan parámetros' }), { status: 400, headers: { ...cors, 'Content-Type': 'application/json' } });

    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { ...cors, 'Content-Type': 'application/json' } });
    }
  }
};
