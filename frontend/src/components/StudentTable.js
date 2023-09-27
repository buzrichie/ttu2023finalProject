import React, { useState } from "react";
import UserProfile from "./UserProfile"; // Import your UserProfile component
import { useUserContext } from "../contexts/UserContext";

function StudentTable(props) {
  const { data } = props;

  const { selectedUser, selectUser } = useUserContext();

  // Function to handle when a student row is clicked
  // const handleStudentClick = (student) => {
  //   selectStudent(student);
  // };
  return (
    <>
      <div className="flex w-full">
        <table className="table h-fit w-full lg:w-2/3">
          <thead>
            <tr>
              <th>StudentID</th>
              <th>Name</th>

              <th>DOB</th>
              <th>Class</th>
              <th>Gender</th>
              <th>Guardian Email</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((student) => (
                <tr
                  key={student._id}
                  onClick={() => selectUser(student)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{student.id || "N/A"}</td>
                  <td>
                    {student.firstName && student.surName
                      ? `${student.firstName} ${student.surName}`
                      : "N/A"}
                  </td>
                  <td>
                    {student.dateOfBirth
                      ? new Date(student.dateOfBirth).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td>
                    {student.academicLevel && student.academicLevel.level
                      ? student.academicLevel.level
                      : "N/A"}
                  </td>
                  <td>{student.gender || "N/A"}</td>
                  <td>
                    {student.parentGuardian && student.parentGuardian.email
                      ? student.parentGuardian.email
                      : "N/A"}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {/* Conditionally render the UserProfile component */}
        {selectedUser && (
          <div className="w-full lg:w-1/3 px-4 hidden lg:block">
            <UserProfile data={selectedUser} />
          </div>
        )}
      </div>
    </>
  );
}

export default StudentTable;
