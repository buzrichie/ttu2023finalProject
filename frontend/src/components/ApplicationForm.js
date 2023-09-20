import React, { useState } from "react";
import usePostFetch from "../usePostFetch";

function ApplicationForm() {
  const { token } = JSON.parse(localStorage.getItem("user"));
  if (!token) {
    return;
  }

  const [formData, setFormData] = useState({
    _Subject: "",
    applicationDate: "",
    _School: "",
    // Add more form fields here if needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const { data, loading, error, postData } = usePostFetch(
    "/api/application/",
    token
  );

  if (data) {
    console.log(data);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    postData(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="_Subject">Subject:</label>
        <input
          type="text"
          id="_Subject"
          name="_Subject"
          value={formData._Subject}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="applicationDate">Application Date:</label>
        <input
          type="date"
          id="applicationDate"
          name="applicationDate"
          value={formData.applicationDate}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="_School">School:</label>
        <input
          type="text"
          id="_School"
          name="_School"
          value={formData._School}
          onChange={handleChange}
          required
        />
      </div>
      {/* Add more form fields here if needed */}
      <button type="submit">Submit</button>
    </form>
  );
}

export default ApplicationForm;
