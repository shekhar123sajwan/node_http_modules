const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
    console.log("request for " + req.url + " by method " + req.method)

    if (req.method == 'GET') {
        var fileUrl;
        if (req.url == '/') fileUrl = '/index.html';
        else fileUrl = req.url;
        var filePath = path.resolve('./public' + fileUrl);
        var fileExt = path.extname(filePath);
        if (fileExt == '.html') {
            fs.exists(filePath, (exists) => {
                if (!exists) {
                    res.statusCode = 404;
                    res.setHeader('content-type', 'text/html');
                    res.end("<html><body>Not Found File</body></html>");
                    return;
                }

                res.statusCode = 200;
                res.setHeader('content-type', 'text/html');
                fs.createReadStream(filePath).pipe(res);
            });
        } else {
            res.statusCode = 404;
            res.setHeader('content-type', 'text/html');
            res.end("<html><body>Not Found File 404 and Html file</body></html>");
        }
    } else {
        res.statusCode = 404;
        res.setHeader('content-type', 'text/html');
        res.end("<html><body>Not Found File 404 and Html Request " + req.method + "Not Found.</body></html>");
        return;
    }
    // res.statusCode = 200;
    // res.setHeader('content-type', 'text/html');
    // res.end('<html><body><h1>Hello, World</h1></body></html>')
})
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
})