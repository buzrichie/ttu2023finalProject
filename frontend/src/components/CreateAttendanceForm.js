import React, { useState } from "react";
import usePostFetch from "../usePostFetch";

function CreateAttendanceForm() {
  const { token } = JSON.parse(localStorage.getItem("user"));
  if (!token) {
    return;
  }
  const [formData, setFormData] = useState({
    _Student: "", // Assuming this represents Student's full name
    _Teacher: "", // Assuming this represents Teacher's full name
    status: "",
    date: "",
  });

  const { data, loading, error, postData } = usePostFetch(
    "/api/attendance/",
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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="_Student">Student's Full Name:</label>
        <input
          type="text"
          name="_Student"
          value={formData._Student}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="_Teacher">Teacher's Full Name:</label>
        <input
          type="text"
          name="_Teacher"
          value={formData._Teacher}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="status">Status:</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        >
          <option value="">Select Status</option>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
          <option value="Late">Late</option>
        </select>
      </div>
      <div>
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Create Attendance</button>
    </form>
  );
}

export default CreateAttendanceForm;
