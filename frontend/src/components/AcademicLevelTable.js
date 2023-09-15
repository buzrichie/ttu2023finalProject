import React from "react";

function ClassTable(props) {
  const { data } = props;
  return (
    <div>
      <h2>Class Table</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Class</th>
          </tr>
        </thead>
        <tbody>
          {data.map((academicLevel) => (
            <tr key={academicLevel._id}>
              <td>{academicLevel.level}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ClassTable;
