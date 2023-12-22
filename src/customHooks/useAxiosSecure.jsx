import axios from 'axios';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/Providers/AuthProvider';

const axiosSecure = axios.create({
  baseURL: 'https://dwellife-server.vercel.app',
});

const useAxiosSecure = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { handleLogout } = useContext(AuthContext);
  // interceptors for request
  axiosSecure.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('access-token');
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    (error) => Promise.reject(error)
  );

  // interceptor for response
  axiosSecure.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const status = error.response.status;
      // checking 401 or 403 error. if failed logout the user and redirect to login page
      if (user?.email !== undefined && (status === 401 || status === 403)) {
        await handleLogout();
        navigate('/login');
      }
      return Promise.reject(error);
    }
  );
  return axiosSecure;
};

export default useAxiosSecure;
