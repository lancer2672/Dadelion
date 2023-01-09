/* eslint-disable prettier/prettier */
import { UrlAPI } from "../../constants";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";

export const LoginRequest = async (username, password) => {
  return await axios.post(`${UrlAPI}/api/auth/login`, { username, password });
};
export const RegisterRequest = (email, username, password) => {
  return axios.post(`${UrlAPI}/api/auth/register`, {
    email,
    username,
    password,
  });
};
