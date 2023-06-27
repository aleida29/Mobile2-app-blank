import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('userToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

const TodoService = {
  getTodos: async () => {
    try {
      const response = await api.get('/todo');
      return response.data.todos;
    } catch (error) {
      throw error;
    }
  },
  createTodo: async (todo) => {
    try {
      const response = await api.post('/todo', todo);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  updateTodo: async (todoId, todo) => {
    try {
      const response = await api.put(`/todo/${todoId}`, todo);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  deleteTodo: async (todoId) => {
    try {
      await api.delete(`/todo/${todoId}`);
    } catch (error) {
      throw error;
    }
  },
};

export default TodoService;
