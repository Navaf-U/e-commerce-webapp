import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    //get the token from cookies
    const accessToken = Cookies.get("token");
    if (accessToken) {
      // include the token in the header
      config.headers["token"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    //part of interceptors and will catch errors
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // request to refresh token
        const response = await axios.post("/auth/refreshtoken");
        const newAccessToken = response.data.token;

        //update the instance's header
        axiosInstance.defaults.headers.common[
          "token"
        ] = `Bearer ${newAccessToken}`;
        //retry the original request with new token
        return axiosInstance(originalRequest);
      } catch (error) {
        console.error("Token refresh error:", error);
        // Optional: Redirect to login or handle logout
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
