import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";


export default function ChatInput(props) {

    const [inputValue, setValue] = useState("")

    function updateInputValue(event){
        if(event) {
            setValue(event.target.value)
            console.log(inputValue)
        }
      
        else {
            setValue("")
        }
    }

    function sendMessage() {
       const socket = socketIOClient("http://localhost:3000") 
       socket.emit("message", {name: props.name, msg: inputValue})
       setValue("")
       console.log("message sent")
    }
 
    


    return (
                                                    
        <div style={chatInputWrap}>
            <input onChange={updateInputValue} style={inputStyle} placeholder="Write something..." /> {/* props.name ska inte lägga här, bara för test */}
            <button onClick={() => sendMessage()} style={btnStyle}>
                Send    
            </button>
        </div>
    )
}

const chatInputWrap = {
    display: "flex",
    width: "100%",
    height: "10%",
}

const inputStyle = {
    width: "90%"
}

const btnStyle = {
    width: "10%"
}