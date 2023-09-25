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
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Occupation</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((parentguardian) => (
                <tr
                  key={parentguardian._id}
                  onClick={() => selectUser(parentguardian)}
                  style={{ cursor: "pointer" }}
                >
                  <td>
                    {parentguardian.firstName && parentguardian.surName
                      ? `${parentguardian.firstName} ${parentguardian.surName}`
                      : "N/A"}
                  </td>
                  <td>{parentguardian.email || "N/A"}</td>
                  <td>{parentguardian.phone || "N/A"}</td>
                  <td>{parentguardian.occupation || "N/A"}</td>
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

export default ParentTable;
