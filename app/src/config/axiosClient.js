import AsyncStorage from "@react-native-async-storage/async-storage";
import { UrlAPI } from "@src/constants";
import axios from "axios";

const baseURL = UrlAPI;

const axiosClient = axios.create({
  baseURL,
});
axiosClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${JSON.parse(token)}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    //refresh token failed
    return Promise.reject(error);
  }
);

export default axiosClient;
