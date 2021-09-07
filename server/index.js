const test = require("./test");
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

io.on("connection", (socket) => {
  console.log("client connected");

  socket.on('message', (incoming) => {
    console.log(incoming)
    io.emit('message', incoming)
  })

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  })
})

 

http.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })

app.use(test)


