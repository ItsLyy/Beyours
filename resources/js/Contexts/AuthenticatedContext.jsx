import React, { createContext, useContext } from "react";

const AuthenticatedContext = createContext();

export const authenticatedData = () => useContext(AuthenticatedContext);

export const AuthenticatedProvider = ({ isUserOnlineHandler, children }) => {
  return (
    <AuthenticatedContext.Provider value={{ isUserOnlineHandler }}>
      {children}
    </AuthenticatedContext.Provider>
  );
};
