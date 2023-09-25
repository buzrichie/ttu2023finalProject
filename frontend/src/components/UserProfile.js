import React, { useState } from "react";
import usePostFetch from "../Hooks/usePostFetch";
import useHttpPut from "../Hooks/useHttpPut";
import { RxAvatar } from "react-icons/rx";
import IsError from "./prompt/isError";
import Loading from "./prompt/isLoading";
import Successful from "./prompt/successful";

function UserProfile(props) {
  const { data } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({ ...data });

  const { token } = JSON.parse(localStorage.getItem("user"));
  if (!token) {
    return;
  }
  if (data) {
    console.log("data is", data);
  }
  const url = "/api/student/";
  const urlIndex = `${url}${editedData._id}`;

  const {
    data: putData,
    loading: putIsLoadin,
    error: putError,
    sendPutRequest,
  } = useHttpPut(urlIndex, token);

  if (putData) {
    console.log(putData);
  }
  const handleEditClick = () => {
    if (isEditing) {
      // Save the edited data with a PUT request
      sendPutRequest({
        firstName: editedData.firstName,
      });

      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({
      ...editedData,
      [name]: value,
    });
  };

  const {
    data: approvedData,
    loading,
    error,
    postData,
  } = usePostFetch(url, token);
  if (approvedData) {
    console.log(approvedData);
  }
  const handleApproveClick = async (e) => {
    e.preventDefault();
    const data = postData({
      admissionNumber: data.admissionNumber,
      admissionStatus: "approved",
    });
  };

  const handleDeclineClick = (e) => {
    e.preventDefault();
    postData({
      admissionNumber: data.admissionNumber,
      admissionStatus: "declined",
    });
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md relative p-4"
      style={{ minHeight: "500px" }}
    >
      <div className="items-center">
        <div className="mb-4 lg:mb-0 lg:mr-4">
          {/* <img
            src="user_avatar.jpg"
            alt="User Avatar"
            className="rounded-full w-24 h-24"
          /> */}
          <RxAvatar className="rounded-full w-20 h-20 text-blue-600" />
        </div>
        <div className="user-info flex my-5 flex-col justify-center">
          <p className="text-lg font-semibold">
            Name:{" "}
            {isEditing ? (
              <input
                type="text"
                name="firstName"
                value={editedData ? editedData.firstName : ""}
                onChange={handleInputChange}
              />
            ) : data ? (
              <>{data.firstName + " " + data.surName}</>
            ) : (
              ""
            )}
          </p>
          {data && <p className="text-md">Class: Grade 10</p>}
          <p className="text-md">Role: Student</p>
          <p className="text-md">
            Email:{" "}
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={editedData.email}
                onChange={handleInputChange}
              />
            ) : data ? (
              data.email
            ) : (
              ""
            )}
          </p>
          {/* Add more user info as needed */}
        </div>
        <div className="contact-info flex flex-col">
          <p className="text-md">DOB: {data ? data.dateOfBirth : ""}</p>
          <p className="text-md">Phone: {data ? data.phone : ""}</p>
          <p className="text-md">Email: {data ? data.email : ""}</p>
          <p className="text-md">Gender: {data ? data.gender : ""}</p>
        </div>
      </div>
      <div className="about-section mt-4">
        <h3 className="text-xl font-semibold">About</h3>
        <p className="text-md">
          Hello hello, the time is due for the walaa, sit back, relax and study
          smart.
        </p>
      </div>
      {/* Buttons */}
      <div className="flex mt-4 space-x-4 p-2">
        <button
          className={`bg-${isEditing ? "green" : "blue"}-500 hover:bg-${
            isEditing ? "green" : "blue"
          }-600 text-white px-4 py-2 rounded-md`}
          onClick={handleEditClick}
        >
          {isEditing ? "Save" : "Edit"}
        </button>

        {data && (
          <>
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
              onClick={handleApproveClick}
            >
              Approve
            </button>

            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
              onClick={handleDeclineClick}
            >
              Decline
            </button>
          </>
        )}
        {approvedData && <Successful message="approved" />}
        {putIsLoadin && <Loading message="Processing request..." />}
        {putError && <IsError message={error} />}
      </div>
    </div>
  );
}

export default UserProfile;
