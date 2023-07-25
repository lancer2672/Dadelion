const dayjs = require("dayjs");

// example createdAt: "2023-02-16T10:38:03.161+00:00"
export const postCreatedTimeFormater = (createdAt) => {
  let createdDate = new Date(createdAt);
  let currentDate = new Date();
  let difference = currentDate.getTime() - createdDate.getTime();
  let diffDays = Math.ceil(difference / (1000 * 3600 * 24));
  if (diffDays == 1) {
    if (currentDate.getDate() == createdDate.getDate()) {
      return "Hôm nay lúc " + dayjs(createdAt).format("HH:mm");
    } else {
      return "Hôm qua lúc " + dayjs(createdAt).format("HH:mm");
    }
  } else if (diffDays == 2) {
    if (currentDate.getDate() == createdDate.getDate() + 1) {
      return "Hôm qua lúc " + dayjs(createdAt).format("HH:mm");
    } else {
      return dayjs(createdAt).format("DD/MM/YYYY" + " lúc " + "HH:mm");
    }
  } else {
    return dayjs(createdAt).format("DD/MM/YYYY" + " lúc " + "HH:mm");
  }
};

export const commentCreatedTimeFormater = (createdAt) => {
  const createdDate = new Date(createdAt);
  const currentDate = new Date();
  const milliseconds = currentDate - createdDate;
  let seconds = milliseconds / 1000;
  if (seconds < 60) {
    return `${Math.floor(seconds)}s`;
  }
  let minutes = seconds / 60;
  if (minutes < 60) {
    return `${Math.floor(minutes)}m`;
  }
  let hours = minutes / 60;
  if (hours < 24) {
    return `${Math.floor(hours)}h`;
  }
  let days = hours / 24;
  return `${Math.floor(days)}d`;
};
