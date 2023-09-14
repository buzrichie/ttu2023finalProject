import React, { useState } from "react";
import usePostFetch from "../usePostFetch";

function CreateAssessmentForm() {
  const { token } = JSON.parse(localStorage.getItem("user"));
  if (!token) {
    return;
  }
  const [formData, setFormData] = useState({
    _Subject: "", // Assuming this represents Subject name
    _Student: "", // Assuming this represents Student's full name
    _Teacher: "", // Assuming this represents Teacher's full name
    name: "",
    score: "",
  });

  const { data, loading, error, postData } = usePostFetch(
    "/api/assessment/",
    token
  );

  if (data) {
    console.log(data);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    postData(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="_Subject">Subject Name:</label>
        <input
          type="text"
          name="_Subject"
          value={formData._Subject}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="_Student">Student's Full Name:</label>
        <input
          type="text"
          name="_Student"
          value={formData._Student}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="_Teacher">Teacher's Full Name:</label>
        <input
          type="text"
          name="_Teacher"
          value={formData._Teacher}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="name">Assessment Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="score">Assessment Score:</label>
        <input
          type="number"
          name="score"
          value={formData.score}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Create Assessment</button>
    </form>
  );
}

export default CreateAssessmentForm;
