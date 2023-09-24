import React from "react";
const Header = (props) => {
    const {heading} = props
    return ( <><h2 className="text-xl font-semibold pt-4 mb-3">{heading}</h2></> );
}
 
export default Header;