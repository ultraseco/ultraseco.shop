const { Pool } = require('pg');

const connStr = "postgresql://neondb_owner:npg_fdsCKZE0T2oI@ep-little-sound-acmvj9id-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

const pool = new Pool({
  connectionString: connStr,
  ssl: {
    rejectUnauthorized: false
  }
});

async function describeTable() {
  try {
    console.log('Describing table postulaciones...');
    const res = await pool.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'postulaciones'
    `);
    console.log('Columns:');
    res.rows.forEach(row => {
      console.log(`- ${row.column_name} (${row.data_type})`);
    });
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await pool.end();
  }
}

describeTable();
