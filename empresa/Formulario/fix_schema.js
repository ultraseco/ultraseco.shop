const { Pool } = require('pg');

const connStr = "postgresql://neondb_owner:npg_fdsCKZE0T2oI@ep-little-sound-acmvj9id-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

const pool = new Pool({
  connectionString: connStr,
  ssl: {
    rejectUnauthorized: false
  }
});

async function setupDatabase() {
  try {
    console.log('Recreating table postulaciones to match application schema...');
    
    // First, let's backup or just drop if empty
    const check = await pool.query('SELECT count(*) FROM postulaciones');
    if (parseInt(check.rows[0].count) > 0) {
      console.log('Table is NOT empty. Aborting drop to prevent data loss.');
      return;
    }

    await pool.query('DROP TABLE IF EXISTS postulaciones');
    
    const schema = `
      CREATE TABLE postulaciones (
          id SERIAL PRIMARY KEY,
          nombres_completos TEXT NOT NULL,
          apellidos_completos TEXT NOT NULL,
          cedula_identidad TEXT NOT NULL,
          fecha_nacimiento DATE,
          nacionalidad TEXT,
          domicilio TEXT,
          telefono_movil TEXT,
          correo_electronico TEXT,
          vehiculo_propio BOOLEAN,
          vehiculo_modelo_year TEXT,
          zona_ventas TEXT,
          experiencia_ferretera TEXT,
          clientes_principales TEXT,
          cantidad_clientes INTEGER,
          volumen_facturacion TEXT,
          referencia_1_nombre TEXT,
          referencia_1_telefono TEXT,
          referencia_1_relacion TEXT,
          referencia_2_nombre TEXT,
          referencia_2_telefono TEXT,
          referencia_2_relacion TEXT,
          foto_cedula TEXT,
          foto_rif TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          estado TEXT DEFAULT 'nuevo'
      );
    `;
    
    await pool.query(schema);
    console.log('Table postulaciones created successfully!');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await pool.end();
  }
}

setupDatabase();
