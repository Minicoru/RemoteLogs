const express = require('express');
const router = express.Router();
const app = express();
const db = require('./database'); // Ensure you have this file set up for database operations
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const cors = require("cors");
const fs = require("fs");

// Middlewares implemented to Express
app.use(cors());
app.use(express.json());

// Define all your routes here, e.g., app.post('/log', ...)
// Make sure not to include app.listen() in this file
// Modified POST route to save logs to the database
router.post('/log', (req, res) => {
   const { log, project, userdata, username, env } = req.body; // Extract log and project from the request body
   const query = `INSERT INTO log_entries (log,project,userdata,username,env_instance) VALUES (?,?,?,?,?)`;

   db.run(query, [JSON.stringify(log), project, JSON.stringify(userdata), username, env], function (err) {
      if (err) {
         console.error(err.message);
         return res.status(500).send('Failed to log JSON.');
      }
      console.log('Logged JSON:', req.body);
      res.status(200).send('JSON logged successfully.');
   });
});

// GET route to download logs
router.get('/download-logs', (req, res) => {
   let query = `SELECT * FROM log_entries`;
   const params = [];
   let conditions = [];

   // Collect conditions based on provided query parameters
   if (req.query.project) {
      conditions.push(`project = ?`);
      params.push(req.query.project);
   }
   if (req.query.username) {
      conditions.push(`username = ?`);
      params.push(req.query.username);
   }
   if (req.query.env) {
      conditions.push(`env_instance = ?`);
      params.push(req.query.env);
   }

   // Append conditions to the query if any
   if (conditions.length > 0) {
      query += ` WHERE ` + conditions.join(' AND ');
   }

   db.all(query, params, (err, rows) => {
      if (err) {
         console.error('Failed to retrieve logs:', err.message);
         return res.status(500).send('Failed to retrieve logs.');
      }
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', 'attachment; filename=logs.json');
      res.send(JSON.stringify(rows, null, 2));
   });
});


// Endpoint to download and backup the database from the server
router.get('/download-database', (req, res) => {
   res.download('./logs.db', 'backup.db', (err) => {
      if (err) {
         console.error('Failed to download the database:', err);
         res.status(500).send('Failed to download the database.');
      }
   });
});

// Endpoint to upload and restore the database from a backup
router.post('/upload-database', upload.single('database'), (req, res) => {
   if (!req.file) {
      return res.status(400).send('No file uploaded.');
   }

   const tempPath = req.file.path;
   const targetPath = './logs.db';

   // Replace the current database file with the uploaded one
   fs.rename(tempPath, targetPath, (err) => {
      if (err) {
         console.error('Failed to replace the database:', err);
         return res.status(500).send('Failed to upload and restore the database.');
      }

      res.send('Database uploaded and restored successfully.');
   });
});

router.get('/', (req, res) => {
   res.sendFile(__dirname + '/layouts/static/home.html'); // Make sure the path matches where your HTML file is located
});

app.use(router);

module.exports = app; // Export the app for use in other files
