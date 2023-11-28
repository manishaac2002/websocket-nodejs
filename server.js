// server side
// imports
const express = require("express")
const http = require("http")
const socket = require("socket.io")

const app=express()
const server=http.createServer(app)
const io=socket(server)

let users =[]

// channels 
const message ={
    general:[],
    Random:[],
    jokes:[],
    javascript:[]
}

// user connection established
io.connection('',()=>{
    socket.on("join users",(username)=>{
        const user ={
            username,
            id:socket.id
        }
        user.push(user)
        io.emit("new user,user")
        console.log("user joined");
    })

    // call back 
    socket.on("join room",(roomName,callBack)=>{
        socket.join(roomName)
        callBack(message[roomName])
    })

})

// port
server.listen(2000,()=>{
    console.log("Server is running on port");
})