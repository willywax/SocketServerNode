var http = require("http")
var express = require("express")
var app = express()
var port = process.env.PORT || 9000

app.use(express.static(__dirname + "/"))

var server = http.createServer(app)
server.listen(port)

console.log("http server listening on %d", port)

console.log("websocket server created")

var connectionList = [];



app.get('/clients',(req,res,next)=>{
    console.log('connection List ', connectionList);
    res.json(connectionList);
});

app.get('/sendMessage',(req,res,next)=>{
    res.json(connectionList)
})