import React from "react";
import { useUserContext } from "../contexts/UserContext";
import UserProfile from "./UserProfile";

function TeacherTable(props) {
  const { data } = props;

  const { selectedUser, selectUser } = useUserContext();

  return (
    <>
      <div className="flex w-full">
        <table className="table w-full lg:w-2/3">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Surname</th>
              <th>Date of Birth</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Qualification</th>
              <th>Teaching Experience</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
            {data.map((teacher) => (
              <tr key={teacher._id} onClick={() => selectUser(teacher)}>
                <td>{teacher.firstName}</td>
                <td>{teacher.surName}</td>
                <td>{teacher.dateOfBirth}</td>
                <td>{teacher.email}</td>
                <td>{teacher.phone}</td>
                <td>{teacher.qualification}</td>
                <td>{teacher.teachingExperience}</td>
                <td>{teacher.gender}</td>
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

export default TeacherTable;
