const { Pool } = require('pg');

const connStr = "postgresql://neondb_owner:npg_fdsCKZE0T2oI@ep-little-sound-acmvj9id-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

const pool = new Pool({
  connectionString: connStr,
  ssl: {
    rejectUnauthorized: false
  }
});

async function checkDatabase() {
  try {
    console.log('Checking database...');
    const res = await pool.query('SELECT count(*) FROM postulaciones');
    console.log('Total records in postulaciones:', res.rows[0].count);
    
    if (res.rows[0].count > 0) {
      const last = await pool.query('SELECT * FROM postulaciones ORDER BY created_at DESC LIMIT 1');
      console.log('Last record:', JSON.stringify(last.rows[0], null, 2));
    }
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await pool.end();
  }
}

checkDatabase();
