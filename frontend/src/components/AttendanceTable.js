import React from "react";
import { useCRUDTableContext } from "../contexts/crudTableContext";
import useHttpPut from "../Hooks/useHttpPut";

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
      <table className="w-full border-collapse  border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 text-center font-medium">DATE</th>
            <th className="py-2 px-4 text-center font-medium">STUDENT</th>
            <th className="py-2 px-4 text-center font-medium">TEACHER</th>
            <th className="py-2 px-4 text-center font-medium">STATUS</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((attendance) => (
              <tr
                key={attendance._id}
                className="hover:bg-blue-200 hover:text-white"
              >
                <td className="px-4">
                  {editedRows[attendance._id] ? (
                    <input
                      type="date"
                      name="date"
                      autoComplete="given-name"
                      className="block w-full hover:bg-white rounded-md border-0 m-0 px-2 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                      autoComplete="given-name"
                      className="block w-full hover:bg-white rounded-md border-0 m-0 px-2 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={editedRows[attendance._id].status || ""}
                      onChange={(e) =>
                        handleChange(attendance._id, "status", e.target.value)
                      }
                    />
                  ) : (
                    attendance.status
                  )}
                </td>
                <td className="flex gap-2 px-4">
                  {editedRows[attendance._id] ? (
                    <>
                      <button
                        onClick={(e) =>
                          handleEditClick(attendance._id, e.target)
                        }
                        className="w-12 px-3 py-2 text-sm text-yellow-400 hover:text-yellow-600 focus-visible:text-yellow-600"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={(e) =>
                          handleSaveClick(attendance._id, e.target)
                        }
                        className="w-12 px-3 py-2 text-sm text-green-400 hover:text-green-600 focus-visible:text-green-600"
                      >
                        Save
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={(e) => handleEditClick(data, attendance._id)}
                      className="w-12 px-3 py-2 text-sm text-blue-400 hover:text-blue-600 focus-visible:text-blue-600"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={(e) => handleDeleteClick(attendance._id)}
                    className="w-12 px-3 py-2 text-sm text-red-400 hover:text-red-600 focus-visible:text-red-600"
                  >
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
