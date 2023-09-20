import React from "react";
import { useUserContext } from "../contexts/UserContext";
import UserProfile from "./UserProfile";

function ParentTable(props) {
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
              <th>Email</th>
              <th>Phone</th>
              <th>Occupation</th>
              <th>Student ID</th>
            </tr>
          </thead>
          <tbody>
            {data.map((parentguardian) => (
              <tr
                key={parentguardian._id}
                onClick={() => selectUser(parentguardian)}
              >
                <td>{parentguardian.firstName}</td>
                <td>{parentguardian.surName}</td>
                <td>{parentguardian.email}</td>
                <td>{parentguardian.phone}</td>
                <td>{parentguardian.occupation}</td>
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

export default ParentTable;
