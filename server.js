// server side
// imports
const express = require("express")
const http = require("http")
const socket = require("socket.io")

const app = express()
const server = http.createServer(app)
const io = socket(server)

let users = []

// channels 
const message = {
    general: [],
    Random: [],
    jokes: [],
    javascript: []
}

// user connection established
io.on('connection', () => {
    socket.on("join users", (username) => {
        const user = {
            username,
            id: socket.id
        }
        user.push(user)
        io.emit("new user,user")
        console.log("user joined");
    })

    // call back 
    socket.on("join room", (roomName, callBack) => {
        socket.join(roomName)
        callBack(message[roomName])
    })

    socket.on("send message", ({ content, to, sender, chatName, isChannel }) => {
        if (isChannel) {
            const payload = {
                content,
                chatName,
                sender
            }
            socket.to(to).emit("new message", payload)
        }
        else {
            const payload = {
                content,
                chatName: sender,
                sender
            }
            socket.to(to).emit("new message", payload)
        }
        if(message[chatName]){
            message[chatName].push({
                sender,
                content
            })
        }
    })
    //disconnection
    socket.on('disconnection',()=>{
        users=users.filter(u=>u.id !== socket.id)
        io.emit('new users',users)
    })
})

// port
server.listen(2000, () => {
    console.log("Server is running on port");
})