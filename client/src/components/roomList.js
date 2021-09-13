import React, { useState, useEffect } from "react";



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

    useEffect(() => {
        console.log("in effect")
        if(props.socket) {        
        props.socket.on('rooms', (rooms) => {
            console.log("rooms", rooms)
            setRooms(rooms) 
        })   
    }
    }, [props.socket])
    

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
                                                    return <p>{user.name}</p>
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

