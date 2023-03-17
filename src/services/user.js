import api from '../config/axios';

class UserService {
  constructor(api) {
    this.api = api;
  }

  refreshUserData = async (userId) => {
    const { data } = await this.api.get(`/user/${userId}`);
    return data;
  };

  requestRecoveryCode = async (email) => {
    const { data } = await this.api.post('/user/password-reset-request', {
      email,
    });

    return data;
  };

  verifyCode = async (code) => {
    const { data } = await this.api.post('/user/verify-reset-code', { code });
    return data;
  };

  resetPassword = async (email, password) => {
    const { data } = await this.api.patch('/user/change-password', {
      email,
      password,
    });
    return data;
  };
}

export const userService = new UserService(api);
