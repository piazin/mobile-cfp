import React, { createContext, useState, useEffect } from 'react';
import * as Network from 'expo-network';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService } from '../services/auth';
import { userService } from '../services/user';

export const AuthContext = createContext({});

export default AuthProvider = ({ children }) => {
  const [jwt, setJwt] = useState(null);
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);

  const [errorLogin, setErrorLogin] = useState(null);
  const [errorSignUp, setErrorSignUp] = useState(null);

  useEffect(() => {
    loadStorage();
    verifyStatusNetwork();
  }, []);

  const handleNewData = () => {
    updateUserData();
  };

  async function updateUserData() {
    try {
      const { data } = await userService.refreshUserData();

      setUser(data);
      setStorageUser(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function loadStorage() {
    try {
      var [[, user], [, token]] = await AsyncStorage.multiGet(['@user_auth', '@jwt']);

      setJwt(token || null);
      setUser(user ? JSON.parse(user) : null);
    } catch (error) {
      setUser(null);
      setJwt(null);
    }
  }

  async function verifyStatusNetwork() {
    try {
      const { isConnected } = await Network.getNetworkStateAsync();
      !isConnected ?? (await logOut());
    } catch (error) {
      logOut();
    }
  }

  async function logOut() {
    try {
      await AsyncStorage.multiRemove(['@user_auth', '@jwt']);
    } catch (err) {
      console.log(err);
    } finally {
      setUser(null);
      setJwt(null);
    }
  }

  async function setStorageUser(data) {
    await AsyncStorage.setItem('@user_auth', JSON.stringify(data));
  }

  async function setStorageJWT(data) {
    await AsyncStorage.setItem('@jwt', JSON.stringify(data).replace(/"/g, ''));
  }

  async function signIn(email, password) {
    try {
      setLoadingAuth(true);
      const { data } = await authService.signIn(email, password);

      setJwt(data.token.replace(/"/g, ''));
      setUser(data);

      await Promise.all([setStorageUser(data), setStorageJWT(data.token)]);
    } catch (error) {
      setErrorLogin(error.response?.data?.message || 'Erro ao realizar login');
      setTimeout(() => {
        setErrorLogin(null);
      }, 5000);
    } finally {
      setLoadingAuth(false);
    }
  }

  async function signUp({ name, email, password }) {
    try {
      setLoadingAuth(true);
      const { data } = await authService.signUp(name, email, password);

      setUser(data);
      setJwt(data.token.replace(/"/g, ''));

      await Promise.all(setStorageUser(data), setStorageJWT(data.token));
    } catch (error) {
      setErrorSignUp(error.response?.data?.message || 'Erro ao criar conta');
      setTimeout(() => {
        setErrorSignUp(null);
      }, 5000);
    } finally {
      setLoadingAuth(false);
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
