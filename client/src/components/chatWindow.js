import React, { useState, useEffect } from "react";


export default function ChatWindow(props) {

    const [msg, setMsg] = useState([])
    const [response, setResponse] = useState()

    useEffect(() => {
        if(props.socket) {
            console.log("socket exists, ", props.socket)
            props.socket.on("message", (incoming) => {
                console.log("incoming: ", incoming)
                if(incoming) {
                    setResponse(incoming)
                }
            })        
        }
              
    }, [props.socket]) 

    useEffect(() => { /* Testa funktion */
        const newArr = [...msg]
        if(response) {
    
            newArr.push(response)
            setMsg(newArr)
            console.log(response)
           
        } 

    }, [response])

    useEffect(() => {
        console.log("Lookielookie: ", msg)
    }, [msg])
    
    return (
                                                    
        <div style={chatWindowStyle}>
            { 
                msg.length?
                    msg.map((item, i) => {
                        return (
                            <div key={i} style={msgStyle}> 
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