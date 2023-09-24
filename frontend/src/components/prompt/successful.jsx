import React from "react"
const Successful = (props) => {
    const {message}=props
    return ( <>
    <p className="w-full"
     style={{position: "fixed",bottom: "0",textAlign: "right",right: "10px",fontSize: "1em",color: "green",fontWeight: "bold",}}>{message}</p>
    </> );
}
 
export default Successful;