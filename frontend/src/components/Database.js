import React from "react";

function Database({ database, title }) {
  return (
    <div className="database-container">
      <h2 style={{ marginTop: "1rem" }}>{title}</h2>
      <ul className="tabs">
        <li className="active">Students</li>
        <li>Teachers</li>
        <li>Parents</li>
        <li>Enroll</li>
        <li>Staff</li>
      </ul>

      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>ID</th>
            <th>Class</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {/* Sample user data */}
          <tr>
            <td>John Doe</td>
            <td>12345</td>
            <td>Grade 10</td>
            <td>16</td>
            <td>Male</td>
            <td>john@example.com</td>
          </tr>
          {database.academicLevels.map((academicLevel) => (
            <tr key={academicLevel}>
              <td>{academicLevel}</td>
            </tr>
          ))}
          <tr>
            <td>Jane Smith</td>
            <td>67890</td>
            <td>Grade 8</td>
            <td>14</td>
            <td>Female</td>
            <td>jane@example.com</td>
          </tr>
          {/* Add more user data as needed */}
        </tbody>
      </table>
    </div>
  );
}

export default Database;
