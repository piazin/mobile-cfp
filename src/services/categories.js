import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../config/axios';

class CategoryService {
  constructor(api) {
    this.api = api;
  }

  async findAllCategories() {
    try {
      const jwt = await AsyncStorage.getItem('@jwt');
      const response = await this.api.get('/category', {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      return response?.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async deleteCategoryById(id) {
    try {
      const jwt = await AsyncStorage.getItem('@jwt');
      const response = await this.api.delete(`/category/${id}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      return response?.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export const categoryService = new CategoryService(api);
