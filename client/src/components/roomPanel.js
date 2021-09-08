import React, { useState } from "react";



export default function RoomPanel(props) {
    
    const [inputValue, setValue] = useState("")
    
    function createRoom() {
        props.socket.emit('createRoom', inputValue)
    }


    function updateInputValue(event){
        if(event) {
            setValue(event.target.value)
            console.log(inputValue)
        }
      
        else {
            setValue("")
        }
    }

    return (
                                                    
        <div style={panelStyle}>
            <input onChange={updateInputValue} placeholder="Write something..." /> 
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
