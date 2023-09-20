import React, { useState } from "react";
import usePostFetch from "../usePostFetch";

function CreateAcademicLevelForm() {
  const { token } = JSON.parse(localStorage.getItem("user"));
  if (!token) {
    return;
  }

  const [formData, setFormData] = useState({
    _Subject: "",
    level: "",
    _School: "",
  });

  const { data, loading, error, postData } = usePostFetch(
    "/api/academicLevel/",
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

  return (
    <div>
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
      {data && (
        <div>
          <h2 key={data._id}></h2>
          <p>{data.level}</p>
        </div>
      )}
    </div>
  );
}

export default CreateAcademicLevelForm;
