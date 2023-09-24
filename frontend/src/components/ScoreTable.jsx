import React from "react";

const ScoreTable = ({ data }) => {
  // Assuming data is an array of objects with the required fields
  // e.g., [{ subject: "Math", examsScore: 80, classScore: 90 }]
  
  // Calculate the total score for each row
  const calculateTotalScore = (row) => {
    return row.examsScore + row.classScore;
  };

  // Define a function to calculate the grade based on the total score
  const calculateGrade = (totalScore) => {
    if (totalScore >= 90) {
      return "A+";
    } else if (totalScore >= 80) {
      return "A";
    } else if (totalScore >= 70) {
      return "B";
    } else if (totalScore >= 60) {
      return "C";
    } else if (totalScore >= 50) {
      return "D";
    } else {
      return "F";
    }
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Subject</th>
          <th>Exams Score</th>
          <th>Class Score</th>
          <th>Total Score</th>
          <th>Grade</th>
        </tr>
      </thead>
      <tbody>
        {data && data.map((row, index) => (
          <tr key={index}>
            <td>{row.subject}</td>
            <td>{row.examsScore}</td>
            <td>{row.classScore}</td>
            <td>{calculateTotalScore(row)}</td>
            <td>{calculateGrade(calculateTotalScore(row))}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="3">Overall Total Scores</td>
          <td colSpan="2">
            {data&&data.reduce(
              (total, row) => total + calculateTotalScore(row),
              0
            )}
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default ScoreTable;
