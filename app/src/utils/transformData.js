import { updateUrl } from "@src/api/upload";
import { MessageType, UrlType } from "@src/constants";
import { isUrlExpired } from "./urlHelper";

export const transformUsersData = async (users) => {
  return Promise.all(
    users.map(async (user) => {
      const isAvatarExpired = isUrlExpired({ url: user.avatar?.url });
      if (isAvatarExpired) {
        const newAvatar = await updateUrl({
          type: UrlType.USER,
          userId: user._id,
          fileId: user.avatar?.name,
        });
        user.avatar.url = newAvatar.url;
        console.log("isAvatarExpired", newAvatar.url);
      }
      console.log("transformUsersData user", user);
      return {
        ...user,
        avatarName: user.avatar?.name || null,
        avatar: user.avatar?.url || null,
        nickname: `${user.lastname} ${user.firstname}`,
        dateOfBirth: user.dateOfBirth && Number(user.dateOfBirth),
      };
    })
  );
};

export const transformPostsData = async (posts) => {
  return Promise.all(
    posts.map(async (post) => {
      const isImageExpired = isUrlExpired({ url: post.image.url });
      if (isImageExpired) {
        const newImage = await updateUrl({
          type: UrlType.POST,
          postId: post._id,
          fileId: post.image.name,
        });
        post.image.url = newImage.url;
      }
      return {
        ...post,
        imageName: post.image.name || null,
        image: post.image.url || null,
      };
    })
  );
};

export const transformChannelData = (channel, userId) => {
  const chatFriendId = channel.memberIds.find((c) => c !== userId);
  console.log("transformChannelData", channel, userId);
  return {
    ...channel,
    chatFriendId,
  };
};

export const checkMediaMessageUrl = async (messages) => {
  return Promise.all(
    messages.map(async (msg) => {
      if (msg.type == MessageType.IMAGE) {
        msg.attrs.images = await checkImageMessageUrl(
          msg.attrs.images,
          msg._id
        );
      } else if (msg.type == MessageType.VIDEO) {
        msg.attrs.video = await checkVideoUrl(msg.attrs.video, msg._id);
      }
      return msg;
    })
  );
};

const checkImageMessageUrl = async (images, msgId) => {
  //if last image is expired
  const isImageExpired = isUrlExpired({ url: images.at(-1).url });
  if (!isImageExpired) return images;
  return Promise.all(
    images.map(async (image) => {
      const isImageExpired = isUrlExpired({ url: image.url });
      if (isImageExpired) {
        const newImage = await updateUrl({
          type: UrlType.MESSAGE,
          messageId: msgId,
          fileId: image.name,
        });
        image.url = newImage.url;
      }
      return image;
    })
  );
};
const checkVideoUrl = async (video, msgId) => {
  const isVideoExpired = isUrlExpired({ url: video.url });
  if (isVideoExpired) {
    const newVideo = await updateUrl({
      type: UrlType.MESSAGE,
      messageId: msgId,
      fileId: video.name,
    });
    video.url = newVideo.url;
  }
  return video;
};
