// import Axios, { AxiosRequestConfig } from 'axios';


// function authRequestInterceptor(config: AxiosRequestConfig) {
// //   const token = storage.getToken();
//   if (token) {
//     config.headers.authorization = `${token}`;
//   }
//   config.headers.Accept = 'application/json';
//   return config;
// }

// export const axios = Axios.create({
//   baseURL: API_URL,
// });

// axios.interceptors.request.use(authRequestInterceptor);
// axios.interceptors.response.use(
//   (response) => {
//     return response.data;
//   },
//   (error) => {
//     const message = error.response?.data?.message || error.message;
//     useNotificationStore.getState().addNotification({
//       type: 'error',
//       title: 'Error',
//       message,
//     });

//     return Promise.reject(error);
//   }
// );