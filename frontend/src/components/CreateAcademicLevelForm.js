import React, { useState } from "react";

function CreateAcademicLevelForm() {
  const [formData, setFormData] = useState({
    _Subject: "", // Assuming this represents Subject ID
    level: "",
    _School: "", // Assuming this represents School ID
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/academic-level/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        // Handle successful creation, e.g., show a success message
        console.log("Academic level created successfully!");
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
        <label htmlFor="_Subject">Subject ID:</label>
        <input
          type="text"
          name="_Subject"
          value={formData._Subject}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="level">Class:</label>
        <input
          type="text"
          name="level"
          value={formData.level}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="_School">School ID:</label>
        <input
          type="text"
          name="_School"
          value={formData._School}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Create Academic Level</button>
    </form>
  );
}

export default CreateAcademicLevelForm;
