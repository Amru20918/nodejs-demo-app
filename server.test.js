const test = require('node:test');
const assert = require('node:assert');
const http = require('http');

const server = require('./server');

test('server should return HTTP 200', async () => {
  await new Promise((resolve, reject) => {
    server.listen(0, () => {
      const port = server.address().port;

      http.get(`http://localhost:${port}`, (res) => {
        try {
          assert.strictEqual(res.statusCode, 200);
          resolve();
        } catch (error) {
          reject(error);
        } finally {
          server.close();
        }
      });
    });
  });
});