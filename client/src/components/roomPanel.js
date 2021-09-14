import React, { useEffect, useState } from "react";



export default function RoomPanel(props) {
    
    const [roomName, setRoomName] = useState("")
    const [pw, setPw] = useState(undefined)

    function createRoom() {
        props.socket.emit('createRoom', {name: roomName, pw: pw})
      
/*         props.socket.on('error', (errorMsg) => {
            console.log(errorMsg)
        }) */

    }

    function updateRoomName(event){
        event? setRoomName(event.target.value) : setRoomName("")
            console.log(roomName)      
    }

    function updatePw(event) {
        event? setPw(event.target.value) : setPw("")     
        console.log(pw)     
    }

    useEffect(() => {
        if(pw === "") {
            setPw(undefined)
        }
    }, [pw])

/*     useEffect(() => {
        console.log("in effect: ", props.socket)
        if(props.socket) {        
            props.socket.on('error', (errorMsg) => {
                console.log(errorMsg)
            })     
        }
    }, [props.socket]) */


    return (
                                                    
        <div style={panelStyle}>
            <h1>
                Create Room
            </h1>
            <input style={inputStyle}onChange={updateRoomName} placeholder="Room name..." /> 
            <input style={inputStyle} onChange={updatePw} placeholder="Password..." /> 
            <button style={btnStyle} onClick={() => createRoom()}>Create</button>
        </div>
    )
}

const panelStyle = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginBottom: "20px"
}

const inputStyle = {
    fontSize: "1.3em",
}

const btnStyle = {
    fontSize: "1.5em",
    backgroundColor: "lightgreen",
    color: "rgb(230, 230, 230)",
    cursor: "pointer"
}