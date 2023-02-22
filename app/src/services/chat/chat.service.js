import { UrlAPI } from "../../constants";
import axios from "axios";

export const GetChannels = async () => {
  try {
    const res = await axios.get(`${UrlAPI}/chat/channel`, {});
    return res.data.channels;
  } catch (err) {
    throw err;
  }
};

export const GetGroupChatMembers = async (channelId) => {
  try {
    const res = await axios.get(`${UrlAPI}/chat/channel/${channelId}/members`);
    return res.data.members;
  } catch (err) {
    throw err;
  }
};
