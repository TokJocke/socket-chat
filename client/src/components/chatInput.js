import React from "react";



export default function ChatInput(props) {



    return (
                                                    
        <div style={chatInputWrap}>
            <input style={inputStyle} placeholder={props.name} /> {/* props.name ska inte lägga här, bara för test */}
            <button style={btnStyle}>
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