import React, { useEffect, useState } from "react";



export default function ChatInput(props) {

    const [inputValue, setValue] = useState("")
    const [showOptions, setShowOptions] = useState(false)

    function suggestions() {
        if(inputValue.includes("joke")) {
           const jokeCategories = ["Programming", "Misc", "Dark", "Pun"] 
            return (
                <div style={suggestionDiv}>
                    {
                        jokeCategories.map((category) => {
                            return (
                                <p> .{category} </p>
                            )
                        })
                    }
                </div>
            )
        }

        else {
            return (
                <div style={suggestionDiv}>
                    <p>Bored</p>
                    <p>Joke</p>
                </div>
            )
        }
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
        if(inputValue.substring(-1,1) === "/") {
            setShowOptions(true)
        }
        else {
            setShowOptions(false)
        }
    }, [inputValue])
 
    

    return (
                                                    
        <div style={chatInputWrap}>
            {showOptions? suggestions() : null}
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
    position: 'relative'
}

const inputStyle = {
    width: "90%"
}

const btnStyle = {
    width: "10%"
}

const suggestionDiv = {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column-reverse',
    bottom: '10vh',
    marginLeft: '10px',
    border: '1px solid black',
    borderRadius: '10px',
    padding: '5px',
    backgroundColor: 'RGBA(220, 220, 220, 0.5)'
}