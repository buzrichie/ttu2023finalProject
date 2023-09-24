import React from "react"
const Loading = (props) => {
    const {message}=props
    return ( <>
    <p className="w-full"
     style={{position: "fixed",bottom: "0",left: "0",marginLeft: "2em",fontSize: "0.8em",color: "#444",fontWeight: "bold",}}>{message}</p>
    </> );
}
 
export default Loading;