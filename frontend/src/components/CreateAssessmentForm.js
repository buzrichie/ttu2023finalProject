import React, { useState } from "react";
import usePostFetch from "../usePostFetch";

function CreateAssessmentForm() {
  const { token } = JSON.parse(localStorage.getItem("user"));
  if (!token) {
    return;
  }
  const [formData, setFormData] = useState({
    _Subject: "", // Assuming this represents Subject name
    _Student: "", // Assuming this represents Student's full name
    _Teacher: "", // Assuming this represents Teacher's full name
    name: "",
    score: "",
  });

  const { data, loading, error, postData } = usePostFetch(
    "/api/assessment/",
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
          htmlFor="_Subject"
          className="block text-sm font-medium leading-2 text-gray-900"
        >
          Subject:
        </label>
        <input
          type="text"
          name="_Subject"
          value={formData._Subject}
          onChange={handleChange}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          required
        />
      </div>
      <div>
        <label
          htmlFor="_Student"
          className="block text-sm font-medium leading-2 text-gray-900"
        >
          Student:
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
          Teacher:
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
          htmlFor="name"
          className="block text-sm font-medium leading-2 text-gray-900"
        >
          AssName:
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          required
        />
      </div>
      <div>
        <label
          htmlFor="score"
          className="block text-sm font-medium leading-2 text-gray-900"
        >
          Score:
        </label>
        <input
          type="number"
          name="score"
          value={formData.score}
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
  );
}

export default CreateAssessmentForm;
