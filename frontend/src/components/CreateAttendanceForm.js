import React, { useState } from "react";
import usePostFetch from "../Hooks/usePostFetch";
import IsError from "./prompt/isError";
import Loading from "./prompt/isLoading";
import Successful from "./prompt/successful";
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
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="_Student"
            className="block text-sm font-medium leading-2 text-gray-900"
          >
            Student's ID:
          </label>
          <input
            type="text"
            name="_Student"
            value={formData._Student}
            onChange={handleChange}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            required
          />
        </div>
        <div>
          <label
            htmlFor="_Teacher"
            className="block text-sm font-medium leading-2 text-gray-900"
          >
            Teacher's ID:
          </label>
          <input
            type="text"
            name="_Teacher"
            value={formData._Teacher}
            onChange={handleChange}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            required
          />
        </div>
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium leading-2 text-gray-900"
          >
            Status:
          </label>
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
          <label
            htmlFor="date"
            className="block text-sm font-medium leading-2 text-gray-900"
          >
            Date:
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            required
          />
        </div>
        <div className="mt-6 flex w-full items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
      {data && <Successful message="Successful" />}
      {loading && <Loading message="Processing request..." />}
      {error && <IsError message={error} />}
    </>
  );
}

export default CreateAttendanceForm;
