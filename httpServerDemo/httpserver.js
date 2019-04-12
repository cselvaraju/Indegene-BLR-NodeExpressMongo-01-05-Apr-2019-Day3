const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    //   res.statusCode = 200;
    //   res.setHeader('Content-Type', 'text/html');
    //   res.end('<h1>Hello World</h1>\n');
    // console.log(req.url);
    // res.end(`The requested url: ${req.url}`);
    // if (req.url.endsWith('.html')) {
    //     const fileName = req.url.slice(1);
    //     fs.exists(`./${fileName}`, existFlag => {
    //         res.statusCode = 200;
    //         res.setHeader('Content-Type', 'text/html');
    //         if (existFlag) {
    //             fs.createReadStream(fileName).pipe(res);
    //         } else {
    //             res.statusCode = 404;
    //             res.end('<h3>Sorry the resource was not found</h3>');
    //         }
    //     })

    //////////////////////////
    // Friendly Routes
    //////////////////////////

    const routeMap = {
        'home': 'index.html',
        'about-us': 'about.html',
        'contact': 'contact.html',
        'favicon.ico': 'favicon.ico'
    };
    render(res, routeMap[req.url.slice(1)]);
    // let fileName = '';
    // if (req.url === '/home') {
    //     fileName = 'index.html';
    // };
    // if (req.url === '/about-us') {
    //     fileName = 'about.html';
    // };
    // if (req.url === '/favicon.ico') {
    //     fs.createReadStream('favicon.ico').pipe(res);
    // }
    console.log(req.url);
    console.log(routeMap[req.url.slice(1)]);
    //if (fileName) { render(res, fileName); }
});

function render(res, fileName) {
    if (fileName === 'favicon.ico') {
        fs.createReadStream(fileName).pipe(res);
        return;
    }
    fs.exists(`./${fileName}`, existFlag => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        if (existFlag) {
            fs.createReadStream(fileName).pipe(res);
        } else {
            res.statusCode = 404;
            res.end('<h3>Sorry the resource was not found</h3>');
        }
    }
    )
};

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});