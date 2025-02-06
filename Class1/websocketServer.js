const { Socket } = require('dgram');
const WebSocket = require('ws');

const server = new WebSocket.Server({port: 8080 });

server.on('connection', Socket => {
    console.log("new client connected");
    Socket.send("Welcome to WebSocket Server!");
    
Socket.on("message", message =>{
    console.log(`Message receive: ${message}`);

server.clients.forEach(client =>{
    if(client.readyState === WebSocket.OPEN){
        client.send(`User: ${message}`);
    }
});    
});    
});

console.log("WebSocket is running at ws://localhost:8080");