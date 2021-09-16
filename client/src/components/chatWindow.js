import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'


export default function ChatWindow(props) {

    const [msg, setMsg] = useState([])
    const [response, setResponse] = useState()
    const [ifBottom, setIfBottom] = useState(true)
    const messagesEndRef = useRef(null)
    const parentDivRef = useRef(null)

    
    function onScrollEvent() {
        const bottom = Math.abs(parentDivRef.current?.scrollHeight - (parentDivRef.current?.scrollTop + parentDivRef.current?.clientHeight) <= 1);
        if(bottom) {
            setIfBottom(true)
            
        }
        else {
            setIfBottom(false)
        }
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
        } 
    }, [response])

    useEffect(() => {
        if(ifBottom) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
        }  
    }, [msg])

    
    return (
                                                    
        <div ref={parentDivRef} onScroll={() => onScrollEvent()} className="noScrollBar" style={chatWindowStyle}>
            {
            ifBottom? 
                null 
                : 
                <button onClick={() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })} style={newMsgStyle}>
                    Latest  
                    <FontAwesomeIcon icon={faArrowDown} />
                </button>
              
            }
            { 
                msg.length?
                    msg.map((item, i) => {
                        if(item.type === "notice") {
                            return (
                                <div key={i} style={noticeStyle}> 
                                    <p style={{margin: 0, color: "black"}}> {item.name + " " + item.msg}  </p>
                                </div>
                            )
                        }
                        else if(item.id === props.socket.id) {
                            return (
                                <div key={i} style={{...msgStyle, ...userMsg}}> 
                                    <p style={{...ptag, ...nameStyle}}> {item.name}:  </p>
                                    <p style={ptag}> {item.msg} </p>
                                  {/*   <p 
                                        style={{...ptag, ...dateStyle}}>{Date()}</p> */}
                                </div>
                            )
                        }
                        else {
                            return (
                                <div key={i} style={{...msgStyle, ...incomingMsg}}> 
                                    <p style={{...ptag, ...nameStyle}}> {item.name}:  </p>
                                    <p style={ptag}> {item.msg} </p>
                                  {/*   <p 
                                        style={{...ptag, ...dateStyle}}>{Date()}</p> */}
                                </div>
                            )
                        }
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
    //backgroundColor: "rgb(230, 230, 230)",
    overflow: "auto"
}

const msgStyle = {
    display: 'flex', 
    flexDirection: 'column',
    padding: '5px',
    borderRadius: '10px',
    width: '40%',
    margin: '5px'
}

const ptag = {
    margin: '0',
    color: "white",

}

const nameStyle = {
    alignSelf: "flex-start", 
    fontSize: "1.3em",
    marginLeft: "5px"
}

/* const dateStyle = {
    alignSelf: "flex-end", 
    fontSize: "0.8em"
} */

const newMsgStyle = {
    width: "15%",
    position: "absolute",
    right: "20%",
    fontSize: "1.2em",
    padding: "5px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
}

const incomingMsg = {
    backgroundColor: "grey"
}

const userMsg = {

    backgroundColor: "rgb(85, 150, 245)",
    color: "rgb(230, 230, 230)",
    alignSelf: "flex-end"
}

const noticeStyle = {
    display: "flex",
    color: "black",
    alignSelf: "center"
}