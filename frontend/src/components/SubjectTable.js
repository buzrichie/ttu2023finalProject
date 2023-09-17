import React from "react";

function SubjectTable(props) {
  const { data } = props;
  return (
    <div>
      <h2>Subject Table</h2>
      <table className="table">
        <thead>
          <tr>
            <th>CODE</th>
            <th>NAME</th>
          </tr>
        </thead>
        <tbody>
          {data.map((subject) => (
            <tr key={subject._id}>
              <td>{subject.name}</td>
              <td>{subject._id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SubjectTable;
