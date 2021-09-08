const { v4: uuidv4 } = require('uuid');
const fs = require("fs")
const express = require('express')
const app = express()
const http = require('http').createServer(app)
const ioLib = require('socket.io')
const io = ioLib(http, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
    allowedHeaders: ["Access-Control-Allow-Origin"],
    credentials: true
  }
})
const port = 3000

let users = []

io.on("connection", (socket) => {
  console.log("client connected");
  let rawData = fs.readFileSync("rooms.json")
  let rooms = JSON.parse(rawData)
  socket.emit("rooms", rooms)
  

socket.on('saveUser', (newUser) => {
  users.push({
    id: socket.id,
    name: newUser
  })
  console.log(users)
})  

  socket.on('message', (incoming) => {
   const findUser = users.find((user) => user.id === socket.id)
    console.log(incoming, "in here")
    newIncoming = {msg: incoming.msg, name: findUser.name}
    io.emit('message', newIncoming)
  })

  socket.on('createRoom', (room) => {
    let rawData = fs.readFileSync("rooms.json")
    let rooms = JSON.parse(rawData)
    rooms.push({
      id: uuidv4(),
      name: room,
      users: []     
    })
    fs.writeFileSync("rooms.json", JSON.stringify(rooms))
    io.emit('rooms', rooms)
  }) 

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    const filterUsers = users.filter((user) => socket.id !== user.id)
    users = filterUsers
    console.log(users)
  })
})

 

http.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })




