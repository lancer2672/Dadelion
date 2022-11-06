import {
  StyleSheet,
  TextInput,
  Button,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import { useState } from "react";
import React from "react";
import axios from "axios";

import { AppSlogan } from "../../utils/slogan";
import { space } from "../../utils/size";
import { UrlAPI } from "../../constants/constants";
import Color from "../../utils/color";

const Register = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [replicatedPassword, setReplicatedPassword] = useState("");

  const navigateToLoginScreen = () => {
    navigation.navigate("Login");
  };
  const handleRegistration = () => {
    if (password != replicatedPassword) {
      return;
    }
    axios
      .post(`${UrlAPI}/api/auth/register`, {
        email,
        username,
        password,
      })
      .then(function (response) {
        console.log(response);
        navigation.navigate("Login");
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
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
      <Text>{AppSlogan}</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(email) => setEmail(email)}
        placeholder="Email"
      ></TextInput>
      <Text placeholder="Email"></Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(username) => setUsername(username)}
        placeholder="Tên đăng nhập"
      ></TextInput>
      <TextInput
        style={styles.textInput}
        onChangeText={(password) => setPassword(password)}
        placeholder="Mật khẩu"
      ></TextInput>
      <TextInput
        style={styles.textInput}
        onChangeText={(replicatedPassword) =>
          setReplicatedPassword(replicatedPassword)
        }
        placeholder="Nhập lại mật khẩu"
      ></TextInput>
      <TouchableOpacity style={styles.button} onPress={handleRegistration}>
        <Text style={styles.textOfButton}>Đăng ký</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { marginTop: space.s }]}
        onPress={navigateToLoginScreen}
      >
        <Text style={styles.textOfButton}>Quay lại đăng nhập</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default Register;

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
