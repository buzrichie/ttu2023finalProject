import React from "react";
import { useCRUDTableContext } from "../contexts/crudTableContext";
import useHttpPut from "../useHttpPut";

function SubjectTable(props) {
  const { data } = props;
  const { token } = JSON.parse(localStorage.getItem("user"));
  if (!token) {
    return;
  }
  const {
    editedRows,
    currentClicked,
    handleChange,
    cleanHandleSaveClick,
    handleEditClick,
    handleDeleteClick,
  } = useCRUDTableContext();

  const url = "/api/subject/";
  const urlIndex = `${url}${currentClicked}`;
  const {
    data: putData,
    loading: putIsLoading,
    error: putError,
    sendPutRequest,
  } = useHttpPut(urlIndex, token);

  if (putData) {
    console.log(putData);
  }

  const handleSaveClick = (academicLevelId) => {
    sendPutRequest(editedRows[academicLevelId]);
    // After saving, you can reset the edited state for the specific row
    cleanHandleSaveClick(academicLevelId);
  };

  return (
    <div>
      <h2>Subject Table</h2>
      <table className="table">
        <thead>
          <tr>
            <th>CODE</th>
            <th>NAME</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((subject) => (
            <tr key={subject._id}>
              {/* <td>{subject.code}</td> */}
              <td>
                {editedRows[subject._id] ? (
                  <input
                    type="text"
                    name="code"
                    value={editedRows[subject._id].code || ""}
                    onChange={(e) =>
                      handleChange(subject._id, "code", e.target.value)
                    }
                  />
                ) : (
                  subject.code
                )}
              </td>
              <td>
                {editedRows[subject._id] ? (
                  <input
                    type="text"
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

export default SubjectTable;
