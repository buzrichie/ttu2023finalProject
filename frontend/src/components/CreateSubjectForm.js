import React, { useState } from "react";
import useFetchPost from "../usePostRequest";

function CreateSubjectForm() {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    _School: "", // Assuming this represents School ID
    _AcademicLevel: "", // Assuming this represents AcademicLevel ID
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fetchData = useFetchPost("/api/subject/", formData);
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
