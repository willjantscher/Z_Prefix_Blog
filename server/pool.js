const Pool = require('pg').Pool
const pool = new Pool({
  user: 'root',
  host: 'localhost',
  database: 'blogdb',
  password: 'password',
  port: 5432, //postgres database port
})

module.exports = {
    getPool: () => pool
};