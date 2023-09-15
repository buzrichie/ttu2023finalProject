import React from "react";

function AttendanceTable() {
  // Sample attendance data
  const attendanceRecords = [
    {
      "STUDENT'S FULL NAME": "John Doe",
      "TEACHER'S FULL NAME": "Teacher A",
      STATUS: "Present",
      DATE: "2023-09-15",
    },
    {
      "STUDENT'S FULL NAME": "Jane Smith",
      "TEACHER'S FULL NAME": "Teacher B",
      STATUS: "Absent",
      DATE: "2023-09-16",
    },
    // Add more attendance records as needed
  ];

  return (
    <div>
      <h2>Attendance Table</h2>
      <table>
        <thead>
          <tr>
            <th>STUDENT'S FULL NAME</th>
            <th>TEACHER'S FULL NAME</th>
            <th>STATUS</th>
            <th>DATE</th>
          </tr>
        </thead>
        <tbody>
          {attendanceRecords.map((record, index) => (
            <tr key={index}>
              <td>{record["STUDENT'S FULL NAME"]}</td>
              <td>{record["TEACHER'S FULL NAME"]}</td>
              <td>{record.STATUS}</td>
              <td>{record.DATE}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AttendanceTable;
