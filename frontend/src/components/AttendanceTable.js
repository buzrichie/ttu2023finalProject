import React from "react";

function AttendanceTable(props) {
  const { data } = props;
  return (
    <div>
      <h2>Attendance Table</h2>
      <table className="table">
        <thead>
          <tr>
            <th>DATE</th>
            <th>STUDENT</th>
            <th>TEACHER</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          {data.map((attendance) => (
            <tr key={attendance._id}>
              <td>{attendance.date}</td>
              <td>{attendance.student}</td>
              <td>{attendance.teacher}</td>
              <td>{attendance.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AttendanceTable;
