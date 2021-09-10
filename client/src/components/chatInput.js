import React, { useEffect, useState } from "react";



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
        const firstLetter = inputValue.substring(-1,1)
        if(firstLetter === "/") {
            props.socket.emit("message", {type: "cmd", msg: inputValue})
            console.log("thats amazing")
        }
        else {

            props.socket.emit("message", {type: "msg", msg: inputValue})
            setValue("")
            console.log("message sent")
        }
    }

    useEffect(() => {
        console.log(inputValue, "in effect input")
        console.log("first letter= ", inputValue.substring(-1,1))
    }, [inputValue])
 
    

    return (
                                                    
        <div style={chatInputWrap}>
            <input onChange={updateInputValue} style={inputStyle} placeholder="Write something..." /> 
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