import React, { useState } from "react";
import usePostFetch from "../usePostFetch";

function CreateSubjectForm() {
  const { token } = JSON.parse(localStorage.getItem("user"));
  if (!token) {
    return;
  }
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    _School: "", // Assuming this represents School ID
    _AcademicLevel: "", // Assuming this represents AcademicLevel ID
  });

  const { data, loading, error, postData } = usePostFetch(
    "/api/subject/",
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
        <label
          htmlFor="name"
          className="block text-sm font-medium leading-2 text-gray-900"
        >
          Name:
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label
          htmlFor="code"
          className="block text-sm font-medium leading-2 text-gray-900"
        >
          Code:
        </label>
        <input
          type="text"
          name="code"
          value={formData.code}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label
          htmlFor="_School"
          className="block text-sm font-medium leading-2 text-gray-900"
        >
          School ID:
        </label>
        <input
          type="text"
          name="_School"
          value={formData._School}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onChange={handleChange}
        />
      </div>
      <div>
        <label
          htmlFor="_AcademicLevel"
          className="block text-sm font-medium leading-2 text-gray-900"
        >
          AcademicLevel ID:
        </label>
        <input
          type="text"
          name="_AcademicLevel"
          value={formData._AcademicLevel}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onChange={handleChange}
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
  );
}

export default CreateSubjectForm;
