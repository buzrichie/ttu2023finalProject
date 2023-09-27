import React, { useState } from "react";
import usePostFetch from "../Hooks/usePostFetch";
import IsError from "./prompt/isError";
import Loading from "./prompt/isLoading";
import Header from "./header";

function CreateTeacherForm() {
  const { token } = JSON.parse(localStorage.getItem("user"));
  if (!token) {
    return;
  }
  const [formData, setFormData] = useState({
    firstName: "",
    surName: "",
    dateOfBirth: "",
    email: "",
    phone: "",
    qualification: "",
    teachingExperience: "",
    gender: "",
    street: "",
    wpsAddress: "",
    state: "",
    city: "",
    applicationNumber: "", // Assuming this represents Subject ID
  });

  const { data, loading, error, postData } = usePostFetch(
    "/api/teacher/",
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
  // const fetchData = usePostFetch("api/teacher/", formData);
  return (
    <>
      <div className="flex gap-4">
        <div className="w-full lg:w-1/2">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="surName">Surname:</label>
              <input
                type="text"
                name="surName"
                value={formData.surName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="dateOfBirth">Date of Birth:</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="phone">Phone Number:</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="qualification">Qualification:</label>
              <input
                type="text"
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="teachingExperience">Teaching Experience:</label>
              <input
                type="text"
                name="teachingExperience"
                value={formData.teachingExperience}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="gender">Gender:</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="street">Street:</label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="wpsAddress">WPS Address:</label>
              <input
                type="text"
                name="wpsAddress"
                value={formData.wpsAddress}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="state">State:</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="city">City:</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="applicationNumber">applicationNumber:</label>
              <input
                type="text"
                name="applicationNumber"
                value={formData.applicationNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="_Subject">Subject ID:</label>
              <input
                type="text"
                name="_Subject"
                value={formData._Subject}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Create Teacher
            </button>
          </form>
        </div>
        {data && (
          <div className="w-full lg:w-1/2">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <Header heading="Created Teacher's Credentials" />
              {data && data.teacher && (
                <p>
                  Name:{" "}
                  <span className="font-bold">
                    {data.teacher.firstName} {data.teacher.surName}
                  </span>
                </p>
              )}
              {data && data.teacher && data.teacher.email ? (
                <p>
                  Email: <span className="font-bold">{data.teacher.email}</span>
                </p>
              ) : (
                ""
              )}
              {data && data.teacher && data.teacher.id ? (
                <p>
                  Your registered login ID is:{" "}
                  <span className="font-bold">{data.teacher.id}</span>
                </p>
              ) : (
                ""
              )}
              {data && data.password ? (
                <p>
                  Your registered login password is:{" "}
                  <span className="font-bold">{data.password}</span>
                </p>
              ) : (
                ""
              )}

              {/* Remind the user to note down their ID and password */}
              <p className="mt-4 text-red-500">
                Please make sure to note down the ID and password as you will
                need them for future logins.
              </p>
            </div>
          </div>
        )}
      </div>
      {loading && <Loading message="Processing request..." />}
      {error && <IsError message={error} />}
    </>
  );
}

export default CreateTeacherForm;
