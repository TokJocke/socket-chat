import React, { CSSProperties } from "react";
import Chat from "./chat"
import SideBar from "./sideBar"
import ChatWindow from "./chatWindow"
import ChatInput from "./chatInput";

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ""
        }
    }
    /* 
        Api som ska integreras: 
        Skämt API,
        datum/namnsdag  
    */

    componentDidMount() {
        const bla = window.prompt("Write your name")
        this.setState({
            name: bla
        }, () => console.log(this.state.name))
    }

  
    render() {
        return (
            <div style={mainStyle}>
               
                <Chat>
                    <ChatWindow> 
                        {/* Skriv ut meddelanden */}
                    </ChatWindow>
                    <ChatInput name={this.state.name}/>
                </Chat>
                <SideBar>

                </SideBar>

            </div>
        )
    }
}

const mainStyle = {
    display: "flex",
    width: "100%",
    height: "100%",
    
}

