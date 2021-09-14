import React, { useState, useEffect, useRef } from "react";


export default function ChatWindow(props) {

    const [msg, setMsg] = useState([])
    const [response, setResponse] = useState()
    const messagesEndRef = useRef(null)

    function scrollToBottom(div) {
/*         let shouldScroll = messagesEndRef.current.getBoundingClientRect().bottom
        let windowHeight = window.innerHeight */
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        if(props.socket) {
            props.socket.on("message", (incoming) => {
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
        scrollToBottom()
    }, [msg])

    
    return (
                                                    
        <div className="noScrollBar" style={chatWindowStyle}>
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

            <div ref={messagesEndRef} />
        </div>
    )
}

const chatWindowStyle = {
    display: 'flex',
    flexDirection: 'column',
    widht: "100%",
    height: "90%",
    backgroundColor: "rgb(230, 230, 230)",
    overflow: "auto"
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