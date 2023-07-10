import { UrlAPI } from "../../constants";
import axios from "axios";

export const getChannels = async () => {
  try {
    const res = await axios.get(`${UrlAPI}/channel`, {});
    return res.data.channels;
  } catch (err) {
    throw err;
  }
};

export const getGroupChatMembers = async (channelId) => {
  try {
    const res = await axios.get(`${UrlAPI}/channel/${channelId}/members`);
    return res.data.members;
  } catch (err) {
    throw err;
  }
};

export const getRoomMessages = async (userId, channelId) => {
  try {
    const res = await axios.get(`${UrlAPI}/channel/:${channelId}/messages`);
    return res.data.recentMessages;
  } catch (err) {
    throw err;
  }
};
