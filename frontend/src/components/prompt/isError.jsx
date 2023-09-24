import React from "react"
const IsError = (props) => {
    const {message}=props
    return ( <>
    <p className="w-full"
     style={{position: "fixed",bottom: "0",left: "0",marginLeft: "2em",fontSize: "0.7em",color: "red",fontWeight: "bold",}}>{message}</p>
    </> );
}
 
export default IsError;