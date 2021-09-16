import React, { useEffect, useState } from "react";



export default function RoomPanel(props) {
    
    const [roomName, setRoomName] = useState("")
    const [pw, setPw] = useState(undefined)
    const [cantCreateMsg, setCantCreateMsg] = useState()

    function createRoom() {
        setCantCreateMsg(undefined)
        props.socket.emit('createRoom', {name: roomName, pw: pw})
    }

    function updateRoomName(event){
        event? setRoomName(event.target.value) : setRoomName("")
    }

    function updatePw(event) {
        event? setPw(event.target.value) : setPw("")     
    }

    useEffect(() => {
        if(pw === "") {
            setPw(undefined)
        }
    }, [pw])


    useEffect(() => {
        props.socket.on('error', (errorMsg) => {
            setCantCreateMsg(errorMsg)
            setTimeout(() => {
                setCantCreateMsg(undefined)
            }, 5000);
        })
    }, [props.socket])

    return (
                                                    
        <div style={panelStyle}>
            <h1 style={{color: "white"}}>
                Create Room
            </h1>
            <input style={inputStyle} onChange={updateRoomName} placeholder="Room name..." /> 
            <input style={inputStyle} onChange={updatePw} placeholder="Password..." /> 
            <button style={btnStyle} onClick={() => createRoom()}>Create</button>
            <p style={{color: "red"}}>{cantCreateMsg}</p>
        </div>
    )
}

const panelStyle = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginBottom: "20px",
/*     padding: "10px"
 */}

const inputStyle = {
    fontSize: "1.3em",
}

const btnStyle = {
    fontSize: "1.5em",
    backgroundColor: "rgb(85, 150, 245)",
    color: "white",
    cursor: "pointer",
    border: "none",
    marginTop: "10px"
}