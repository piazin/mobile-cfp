import React, { createContext, useState, useEffect } from 'react';
import api from '../config/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TransactionContext = createContext({});

export default function TransactionProvider({ children }) {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    findAllCategories();
  }, []);

  const findAllCategories = async () => {
    try {
      const jwt = await AsyncStorage.getItem('@jwt');

      const response = await api.get('/category', { headers: { Authorization: `Bearer ${jwt}` } });
      setCategories(response.data.data);
    } catch (err) {
      console.error(err.data);
      setCategories(null);
    }
  };

  return (
    <TransactionContext.Provider value={{ categories: categories }}>
      {children}
    </TransactionContext.Provider>
  );
}
