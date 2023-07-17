/* eslint-disable prettier/prettier */
import { UrlAPI } from "../../constants";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import readImageData from "../../utils/imageHandler";
import { getValue, save, deleteItem } from "../../utils/tokenStorage";
import * as SecureStore from "expo-secure-store";

export const loginRequest = async (username, password) => {
  try {
    const response = await axios.post(
      `${UrlAPI}/api/auth/login`,
      { username, password },
      {
        // onUploadProgress: progressEvent,
      }
    );
    return response.data.data;
  } catch (err) {
    throw err;
  }
};

export const registerRequest = (
  email,
  username,
  password,
  firstname,
  lastname,
  dateOfBirth
) => {
  return axios.post(`${UrlAPI}/api/auth/register`, {
    email,
    username,
    password,
    firstname,
    lastname,
    dateOfBirth,
  });
};

export const transformUserInformation = (user) => {
  const transformedAvatar = readImageData(user.avatar.data.data);
  const transformedWallpaper = readImageData(user.wallPaper.data.data);
  return {
    ...user,
    avatar: transformedAvatar,
    wallPaper: transformedWallpaper,
  };
};

export const storeUserData = async (data) => {
  try {
    const stringifiedData = JSON.stringify(data);
    await SecureStore.setItemAsync("user", stringifiedData);
  } catch (err) {
    throw err;
  }
};

export const deleteUserToken = () => {
  deleteItem("user");
};

export const checkUserLoggedIn = () => {
  return SecureStore.getItemAsync("user")
    .then((userData) => {
      return JSON.parse(userData);
    })
    .catch((err) => {
      throw err;
    });
};

export const getUserById = async (userId) => {
  try {
    const res = await axios.get(`${UrlAPI}/user/${userId}`);
    return res;
  } catch (err) {
    throw err;
  }
};
