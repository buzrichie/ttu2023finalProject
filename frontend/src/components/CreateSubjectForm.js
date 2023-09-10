import React, { useState } from "react";

function CreateSubjectForm() {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    _School: "", // Assuming this represents School ID
    _AcademicLevel: "", // Assuming this represents AcademicLevel ID
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/subject/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        // Handle successful creation, e.g., show a success message
        console.log("Subject created successfully!");
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
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="code">Code:</label>
        <input
          type="text"
          name="code"
          value={formData.code}
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
      <div>
        <label htmlFor="_AcademicLevel">AcademicLevel ID:</label>
        <input
          type="text"
          name="_AcademicLevel"
          value={formData._AcademicLevel}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Create Subject</button>
    </form>
  );
}

export default CreateSubjectForm;
