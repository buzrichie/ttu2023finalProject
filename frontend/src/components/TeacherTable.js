import React from "react";

function TeacherTable() {
  // Sample teacher data
  const teacherRecords = [
    {
      "First Name": "John",
      Surname: "Doe",
      "Date of Birth": "1990-05-15",
      Email: "john.doe@example.com",
      Phone: "+1 (123) 456-7890",
      Qualification: "Bachelor of Education",
      "Teaching Experience": "5 years",
      Gender: "Male",
    },
    {
      "First Name": "Jane",
      Surname: "Smith",
      "Date of Birth": "1985-08-20",
      Email: "jane.smith@example.com",
      Phone: "+1 (987) 654-3210",
      Qualification: "Master of Education",
      "Teaching Experience": "8 years",
      Gender: "Female",
    },
    // Add more teacher records as needed
  ];

  return (
    <div>
      <h2>Teacher Table</h2>
      <table>
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
          {teacherRecords.map((record, index) => (
            <tr key={index}>
              <td>{record["First Name"]}</td>
              <td>{record.Surname}</td>
              <td>{record["Date of Birth"]}</td>
              <td>{record.Email}</td>
              <td>{record.Phone}</td>
              <td>{record.Qualification}</td>
              <td>{record["Teaching Experience"]}</td>
              <td>{record.Gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TeacherTable;
