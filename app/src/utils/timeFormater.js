const dayjs = require("dayjs");

// example createdAt: "2023-02-16T10:38:03.161+00:00"
export const PostCreatedTimeFormater = (TimeCreatedPost) => {
  let createdDate = new Date(TimeCreatedPost);
  let currentDate = new Date();
  let difference = currentDate.getTime() - createdDate.getTime();
  let diffDays = Math.ceil(difference / (1000 * 3600 * 24));
  if (diffDays == 1) {
    if (currentDate.getDate() == createdDate.getDate()) {
      return "Hôm nay lúc " + dayjs(TimeCreatedPost).format("HH:mm");
    } else {
      return "Hôm qua lúc " + dayjs(TimeCreatedPost).format("HH:mm");
    }
  } else if (diffDays == 2) {
    if (currentDate.getDate() == createdDate.getDate() + 1) {
      return "Hôm qua lúc " + dayjs(TimeCreatedPost).format("HH:mm");
    } else {
      return dayjs(TimeCreatedPost).format("DD/MM/YYYY" + " lúc " + "HH:mm");
    }
  } else {
    return dayjs(TimeCreatedPost).format("DD/MM/YYYY" + " lúc " + "HH:mm");
  }
};

export const CommentCreatedTimeFormater = (TimeCreatedComment) => {
  //
};
