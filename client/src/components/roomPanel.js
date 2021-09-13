import React, { useEffect, useState } from "react";



export default function RoomPanel(props) {
    
    const [roomName, setRoomName] = useState("")
    const [pw, setPw] = useState(undefined)

    function createRoom() {
        props.socket.emit('createRoom', {name: roomName, pw: pw})
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


    return (
                                                    
        <div style={panelStyle}>
            <input onChange={updateRoomName} placeholder="Write something..." /> 
            <input onChange={updatePw} placeholder="Write something..." /> 
            <button onClick={() => createRoom()}>Skapa rum</button>
        </div>
    )
}

const panelStyle = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    backgroundColor: "orange"
}
