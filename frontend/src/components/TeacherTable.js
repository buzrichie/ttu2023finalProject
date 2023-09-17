import React from "react";

function TeacherTable(props) {
  const { data } = props;
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Surname</th>
            <th>Date of Birth</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Qualification</th>
            <th>Teaching Experience</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          {data.map((teacher) => (
            <tr key={teacher._id}>
              <td>{teacher.firstName}</td>
              <td>{teacher.surName}</td>
              <td>{teacher.dateOfBirth}</td>
              <td>{teacher.email}</td>
              <td>{teacher.phone}</td>
              <td>{teacher.qualification}</td>
              <td>{teacher.teachingExperience}</td>
              <td>{teacher.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default TeacherTable;
