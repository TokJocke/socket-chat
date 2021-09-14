import {createRoom, joinRoom, leaveRoom, roomCheck, findUser } from "./socketFunctions.js"
import { makeJoke, makeReq, getBored } from "./apiFuncs.js";




export default async function socketController(io) {
    
  let rooms = []

    io.on("connection", (socket) => {
      console.log("client connected");
      /* Save user */
      socket.on('onConnect', (newUser) => { //Borde kanske heta onConnect
        const user = {
          name: newUser,
          id: socket.id,
          isWriting: false
        }
        !rooms.length? createRoom(rooms, "General") : null
        joinRoom(rooms, "General", user, socket, io)
        io.emit("rooms", rooms)
      })  
      /* Is writing */
      socket.on('isWriting', (bool) => {
        const foundUser = findUser(rooms, socket)
        foundUser.user.isWriting = bool
        io.emit("rooms", rooms)
      })

      /* Send Message */
      socket.on('message', async (incoming) => {  
         const foundUser = findUser(rooms, socket)
          if(foundUser.user) {    
            if(incoming.type === "cmd") {
              if(incoming.msg.toLowerCase().includes("joke")) {
                const msg = {msg: await makeJoke(incoming.msg), name: foundUser.user.name, type: incoming.type}
                io.to(foundUser.room.name).emit('message', msg)
              }
              else if(incoming.msg.toLowerCase().includes("bored")) {
                const msg = {msg: await getBored(), name: foundUser.user.name, type: incoming.type}
                io.to(foundUser.room.name).emit('message', msg)
              }
            }
            else {
              const msg = {msg: incoming.msg, name: foundUser.user.name, type: incoming.type}
              io.to(foundUser.room.name).emit('message', msg)
            }
          }
      })
      /* Create room */
      socket.on('createRoom', (room) => {
        createRoom(rooms, room.name, room.pw)   
        const foundUser = findUser(rooms, socket)
        if(foundUser.user) {
          leaveRoom(rooms, socket, foundUser.user)
          joinRoom(rooms, room.name, foundUser.user, socket, io, room.pw)
          roomCheck(rooms)
        }
        io.emit("rooms", rooms)
      }) 
      /* Join */
      socket.on('join', (room) => {
        const foundUser = findUser(rooms, socket)
        if(foundUser.user && foundUser.room.name !== room.name) {
          joinRoom(rooms, room.name, foundUser.user, socket, io, room.pw)
          roomCheck(rooms)
          io.emit("rooms", rooms)  
        }
      })
      /* Disconnect */
      socket.on("disconnect", () => {
        const foundUser = findUser(rooms, socket)
        if(foundUser) {
          leaveRoom(rooms, socket, foundUser)
          roomCheck(rooms)
          io.emit("rooms", rooms)
          console.log(socket.name, " Disconnected")
        }
      })
 
 
  })  
}

