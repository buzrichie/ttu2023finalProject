import React from "react";
import { useUserContext } from "../contexts/UserContext";
import UserProfile from "./UserProfile";

function StudentTable(props) {
  const { data } = props;

  const { selectedUser, selectUser } = useUserContext();

  return (
    <>
      <div className="flex w-full">
        <table className="table h-fit w-full lg:w-2/3">
          <thead>
            <tr>
              <th>Admission Number</th>
              <th>Name</th>

              <th>Date of Birth</th>
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
                  <td>
                    {student.admission
                      ? student.admission.admissionNumber
                      : "N/A"}
                  </td>
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
                    {student.academicLevel
                      ? student.academicLevel.level
                      : "N/A"}
                  </td>
                  <td>{student.gender || "N/A"}</td>
                  <td>{student.parentGuardianEmail || "N/A"}</td>
                </tr>
              ))}
          </tbody>
        </table>
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
