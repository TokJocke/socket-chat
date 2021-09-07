import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const url = "http://localhost:3000";

export default function ChatWindow() {

    const [msg, setMsg] = useState([])
    const [response, setResponse] = useState()

    useEffect(() => {
        const newArr = [...msg]
        const socket = socketIOClient(url)
        socket.on("message", (incoming) => {
            if(incoming) {
                console.log(incoming, "in effect")
                setResponse(incoming)             
            }
        })
            if(response) {
                newArr.push(response)
                setMsg(newArr)
            }          
              
    }, [response]) 

    return (
                                                    
        <div style={chatWindowStyle}>
            { 
                msg.length?
                    msg.map((item) => {
                        return (
                            <div style={msgStyle}> 
                                <p style={ptag}> {item.name}:  </p>
                                <p style={ptag}> {item.msg} </p>
                            </div>
                        )
                    })
                :
                    "Finns inga meddelande"
            }
        </div>
    )
}

const chatWindowStyle = {
    display: 'flex',
    flexDirection: 'column',
    widht: "100%",
    height: "90%",
    backgroundColor: "white"
}

const msgStyle = {
    display: 'flex', 
    flexDirection: 'column',
    padding: '5px',
    backgroundColor: 'lightgrey',
    borderRadius: '10px',
    width: '40%',
    margin: '5px'
}

const ptag = {
    margin: '0'
}