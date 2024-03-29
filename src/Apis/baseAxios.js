import axios from "axios";
import {AuthActions} from '../store/reducers/auth';
import {store} from '../store/store';

// const baseURL = "https://cfdaily.azurewebsites.net/"
const baseURL = "http://localhost:8000"

let isRefreshTokenFetched = false;

const simpleAxios = axios.create({
  baseURL: baseURL,
});

simpleAxios.interceptors.request.use((config) => {
  config.headers["Authorization"] = `Bearer ${localStorage.getItem("access_token")}`;
  return config;
});

const customAxios = axios.create({
  baseURL: baseURL,
});


customAxios.interceptors.request.use((config) => {
  config.headers["Authorization"] = `Bearer ${localStorage.getItem("access_token")}`;
  return config;
});

customAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    console.log(error)
    console.log(error.response.status)

    if (error.response.status === 401 && isRefreshTokenFetched) {
      isRefreshTokenFetched = false;
      store.dispatch(AuthActions.logout()); //we were not able to fetch refresh token we logout.
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !isRefreshTokenFetched) {
      isRefreshTokenFetched = true;
      const res = await customAxios.post(`/api/v1/users/refreshToken`, {
        refreshToken: localStorage.getItem("refresh_token"),
      });
      console.log("fetching refresh token");
      console.log(res)
      if (res.status === 200) {
        localStorage.setItem('access_token', res.data.token);
        localStorage.setItem('refresh_token', res.data.refreshToken);
        customAxios.defaults.headers.common["Authorization"] =
          "Bearer " + localStorage.getItem("access_token");
        return customAxios(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);


export {simpleAxios};
export default customAxios;
