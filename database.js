// const sqlite3 = require('sqlite3').verbose();
// const db = new sqlite3.Database('./logs.db');
// 
// // Configuration of the SQLite Databse, with the tables and more
// db.serialize(function () {
//  db.run(`CREATE TABLE IF NOT EXISTS log_entries (
//   id INTEGER PRIMARY KEY AUTOINCREMENT,
//   project TEXT,
//   log TEXT,
//   userdata TEXT,
//   username TEXT,
//   env_instance TEXT,
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// )`);
// });
// 
// module.exports = db;
require('dotenv').config();
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL
});

const queries = [`
CREATE TABLE IF NOT EXISTS log_entries (
  id SERIAL PRIMARY KEY,
  project TEXT,
  log TEXT,
  userdata TEXT,
  username TEXT,
  env_instance TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`];

async function createTable(queries) {
  if (Array.isArray(queries))
    for (const query of queries) {
      try {
        const res = await pool.query(query);
        console.log('Table is successfully created or already exists');
      } catch (err) {
        console.error('Error creating table:', err);
      }
    }
}

createTable(queries);

module.exports = pool;

