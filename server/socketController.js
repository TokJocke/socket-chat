import {createRoom, joinRoom, leaveRoom, roomCheck, findUser } from "./socketFunctions.js"

export default function socketController(io) {
    
  let rooms = []

    io.on("connection", (socket) => {
      console.log("client connected");
     // socket.emit("rooms", rooms)
      
      
      /* Save user */
      socket.on('onConnect', (newUser) => { //Borde kanske heta onConnect
        //socket.name = newUser
        const user = {
          name: newUser,
          id: socket.id
        }
        !rooms.length? createRoom(rooms, "General") : null
        joinRoom(rooms, "General", user, socket, io)
        io.emit("rooms", rooms)
      })  
      /* Send Message */
      socket.on('message', (incoming) => {  
        rooms.forEach(room => {
          const foundUser = room.users.find((user) => user.id == socket.id)
          if(foundUser) {
            const msg = {msg: incoming.msg, name: foundUser.name}
            io.to(room.name).emit('message', msg)
          }
        });
      })
      /* Create room */
      socket.on('createRoom', (room) => {
        console.log(room, "in create room")
        createRoom(rooms, room.name, room.pw)   
        const foundUser = findUser(rooms, socket)
        if(foundUser) {
          leaveRoom(rooms, socket, foundUser)
          joinRoom(rooms, room.name, foundUser, socket, io, room.pw)
          roomCheck(rooms)
          console.log(rooms)
        }
        io.emit("rooms", rooms)
      }) 
      /* Join */
      socket.on('join', (room) => {
        console.log(room, "room in join")
        const foundUser = findUser(rooms, socket)
        console.log(findUser(rooms, socket))
        if(foundUser) {
          joinRoom(rooms, room.name, foundUser, socket, io, room.pw)
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

