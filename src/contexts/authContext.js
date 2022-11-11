import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../config/axios";

export const AuthContext = createContext({});

export default AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);

  useEffect(() => {}, []);

  async function loadStorage() {
    try {
      const storageUser = await AsyncStorage.getItem("@user_auth");
    } catch (error) {
      console.error(error);
    }
  }

  async function signUp({ name, email, password }) {
    setLoadingAuth(true);
    try {
      var response = await api.post("/user", {
        name: name,
        email: email,
        password: password,
      });
      setUser(response.data);
      setLoadingAuth(false);
      return response.data;
    } catch (error) {
      console.error(error.response.data);
      setLoadingAuth(false);
      return {
        status: 400,
      };
    }
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, signUp, loadingAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
