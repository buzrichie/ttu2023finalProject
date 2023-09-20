import React from "react";

function AttendanceTable(props) {
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

  const url = "/api/attendance/";
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
      <h2>Attendance Table</h2>
      <table className="table">
        <thead>
          <tr>
            <th>DATE</th>
            <th>STUDENT</th>
            <th>TEACHER</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          {data.map((attendance) => (
            <tr key={attendance._id}>
              <td>
                {editedRows[attendance._id] ? (
                  <input
                    type="date"
                    name="date"
                    value={editedRows[attendance._id].date || ""}
                    onChange={(e) =>
                      handleChange(attendance._id, "date", e.target.value)
                    }
                  />
                ) : (
                  attendance.date
                )}
              </td>
              <td>
                {editedRows[attendance._id] ? (
                  <input
                    type="text"
                    name="status"
                    value={editedRows[attendance._id].status || ""}
                    onChange={(e) =>
                      handleChange(attendance._id, "status", e.target.value)
                    }
                  />
                ) : (
                  attendance.status
                )}
              </td>
              <td>
                {editedRows[attendance._id] ? (
                  <button
                    onClick={(e) => handleSaveClick(attendance._id, e.target)}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={(e) => handleEditClick(data, attendance._id)}
                  >
                    Edit
                  </button>
                )}
                <button onClick={(e) => handleDeleteClick(attendance._id)}>
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

export default AttendanceTable;
