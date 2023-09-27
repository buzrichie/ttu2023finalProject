import React, { useState, useEffect } from "react";
import UserProfile from "./UserProfile";
import TeacherTable from "./TeacherTable";
import StudentTable from "./StudentTable";
import ParentTable from "./ParentTable";
import AdministratorTable from "./AdministratorTable";
import EnrolledStudentTable from "./EnrolledStudentTable";
import Header from "./header";
import IsError from "./prompt/isError";
import Loading from "./prompt/isLoading";

function Database() {
  const { token } = JSON.parse(localStorage.getItem("user"));
  const [activeTab, setActiveTab] = useState("Student"); // Default active tab
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsPending(true);
      setError(null);

      try {
        // Construct the API endpoint based on the selected tab
        const apiUrl = `/api/${activeTab.toLowerCase()}`;

        const response = await fetch(apiUrl, {
          headers: {
            method: "GET",
            "Content-Type": "application/json",
            // Authorization header with the authToken
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Could not fetch data");
        }

        const jsonData = await response.json();
        setIsPending(false);
        setData(jsonData);
      } catch (error) {
        setIsPending(false);
        setError(error);
      }
    };

    fetchData();
  }, [activeTab, token]);

  const tabClickHandler = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex">
      <div className="w-full px-4">
        <div className="bg-white w-max p-4 rounded-lg shadow-md">
          <Header heading="Database" />
          <ul className="flex tabs mb-4">
            <li
              className={`mr-4 cursor-pointer ${
                activeTab === "Student" ? "active" : ""
              }`}
              onClick={() => tabClickHandler("Student")}
            >
              Students
            </li>
            <li
              className={`mr-4 cursor-pointer ${
                activeTab === "Teacher" ? "active" : ""
              }`}
              onClick={() => tabClickHandler("Teacher")}
            >
              Teachers
            </li>
            <li
              className={`mr-4 cursor-pointer ${
                activeTab === "ParentGuardian" ? "active" : ""
              }`}
              onClick={() => tabClickHandler("ParentGuardian")}
            >
              Parents
            </li>
            <li
              className={`mr-4 cursor-pointer ${
                activeTab === "Enroll" ? "active" : ""
              }`}
              onClick={() => tabClickHandler("Enroll")}
            >
              Enroll
            </li>
            <li
              className={`mr-4 cursor-pointer ${
                activeTab === "Admin" ? "active" : ""
              }`}
              onClick={() => tabClickHandler("Admin")}
            >
              Administrator
            </li>
          </ul>
          {/* Conditionally render the table component based on the active tab */}
          {activeTab === "Student" && data && <StudentTable data={data} />}
          {activeTab === "Teacher" && data && <TeacherTable data={data} />}
          {activeTab === "ParentGuardian" && data && (
            <ParentTable data={data} />
          )}
          {activeTab === "Enroll" && data && (
            <EnrolledStudentTable data={data} />
          )}
          {activeTab === "Admin" && data && <AdministratorTable data={data} />}

          {isPending && <Loading message="Fetching data..." />}
          {error && <IsError message={error} />}
        </div>
      </div>
      {/* <div className="w-full lg:w-1/3 px-4 hidden lg:block">
        <UserProfile userData={userData} />
      </div> */}
    </div>
  );
}

export default Database;
