const { Pool } = require("pg");



const pool = new Pool({
   connectionString: process.env.EXTERNAL_URL
});



module.exports = pool;