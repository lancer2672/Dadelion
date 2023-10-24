import axiosClient from "@src/config/axiosClient";

export const uploadFile = async ({ type, data }) => {
  try {
    const res = await axiosClient.post(`/upload/${type}`, data);
    return res.data.data;
  } catch (er) {
    console.log(er);
  }
};
