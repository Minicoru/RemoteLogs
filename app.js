const express = require('express');
// const router = express.Router();
const app = express();
// const db = require('./database'); // Ensure you have this file set up for database operations
const pool = require('./database'); // Adjusted for PostgreSQL connection
// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });
const cors = require("cors");
const fs = require("fs");

// Custom CORS options
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: '*',
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
// Middlewares implemented to Express
app.use(express.json());
// app.options('*', cors()); // Enable preflight request for /log routedownload-logs route
app.use(cors()); // Apply CORS to all other requests

// Define all your routes here, e.g., app.post('/log', ...)
// Make sure not to include app.listen() in this file
// Modified POST route to save logs to the database
// This was before to change to PostgreSQL Database on Vercel -B1 -13/feb/24
// router.post('/log', (req, res) => {
//    const { log, project, userdata, username, env } = req.body; // Extract log and project from the request body
//    const query = `INSERT INTO log_entries (log,project,userdata,username,env_instance) VALUES (?,?,?,?,?)`;

//    db.run(query, [JSON.stringify(log), project, JSON.stringify(userdata), username, env], function (err) {
//       if (err) {
//          console.error(err.message);
//          return res.status(500).send('Failed to log JSON.');
//       }
//       console.log('Logged JSON:', req.body);
//       res.status(200).send('JSON logged successfully.');
//    });
// });
// This was before to change to PostgreSQL Database on Vercel -B1 -13/feb/24
app.options('/log', cors());
app.post('/log', cors(), async (req, res) => {
  const { log, project, userdata, username, env } = req.body;
  const query = `INSERT INTO log_entries (log, project, userdata, username, env_instance) VALUES ($1, $2, $3, $4, $5)`;

  try {
    await pool.query(query, [JSON.stringify(log), project, JSON.stringify(userdata), username, env]);
    console.log('Logged JSON:', req.body);
    res.status(200).send('JSON logged successfully.');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Failed to log JSON.');
  }
});

// GET route to download logs
// This was before to change to PostgreSQL Database on Vercel -B1 -13/feb/24
// router.get('/download-logs', (req, res) => {
//    let query = `SELECT * FROM log_entries`;
//    const params = [];
//    let conditions = [];

//    // Collect conditions based on provided query parameters
//    if (req.query.project) {
//       conditions.push(`project = ?`);
//       params.push(req.query.project);
//    }
//    if (req.query.username) {
//       conditions.push(`username = ?`);
//       params.push(req.query.username);
//    }
//    if (req.query.env) {
//       conditions.push(`env_instance = ?`);
//       params.push(req.query.env);
//    }

//    // Append conditions to the query if any
//    if (conditions.length > 0) {
//       query += ` WHERE ` + conditions.join(' AND ');
//    }

//    db.all(query, params, (err, rows) => {
//       if (err) {
//          console.error('Failed to retrieve logs:', err.message);
//          return res.status(500).send('Failed to retrieve logs.');
//       }
//       res.setHeader('Content-Type', 'application/json');
//       res.setHeader('Content-Disposition', 'attachment; filename=logs.json');
//       res.send(JSON.stringify(rows, null, 2));
//    });
// });
// This was before to change to PostgreSQL Database on Vercel -B1 -13/feb/24
app.options('/download-logs', cors());
app.get('/download-logs', cors(), async (req, res) => {
  let query = `SELECT * FROM log_entries`;
  const params = [];
  let conditions = [];

  if (req.query.project) conditions.push(`project = $${params.push(req.query.project)}`);
  if (req.query.username) conditions.push(`username = $${params.push(req.query.username)}`);
  if (req.query.env) conditions.push(`env_instance = $${params.push(req.query.env)}`);

  if (conditions.length) query += ` WHERE ` + conditions.join(' AND ');

  try {
    const { rows } = await pool.query(query, params);
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename=logs.json');
    res.send(JSON.stringify(rows, null, 2));
  } catch (err) {
    console.error('Failed to retrieve logs:', err.message);
    res.status(500).send('Failed to retrieve logs.');
  }
});

// The endpoints for /download-database and /upload-database might need reevaluation for PostgreSQL usage,
// as direct file operations aren't typically performed with hosted databases.
// This was before to change to PostgreSQL Database on Vercel -B1 -13/feb/24
// Endpoint to download and backup the database from the server
// router.get('/download-database', (req, res) => {
//    res.download('./logs.db', 'backup.db', (err) => {
//       if (err) {
//          console.error('Failed to download the database:', err);
//          res.status(500).send('Failed to download the database.');
//       }
//    });
// });


// Endpoint to upload and restore the database from a backup
// router.post('/upload-database', upload.single('database'), (req, res) => {
//    if (!req.file) {
//       return res.status(400).send('No file uploaded.');
//    }

//    const tempPath = req.file.path;
//    const targetPath = './logs.db';

//    // Replace the current database file with the uploaded one
//    fs.rename(tempPath, targetPath, (err) => {
//       if (err) {
//          console.error('Failed to replace the database:', err);
//          return res.status(500).send('Failed to upload and restore the database.');
//       }

//       res.send('Database uploaded and restored successfully.');
//    });
// });
// This was before to change to PostgreSQL Database on Vercel -B1 -13/feb/24
app.options('/', cors());
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/layouts/static/home.html'); // Make sure the path matches where your HTML file is located
});

module.exports = { app: app, pool: pool }; // Export the app for use in other files
