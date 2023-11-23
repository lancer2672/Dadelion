import { UrlAPI } from "@src/constants";

export const transformUserData = (user) => {
  return {
    ...user,
    avatar: user.avatar ? `${UrlAPI}\\${user.avatar}` : null,
  };
};

export const transformChannelData = (channel, userId) => {
  const chatFriendId = channel.memberIds.find((c) => c !== userId);
  console.log("transformChannelData", chatFriendId, userId);
  return {
    ...channel,
    chatFriendId,
  };
};
