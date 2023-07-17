import axiosClient from "./axiosClient";

const authApiUrl = "/api/auth";
const authApi = {
  login: async (username, password) => {
    try {
      const response = await axiosClient.post(
        `${authApiUrl}/login`,
        { username, password },
        {
          // onUploadProgress: progressEvent,
        }
      );
      return response;
    } catch (err) {
      throw err;
    }
  },
};
export default authApi;
