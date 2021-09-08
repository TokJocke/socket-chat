import React from "react";


export default class Chat extends React.Component {
    constructor(props) {
        super(props);
    }




  
    render() {
        return (
            <div style={chatWindow}>
                {this.props.children}
            </div>
        )
    }
}

const chatWindow = {
    height: "100%",
    width: "80%",
    backgroundColor: "blue"
}
