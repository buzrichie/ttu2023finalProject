import React from "react";

function StudentTable(props) {
  const { data } = props;
  return (
    <div>
      <h2>Student Table</h2>
      <table className="table">
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
          {data.map((user) => (
            <tr key={user._id}>
              <td>{user.firstName}</td>
              <td>{user.surName}</td>
              <td>{user.dateOfBirth}</td>
              <td>{user.academicLevel}</td>
              <td>{user.gender}</td>
              <td>{user.parentGuardian}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentTable;
