/* eslint-disable prettier/prettier */
import { UrlAPI } from "../../constants";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import readImageData from "../../utils/imageHandler";

export const LoginRequest = async (username, password, progressEvent) => {
  return await axios.post(
    `${UrlAPI}/api/auth/login`,
    { username, password },
    {
      onUploadProgress: progressEvent,
    }
  );
};

export const RegisterRequest = (email, username, password) => {
  return axios.post(`${UrlAPI}/api/auth/register`, {
    email,
    username,
    password,
  });
};

export const TransformUserInformation = (user) => {
  const transformedAvatar = readImageData(user.avatar.data.data);
  const transformedWallpaper = readImageData(user.wallPaper.data.data);
  return {
    ...user,
    avatar: transformedAvatar,
    wallPaper: transformedWallpaper,
  };
};
