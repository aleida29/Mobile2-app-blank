import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'http://192.168.15.13:3000/api', // substitua pela URL base da sua API
});

api.interceptors.request.use(async (config) => {
    // Obter o token do AsyncStorage
    const token = await AsyncStorage.getItem('userToken');

    // Definir o token como header "Authorization"
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    if (error.response) {
      // Erro de resposta da API (status code diferente de 2xx)
      console.error('Erro na resposta da API:', error.response.data);
    } else if (error.request) {
      // Erro de conexão com o servidor
      console.error('Erro de conexão com o servidor:', error.request);
    } else {
      // Outros erros
      console.error('Erro:', error.message);
    }

    // Retornar uma Promise rejeitada com o erro
    return Promise.reject(error);
  }
);


export default api;
