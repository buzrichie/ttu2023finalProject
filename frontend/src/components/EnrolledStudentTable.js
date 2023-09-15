import React from "react";

function EnrolledStudentTable() {
  // Sample enrolled student data
  const enrolledStudentRecords = [
    {
      "Admission Number": "ADM001",
      "First Name": "John",
      Surname: "Doe",
      "Date of Birth": "1995-08-15",
      Class: "Grade 10",
      Gender: "Male",
      "Parent/Guardian": "Alice Doe",
    },
    {
      "Admission Number": "ADM002",
      "First Name": "Jane",
      Surname: "Smith",
      "Date of Birth": "1998-07-20",
      Class: "Grade 12",
      Gender: "Female",
      "Parent/Guardian": "Bob Smith",
    },
    // Add more enrolled student records as needed
  ];

  return (
    <div>
      <h2>Enrolled Student Table</h2>
      <table>
        <thead>
          <tr>
            <th>Admission Number</th>
            <th>First Name</th>
            <th>Surname</th>
            <th>Date of Birth</th>
            <th>Class</th>
            <th>Gender</th>
            <th>Parent/Guardian</th>
          </tr>
        </thead>
        <tbody>
          {enrolledStudentRecords.map((record, index) => (
            <tr key={index}>
              <td>{record["Admission Number"]}</td>
              <td>{record["First Name"]}</td>
              <td>{record.Surname}</td>
              <td>{record["Date of Birth"]}</td>
              <td>{record.Class}</td>
              <td>{record.Gender}</td>
              <td>{record["Parent/Guardian"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EnrolledStudentTable;
