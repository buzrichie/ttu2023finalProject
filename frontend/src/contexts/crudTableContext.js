import React, { createContext, useContext, useState } from "react";

const CRUDTableContext = createContext();

export function useCRUDTableContext() {
  return useContext(CRUDTableContext);
}

export function CRUDTableProvider({ children }) {
  const [editedRows, setEditedRows] = useState({});
  const [currentClicked, setCurrentClicked] = useState(null);

  const handleChange = (itemId, name, value) => {
    // Create a copy of the current edited data for the specific academic level
    const updatedEditedData = { ...editedRows[itemId], [name]: value };

    // Update the editedRows state with the new edited data
    setEditedRows({
      ...editedRows,
      [itemId]: updatedEditedData,
    });
  };

  const handleEditClick = (data, itemId) => {
    // Set the academic level as being edited

    setEditedRows({
      ...editedRows,
      [itemId]: {
        level: data.find((level) => level._id === itemId).level,
      },
    });
    setCurrentClicked(itemId);
  };

  const cleanHandleSaveClick = (itemId) => {
    // Add logic to save the changes for the specific row with the itemId
    // You can use editedRows[itemId] to access the edited data
    // You can send a PUT request to update the data on the server

    // After saving, you can reset the edited state for the specific row
    const { [itemId]: deletedData, ...restEditedRows } = editedRows;
    setEditedRows(restEditedRows);
  };

  const handleDeleteClick = (itemId) => {
    // Add logic to delete the row with the itemId
    // You can send a DELETE request to remove the data from the server
  };

  const contextValue = {
    editedRows,
    currentClicked,
    handleChange,
    handleEditClick,
    cleanHandleSaveClick,
    handleDeleteClick,
  };

  return (
    <CRUDTableContext.Provider value={contextValue}>
      {children}
    </CRUDTableContext.Provider>
  );
}
