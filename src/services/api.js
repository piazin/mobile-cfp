import api from "../config/axios";

export class UserClass {
  async updateUserInfo(user_id) {
    try {
      const userData = await api.get(`/user/${user_id}`);
      return userData;
    } catch (error) {
      return null;
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
        "/transaction",
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
