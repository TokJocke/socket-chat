

export function createRoom(roomArr, roomName, pw ) {   
        roomArr.push({
            name: roomName,
            password: pw? pw : undefined,
            users: []
        })  
}

export function joinRoom(roomArr, roomName, user, socket, io, pw) {
    const foundRoom = roomArr.find((room) => room.name == roomName)
    if(foundRoom) {        
        if(foundRoom.password == pw) {
            leaveRoom(roomArr, socket, user)           
            foundRoom.users.push(user)
            socket.join(roomName)
            const msg = {msg: `has joined the room(${roomName})` , name: user.name, type: "notice"} //skicka med type
            socket.to(roomName).emit("message", msg)
        }
        else {
            socket.emit("error", "Wrong password")
            console.log("else")
        }
    }
}
export function leaveRoom(roomArr, socket, user) {
   roomArr.forEach(room => {
        const filterdUsers = room.users.filter((user) => user.id !== socket.id)
        const foundUser = findUser(roomArr, socket)
        if(foundUser) {
            socket.leave(room.name)
            room.users = filterdUsers
            const msg = {msg: "has left the room", name: user.name, type: "notice"}
            socket.to(room.name).emit("message", msg)
        }
    }); 
}

export function roomCheck(roomArr) {
    roomArr.forEach(room => {
            if(!room.users.length && room.name !== "General") {
                const findRoom = roomArr.findIndex((r) => room.name == r.name)
                roomArr.splice(findRoom, 1)
            }    
    })
}

export function findUser(rooms, socket) {
    let foundUser
    const findUser = rooms.forEach(index => {
      index.users.find((user) => {
        if(user.id === socket.id) {
          foundUser = {
              user: user,
              room: index
          }
        }
      })
    })
    return foundUser
}

export function hiddenPwArray(rooms) {
    let clonedArr = JSON.parse(JSON.stringify(rooms)); 
    clonedArr.forEach(room => {
        if(room.password) {
            room.password = true
        }
        else {
            room.password = undefined
        }
    
    });
    return clonedArr
}