export const createFormDataImages = (images) => {
  const imagesData = new FormData();
  images.forEach((image, index) => {
    imagesData.append("image", {
      uri: image.path || image.url,
      name: "image" + index,
      type: "image/jpeg",
    });
  });
  return imagesData;
};
export const createFormDataVideo = (video) => {
  const videoMessage = new FormData();
  videoMessage.append("video", {
    uri: video.path,
    name: new Date() + "_profile",
    type: "video/mp4",
    duration: video.duration,
  });
  return videoMessage;
};
