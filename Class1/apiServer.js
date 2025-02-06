// const http = require('http');
// const path = require('path');

// const server = http.createServer((req, res)=>{
//     res.writeHead(200, {'Content-Type': 'application/json'});
//     const response = {message: 'Hello, API from Node,js', path: req.url};
//     res.end(JSON.stringify(response));
// });

// server.listen(4000, ()=>{
//     console.log("Server is running at http://localhost:4000");
// })

const http = require('http');
const { url } = require('inspector');

const server = http.createServer((req, res) =>{
    res.writeHead(200, {'Content-Type': 'text/plain'});

    if(req.url === '/hello'){
        res.end("Hello from server");
    } else if (req.url === '/random'){
        res.end(`random number: ${Math.floor(Math.random()*100)}`);
    } else if (req.url === '/admin') {
        res.end("admin page");
    } else {
        res.end("Error");
    }
});

server.listen(4000, () =>{
    console.log("Server is running at http://localhost:4000");
})