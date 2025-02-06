const http = require('http');
const path = require('path');

const server = http.createServer((req, res)=>{
    res.writeHead(200, {'Content-Type': 'application/json'});
    const response = {message: 'Hello, API from Node,js', path: req.url};
    res.end(JSON.stringify(response));
});

server.listen(4000, ()=>{
    console.log("Server is running at http://localhost:4000");
})