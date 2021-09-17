import React, { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default function RoomList(props) {
    
    const [roomsArr, setRooms] = useState([])
   
    function joinRoom(room) {
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
        rooms.forEach(index => {
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
        return (
            <div className="noScrollBar" style={listStyle}>  
                            { 
                                roomsArr.length?
                                    roomsArr.map((item, i) => {
                                        return (
                                            <div key={i}style={listItem} onClick={() => joinRoom(item) }> 
                                                <div style={titleWrap}>
                                                    <p style={roomNameStyle}> {item.name} </p> {/* Title */}
                                                </div>
                                                <div style={userList}>
                                                    <p style={{...userTitle, color: "rgb(230, 230, 230)"}}>users:</p> 
                                                    {   
                                                        item.users.length?
                                                            item.users.map((user) => {
                                                                if(user.id === foundUser.user.id) {
                                                                    return (
                                                                        <div key={user.id} style={userStatus}>
                                                                            <p style={{...currentUser, ...userNameStyle}}>{user.name}</p>
                                                                        </div>
                                                                    )
                                                                }
                                                                else {
                                                                    if(user.isWriting) {  
                                                                        return (
                                                                            <div key={user.id} style={userStatus}> {/* Fixa loader */}
                                                                                <p style={userNameStyle}>{user.name} </p> 
                                                                                <Loader 
                                                                                    type="ThreeDots"
                                                                                    color="white"
                                                                                    width="40"
                                                                                    height="100%"
                                                                                />
                                                                            </div>
                                                                        )
                                                                    }
                                                                    else 
                                                                        return (
                                                                            <div key={user.id} style={userStatus}>
                                                                                <p style={userNameStyle}>{user.name}</p>
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
        if(props.socket) {        
            props.socket.on('rooms', (rooms) => {
                setRooms(rooms) 
                console.log(rooms, "iim in hererere")
            })     
        }
    }, [props.socket])
    

    
    return renderRoomList()
}

const listStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    overflow: "auto"

    
}

const listItem = {
    cursor: 'pointer',
    marginBottom: "10px"
}

const userList = {
    backgroundColor: "rgb(53, 53, 53)",
    display: "flex",
    flexDirection: "column"
}

const roomNameStyle = {
    fontSize: "1.5em",
    fontWeight: "bold",
}

const userTitle = {
    fontSize: "1.5em",
    fontWeight: "bold",
    marginBlockStart: 0,
    marginBlockEnd: 0
}

const currentUser = {
    fontWeight: "bold"
}

const userStatus = {
    display: "flex",
    alignItems: "center",    
    height: "4vh",
    paddingLeft: "5px"
}

const userNameStyle = {
    marginRight: "0.5em",
    color: "rgb(230, 230, 230)"
}

const titleWrap = {
    backgroundColor: 'rgb(85, 150, 245)',
    color: "white",
    margin: "0",
    display: "flex",
    justifyContent: "center"
}