const request = require('supertest');
const { app, pool } = require('./app'); // Ensure your Express app is exported from `app.js`
let server;

beforeAll(() => {
  const port = 3001; // Use a different port for testing if necessary
  server = app.listen(port);
});

afterAll((done) => {
  (async () => { await pool.end() })();
  server.close(done); // Ensure the server is closed after tests
});

describe('API tests', () => {
  it('POST /log - should log JSON payload', async () => {
    const payload = { message: 'Test log' };
    const response = await request(app)
      .post('/log')
      .send(payload);
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('JSON logged successfully');
  });

  // Add more tests for downloading logs, downloading the database, and uploading the database
  // Note: Testing file download/upload might require mocking file system operations or adjusting test setup

  it('GET /download-logs - should download logs', async () => {
    const response = await request(app).get('/download-logs');
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toContain('application/json');
    // Further checks can include inspecting the response body for expected log content
  });

  // This was before to change to PostgreSQL Database on Vercel -B1 -13/feb/24
  // it('GET /download-database - should download the database file', async () => {
  //   const response = await request(app).get('/download-database');
  //   expect(response.statusCode).toBe(200);
  //   expect(response.headers['content-type']).toBe('application/octet-stream');
  //   // Note: Actual file content verification may require reading the file, which might be complex in this context
  // });

  // it('POST /upload-database - should upload and restore the database', async () => {
  //   // For this test, you'll need a path to a valid SQLite database file
  //   const testDbPath = './backup.db'; // Ensure this is a valid path for testing
  //   const response = await request(app)
  //     .post('/upload-database')
  //     .attach('database', testDbPath);

  //   expect(response.statusCode).toBe(200);
  //   expect(response.text).toContain('Database uploaded and restored successfully');
  //   // Additional verification can include querying the database to ensure it contains the expected data
  // });
  // This was before to change to PostgreSQL Database on Vercel -B1 -13/feb/24

  it('should display the home page with GitHub link', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('Welcome to Remote Logs Service');
    expect(response.text).toContain('https://github.com/Minicoru/RemoteLogs');
  });
});

