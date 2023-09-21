import React from "react";
import { useUserContext } from "../contexts/UserContext";
import UserProfile from "./UserProfile";

function AdministratorTable(props) {
  const { data } = props;

  const { selectedUser, selectUser } = useUserContext();

  return (
    <>
      <div className="flex w-full">
        <table className="table w-full lg:w-2/3">
          <thead>
            <tr>
              <th>Admin ID</th>
              <th>Principal</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((admin) => (
                <tr
                  key={admin._id}
                  role={admin.role}
                  school={admin.school}
                  onClick={() => selectUser(admin)}
                >
                  <td>{admin.adminID || admin.id}</td>
                  <td>{admin.name}</td>
                  <td>{admin.email}</td>
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

export default AdministratorTable;
