import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "@src/api/userApi";
import authApi from "@src/api/authApi";

const createUser = createAsyncThunk("user/create", async (user) => {
  try {
    console.log("createUser", user);
    const res = await userApi.createUser(user);
    return res.data.data;
  } catch (error) {
    return { errorMessage: error.message };
  }
});

const login = createAsyncThunk("user/login", async (params) => {
  try {
    const { data } = await authApi.signInAccount(
      params.username,
      params.password
    );
    console.log("data reveived from server - LOGIN", data);

    if (data.data) {
      await AsyncStorage.setItem(
        "accessToken",
        JSON.stringify(data.data.accessToken)
      );

      //   await AsyncStorage.setItem(
      //     "refreshToken",
      //     JSON.stringify(data.data.refreshToken)
      //   );

      // chuyển từ idUser -> id
      await AsyncStorage.setItem("idUser", JSON.stringify(data.data.id));
      return data.data;
    } else {
      return { errorMessage: "Incorrect username or password!" };
    }
  } catch (error) {
    return { errorMessage: error.message };
  }
});

const updateUser = createAsyncThunk("user/update", async (user) => {
  try {
    const res = await userApi.updateUser(user);
    if (res.data.data) {
      return res.data.data;
    }
  } catch (error) {
    return { errorMessage: error.message };
  }
});

const getUser = createAsyncThunk("user/get", async (idUser) => {
  const res = await userApi.getUserById(idUser);
  return res.data;
});

export { login, createUser, updateUser, getUser };
