import axiosClient from "@src/config/axiosClient";
import { UrlAPI } from "@src/constants";
import { transformUsersData } from "@src/utils/transformData";

const authRoute = "/api/auth";

const authApi = {
  login: async (data) => {
    try {
      const response = await axiosClient.post(
        `${UrlAPI}${authRoute}/login`,
        data
      );
      console.log("authApi user", response);
      const transformedUser = await transformUsersData([
        response.data.data.user,
      ]);
      return { ...response.data.data, user: transformedUser[0] };
    } catch (error) {
      throw error;
    }
  },

  loginWithGoogle: async (idToken) => {
    try {
      const response = await axiosClient.post(`${UrlAPI}${authRoute}/google`, {
        idToken,
      });
      const transformedUser = await transformUsersData([
        response.data.data.user,
      ]);
      return transformedUser[0];
    } catch (error) {
      throw error;
    }
  },
  logout: async () => {
    const response = await axiosClient.post(`${UrlAPI}${authRoute}/logout`);
    return response.data;
  },
  verifyEmail: async ({ code, password, isResetPassword }) => {
    try {
      const response = await axiosClient.get(
        `${UrlAPI}${authRoute}/verify-email/?code=${code}&password=${password}&isResetPassword=${isResetPassword}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  sendVerificationEmail: async (data) => {
    try {
      const response = await axiosClient.post(
        `${UrlAPI}${authRoute}/send-email-verification`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  resetPassword: async (data) => {
    try {
      const response = await axiosClient.put(
        `${UrlAPI}${authRoute}/reset-password`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  changePassword: async (data) => {
    try {
      const response = await axiosClient.put(
        `${UrlAPI}${authRoute}/change-password`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default authApi;
