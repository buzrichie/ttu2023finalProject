import React, { useState } from "react";

function CreateSchoolForm() {
  const [formData, setFormData] = useState({
    _AcademicLevel: "",
    _Student: "",
    _Teacher: "",
    _Subject: "",
    schoolName: "",
    phoneNumber: "",
    emailAddress: "",
    principal: "",
    street: "",
    wpsAddress: "",
    state: "",
    city: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/school/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        // Handle successful creation, e.g., show a success message
        console.log("School created successfully!");
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
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="_AcademicLevel">Academic Level:</label>
          <input
            type="text"
            name="_AcademicLevel"
            value={formData._AcademicLevel}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="_Student">Student:</label>
          <input
            type="text"
            name="_Student"
            value={formData._Student}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="_Teacher">Teacher:</label>
          <input
            type="text"
            name="_Teacher"
            value={formData._Teacher}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="_Subject">Subject:</label>
          <input
            type="text"
            name="_Subject"
            value={formData._Subject}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="schoolName">School Name:</label>
          <input
            type="text"
            name="schoolName"
            value={formData.schoolName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="emailAddress">Email Address:</label>
          <input
            type="email"
            name="emailAddress"
            value={formData.emailAddress}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="principal">Principal:</label>
          <input
            type="text"
            name="principal"
            value={formData.principal}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="street">Street:</label>
          <input
            type="text"
            name="street"
            value={formData.street}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="wpsAddress">WPS Address:</label>
          <input
            type="text"
            name="wpsAddress"
            value={formData.wpsAddress}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="state">State:</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="city">City:</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Create School</button>
      </form>
    </>
  );
}

export default CreateSchoolForm;
