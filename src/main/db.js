const sql = require('mssql');

const config = {
  // Al usar Autenticación de Windows, no ponemos 'user' ni 'password'
  server: 'localhost\\SQLEXPRESS', 
  database: 'CalendarioExamenes',
  driver: 'msnodesqlv8',
  options: {
    trustedConnection: true,
    encrypt: false, 
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
    console.error('SQL Error (,,>﹏<,,):', err);
    throw err;
  }
}

module.exports = { executeQuery };
