import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../config/axios';

class TransactionService {
  constructor(api) {
    this.api = api;
  }

  async getAllTransactionsById(userId) {
    const jwt = await AsyncStorage.getItem('@jwt');

    const response = await api.get(`/transaction/${userId}`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });

    return response.data;
  }

  createTransaction = async (value, date, type, description, category) => {
    const jwt = await AsyncStorage.getItem('@jwt');

    const response = await api.post(
      '/transaction',
      {
        value,
        date,
        type,
        description,
        category,
      },
      { headers: { Authorization: `Bearer ${jwt}` } }
    );

    return response.data;
  };
}

export const transactionService = new TransactionService(api);
