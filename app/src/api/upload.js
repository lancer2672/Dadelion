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
export const updateUrl = async ({ type, fileId, ...data }) => {
  try {
    const res = await axiosClient.put(`/upload/update-url`, {
      type,
      fileId,
      ...data,
    });
    return res.data.data;
  } catch (er) {
    console.log("update url request error: ", er);
  }
};
