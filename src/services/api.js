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
}
