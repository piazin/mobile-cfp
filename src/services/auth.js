import api from '../config/axios';

class AuthService {
  constructor(api) {
    this.api = api;
  }

  async signIn(email, password) {
    const { data } = await this.api.post('/auth/login', {
      email,
      password,
    });

    return data;
  }

  async signUp(name, email, password) {
    const { data } = await this.api.post('/auth/register', {
      name,
      email,
      password,
    });

    return data;
  }
}

export const authService = new AuthService(api);
