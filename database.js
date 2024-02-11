const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./logs.db');

// Configuration of the SQLite Databse, with the tables and more
db.serialize(function () {
   db.run(`CREATE TABLE IF NOT EXISTS log_entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project TEXT,
    log TEXT,
    userdata TEXT,
    username TEXT,
    env_instance TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`);
});

module.exports = db;