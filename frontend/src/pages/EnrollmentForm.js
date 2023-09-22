import React, { useState } from "react";
import Navbar from "../components/NavBar";

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

  const fetchData = async () => {
    try {
      const response = await fetch("/api/enroll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const json = await response.json();
        localStorage.setItem("newuser", JSON.stringify(json));
        location.href = "/login";
      } else {
        const errorData = await response.json(); // Parse error response
        console.error("Login Error:", errorData.error);
      }
    } catch (error) {
      console.error("Network Error:", error.error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <>
      <Navbar />
      <div className="enrollment">
        <div className="enrollment-page">
          <div className="enrollment-bg">
            {/* The background image or content here */}
            <span
              style={{
                display: "inline-block",
                maxWidth: "70%",
                margin: "0 auto",
              }}
            >
              <img src="images/FormLogo.png" width="100%" alt="School Logo" />
            </span>
            <p>SCHOOL MASTER</p>
          </div>

          <div className="enrollment-form">
            <div className="enrollment-form-info">
              {/* <h2>Register</h2> */}
              <p>IT'S COMPLETELY FREE</p>
            </div>

            {/* Enrollment Form */}
            <form onSubmit={handleSubmit}>
              <h2>Student Information</h2>
              <div className="e-inline">
                <label htmlFor="firstName">Firstname</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="e-inline">
                <label htmlFor="surName">Surname</label>
                <input
                  type="text"
                  id="surName"
                  name="surName"
                  required
                  value={formData.surName}
                  onChange={handleChange}
                />
              </div>
              <div className="e-inline">
                <label htmlFor="dateOfBirth">DOB</label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  required
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                />
              </div>
              <div className="e-inline">
                <label htmlFor="gender">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  required
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="male">MALE</option>
                  <option value="female">FEMALE</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="e-inline">
                <label htmlFor="_AcademicLevel">Class</label>
                <input
                  type="text"
                  id="_AcademicLevel"
                  name="_AcademicLevel"
                  required
                  value={formData._AcademicLevel}
                  onChange={handleChange}
                />
              </div>
              <h2>Parent/Guardian Information</h2>
              <div className="e-inline">
                <label htmlFor="parentGuardianFirstName">Firstname</label>
                <input
                  type="text"
                  id="parentGuardianFirstName"
                  name="parentGuardianFirstName"
                  required
                  value={formData.parentGuardianFirstName}
                  onChange={handleChange}
                />
              </div>
              <div className="e-inline">
                <label htmlFor="parentGuardianSurName">Surname</label>
                <input
                  type="text"
                  id="parentGuardianSurName"
                  name="parentGuardianSurName"
                  required
                  value={formData.parentGuardianSurName}
                  onChange={handleChange}
                />
              </div>
              <div className="e-inline">
                <label htmlFor="parentGuardianEmail">Email</label>
                <input
                  type="email"
                  id="parentGuardianEmail"
                  name="parentGuardianEmail"
                  required
                  value={formData.parentGuardianEmail}
                  onChange={handleChange}
                />
              </div>
              <div className="e-inline">
                <label htmlFor="parentGuardianPhone">Phone</label>
                <input
                  type="tel"
                  id="parentGuardianPhone"
                  name="parentGuardianPhone"
                  required
                  value={formData.parentGuardianPhone}
                  onChange={handleChange}
                />
              </div>
              <label htmlFor="parentGuardianOccupation">Occupation</label>
              <input
                type="text"
                id="parentGuardianOccupation"
                name="parentGuardianOccupation"
                required
                value={formData.parentGuardianOccupation}
                onChange={handleChange}
              />
              <h2>Address</h2>
              <div className="e-inline">
                <label htmlFor="wpsAddress">WPS-Address</label>
                <input
                  type="text"
                  id="wpsAddress"
                  name="wpsAddress"
                  required
                  value={formData.wpsAddress}
                  onChange={handleChange}
                />
              </div>
              <div className="e-inline">
                <label htmlFor="state">Region</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  required
                  value={formData.state}
                  onChange={handleChange}
                />
              </div>
              <div className="e-inline">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
              <div className="e-inline">
                <label htmlFor="street">Street</label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  required
                  value={formData.street}
                  onChange={handleChange}
                />
              </div>
              <input type="submit" value="REGISTER" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EnrollmentForm;
