import React from "react";

function AttendanceTable(props) {
  const { data } = props;
  return (
    <div>
      <h2>Attendance Table</h2>
      <table className="table">
        <thead>
          <tr>
            <th>STUDENT'S FULL NAME</th>
            <th>TEACHER'S FULL NAME</th>
            <th>STATUS</th>
            <th>DATE</th>
          </tr>
        </thead>
        <tbody>
          {data.map((attendance) => (
            <tr key={attendance._id}>
              <td>{attendance["STUDENT'S FULL NAME"]}</td>
              <td>{attendance["TEACHER'S FULL NAME"]}</td>
              <td>{attendance.status}</td>
              <td>{attendance.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AttendanceTable;
