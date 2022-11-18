import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../config/axios";

export const AuthContext = createContext({});

export default AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);

  const [errorLogin, setErrorLogin] = useState(null);
  const [errorSignUp, setErrorSignUp] = useState(null);

  useEffect(() => {
    loadStorage();
  }, []);

  async function loadStorage() {
    try {
      // await AsyncStorage.removeItem("@user_auth");
      const storageUser = JSON.parse(await AsyncStorage.getItem("@user_auth"));

      storageUser ? setUser(storageUser.data) : setUser(null);
    } catch (error) {
      setUser(null);
    }
  }

  async function setStorageUser(data) {
    await AsyncStorage.setItem("@user_auth", JSON.stringify(data));
  }

  async function signIn(email, password) {
    setLoadingAuth(true);
    try {
      var response = await api.post("/user/authenticate", {
        email,
        password,
      });

      setUser(response.data);
      setStorageUser(response.data);
      setLoadingAuth(false);
    } catch (error) {
      setLoadingAuth(false);
      setErrorLogin(error.response.data.message);
      setTimeout(() => {
        setErrorLogin(null);
      }, 5000);
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
      setStorageUser(response.data);
      setLoadingAuth(false);
    } catch (error) {
      setLoadingAuth(false);
      setErrorSignUp(error.response.data.message);
      setTimeout(() => {
        setErrorSignUp(null);
      }, 5000);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        signUp,
        signIn,
        loadingAuth,
        errorLogin,
        errorSignUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
