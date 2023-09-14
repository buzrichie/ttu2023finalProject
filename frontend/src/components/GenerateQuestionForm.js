import React, { useState } from "react";
import usePostFetch from "../usePostFetch";

function GenerateQuestionForm() {
  const { token } = JSON.parse(localStorage.getItem("user"));
  if (!token) {
    return null; // Return null or any other component for unauthenticated users
  }

  const [message, setMessage] = useState("");
  const { data, loading, error, postData } = usePostFetch(
    "/api/questions",
    token
  ); // Update the URL to the correct endpoint

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construct the formData object with your desired structure
    const formData = {
      message: message,
      // Add other fields as needed
    };

    postData(formData);
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Submit</button>
    </form>
  );
}

export default GenerateQuestionForm;
