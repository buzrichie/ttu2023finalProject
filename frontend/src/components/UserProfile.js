import React, { useState } from "react";
import usePostFetch from "../Hooks/usePostFetch";
import useHttpPut from "../Hooks/useHttpPut";
import useDelete from "../Hooks/useDelete";
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
  console.log("the student data is ", data);
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
    loading: approvedLoading,
    error: approvedError,
    postData,
  } = usePostFetch(url, token);
  if (approvedData) {
    console.log(approvedData);
  }
  const handleApproveClick = async (e) => {
    e.preventDefault();
    const dataToApprove = postData({
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
  const {
    data: deleteData,
    isPending: deletePending,
    error: deleteError,
  } = useDelete(url, token);
  const handleDelete = (e) => {
    e.preventDefault();
  };
  return (
    <>
      {data && (
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
              {data.firstName && (
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
              )}
              {data && data.academicLevel && data.academicLevel.level && (
                <p className="text-md">Class: {data.academicLevel.level}</p>
              )}
              {data.role && <p className="text-md">Role: {data.role}</p>}
              {data.email && (
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
              )}
              {/* Add more user info as needed */}
            </div>
            <div className="contact-info flex flex-col">
              {data.dateOfBirth && (
                <p className="text-md">
                  DOB: {new Date(data.dateOfBirth).toLocaleDateString()}
                </p>
              )}
              {data.phone && <p className="text-md">Phone: {data.phone}</p>}
              {data.gender && <p className="text-md">Gender: {data.gender}</p>}
            </div>
          </div>
          <div className="about-section mt-4">
            <h3 className="text-xl font-semibold">About</h3>
            <p className="text-md">
              Hello hello, the time is due for the walaa, sit back, relax and
              study smart.
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
            {data.role &&
              data.role.toLowerCase() === "admin" &&
              data.role.toLowerCase() !== "enroll" && (
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              )}
            {data.role && data.role.toLowerCase() === "enroll" && (
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
            {approvedData && <Successful message="Approved" />}
            {deleteData && <Successful message="Deleted" />}
            {putData && <Successful message="Successful" />}
            {putIsLoadin ||
              deletePending ||
              (approvedLoading && <Loading message="Processing request..." />)}
            {putError && <IsError message={putError} />}
            {approvedError && <IsError message={putError} />}
            {deleteError && <IsError message={putError} />}
          </div>
        </div>
      )}
    </>
  );
}

export default UserProfile;
