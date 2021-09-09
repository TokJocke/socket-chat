import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import socketController from "./socketController.js";
const httpServer = createServer(express);
const port = 3000
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
    allowedHeaders: ["Access-Control-Allow-Origin"],
    credentials: true
  }
});

socketController(io)

httpServer.listen(port, () => {
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