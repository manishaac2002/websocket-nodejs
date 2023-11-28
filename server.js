const express = require("express")
const http = require("http")
const socket = require("socket.io")

const app=express()
const server=http.createServer(app)
const io=socket(server)

let users =[]

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

    socket.io

})

// port
server.listen(2000,()=>{
    console.log("Server is running on port");
})