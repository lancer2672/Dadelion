/* eslint-disable prettier/prettier */
import { UrlAPI } from "../../constants";
import axios from "axios";

export const GetAllPosts = async (username, password) => {
  await axios.get(`${UrlAPI}/Post`, {});
};
