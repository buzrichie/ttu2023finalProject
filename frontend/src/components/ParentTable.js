import React from "react";

function ParentTable() {
  // Sample parent data
  const parentRecords = [
    {
      "First Name": "John",
      Surname: "Doe",
      Email: "john.doe@example.com",
      Phone: "+1234567890",
      Occupation: "Engineer",
      "Student ID": "ST12345",
    },
    {
      "First Name": "Jane",
      Surname: "Smith",
      Email: "jane.smith@example.com",
      Phone: "+9876543210",
      Occupation: "Teacher",
      "Student ID": "ST67890",
    },
    // Add more parent records as needed
  ];

  return (
    <div>
      <h2>Parent Table</h2>
      <table>
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
          {parentRecords.map((record, index) => (
            <tr key={index}>
              <td>{record["First Name"]}</td>
              <td>{record.Surname}</td>
              <td>{record.Email}</td>
              <td>{record.Phone}</td>
              <td>{record.Occupation}</td>
              <td>{record["Student ID"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ParentTable;
