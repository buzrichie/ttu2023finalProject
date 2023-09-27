import React, { useState } from "react";
import usePostFetch from "../Hooks/usePostFetch";
import IsError from "./prompt/isError";
import Loading from "./prompt/isLoading";
import Successful from "./prompt/successful";

function CreateAcademicLevelForm(props) {
  const { school } = props;
  const { token } = JSON.parse(localStorage.getItem("user"));
  if (!token) {
    return;
  }

  const [formData, setFormData] = useState({
    _Subject: "",
    level: "",
    _School: { _id: school },
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
    <>
      <div>
        <form onSubmit={handleSubmit} className="w-full">
          <div>
            <label
              htmlFor="_Subject"
              className="block text-sm font-medium leading-2 text-gray-900"
            >
              Can Assign to SubjectID:
            </label>
            <input
              type="text"
              name="_Subject"
              autoComplete="given-name"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={formData._Subject}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="level"
              className="block text-sm font-medium leading-2 text-gray-900"
            >
              Class:
            </label>
            <input
              type="text"
              name="level"
              autoComplete="given-name"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={formData.level}
              onChange={handleChange}
              required
            />
          </div>
          {/* <div>
            <label
              htmlFor="_School"
              className="block text-sm font-medium leading-2 text-gray-900"
            >
              School ID:
            </label>
            <input
              type="text"
              name="_School"
              autoComplete="given-name"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={formData._School}
              onChange={handleChange}
            />
          </div> */}
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
              Add Class
            </button>
          </div>
        </form>
        {data && (
          <div>
            <h2 key={data._id}></h2>
            <p>{data.level}</p>
          </div>
        )}
      </div>

      {data && <Successful message="Successful" />}
      {loading && <Loading message="Processing request..." />}
      {error && <IsError message={error} />}
    </>
  );
}

export default CreateAcademicLevelForm;
