const http = require('http');
const fs = require('fs');

const port = 3000;

function serveFile(res, file, type, code = 200) {
  fs.readFile('./public/' + file, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    } else {
      res.writeHead(code, { 'Content-Type': type });
      res.end(data);
    }
  });
}

const server = http.createServer((req, res) => {
  console.log(req.method, req.url);

  if (req.url === '/' || req.url === '/index.html') {
    serveFile(res, 'index.html', 'text/html');
  } else if (req.url === '/about') {
    serveFile(res, 'about.html', 'text/html');
  } else if (req.url === '/api') {
    serveFile(res, '404.html', 'text/html');
  } else {
    serveFile(res, '404.html', 'text/html', 404);
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
