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

import { AppSlogan } from "../../utils/slogan";
import Color from "../../utils/color";
import { setPosts } from "../../features/post/postSlice.js";
import { space } from "../../utils/size";
import setAuthToken from "../../utils/setAuthToken";
import { setAuth } from "../../features/auth/authSlice";
import { UrlAPI } from "../../constants/constants";

import axios from "axios";

const Login = ({ navigation }) => {
  const posts = useSelector((state) => state.post.posts);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmitForm = async () => {
    axios
      .post(`${UrlAPI}/api/auth/login`, { username, password })
      .then(handleLogin)
      .then((response) => {
        // save("token",token);
        dispatch(setPosts(response.data.posts));
        navigation.navigate("Navigation");
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
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

  return (
    <ImageBackground
      source={require("../../../assets/imgs/Auth.jpg")}
      style={styles.container}
    >
      <Image
        style={styles.tinyLogo}
        source={require("./../../../assets/imgs/Logo.png")}
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
    lineHeight: 20,
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
