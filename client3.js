var net = require('net');

const client = new net.Socket();

const host = '127.0.0.1';
const port = 9012;
const url = 'http://127.0.0.1:9012';
client.connect(url ,()=>{
    console.log(`client connected to ${host}:${port}`); 
    // client.write(`Hello, I am ${client.address().address}`); 
});

client.on('data', (data) => {    
    console.log(`Client received: ${data}`); 
});  
// Add a 'close' event handler for the client socket 
client.on('close', () => { 
    console.log('Client closed'); 
});  
client.on('error', (err) => { 
    console.error(err); 
}); 