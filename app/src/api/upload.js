import axiosClient from "@src/config/axiosClient";

export const uploadFile = async ({ type, data }) => {
  try {
    console.log("Data", data);
    const res = await axiosClient.post(`/upload/${type}`, data);
    console.log(res.data.data);

    return res.data.data;
  } catch (er) {
    console.log("upload request error: ", er);
  }
};

export const getSignedUrl = async ({ fileIds }) => {
  try {
    const res = await axiosClient.post(`upload/get-url`, {
      fileIds,
    });
    return res.data.data;
  } catch (er) {
    console.log("error", er);
  }
};
