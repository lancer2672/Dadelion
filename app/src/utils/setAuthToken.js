import axios from "axios";

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    //local storage k có thì xoá đi để các request về sau k có token nữa
    delete axios.defaults.headers.common["Authorization"];
  }
};
export default setAuthToken;
