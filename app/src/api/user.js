import axiosClient from "@src/config/axiosClient";
import { UrlAPI } from "@src/constants";
import { transformUserData } from "@src/utils/transformData";

const userRoute = "/user";

const userApi = {
  updateUser: async (data) => {
    try {
      const response = await axiosClient.put(
        `${UrlAPI}${userRoute}/update`,
        data
      );
      const transformedUser = transformUserData(response.data.user);
      return { ...response.data, user: transformedUser };
    } catch (error) {
      throw error;
    }
  },

  createUser: async (data) => {
    try {
      const response = await axiosClient.post(
        `${UrlAPI}/api/auth/register`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  saveFCMtoken: async (token) => {
    try {
      const response = await axiosClient.put(
        `${UrlAPI}${userRoute}/save-token`,
        { token }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default userApi;
