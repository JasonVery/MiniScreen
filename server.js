// This is all built with AI as it was not a focus for the project
// This is a local server for the mini screen app 

const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 5501;
const baseDirectory = __dirname; 

const server = http.createServer((req, res) => {
    let filePath = path.join(baseDirectory, req.url === '/' ? 'index.html' : req.url);
    console.log(`Request for: ${req.url}, Serving file: ${filePath}`);

    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error(`Error reading file: ${filePath}`);
            console.error(`Error details: ${err.code}`);
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('404 Not Found');
            return;
        }

        // Determine content type
        let extname = path.extname(filePath);
        let contentType = 'text/html'; // Default content type

        // Set content type based on file extension
        switch (extname) {
            case '.js':
                contentType = 'application/javascript';
                break;
            case '.css':
                contentType = 'text/css';
                break;
            case '.json':
                contentType = 'application/json';
                break;
            case '.png':
                contentType = 'image/png';
                break;
            case '.jpg':
                contentType = 'image/jpeg';
                break;
            case '.ico':
                contentType = 'image/x-icon';
                break;
        }

        res.writeHead(200, {'Content-Type': contentType});
        res.end(data, 'utf-8');
    });
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});





