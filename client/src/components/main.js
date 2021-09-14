import React, { useState, useEffect } from "react";
import Chat from "./chat"
import SideBar from "./sideBar"
import ChatWindow from "./chatWindow"
import ChatInput from "./chatInput";
import RoomPanel from "./roomPanel";
import RoomList from "./roomList";
import socketIOClient from "socket.io-client";
const url = "http://localhost:3000";

export default function Main() {   

    const [socket, setSocket] = useState(null)
    const [isLogged, setIsLogged] = useState(false)
    const [inputValue, setValue] = useState("")

    function enterChat() {
        if(inputValue.length > 0) {
            const socket = socketIOClient(url)     
            setSocket(socket)
            setIsLogged(true)
            socket.emit("onConnect", inputValue)
            return () => socket.close()
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

    function handleKeyPress(event) {
        if (event.key === "Enter") {
            enterChat()
        }
    }
   
    return (
        isLogged? 
            <div style={mainStyle}>
                
                <Chat>
                    <ChatWindow socket={socket}> 
                    </ChatWindow>
                    <ChatInput /* name={name} */ socket={socket}/>
                </Chat>
                <SideBar>
                    <RoomPanel socket={socket}></RoomPanel>
                    <RoomList socket={socket}></RoomList>
                </SideBar>

            </div>
        :
            <div style={loggInModal}>
                <div style={welcomeWrap}>
                    <h1>Welcome, enter your name to start chatting</h1>
                    <div style={inputWrap}>
                        <input 
                            onChange={updateInputValue} 
                            placeholder={"Write your name..."} 
                            style={inputStyle} 
                            value={inputValue}
                            onKeyPress={(event) => handleKeyPress(event)}
                            autoFocus
                        />
                        <button 
                            onClick={() => enterChat()} 
                            style={btnStyle}>
                                Enter
                        </button>
                    </div>
                </div>
            </div>
    )
    
}

const mainStyle = {
    display: "flex",
    width: "100%",
    height: "90%",
}

const loggInModal = {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "black",
    color: "rgb(230, 230, 230)",
    alignItems: "center"
}

const inputStyle = {
    height: "5vh",
    width: "100%"
}

const welcomeWrap = {
    display: "flex",
    flexDirection: "column",
    maxWidth: "100%",
    maxHeight: "100%",
    marginTop: "10vh"
}

const inputWrap = {
    display: "flex"
}

const btnStyle = {
    width: "15%"
}