// const http = require('http');

// http.createServer((req, res) => {
//     res.writeHead(200, { 'Content-Type': 'text/plain' });
//     res.end("Hello world");
// }).listen(3000);
// console.log('Server is running at http://localhost:3000/');

const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    fs.readFile('index.html', (err, data) => {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
    });
});

server.listen(3000, ()=>{
    console.log("Server is running at http://localhost:3000");
});