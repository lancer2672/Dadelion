import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UrlAPI } from "../constants";

const axiosClient = axios.create({
  baseURL: `${UrlAPI}`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
