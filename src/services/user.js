import api from '../config/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

class UserService {
  constructor(api) {
    this.api = api;
  }

  async refreshUserData() {
    const jwt = await AsyncStorage.getItem('@jwt');
    const { data } = await this.api.get('/user', { headers: { Authorization: `Bearer ${jwt}` } });
    return data;
  }

  async requestRecoveryCode(email) {
    const { data } = await this.api.post('/user/password-reset-request', {
      email,
    });

    return data;
  }

  async verifyCode(code) {
    const { data } = await this.api.post('/user/verify-reset-code', { code });
    return data;
  }

  async resetPassword(email, password) {
    const { data } = await this.api.patch('/user/change-password', {
      email,
      password,
    });
    return data;
  }
}

export const userService = new UserService(api);
