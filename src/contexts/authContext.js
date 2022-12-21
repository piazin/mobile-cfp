import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../config/axios';
import { UserClass } from '../services/api';

export const AuthContext = createContext({});

const getUser = new UserClass();

export default AuthProvider = ({ children }) => {
  const [jwt, setJwt] = useState(null);
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);

  const [errorLogin, setErrorLogin] = useState(null);
  const [errorSignUp, setErrorSignUp] = useState(null);

  useEffect(() => {
    loadStorage();
  }, []);

  const handleNewData = () => {
    updateUserInfo(user?._id);
  };

  async function updateUserInfo(user_id) {
    if (!user_id) return;

    try {
      const response = await getUser.updateUserInfo(user_id);
      if (!response) return;

      setUser(response.data.data);
      setStorageUser(response.data.data);
    } catch (error) {
      console.error(error);
      setUser(null);
      setStorageUser(null);
    }
  }

  async function loadStorage() {
    try {
      const storageUser = JSON.parse(await AsyncStorage.getItem('@user_auth'));
      storageUser ? setUser(storageUser) : setUser(null);

      const storageJWT = JSON.parse(await AsyncStorage.getItem('@jwt'));
      storageJWT ? setJwt(storageJWT) : setJwt(null);
    } catch (error) {
      setUser(null);
    }
  }

  async function logOut() {
    try {
      await AsyncStorage.removeItem('@user_auth');
      await AsyncStorage.removeItem('@jwt');
      setUser(null);
      setJwt(null);
    } catch (error) {
      setUser(null);
      setJwt(null);
    }
  }

  async function setStorageUser(data) {
    await AsyncStorage.setItem('@user_auth', JSON.stringify(data));
  }

  async function setStorageJWT(data) {
    await AsyncStorage.setItem('@jwt', JSON.stringify(data));
  }

  async function signIn(email, password) {
    setLoadingAuth(true);
    try {
      var response = await api.post('/user/authenticate', {
        email,
        password,
      });

      setUser(response.data.data);
      setStorageUser(response.data.data);
      setJwt(response.data.data.token);
      setStorageJWT(response.data.data.token);
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
      var response = await api.post('/user', {
        name: name,
        email: email,
        password: password,
      });

      setUser(response.data.data);
      setStorageUser(response.data.data);
      setJwt(response.data.data.token);
      setStorageJWT(response.data.data.token);
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
        jwt,
        user,
        signUp,
        signIn,
        logOut,
        loadingAuth,
        errorLogin,
        errorSignUp,
        handleNewData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
