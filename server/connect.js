const express = require("express");

function connnectFuncs(socket) {
  console.log("client connected");
  let rawData = fs.readFileSync("rooms.json")
  let rooms = JSON.parse(rawData)
  socket.emit("rooms", rooms)

  socket.on('saveUser', (newUser) => {
    socket.name = newUser
  
    console.log(socket.name, "denna")
})  

socket.on('message', (incoming) => {  
 const findUser = users.find((user) => user.id === socket.id)
  console.log(incoming, "in here")
  newIncoming = {msg: incoming.msg, name: findUser.name}
  io.emit('message', newIncoming)
})



  socket.on("disconnect", () => {
    console.log(socket.name, " Disconnected")
  })

}

module.exports = connnectFuncs;