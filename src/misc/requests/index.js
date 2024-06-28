import axios from 'axios';
import storage, { keys } from '../storage';

axios.defaults.withCredentials = true;

axios.interceptors.request.use((params) => {
  const token = storage.getItem(keys.TOKEN);
  if (token) {
    params.headers.setAuthorization(`Bearer ${token}`);
  }
  return params;
});

const addAxiosInterceptors = ({
  onSignOut,
}) => {
  axios.interceptors.response.use(
    (response) => {
      return response.data
    },
    (error) => {
      if (error?.response?.data.some?.(beError => beError?.code === 'INVALID_TOKEN')
      ) {
        onSignOut();
      }
      if (error?.code === 'ERR_NETWORK') {
        return Promise.reject(error.code);
      }
      throw error?.response?.data;
    }
  );
};

export {
  addAxiosInterceptors,
};

export default axios;
