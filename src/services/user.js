import api from '../config/axios';

class UserService {
  constructor(api) {
    this.api = api;
  }

  async refreshUserData(userId) {
    const { data } = await this.api.get(`/user/${userId}`);
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
