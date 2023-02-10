import { UrlAPI } from "../../constants";
import axios from "axios";

export const GetChannels = () => {
  return axios.get(`${UrlAPI}/chat/channel`, {});
};
