import React, { useState, useEffect } from "react";
import Loader from "./loader";
export default function RoomList(props) {
    
    const [roomsArr, setRooms] = useState([])
   
    function joinRoom(room) {
        console.log(room)
        if(room.password) {
          const pw = window.prompt("Skriv in lösenord")
          let roomProp = {name: room.name, pw: pw}
          props.socket.emit("join", roomProp)
        }
        else {
            props.socket.emit("join", {name: room.name, pw: undefined})
        }
    }

    function findUser(rooms, socket) {
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

    function renderRoomList() {
        let foundUser = findUser(roomsArr, props.socket)
        console.log(roomsArr)
        return (
            <div style={listStyle}>  
                            { 
                                roomsArr.length?
                                    roomsArr.map((item, i) => {
                                        return (
                                            <div key={i}style={listItem} onClick={() => joinRoom(item) }> 
                                                <p style={roomNameStyle}> {item.name} </p>
                                                <div style={userList}>
                                                    users: 
                                                    {   
                                                        item.users.length?
                                                            item.users.map((user) => {
                                                                if(user.id === foundUser.user.id) {
                                                                    return (
                                                                        <div style={userStatus}>
                                                                            <p style={currentUser}>{user.name}</p>
                                                                        </div>
                                                                    )
                                                                }
                                                                else {
                                                                    if(user.isWriting) {  
                                                                        return (
                                                                            <div style={userStatus}> {/* Fixa loader */}
                                                                                <p>{user.name} </p>
                                                                                <p>is writing</p>
                                                                            </div>
                                                                        )
                                                                    }
                                                                    else 
                                                                        return (
                                                                            <div style={userStatus}>
                                                                                <p>{user.name}</p>
                                                                            </div>
                                                                        )
                                                                }
                                                            })   
                                                            :
                                                            null
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })
                                :
                                "Finns inga rum"
                            } 
            </div>
        )
    }

    useEffect(() => {
        console.log("in effect: ", props.socket)
        if(props.socket) {        
            props.socket.on('rooms', (rooms) => {
                setRooms(rooms) 
            })     
        }
    }, [props.socket])
    

    
    return renderRoomList()
}

const listStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    backgroundColor: 'grey'
}

const listItem = {
    border: '1px solid black',
    cursor: 'pointer'
}

const userList = {
    backgroundColor: "rgba(230, 230, 230, 0.7)"
}

const roomNameStyle = {
    fontSize: "1.5em",
    fontWeight: "bold"
}

const currentUser = {
    fontWeight: "bold"
}

const userStatus = {
    display: "flex"
}