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
      <table className="w-full border-collapse  border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 text-center font-medium">Class</th>
            <th className="py-2 px-4 text-center font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((academicLevel) => (
              <tr
                key={academicLevel._id}
                className="hover:bg-blue-200 hover:text-white"
              >
                <td className="px-4">
                  {editedRows[academicLevel._id] ? (
                    <input
                      type="text"
                      name="level"
                      autoComplete="given-name"
                      className="block w-full hover:bg-white rounded-md border-0 m-0 px-2 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={editedRows[academicLevel._id].level}
                      onChange={(e) => handleChange(e, academicLevel._id)}
                    />
                  ) : (
                    academicLevel.level
                  )}
                </td>
                <td className="flex gap-2 px-4">
                  {editedRows[academicLevel._id] ? (
                    <>
                      <button
                        onClick={() => handleEditClick(academicLevel._id)}
                        className="w-12 px-3 py-2 text-sm text-yellow-400 hover:text-yellow-600 focus-visible:text-yellow-600"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSaveClick(academicLevel._id)}
                        className="w-12 px-3 py-2 text-sm text-green-400 hover:text-green-600 focus-visible:text-green-600"
                      >
                        Save
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditClick(academicLevel._id)}
                        className="w-12 px-3 py-2 text-sm text-blue-400 hover:text-blue-600 focus-visible:text-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(academicLevel._id)}
                        className="w-12 px-3 py-2 text-sm text-red-400 hover:text-red-600 focus-visible:text-red-600"
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
