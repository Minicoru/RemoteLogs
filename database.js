const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./logs.db');

db.serialize(function () {
   db.run(`CREATE TABLE IF NOT EXISTS log_entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    log TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`);
   db.run('ALTER TABLE log_entries ADD COLUMN project TEXT', function (err) {
      if (err) {
         console.log('Error adding project column', err.message);
      } else {
         console.log('Project column added successfully');
      }
   });
   db.run('ALTER TABLE log_entries ADD COLUMN userdata TEXT', function (err) {
      if (err) {
         console.log('Error adding userdata column', err.message);
      } else {
         console.log('userdata column added successfully');
      }
   });
   db.run('ALTER TABLE log_entries ADD COLUMN username TEXT', function (err) {
      if (err) {
         console.log('Error adding username column', err.message);
      } else {
         console.log('username column added successfully');
      }
   });
   db.run('ALTER TABLE log_entries ADD COLUMN env_instance TEXT', function (err) {
      if (err) {
         console.log('Error adding env_instance column', err.message);
      } else {
         console.log('env_instance column added successfully');
      }
   });
});

module.exports = db;