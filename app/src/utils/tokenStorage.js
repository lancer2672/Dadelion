import * as SecureStore from "expo-secure-store";

export const save = async (key, value) => {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (err) {
    throw err;
  }
};

export const getValue = (key) => {
  console.log("getValue");
  SecureStore.getItemAsync(key)
    .then((data) => {
      console.log("data", data);
      return data;
    })
    .catch((err) => {
      throw err;
    });
};

export const deleteItem = async (key) => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (err) {
    throw err;
  }
};
