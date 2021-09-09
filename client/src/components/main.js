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
    /* 
        Api som ska integreras: 
        Skämt API,
        datum/namnsdag  
    */

  /*   const [name, setName] = useState("") */
    const [socket, setSocket] = useState(null)

    useEffect(() => {
        const name = window.prompt("Write your name")
        const socket = socketIOClient(url)     
        setSocket(socket)
        socket.emit("onConnect", name)
        return () => socket.close()
    }, [setSocket])


   
    return (
        <div style={mainStyle}>
            
            <Chat>
                <ChatWindow socket={socket}> 
                    {/* Skriv ut meddelanden */}
                </ChatWindow>
                <ChatInput /* name={name} */ socket={socket}/>
            </Chat>
            <SideBar>
                <RoomPanel socket={socket}></RoomPanel>
                <RoomList socket={socket}></RoomList>
            </SideBar>

        </div>
    )
    
}

const mainStyle = {
    display: "flex",
    width: "100%",
    height: "100%",
    
}

