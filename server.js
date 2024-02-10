const app = require('./app'); // Import the Express application
const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = server; // Export the server for shutdown in tests
