import React, { createContext, useContext, useState } from "react";

// Create a new context
const UserContext = createContext();

// Create a custom hook to access the context
export function useUserContext() {
  return useContext(UserContext);
}

// Create a context provider component
export function UserProvider({ children }) {
  const [selectedUser, setSelectedUser] = useState(null);

  const selectUser = (student) => {
    setSelectedUser(student);
  };

  return (
    <UserContext.Provider value={{ selectedUser, selectUser }}>
      {children}
    </UserContext.Provider>
  );
}
