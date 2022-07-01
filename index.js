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


let users = [];

//socket.on('name_of_event', (data)=>{}) . Here on is listening for the event and data is the payload received from the frontend
// socket.emit('name_of_other_event' , data) . Here socket is emitting another event with a payload called data
io.on("connection", (socket)=>{ // this way we listen to events. This is the connection event.
    console.log(`the connected user is ${socket.id}`)
    
    //custom events
    // socket.on("join_room", (data)=>{ //data is the json obj that was received
    //     socket.join(data.room);
    //     console.log(`User with id: ${socket.id} joined the room:${data.room}`)
    // })
    socket.on("send_message",(data)=>{
        payload = {
            text: data,
            user: socket.id
        }
        socket.broadcast.emit('receive_message',(payload))
        // socket.emit('receive_message', data);
        // socket.broadcast.emit("receive_message", data)
    })
    socket.on("disconnect", ()=>{
        console.log("User disconnected", socket.id);
        payload = {
            user: socket.id
        }
    })
})


app.get("/", (req, res) => {
    res.sendFile('index.html')
})

server.listen(PORT, () => {
    console.log(`running on ${PORT} boi`)
})