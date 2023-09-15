import React from "react";

function AdministratorTable() {
  // Sample administrator data
  const administratorRecords = [
    {
      "Admin ID": "ADM123",
      Name: "John Doe",
      Email: "john.doe@example.com",
      Role: "Super Admin",
    },
    {
      "Admin ID": "ADM456",
      Name: "Jane Smith",
      Email: "jane.smith@example.com",
      Role: "Admin",
    },
    // Add more administrator records as needed
  ];

  return (
    <div>
      <h2>Administrator Table</h2>
      <table>
        <thead>
          <tr>
            <th>Admin ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {administratorRecords.map((record, index) => (
            <tr key={index}>
              <td>{record["Admin ID"]}</td>
              <td>{record.Name}</td>
              <td>{record.Email}</td>
              <td>{record.Role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdministratorTable;
