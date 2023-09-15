import React from "react";

function StudentTable() {
  // Sample student data
  const studentRecords = [
    {
      "First Name": "Alice",
      Surname: "Johnson",
      "Date of Birth": "2005-03-10",
      Class: "Grade 7",
      Gender: "Female",
      "Parent/Guardian": "John Johnson",
    },
    {
      "First Name": "Bob",
      Surname: "Smith",
      "Date of Birth": "2006-07-15",
      Class: "Grade 8",
      Gender: "Male",
      "Parent/Guardian": "Mary Smith",
    },
    // Add more student records as needed
  ];

  return (
    <div>
      <h2>Student Table</h2>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Surname</th>
            <th>Date of Birth</th>
            <th>Class</th>
            <th>Gender</th>
            <th>Parent/Guardian</th>
          </tr>
        </thead>
        <tbody>
          {studentRecords.map((record, index) => (
            <tr key={index}>
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

export default StudentTable;
