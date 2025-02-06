const WebSocket = require('ws');

const socket = new WebSocket('ws://localhost:8080');

socket.on('open', () =>{
    console.log("Connection success to WebSocket Server ");
    socket.send("Hello my name is Hieu");
});

socket.on('message', message =>{
    console.log("message from server: ", message);
})