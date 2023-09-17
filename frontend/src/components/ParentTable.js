import React from "react";

function ParentTable(props) {
  const { data } = props;

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Surname</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Occupation</th>
            <th>Student ID</th>
          </tr>
        </thead>
        <tbody>
          {data.map((parentguardian) => (
            <tr key={parentguardian._id}>
              <td>{parentguardian.firstName}</td>
              <td>{parentguardian.surName}</td>
              <td>{parentguardian.email}</td>
              <td>{parentguardian.phone}</td>
              <td>{parentguardian.occupation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ParentTable;
