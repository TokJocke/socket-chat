import React, { useEffect, useState } from "react";


export default function Loader() {
   
    let [count, setCount] = useState(1)
 
    setInterval(() => {
        if(count === 3) {
            console.log("if", count)
            setCount(1)
        }
        else {
            console.log("else ", count)
            setCount(count++)
        } 
    }, 500);

    useEffect(() => {
        console.log(count)

       
    }, [count, setCount])

    function counter() {
        for(let i = 0; i < count; i++) {
            return <p>.</p>
        }
    }

    return (                                          
        <div style={loaderStyle}>
            aa: {counter()}
        </div>
    )
}

const loaderStyle = {
    display: "flex",
    width: "10px",
    height: "10px"
}