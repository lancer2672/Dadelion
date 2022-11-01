import {
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  Button,
  ImageBackground,
  StyleSheet,
} from "react-native";
import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as SecureStore from "expo-secure-store";

import { AppSlogan } from "../utils/slogan";
import Color from "../utils/color";
import { setPosts } from "../features/post/postSlice.js";
import { space } from "../utils/size";
import setAuthToken from "../utils/setAuthToken";
import { useEffect } from "react";
import { setAuth } from "../features/auth/authSlice";
import { UrlAPI } from "../constants/constants";

const axios = require("axios").default;

const Login = ({ navigation }) => {
  const posts = useSelector((state) => state.post.posts);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // useEffect(()=>{
  //     getUserFromLocalStore()
  // },[])

  // const getUserFromLocalStore = ()=>{
  //   const token = getValueFor("token");
  // }
  const handleSubmitForm = async () => {
    // await axios
    axios
      .post(`${UrlAPI}/api/auth/login`, { username, password })
      .then(handleLogin)
      .then((response) => {
        // save("token",token);
        dispatch(setPosts(response.data.posts));
        navigation.navigate("Home");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleLogin = (res) => {
    const { token, user } = res.data;
    setAuthToken(token);
    dispatch(setAuth({ isAuthenticated: true, user }));
    return getPosts();
  };
  //get posts
  const getPosts = async () => {
    return await axios.get(`${UrlAPI}/Post`, {});
  };

  const navigateToRegisterScreen = () => {
    navigation.navigate("Register");
  };
  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

  async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      return result;
    } else {
      return null;
    }
  }

  return (
    <ImageBackground
      source={require("../../assets/imgs/Auth.jpg")}
      style={styles.container}
    >
      <Image
        style={styles.tinyLogo}
        source={require("./../../assets/imgs/Logo.png")}
      />
      <Text style={styles.slogan}>{AppSlogan}</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(newUsername) => setUsername(newUsername)}
        placeholder="Tên đăng nhập"
      ></TextInput>
      <TextInput
        style={styles.textInput}
        onChangeText={(newPassword) => setPassword(newPassword)}
        secureTextEntry={true}
        placeholder="Mật khẩu"
      ></TextInput>
      <View style={{ margin: space.xl }}>
        <TouchableOpacity style={styles.button} onPress={handleSubmitForm}>
          <Text style={styles.textOfButton}>Đăng nhập</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { marginTop: space.s }]}
          onPress={navigateToRegisterScreen}
        >
          <Text style={styles.textOfButton}>Đăng ký</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.forgetText}>Quên mật khẩu ?</Text>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    borderRadius: 25,
    height: 32,
    padding: 10,
    marginTop: space.s,
    color: Color.textColor,
  },
  tinyLogo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  button: {
    minWidth: 200,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 25,
  },
  textOfButton: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Color.textColor,
  },
  forgetText: {
    fontWeight: "bold",
  },
  slogan: {
    fontStyle: "italic",
    textColor: Color.textColor,
    fontWeight: "500",
  },
});
export default Login;
