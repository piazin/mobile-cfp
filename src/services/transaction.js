import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../config/axios';

class TransactionService {
  constructor(api) {
    this.api = api;
  }

  async getAllTransactionsById(include) {
    let jwt = await AsyncStorage.getItem('@jwt');
    jwt = jwt.replace(/"/g, '');

    const response = await this.api.get(`/transaction?include=${include}`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });

    return response.data;
  }

  createTransaction = async (value, date, type, description, category) => {
    const jwt = await AsyncStorage.getItem('@jwt');

    const response = await this.api.post(
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
