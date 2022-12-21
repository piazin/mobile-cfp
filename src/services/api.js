import api from '../config/axios';

export class UserClass {
  async updateUserInfo(user_id) {
    try {
      const userData = await api.get(`/user/${user_id}`);
      return userData;
    } catch (error) {
      return null;
    }
  }

  async requestRecoveryCode(email) {
    try {
      var response = await api.post('/user/password-reset-request', {
        email,
      });
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }

  async verifyCode(code) {
    try {
      var response = await api.post('/user/verify-reset-code', { code });
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }

  async resetPassword(email, password) {
    try {
      var response = await api.patch('/user/change-password', {
        email,
        password,
      });
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
}

export class TransactionsClass {
  async getAllTransactions(user_id) {
    try {
      const transactionData = await api.get(`/transaction/${user_id}`);
      return transactionData;
    } catch (error) {
      return null;
    }
  }

  async createTransaction(
    value,
    date,
    type,
    description,
    category,
    owner,
    jwt
  ) {
    try {
      await api.post(
        '/transaction',
        {
          value,
          date,
          type,
          description,
          category,
          owner,
        },
        { headers: { Authorization: `Bearer ${jwt}` } }
      );
    } catch (error) {
      console.error(error.response.data);
    }
  }
}

export class Category {
  async getAllCategories() {
    try {
      const categories = await api.get();
    } catch (error) {}
  }
}
