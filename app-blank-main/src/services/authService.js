import api from './api';
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthService = {
  login: async (userFormValues) => {
    try {
      const response = await api.post('/auth/login', userFormValues);
      const token = response.data.token;
      const user = JSON.stringify(response.data.user);

      // Armazenar o token no AsyncStorage
      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('user', user);

      console.log('Login realizado com sucesso!');

      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Autenticação inválida');
      } else {
        throw new Error(error.response.data.message);
      }
    }
  },
};

export default AuthService;
