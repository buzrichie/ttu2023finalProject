import React, { useState } from "react";
import fetchDataPost from "../usePostFetch";
import CreateSubjectForm from "./CreateSubjectForm";

function Subject() {
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
      <h1>Subject</h1>
      <CreateSubjectForm />
    </div>
  );
}

export default Subject;
