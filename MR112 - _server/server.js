const http = require('http');
const fs = require('fs');
const path = require('path');
const root = process.argv[2];
const port = parseInt(process.argv[3] || '8080', 10);
const mime = {
  '.html':'text/html; charset=utf-8','.js':'text/javascript','.mjs':'text/javascript','.css':'text/css',
  '.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.gif':'image/gif','.svg':'image/svg+xml',
  '.webp':'image/webp','.ico':'image/x-icon','.woff':'font/woff','.woff2':'font/woff2','.ttf':'font/ttf',
  '.json':'application/json','.map':'application/json','.txt':'text/plain'
};
http.createServer((req, res) => {
  let url = decodeURIComponent(req.url.split('?')[0]);
  if (url === '/') url = '/index.html';
  let fp = path.normalize(path.join(root, url));
  if (!fp.startsWith(path.normalize(root))) { res.writeHead(403); return res.end('Forbidden'); }
  fs.stat(fp, (err, st) => {
    if (err || !st.isFile()) { res.writeHead(404); return res.end('Not found: ' + url); }
    res.writeHead(200, { 'Content-Type': mime[path.extname(fp).toLowerCase()] || 'application/octet-stream' });
    fs.createReadStream(fp).pipe(res);
  });
}).listen(port, () => console.log('Serving ' + root + ' on http://localhost:' + port));
