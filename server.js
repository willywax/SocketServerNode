const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = 9012;

const socketLists = [];

io.on('connection', (socket) => {
    console.log('a user connected');
    
    socketLists.push(socket);

});


server.listen(port, () => {
    console.log('listening on *:', port);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/clients', (req, res, next) => {
    console.log('connection List ', socketLists);
    res.json([]);
});

app.get('/sendMessage/:id', (req, res, next) => {
    const index = req.params.id;
    if (index >= socketLists.length) res.json([])
    if (socketLists.length > 0) {
        console.log('Sockets available');
        socketLists[index].write("Hellow Client from Server")
        socketLists[index].emit("data","Hellow my friend");

        res.json(['Message Sent'])
    } else {
        res.json(socketLists)
    }
})
