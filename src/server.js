const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = process.env.PORT || 4000;

//on = escutar, emit = emitir

const users = [];


io.on('connection', (socket)=>{

    socket.on("join", (name)=>{
        const user = {id: socket.id, name};
        users.push(user);
        io.emit("users", users)
    })

    socket.on("joinRoom", (room)=>{
        socket.join(room);
        console.log(`logou em ${room}`);
    })

    socket.on("message", (message, room)=>{
        io.to(room).emit("message", message);
        console.log("nome:", message.name, "mensagem:", message.content, "room:", message.room)
    })
})

server.listen(port, ()=>console.log(`server na porta ${port}`))
