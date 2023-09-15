import React from "react";

function AssessmentTable() {
  // Sample assessment data
  const assessments = [
    {
      "SUBJECT NAME": "Mathematics",
      "STUDENT'S FULL NAME": "John Doe",
      "TEACHER'S FULL NAME": "Teacher A",
      "ASSESSMENT NAME": "Midterm Exam",
      "ASSESSMENT SCORE": 85,
    },
    {
      "SUBJECT NAME": "Science",
      "STUDENT'S FULL NAME": "Jane Smith",
      "TEACHER'S FULL NAME": "Teacher B",
      "ASSESSMENT NAME": "Final Exam",
      "ASSESSMENT SCORE": 92,
    },
    // Add more assessment data as needed
  ];

  return (
    <div>
      <h2>Assessment Table</h2>
      <table>
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
          {assessments.map((assessment, index) => (
            <tr key={index}>
              <td>{assessment["SUBJECT NAME"]}</td>
              <td>{assessment["STUDENT'S FULL NAME"]}</td>
              <td>{assessment["TEACHER'S FULL NAME"]}</td>
              <td>{assessment["ASSESSMENT NAME"]}</td>
              <td>{assessment["ASSESSMENT SCORE"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AssessmentTable;
