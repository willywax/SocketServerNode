const { io } = require("socket.io-client");

const url = 'http://127.0.0.1:9012';
// const url = 'https://socketservernode.herokuapp.com';

const socket = io(url);

socket.connect();

socket.listeners("data",(data)=>{
    console.log('Data has arrived ');
})

socket.on("connect", () => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
  });

socket.on("data", (data) => {    
    console.log(`Client received: ${data}`); 
});  
// Add a 'close' event handler for the client socket 
socket.on('close', () => { 
    console.log('Client closed'); 
});  
socket.on('error', (err) => { 
    console.error(err); 
}); 