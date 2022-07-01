const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http');
const dotenv = require('dotenv').config();
const socketio = require('socket.io');
const { application } = require('express');

PORT = process.env.PORT || 7896

const app = express();
const server = http.createServer(app);
const io = socketio(server, {cors: {origin : "*"}});


// -----Middleware------
app.use(express.static((path.join(__dirname, "public"))))
app.use(express.json());
// ---------------------


let users = []; // stores the list of users



io.on("connection", (socket)=>{ // this way we listen to events. This is the connection event.
    console.log(`the connected user is ${socket.id}`)
    users.push(socket.id)
    // custom events, you can add yours as shown below
    // socket.emit('name_of_event' , data=>{
    // the tasks to do using this data
    //      socket.broadcast.emit('name_of_event', payload)
    // }) 
    // Here socket is emitting payload to name_of_event 

    socket.on("send_message",(data)=>{
        payload = {
            text: data,
            user: socket.id
        }
        socket.broadcast.emit('receive_message',(payload))
        // socket.emit('receive_message', data);
        // socket.broadcast.emit("receive_message", data)
    })
    socket.on("disconnect", function() {
        console.log(`${socket.id} has left the chat`)
     })
})

// written to test functionality 
// app.get("/", (req, res) => {
//     res.sendFile('index.html')
// })

server.listen(PORT, () => {
    console.log(`running on ${PORT} boi`)
})