import React, { createContext, useState } from "react";

export const AuthContext = createContext({});

export default AuthProvider = ({ children }) => {
  const [user, setUser] = useState(true);

  async function signUp() {
    console.log("hello");
  }

  signUp();

  return (
    <AuthContext.Provider value={{ signed: user }}>
      {children}
    </AuthContext.Provider>
  );
};
