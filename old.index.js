// const express = require('express');
// const app = express();
// const port = process.env.PORT || 3000;
// const db = require('./database');
// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' }); // Configures multer to save uploaded files to the "uploads" directory

// app.use(express.json());

// // Modified POST route to save logs to the database
// app.post('/log', (req, res) => {
//     const log = JSON.stringify(req.body);
//     const query = `INSERT INTO log_entries (log) VALUES (?)`;

//     db.run(query, log, function(err) {
//         if (err) {
//             console.error(err.message);
//             return res.status(500).send('Failed to log JSON.');
//         }
//         console.log('Logged JSON:', req.body);
//         res.status(200).send('JSON logged successfully.');
//     });
// });

// // GET route to download logs
// app.get('/download-logs', (req, res) => {
//     const query = `SELECT * FROM log_entries`;

//     db.all(query, [], (err, rows) => {
//         if (err) {
//             console.error(err.message);
//             return res.status(500).send('Failed to retrieve logs.');
//         }
//         res.setHeader('Content-Type', 'application/json');
//         res.setHeader('Content-Disposition', 'attachment; filename=logs.json');
//         res.send(JSON.stringify(rows, null, 2));
//     });
// });

// app.get('/download-database', (req, res) => {
//    res.download('./logs.db', 'backup.db', (err) => {
//      if (err) {
//        console.error('Failed to download the database:', err);
//        res.status(500).send('Failed to download the database.');
//      }
//    });
//  });
 
//  // Endpoint to upload and restore the database from a backup
//  app.post('/upload-database', upload.single('database'), (req, res) => {
//    if (!req.file) {
//      return res.status(400).send('No file uploaded.');
//    }
 
//    const tempPath = req.file.path;
//    const targetPath = './logs.db';
 
//    // Replace the current database file with the uploaded one
//    fs.rename(tempPath, targetPath, (err) => {
//      if (err) {
//        console.error('Failed to replace the database:', err);
//        return res.status(500).send('Failed to upload and restore the database.');
//      }
 
//      res.send('Database uploaded and restored successfully.');
//    });
//  });

// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });
