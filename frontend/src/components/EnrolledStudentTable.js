import React from "react";
import { useUserContext } from "../contexts/UserContext";
import UserProfile from "./UserProfile";

function StudentTable(props) {
  const { data } = props;

  const { selectedUser, selectUser } = useUserContext();

  return (
    <>
      <div className="flex w-full">
        <table className="table w-full lg:w-2/3">
          <thead>
            <tr>
              <th>Admission Number</th>
              <th>First Name</th>
              <th>Surname</th>
              <th>Date of Birth</th>
              <th>Class</th>
              <th>Gender</th>
              <th>Parent/Guardian Email</th>
            </tr>
          </thead>
          <tbody>
            {data.map((student) => (
              <tr key={student._id} onClick={() => selectUser(student)}>
                <td>
                  {student.admission
                    ? student.admission.admissionNumber
                    : "N/A"}
                </td>
                <td>{student.firstName}</td>
                <td>{student.surName}</td>
                <td>{new Date(student.dateOfBirth).toLocaleDateString()}</td>
                <td>
                  {student.academicLevel ? student.academicLevel.level : "N/A"}
                </td>
                <td>{student.gender}</td>
                <td>{student.parentGuardianEmail}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {selectedUser && (
          <div className="w-full lg:w-1/3 px-4 hidden lg:block">
            <UserProfile userData={selectedUser} />
          </div>
        )}
      </div>
    </>
  );
}

export default StudentTable;
