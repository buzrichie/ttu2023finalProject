import React, { useState } from "react";

function SchoolForm() {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/school/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error);
      }
      setLoading(false);
      console.log(data);
      // Handle success or error messages here
    } catch (error) {
        setLoading(false);
        setError(error.message);
      console.error(error.message);
      // Handle error messages here
    }
  };

  return (
    <>
    <div>
      <h2>Create School</h2>
      <form onSubmit={handleSubmit}>
        {/* Academic Level */}
        <label>
          Academic Level:
          <input
            type="text"
            name="_AcademicLevel"
            value={formData._AcademicLevel}
            onChange={handleChange}
          />
        </label>

        {/* Student */}
        <label>
          Student:
          <input
            type="text"
            name="_Student"
            value={formData._Student}
            onChange={handleChange}
          />
        </label>

        {/* Teacher */}
        <label>
          Teacher:
          <input
            type="text"
            name="_Teacher"
            value={formData._Teacher}
            onChange={handleChange}
          />
        </label>

        {/* Subject */}
        <label>
          Subject:
          <input
            type="text"
            name="_Subject"
            value={formData._Subject}
            onChange={handleChange}
          />
        </label>

        {/* School Name */}
        <label>
          School Name:
          <input
            type="text"
            name="schoolName"
            value={formData.schoolName}
            onChange={handleChange}
            required
          />
        </label>

        {/* Phone Number */}
        <label>
          Phone Number:
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </label>

        {/* Email Address */}
        <label>
          Email Address:
          <input
            type="email"
            name="emailAddress"
            value={formData.emailAddress}
            onChange={handleChange}
            required
          />
        </label>

        {/* Principal */}
        <label>
          Principal:
          <input
            type="text"
            name="principal"
            value={formData.principal}
            onChange={handleChange}
            required
          />
        </label>

        {/* Street */}
        <label>
          Street:
          <input
            type="text"
            name="street"
            value={formData.street}
            onChange={handleChange}
            required
          />
        </label>

        {/* WPS Address */}
        <label>
          WPS Address:
          <input
            type="text"
            name="wpsAddress"
            value={formData.wpsAddress}
            onChange={handleChange}
            required
          />
        </label>

        {/* State */}
        <label>
          State:
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />
        </label>

        {/* City */}
        <label>
          City:
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Create School</button>
      </form>
    </div>
    {loading && <Loading message="Processing request..." />}
            {error && <IsError message={error} />}
            </>
  );
}

export default SchoolForm;
