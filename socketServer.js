// Include Nodejs' net module.
const { Socket } = require('dgram');
const Net = require('net');
const app = require('express')();
// The port on which the server is listening.
const port = 9012;

app.listen(9000,()=>{
    console.log('Api server started running at port ',9000)
})
// Use net.createServer() in your code. This is just for illustration purpose.
// Create a new TCP server.
const server = new Net.Server();
// The server listens to a socket for a client to make a connection request.
// Think of a socket as an end point.
server.listen(port, function() {
    console.log(`Server listening for connection requests on socket localhost:${port}`);
});

const socketLists = [];

// When a client requests a connection with the server, the server creates a new
// socket dedicated to that client.
server.on('connection', function(socket) {
    console.log('A new connection has been established.');
    socketLists.push(socket);
    // // Now that a TCP connection has been established, the server can send data to
    // // the client by writing to its socket.
    // socket.write('Hello, client.');

    // // The server can also receive data from the client by reading from its socket.
    // socket.on('data', function(chunk) {
    //     console.log(`Data received from client: ${chunk.toString()}`);
    // });

    // // When the client requests to end the TCP connection with the server, the server
    // // ends the connection.
    // socket.on('end', function() {
    //     console.log('Closing connection with the client');
    // });

    // // Don't forget to catch error, for your own sake.
    socket.on('error', function(err) {
        console.log(`Error: ${err}`);
    });
});

server.on('data',(data)=>{
    console.log('CLIENT: ' + data.toString());
})

// while(true){
//     for(clients in socketLists){
//         clients.on('data', function(chunk) {
//             console.log(`Data received from client: ${chunk.toString()}`);
//         });
//     }
// }


app.get('/clients',(req,res,next)=>{
    console.log('connection List ', socketLists);
    res.json(socketLists);
});

app.get('/sendMessage/:id',(req,res,next)=>{
    const index = req.params.id;
    if(index >= socketLists.length) res.json([])
    if(socketLists.length > 0) {
        console.log('Sockets available');
        socketLists[index].write("Hellow Client from Server")
        // singleSocket = socketLists[index];
        socketLists[index].pipe(socketLists[index]);
        // singleSocket.write('Hellow');
        res.json(['Message Sent']);

    }else{
    res.json(socketLists)
    }
})

