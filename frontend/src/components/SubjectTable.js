import React from "react";
import { useCRUDTableContext } from "../contexts/crudTableContext";
import useHttpPut from "../Hooks/useHttpPut";

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
      <table className="myTable w-full border-collapse  border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 text-center font-medium">CODE</th>
            <th className="py-2 px-4 text-center font-medium">NAME</th>
            <th className="py-2 px-4 text-center font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((subject) => (
              <tr
                key={subject._id}
                className="hover:bg-blue-200 hover:text-white"
              >
                {/* <td>{subject.code}</td> */}
                <td className="px-4">
                  {editedRows[subject._id] ? (
                    <input
                      type="text"
                      name="code"
                      autoComplete="given-name"
                      className="block w-full hover:bg-white rounded-md border-0 m-0 px-2 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={editedRows[subject._id].code || ""}
                      onChange={(e) =>
                        handleChange(subject._id, "code", e.target.value)
                      }
                    />
                  ) : (
                    subject.code
                  )}
                </td>
                <td className="px-4">
                  {editedRows[subject._id] ? (
                    <input
                      type="text"
                      name="name"
                      autoComplete="given-name"
                      className="block w-full hover:bg-white rounded-md border-0 m-0 px-2 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={editedRows[subject._id].name || ""}
                      onChange={(e) =>
                        handleChange(subject._id, "name", e.target.value)
                      }
                    />
                  ) : (
                    subject.name
                  )}
                </td>
                <td className="flex gap-2 px-4">
                  {editedRows[subject._id] ? (
                    <>
                      <button
                        onClick={(e) => handleSaveClick(subject._id, e.target)}
                        className="w-12 px-3 py-2 text-sm text-yellow-400 hover:text-yellow-600 focus-visible:text-yellow-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={(e) => handleSaveClick(subject._id, e.target)}
                        className="w-12 px-3 py-2 text-sm text-green-400 hover:text-green-600 focus-visible:text-green-600"
                      >
                        Save
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={(e) => handleEditClick(data, subject._id)}
                      className="w-12 px-3 py-2 text-sm text-blue-400 hover:text-blue-600 focus-visible:text-blue-600"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={(e) => handleDeleteClick(subject._id)}
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

export default SubjectTable;
