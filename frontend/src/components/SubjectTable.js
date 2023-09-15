import React from "react";

function SubjectTable() {
  // Sample subject data
  const subjects = [
    { CODE: "Math101", NAME: "Mathematics" },
    { CODE: "Sci102", NAME: "Science" },
    { CODE: "Eng103", NAME: "English" },
    // Add more subject data as needed
  ];

  return (
    <div>
      <h2>Subject Table</h2>
      <table>
        <thead>
          <tr>
            <th>CODE</th>
            <th>NAME</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject, index) => (
            <tr key={index}>
              <td>{subject.CODE}</td>
              <td>{subject.NAME}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SubjectTable;
