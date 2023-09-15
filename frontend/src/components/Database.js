import React, { useState, useEffect } from "react";
import UserProfile from "./UserProfile";
import TeacherTable from "./TeacherTable";
import StudentTable from "./StudentTable";
import ParentTable from "./ParentTable";
import AdministratorTable from "./AdministratorTable";
import EnrolledStudentTable from "./EnrolledStudentTable";

function Database({ database, title }) {
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
    <div className="database-container">
      <div>
        <h2 style={{ marginTop: "1rem" }}>Database</h2>
        <ul className="tabs">
          <li
            className={activeTab === "Student" ? "active" : ""}
            onClick={() => tabClickHandler("Student")}
          >
            Students
          </li>
          <li
            className={activeTab === "Teacher" ? "active" : ""}
            onClick={() => tabClickHandler("Teacher")}
          >
            Teachers
          </li>
          <li
            className={activeTab === "ParentGuardian" ? "active" : ""}
            onClick={() => tabClickHandler("ParentGuardian")}
          >
            Parents
          </li>
          <li
            className={activeTab === "Enroll" ? "active" : ""}
            onClick={() => tabClickHandler("Enroll")}
          >
            Enroll
          </li>
          <li
            className={activeTab === "Admin" ? "active" : ""}
            onClick={() => tabClickHandler("Admin")}
          >
            Administrator
          </li>
        </ul>
        {/* Conditionally render the table component based on the active tab */}
        {activeTab === "Student" && data && <StudentTable data={data} />}
        {activeTab === "Teacher" && data && <TeacherTable data={data} />}
        {activeTab === "ParentGuardian" && data && <ParentTable data={data} />}
        {activeTab === "Enroll" && data && <EnrolledStudentTable data={data} />}
        {activeTab === "Admin" && data && <AdministratorTable data={data} />}

        {isPending && <p>Loading...</p>}
        {error && <p>{error.message}</p>}
      </div>
      <UserProfile />
    </div>
  );
}

export default Database;
