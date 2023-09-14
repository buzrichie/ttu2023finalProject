import React from "react";
import useFetch from "../useFetch";
import UserProfile from "./UserProfile";

function Database({ database, title }) {
  const { admin, token } = JSON.parse(localStorage.getItem("user"));

  if (!admin || !token) {
    return;
  }
  const { data, isPending, error } = useFetch(
    "/api/school/6500bd2c639c040ead8d5378",
    token
  );

  if (data) {
    console.log(data);
  }
  return (
    <div className="database-container">
      <div>
        <h2 style={{ marginTop: "1rem" }}>Database</h2>
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
      <UserProfile />
    </div>
  );
}

export default Database;
