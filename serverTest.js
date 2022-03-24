const express = require('express');
const { json } = require('express/lib/response');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = process.env.PORT || 9012;

const socketLists = [];
const socketIdList = [];

server.listen(port, () => {
    console.log('listening on *:', port);
});

io.on('connection', (socket) => {
    console.log('a user connected');
    const a = {};
    a.key = socket.id;
    a.socket = socket;
    socketLists.push(a);
    socketIdList.push(socket.id);

});



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/clients', (req, res, next) => {
    console.log('connection List ', socketLists);
    res.json(socketIdList);
});

app.get('/disconnectAll', (req,res,next) =>{
    socketLists.splice(0, socketLists.length);
    socketIdList.splice(0, socketIdList.length);
    res.json(['Data cleared']);
})

app.get('/disconnect/:id', (req,res,next) =>{
    const socketId = req.params.id;
    // if (index >= socketLists.length) res.json([])
    if (socketLists.length > 0) {
        console.log('Sockets available');
        const index = socketLists.findIndex(x => x.key === socketId);
       
        if(index < 0) res.json(['Socket Not available']);
        // socketLists[index].write("Hellow Client from Server")
        console.log('Closing socket with Index',index);
        socketLists[index].socket.emit("data","Hellow my friend");
        // socketLists[index].socket.emit("close","Hellow my friend");
        const socketIdIndex = socketIdList.findIndex(x => x === socketId);
        console.log('Removing index from ',socketIdIndex);
        res.json(['Client connection closed']);
        // res.json(['Message Sent'])
    } else {
        console.log('Socket not closed');
        res.json(['Client connection not Closed'])
    }

})




app.get('/sendMessage/:id', (req, res, next) => {
    const socketId = req.params.id;
    // if (index >= socketLists.length) res.json([])
    if (socketLists.length > 0) {
        console.log('Sockets available');
        const index = socketLists.findIndex(x => x.key === socketId);
        if(index < 0) res.json(['Socket Not available']);
        // socketLists[index].write("Hellow Client from Server")
        socketLists[index].socket.emit("data","Hellow my friend");

        res.json(['Message Sent'])
    } else {
        res.json(socketLists)
    }
})
