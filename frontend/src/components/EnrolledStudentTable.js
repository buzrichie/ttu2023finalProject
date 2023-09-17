import React from "react";

function EnrolledStudentTable(props) {
  const { data } = props;
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>Admission Number</th>
            <th>First Name</th>
            <th>Surname</th>
            <th>Date of Birth</th>
            <th>Class</th>
            <th>Gender</th>
            <th>Parent/Guardian</th>
          </tr>
        </thead>
        <tbody>
          {data.map((student) => (
            <tr key={student._id}>
              <td>{student.admission}</td>
              <td>{student.firstName}</td>
              <td>{student.surName}</td>
              <td>{student.dateOfBirth}</td>
              <td>{student.academicLevel}</td>
              <td>{student.gender}</td>
              <td>{student.parentGuardianFirstName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default EnrolledStudentTable;
