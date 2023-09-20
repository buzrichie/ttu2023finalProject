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
              <td>
                {editedRows[subject._id] ? (
                  <input
                    type="type"
                    name="name"
                    value={editedRows[subject._id].name || ""}
                    onChange={(e) =>
                      handleChange(subject._id, "name", e.target.value)
                    }
                  />
                ) : (
                  subject.name
                )}
              </td>
              <td>
                {editedRows[subject._id] ? (
                  <input
                    type="text"
                    name="score"
                    value={editedRows[subject._id].score || ""}
                    onChange={(e) =>
                      handleChange(subject._id, "score", e.target.value)
                    }
                  />
                ) : (
                  subject.score
                )}
              </td>
              <td>
                {editedRows[subject._id] ? (
                  <button
                    onClick={(e) => handleSaveClick(subject._id, e.target)}
                  >
                    Save
                  </button>
                ) : (
                  <button onClick={(e) => handleEditClick(data, subject._id)}>
                    Edit
                  </button>
                )}
                <button onClick={(e) => handleDeleteClick(subject._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AssessmentTable;
