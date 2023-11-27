import { UrlAPI } from "@src/constants";

export const transformUserData = (user) => {
  return {
    ...user,
    avatarName: user.avatar?.name || null,
    avatar: user.avatar?.url || null,
  };
};
export const transformPostData = (post) => {
  return {
    ...post,
    imageName: post.image.name || null,
    image: post.image.url || null,
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
