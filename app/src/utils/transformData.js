import { UrlAPI } from "@src/constants";

export const transformUserData = (user) => {
  return {
    ...user,
    avatar: user.avatar ? `${UrlAPI}\\${user.avatar}` : null,
  };
};
