import axiosClient from "./axiosClient";

const userApiUrl = "/api/auth";
const userApi = {
  createUser: async (data) => {
    console.log("createUser", data);
    const response = await axiosClient.post(`/api/auth/register`, data);

    return response;
  },
};
export default userApi;
