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
              <th>Name</th>

              <th>Date of Birth</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Qualification</th>
              <th>Teaching Experience</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((teacher) => (
                <tr
                  key={teacher._id}
                  onClick={() => selectUser(teacher)}
                  style={{ cursor: "pointer" }}
                >
                  <td>
                    {teacher.firstName && teacher.surName
                      ? `${teacher.firstName} ${teacher.surName}`
                      : "N/A"}
                  </td>
                  <td>
                    {teacher.dateOfBirth
                      ? new Date(teacher.dateOfBirth).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td>{teacher.email || "N/A"}</td>
                  <td>{teacher.phone || "N/A"}</td>
                  <td>{teacher.qualification || "N/A"}</td>
                  <td>{teacher.teachingExperience || "N/A"}</td>
                  <td>{teacher.gender || "N/A"}</td>
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

export default TeacherTable;
