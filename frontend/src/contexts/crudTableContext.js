import React, { createContext, useContext, useState } from "react";

const CRUDTableContext = createContext();

export function useCRUDTableContext() {
  return useContext(CRUDTableContext);
}

export function CRUDTableProvider({ children }) {
  const [editedRows, setEditedRows] = useState({});

  const handleChange = (academicLevelId, name, value) => {
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
  };

  const handleSaveClick = (academicLevelId) => {
    // Add logic to save the changes for the specific row with the academicLevelId
    // You can use editedRows[academicLevelId] to access the edited data
    // You can send a PUT request to update the data on the server

    // After saving, you can reset the edited state for the specific row
    const { [academicLevelId]: deletedData, ...restEditedRows } = editedRows;
    setEditedRows(restEditedRows);
  };

  const handleDeleteClick = (academicLevelId) => {
    // Add logic to delete the row with the academicLevelId
    // You can send a DELETE request to remove the data from the server
  };

  const contextValue = {
    editedRows,
    handleChange,
    handleEditClick,
    handleSaveClick,
    handleDeleteClick,
  };

  return (
    <CRUDTableContext.Provider value={contextValue}>
      {children}
    </CRUDTableContext.Provider>
  );
}
