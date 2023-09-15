import React from "react";

function ClassTable() {
  // Sample class data
  const classes = [
    { NAME: "Class 1A" },
    { NAME: "Class 2B" },
    { NAME: "Class 3C" },
    // Add more class data as needed
  ];

  return (
    <div>
      <h2>Class Table</h2>
      <table>
        <thead>
          <tr>
            <th>NAME</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((classItem, index) => (
            <tr key={index}>
              <td>{classItem.NAME}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ClassTable;
