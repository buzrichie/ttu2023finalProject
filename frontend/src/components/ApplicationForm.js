import React, { useState } from "react";
import usePostFetch from "../Hooks/usePostFetch";
import IsError from "./prompt/isError";
import Loading from "./prompt/isLoading";

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
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="_Subject"
            className="block text-sm font-medium leading-2 text-gray-900"
          >
            Subject:
          </label>
          <input
            type="text"
            id="_Subject"
            name="_Subject"
            value={formData._Subject}
            onChange={handleChange}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            required
          />
        </div>
        <div>
          <label
            htmlFor="applicationDate"
            className="block text-sm font-medium leading-2 text-gray-900"
          >
            Application Date:
          </label>
          <input
            type="date"
            id="applicationDate"
            name="applicationDate"
            value={formData.applicationDate}
            onChange={handleChange}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            required
          />
        </div>
        <div>
          <label
            htmlFor="_School"
            className="block text-sm font-medium leading-2 text-gray-900"
          >
            School:
          </label>
          <input
            type="text"
            id="_School"
            name="_School"
            value={formData._School}
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
      {loading && <Loading message="Processing request..." />}
      {error && <IsError message={error} />}
    </>
  );
}

export default ApplicationForm;
