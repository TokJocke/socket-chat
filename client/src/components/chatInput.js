import React, { useEffect, useState } from "react";


export default function ChatInput(props) {

    const [inputValue, setValue] = useState("")
    const [showOptions, setShowOptions] = useState(false)
    const [isWriting, setIsWriting] = useState(false)

    function suggestions() {
        if(inputValue.toLowerCase().includes("joke")) {
           const jokeCategories = ["Programming", "Misc", "Dark", "Pun"] 
            return (
                <div style={suggestionDiv}>
                    {
                        jokeCategories.map((category) => {
                            return (
                                <p onClick={() => setValue("/Joke." + category)}> .{category} </p>
                            )
                        })
                    }
                </div>
            )
        }
        else {
            return (
                <div style={suggestionDiv}>
                    <p onClick={() => setValue("/Bored")}>Bored</p>
                    <p onClick={() => setValue("/Joke")}>Joke</p>
                </div>
            )
        }
    }

    function updateInputValue(event){
        if(event) {
            setValue(event.target.value)
        }
        else {
            setValue("")
        }
    }
    
    function sendMessage() {
        const firstLetter = inputValue.substring(-1,1)
        if(firstLetter === "/") {
            props.socket.emit("message", {type: "cmd", msg: inputValue})
            setValue("")
        }
        else {
            props.socket.emit("message", {type: "msg", msg: inputValue})
            setValue("")
        }
    }

    function handleKeyPress(event) {
        if (event.key === "Enter") {
            sendMessage()
        }
    }
   
    useEffect(() => {
        if(inputValue.substring(-1,1) === "/") {
            setShowOptions(true)
        }
        else {
            setShowOptions(false)
        }

        inputValue.length? setIsWriting(true) : setIsWriting(false)
        
    }, [inputValue])
    
    useEffect(() => {
        if(props.socket) {
            props.socket.emit("isWriting", isWriting)
        }
    }, [isWriting])

    
    return (                                          
        <div style={chatInputWrap}>
            {showOptions? suggestions() : null}
            <input 
                onChange={updateInputValue} 
                style={inputStyle} 
                placeholder="Write a message or / for commands" 
                value={inputValue} 
                onKeyPress={(event) => handleKeyPress(event)}
                autoFocus
            /> 
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
    width: "90%",
    backgroundColor: "rgb(230, 230, 230)"
}

const btnStyle = {
    width: "10%",
    backgroundColor: "lightgreen",
    fontSize: "1.6em",
    color: "rgb(230, 230, 230)"
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