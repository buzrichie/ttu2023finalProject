import React, { useState } from "react";
import useFetchPost from "../usePostRequest";
function CreateAttendanceForm() {
  const [formData, setFormData] = useState({
    _Student: "", // Assuming this represents Student's full name
    _Teacher: "", // Assuming this represents Teacher's full name
    status: "",
    date: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fetchData = useFetchPost("/api/attendance/", formData);
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
