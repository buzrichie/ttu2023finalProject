import React from "react";

function AdministratorTable(props) {
  const { data } = props;

  return (
    <div>
      <h2>Administrator Table</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Admin ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.map((admin) => (
            <tr key={admin._id} role={admin.role} school={admin.school}>
              <td>{admin.adminID}</td>
              <td>{admin.name}</td>
              <td>{admin.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdministratorTable;
