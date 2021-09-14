import React from "react";



export default function Header() {



    return (
                                                    
        <div style={headerStyle}>
            <h1>tjötAlot    </h1>
        </div>
    )
}

const headerStyle = {
    display: "flex",
    width: "100%",
    height: "10%",
    backgroundColor: "rgb(33, 33, 33)",
    color: "rgb(230, 230, 230)",
    paddingLeft: "15px"
}