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

let rooms = []

function createRoom(socket, newRoom) {
  const roomCheck = rooms.find((room) => room.name === newRoom)
  if(!roomCheck) {
    rooms.push({
      name: newRoom,
      password: undefined,
      users: [],
    })
    console.log(users)
  }
}



/* function joinRoom(socket, newRoom) {
  if(!newRoom) {
    createRoom(socket, "General")
    const foundRoom = rooms.find((room) => room.name === "General")
    foundRoom.users.push({
      id: socket.id,
      name: socket.name
    })
    console.log(rooms[0].users)
  }


}
 */

io.on("connection", (socket) => {
  console.log("client connected");
  socket.emit("rooms", rooms)
  
  
  /* Save user */
  socket.on('saveUser', (newUser) => { //Borde kanske heta onConnect
      socket.name = newUser
  })  

  



/* Send Message */
  socket.on('message', (incoming) => {  
    console.log(incoming, "in here")
    newIncoming = {msg: incoming.msg, name: socket.name}
    io.emit('message', newIncoming)
  })
/* Disconnect */
  socket.on("disconnect", () => {
    console.log(socket.name, " Disconnected")
  })
})

http.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })























/*   socket.on('createRoom', (room) => {
    let rawData = fs.readFileSync("rooms.json")
    let rooms = JSON.parse(rawData)
    rooms.push({
      id: uuidv4(),
      name: room,
      users: []     
    })
    fs.writeFileSync("rooms.json", JSON.stringify(rooms))
    io.emit('rooms', rooms)
  })  */