import React, { useState } from "react";

function MessageTextarea() {
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <textarea
      id="prompt-textarea"
      tabIndex="0"
      rows="1"
      placeholder="Send a message"
      value={message}
      onChange={handleChange}
      style={{
        maxHeight: "200px",
        height: "24px",
        overflowY: "hidden",
      }}
    ></textarea>
  );
}

export default MessageTextarea;
