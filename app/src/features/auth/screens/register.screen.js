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
import { useState, useContext } from "react";
import React from "react";

import { AppSlogan } from "../../../utils/slogan";
import Color from "../../../utils/color";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

const RegisterScreen = ({ navigation }) => {
  const { isLoading, error, onRegister } = useContext(AuthenticationContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [replicatedPassword, setReplicatedPassword] = useState("");

  const navigateToLoginScreen = () => {
    navigation.navigate("Login");
  };
  const handleRegistration = () => {
    onRegister(email, username, password, replicatedPassword);
  };
  return (
    <ImageBackground
      source={require("../../../../assets/imgs/Auth.jpg")}
      style={styles.container}
    >
      <Image
        style={styles.tinyLogo}
        source={require("./../../../../assets/imgs/Logo.png")}
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
        style={[styles.button, { marginTop: 8 }]}
        onPress={navigateToLoginScreen}
      >
        <Text style={styles.textOfButton}>Quay lại đăng nhập</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  error: {
    color: Color.error,
  },
  textInput: {
    borderRadius: 25,
    height: 32,
    padding: 10,
    marginTop: 8,
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
