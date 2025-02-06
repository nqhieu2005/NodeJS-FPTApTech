const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Welcome!</h1><p>You are using the browser: ${req.headers[user-agent]}</p>');
});

server.listen(3000, () => {
    console.log("Server is running at http://localhost:3000")
})