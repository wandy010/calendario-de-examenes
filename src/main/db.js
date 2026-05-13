const sql = require('mssql');

const config = {
  user: 'sa', // Change to actual user
  password: 'YourStrongPassword123', // Change to actual password
  server: 'localhost',
  database: 'CalendarioExamenes',
  options: {
    encrypt: false, // Use false for local SQL Server
    trustServerCertificate: true,
  },
};

async function executeQuery(query, params = []) {
  try {
    let pool = await sql.connect(config);
    let request = pool.request();
    
    params.forEach(p => {
      request.input(p.name, p.type, p.value);
    });

    const result = await request.query(query);
    return result.recordset;
  } catch (err) {
    console.error('SQL Error:', err);
    throw err;
  }
}

module.exports = { executeQuery };
