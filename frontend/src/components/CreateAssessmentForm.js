import React, { useState } from "react";

function CreateAssessmentForm() {
  const [formData, setFormData] = useState({
    _Subject: "", // Assuming this represents Subject name
    _Student: "", // Assuming this represents Student's full name
    _Teacher: "", // Assuming this represents Teacher's full name
    name: "",
    score: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/assessment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        // Handle successful creation, e.g., show a success message
        console.log("Assessment created successfully!");
      } else {
        // Handle error response, e.g., display an error message
        const data = await response.json();
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
