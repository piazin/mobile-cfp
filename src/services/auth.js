import api from '../config/axios';

class AuthService {
  constructor(api) {
    this.api = api;
  }

  signIn = async (email, password) => {
    const { data } = await api.post('/auth/login', {
      email,
      password,
    });

    return data;
  };

  signUp = async (name, email, password) => {
    const { data } = await api.post('/auth/register', {
      name,
      email,
      password,
    });

    return data;
  };
}

export const authService = new AuthService();
