import React from "react";

function AssessmentTable(props) {
  const { data } = props;
  return (
    <div>
      <h2>Assessment Table</h2>
      <table className="table">
        <thead>
          <tr>
            <th>SUBJECT NAME</th>
            <th>STUDENT'S FULL NAME</th>
            <th>TEACHER'S FULL NAME</th>
            <th>ASSESSMENT NAME</th>
            <th>ASSESSMENT SCORE</th>
          </tr>
        </thead>
        <tbody>
          {data.map((subject) => (
            <tr key={subject._id}>
              <td>{subject.level}</td>
              {/* <td>{subject["STUDENT'S FULL NAME"]}</td>
              <td>{subject["TEACHER'S FULL NAME"]}</td>
              <td>{subject["ASSESSMENT NAME"]}</td>
              <td>{subject["ASSESSMENT SCORE"]}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AssessmentTable;
