import React, { useState } from "react";
import fetchDataPost from "../fetchDataPost";

function CreateAcademicLevelForm() {
  const [formData, setFormData] = useState({
    _Subject: "", // Assuming this represents Subject ID
    level: "",
    _School: "", // Assuming this represents School ID
  });
  const [data, setData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));

    console.log(user);
    let fData = await fetchDataPost(
      "/api/academicLevel/",
      formData,
      user.token
    );
    if (fData) {
      console.log(fData);
      setData(fData);
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
