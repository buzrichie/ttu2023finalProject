import React, { useState } from "react";
import usePostFetch from "../usePostFetch";
import useHttpPut from "../useHttpPut";

function UserProfile(props) {
  const { userData } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({ ...userData });

  const { token } = JSON.parse(localStorage.getItem("user"));
  if (!token) {
    return;
  }
  if (userData) {
    console.log(editedData);
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

  const { data, loading, error, postData } = usePostFetch(url, token);

  const handleApproveClick = (e) => {
    e.preventDefault();
    postData({
      admissionNumber: userData.admissionNumber,
      admissionStatus: "approved",
    });
  };

  const handleDeclineClick = (e) => {
    e.preventDefault();
    postData({
      admissionNumber: userData.admissionNumber,
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
          <img
            src="user_avatar.jpg"
            alt="User Avatar"
            className="rounded-full w-24 h-24"
          />
        </div>
        <div className="user-info flex flex-col justify-center">
          <p className="text-lg font-semibold">
            Name:
            {isEditing ? (
              <input
                type="text"
                name="firstName"
                value={editedData ? editedData.firstName : ""}
                onChange={handleInputChange}
              />
            ) : userData ? (
              userData.firstName
            ) : (
              ""
            )}
          </p>
          <p className="text-md">Class: Grade 10</p>
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
            ) : userData ? (
              userData.email
            ) : (
              ""
            )}
          </p>
          {/* Add more user info as needed */}
        </div>
        <div className="contact-info flex flex-col">
          <p className="text-md">Message</p>
          <p className="text-md">Phone</p>
          <p className="text-md">Email</p>
        </div>
      </div>
      <div className="about-section mt-4">
        <h3 className="text-xl font-semibold">About</h3>
        <p className="text-md">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod
          lectus eu efficitur.
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

        {userData && (
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
      </div>
    </div>
  );
}

export default UserProfile;
