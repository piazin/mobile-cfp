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
