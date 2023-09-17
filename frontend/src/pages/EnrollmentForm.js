import React, { useState, useEffect } from "react";

const EnrollmentForm = () => {
  const [formData, setFormData] = useState({
    _AcademicLevel: "",
    parentGuardianFirstName: "",
    parentGuardianSurName: "",
    parentGuardianEmail: "",
    parentGuardianPhone: "",
    parentGuardianOccupation: "",
    gender: "",
    street: "",
    wpsAddress: "",
    state: "",
    city: "",
    firstName: "",
    surName: "",
    dateOfBirth: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform any additional logic or validation here

    useFetchPost("/api/student", formData);
    // Send POST request
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Student Information</h2>
      <label htmlFor="_AcademicLevel">Admission Number</label>
      <input
        type="text"
        id="_AcademicLevel"
        name="_AcademicLevel"
        value={formData._AcademicLevel}
        onChange={handleChange}
        required
      />
      <label htmlFor="firstName">First Name</label>
      <input
        type="text"
        id="firstName"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        required
      />

      <label htmlFor="surName">Surname</label>
      <input
        type="text"
        id="surName"
        name="surName"
        value={formData.surName}
        onChange={handleChange}
        required
      />

      <label htmlFor="dateOfBirth">Date of Birth</label>
      <input
        type="date"
        id="dateOfBirth"
        name="dateOfBirth"
        value={formData.dateOfBirth}
        onChange={handleChange}
        required
      />

      <h2>Parent/Guardian Information</h2>
      <label htmlFor="parentGuardianFirstName">First Name</label>
      <input
        type="text"
        id="parentGuardianFirstName"
        name="parentGuardianFirstName"
        value={formData.parentGuardianFirstName}
        onChange={handleChange}
        required
      />

      <label htmlFor="parentGuardianSurName">Surname</label>
      <input
        type="text"
        id="parentGuardianSurName"
        name="parentGuardianSurName"
        value={formData.parentGuardianSurName}
        onChange={handleChange}
        required
      />

      <label htmlFor="parentGuardianEmail">Email</label>
      <input
        type="email"
        id="parentGuardianEmail"
        name="parentGuardianEmail"
        value={formData.parentGuardianEmail}
        onChange={handleChange}
        required
      />

      <label htmlFor="parentGuardianPhone">Phone</label>
      <input
        type="tel"
        id="parentGuardianPhone"
        name="parentGuardianPhone"
        value={formData.parentGuardianPhone}
        onChange={handleChange}
        required
      />

      <label htmlFor="parentGuardianOccupation">Occupation</label>
      <input
        type="text"
        id="parentGuardianOccupation"
        name="parentGuardianOccupation"
        value={formData.parentGuardianOccupation}
        onChange={handleChange}
        required
      />

      <label htmlFor="gender">Gender</label>
      <select
        id="gender"
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        required
      >
        <option value="">Select</option>
        <option value="male">MALE</option>
        <option value="female">FEMALE</option>
        <option value="other">Other</option>
      </select>

      <h2>Address</h2>
      <label htmlFor="street">Street</label>
      <input
        type="text"
        id="street"
        name="street"
        value={formData.street}
        onChange={handleChange}
        required
      />

      <label htmlFor="wpsAddress">WPS Address</label>
      <input
        type="text"
        id="wpsAddress"
        name="wpsAddress"
        value={formData.wpsAddress}
        onChange={handleChange}
        required
      />

      <label htmlFor="state">State</label>
      <input
        type="text"
        id="state"
        name="state"
        value={formData.state}
        onChange={handleChange}
        required
      />

      <label htmlFor="city">City</label>
      <input
        type="text"
        id="city"
        name="city"
        value={formData.city}
        onChange={handleChange}
        required
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default EnrollmentForm;
