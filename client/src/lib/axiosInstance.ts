import axios, {AxiosInstance} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../api/api';



const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  async config => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error fetching auth token:', error);
    }
    return config;
  },
  error => Promise.reject(error),
);


axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      await handleUnauthorized();
    }
    return Promise.reject(error);
  },
);

const handleUnauthorized = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem('authToken');
    
    await AsyncStorage.removeItem('user');

    // You can navigate to login using your navigation logic:
    // const navigation = useNavigation();
    // navigation.navigate("Login");

    console.warn('Unauthorized — user logged out.');
  } catch (error) {
    console.error('Error handling unauthorized:', error);
  }
};

export default axiosInstance;
