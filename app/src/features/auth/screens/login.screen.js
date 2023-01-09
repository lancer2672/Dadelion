import { View, Text, StyleSheet } from "react-native";
import React, { useState, useContext } from "react";
import * as SecureStore from "expo-secure-store";

import { AppSlogan } from "../../../utils/slogan";
import Color from "../../../utils/color";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import {
  InputText,
  AuthButton,
  Slogan,
  Animation,
  Logo,
  BackgroundImage,
  AuthButtonContent,
} from "../components/authentication.style";
import { Spacer } from "../../../components/spacer";

const LoginScreen = ({ navigation }) => {
  const { isLoading, error, onLogin } = useContext(AuthenticationContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    onLogin(username, password);
  };
  const navigateToRegisterScreen = () => {
    navigation.navigate("Register");
  };

  return (
    <BackgroundImage>
      <View style={{ marginTop: 124 }}></View>
      <Logo />
      <Slogan>{AppSlogan}</Slogan>
      <InputText
        onChangeText={(newUsername) => setUsername(newUsername)}
        placeholder="Tên đăng nhập"
      ></InputText>
      <InputText
        isPassword
        onChangeText={(newPassword) => setPassword(newPassword)}
        placeholder="Mật khẩu"
      ></InputText>

      {error == null ? (
        <View style={{ height: 20 }}></View>
      ) : (
        <View style={styles.error}>
          <Text style={styles.errorMessage}>{error}</Text>
        </View>
      )}
      <Spacer variant="bottom" size="small"></Spacer>
      <View style={{ marginTop: 18 }}>
        <AuthButton onPress={handleLogin}>
          <AuthButtonContent>Đăng nhập</AuthButtonContent>
        </AuthButton>
        <Spacer variant="top" size="large"></Spacer>
        <AuthButton onPress={navigateToRegisterScreen}>
          <AuthButtonContent>Đăng ký</AuthButtonContent>
        </AuthButton>
      </View>
      <Spacer variant="top" size="large"></Spacer>
      <Text style={styles.forgetText}>Quên mật khẩu ?</Text>
      <Animation></Animation>
    </BackgroundImage>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  error: {
    minHeight: 16,
  },
  errorMessage: {
    color: Color.error,
  },
  forgetText: {
    fontWeight: "bold",
    color: "#FFF",
  },
});
export default LoginScreen;
