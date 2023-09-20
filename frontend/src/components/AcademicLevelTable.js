import React, { useState } from "react";
import useHttpPut from "../useHttpPut";

function ClassTable(props) {
  const { data } = props;
  const { token } = JSON.parse(localStorage.getItem("user"));
  if (!token) {
    return;
  }
  // Use an object to store edited data for each academic level
  const [editedRows, setEditedRows] = useState({});
  const [currentClicked, setCurrentClicked] = useState(null);
  const url = "/api/academiclevel/";

  const handleChange = (e, academicLevelId) => {
    const { name, value } = e.target;

    // Create a copy of the current edited data for the specific academic level
    const updatedEditedData = { ...editedRows[academicLevelId], [name]: value };

    // Update the editedRows state with the new edited data
    setEditedRows({
      ...editedRows,
      [academicLevelId]: updatedEditedData,
    });
  };

  const handleEditClick = (academicLevelId) => {
    // Set the academic level as being edited
    setEditedRows({
      ...editedRows,
      [academicLevelId]: {
        level: data.find((level) => level._id === academicLevelId).level,
      },
    });
    setCurrentClicked(academicLevelId);
  };

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
    // Add logic to save the changes for the specific row with the academicLevelId
    // You can use editedRows[academicLevelId] to access the edited data
    // You can send a PUT request to update the data on the server
    sendPutRequest(editedRows[currentClicked]);
    // After saving, you can reset the edited state for the specific row
    const { [academicLevelId]: deletedData, ...restEditedRows } = editedRows;
    setCurrentClicked(null);
    setEditedRows(restEditedRows);
  };

  const handleDeleteClick = (academicLevelId) => {
    // Add logic to delete the row with the academicLevelId
    // You can send a DELETE request to remove the data from the server
  };

  return (
    <div>
      <h2>Class Table</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Class</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((academicLevel) => (
            <tr key={academicLevel._id}>
              <td>
                {editedRows[academicLevel._id] ? (
                  <input
                    type="text"
                    name="level"
                    value={editedRows[academicLevel._id].level}
                    onChange={(e) => handleChange(e, academicLevel._id)}
                    // Handle input change and update the value in the component state
                  />
                ) : (
                  academicLevel.level
                )}
              </td>
              <td>
                {editedRows[academicLevel._id] ? (
                  <button onClick={() => handleSaveClick(academicLevel._id)}>
                    Save
                  </button>
                ) : (
                  <>
                    <button onClick={() => handleEditClick(academicLevel._id)}>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(academicLevel._id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ClassTable;
