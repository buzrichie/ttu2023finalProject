import React, { useState } from "react";
import usePostFetch from "../usePostFetch";

function CreateTeacherForm() {
  const { token } = JSON.parse(localStorage.getItem("user"));
  if (!token) {
    return;
  }
  const [formData, setFormData] = useState({
    firstName: "",
    surName: "",
    dateOfBirth: "",
    email: "",
    phone: "",
    qualification: "",
    teachingExperience: "",
    gender: "",
    street: "",
    wpsAddress: "",
    state: "",
    city: "",
    _School: "", // Assuming this represents School ID
    _Subject: "", // Assuming this represents Subject ID
  });

  const { data, loading, error, postData } = usePostFetch(
    "/api/teacher/",
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
  const fetchData = useFetchPost("api/teacher/", formData);
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="surName">Surname:</label>
        <input
          type="text"
          name="surName"
          value={formData.surName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="dateOfBirth">Date of Birth:</label>
        <input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="phone">Phone Number:</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="qualification">Qualification:</label>
        <input
          type="text"
          name="qualification"
          value={formData.qualification}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="teachingExperience">Teaching Experience:</label>
        <input
          type="text"
          name="teachingExperience"
          value={formData.teachingExperience}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="gender">Gender:</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
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
      <div>
        <label htmlFor="_School">School ID:</label>
        <input
          type="text"
          name="_School"
          value={formData._School}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="_Subject">Subject ID:</label>
        <input
          type="text"
          name="_Subject"
          value={formData._Subject}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Create Teacher</button>
    </form>
  );
}

export default CreateTeacherForm;
