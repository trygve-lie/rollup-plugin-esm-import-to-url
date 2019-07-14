import http from 'http';
import path from 'path';
import fs from 'fs';

const MIME_TYPES = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.svg': 'application/image/svg+xml',
    '.wasm': 'application/wasm'
};

export default class HttpServer {
    constructor({ wwwroot = './' } = {}) {
        this.server;

        this.app = http.createServer((req, res) => {
            let filePath = '.' + req.url;
            if (filePath == './') {
                filePath = './index.html';
            }

            const file = path.join(wwwroot, filePath);

            fs.readFile(file, (error, content) => {
                if (error) {
                    if (error.code == 'ENOENT') {
                        res.statusCode = 404;
                        res.setHeader('Content-Type', 'text/plain');
                        res.end('Not found');
                        return;
                    }

                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'text/plain');
                    res.end('Internal server error');
                    return;
                }

                const extname = String(path.extname(filePath)).toLowerCase();
                const contentType = MIME_TYPES[extname] || 'application/octet-stream';

                res.statusCode = 200;
                res.setHeader('Content-Type', contentType);
                res.end(content, 'utf-8');
            });
        });
    }

    listen(port = 0) {
        return new Promise(resolve => {
            this.server = this.app.listen(port, 'localhost', () => {
                const address = `http://${this.server.address().address}:${
                    this.server.address().port
                }`;
                resolve(address);
            });
        });
    }

    close() {
        return new Promise((resolve, reject) => {
            this.server.close(err => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}
