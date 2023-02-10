import { View, StyleSheet, Keyboard } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { AppSlogan } from "../../../utils/slogan";
import Color from "../../../utils/color";
import * as Facebook from "expo-facebook";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import {
  InputText,
  AuthButton,
  Slogan,
  Animation,
  Logo,
  BackgroundImage,
  AuthButtonContent,
  Animation1,
} from "../components/authentication.style";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import ProgressBar from "react-native-progress/Bar";

const LoginScreen = ({ navigation }) => {
  const { isLoading, error, onLogin, setError } = useContext(
    AuthenticationContext
  );
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [progress, setProgress] = useState(0);
  console.log("progress", progress);
  async function handleFacebookLogin() {
    // Start the auth session
  }
  const handleLogin = () => {
    Keyboard.dismiss();
    const progressEvent = (progEvent) => {
      console.log("progEvent.loaded", progEvent.loaded);
      var percentCompleted = Math.round(
        (progEvent.loaded * 100) / progEvent.total
      );
      console.log(percentCompleted);
      setProgress(() => percentCompleted / 100);
    };
    onLogin(username, password, progressEvent);
  };
  const navigateToRegisterScreen = () => {
    setError(null);
    navigation.navigate("Register");
  };

  return (
    <BackgroundImage>
      <View style={{ marginTop: 124 }}></View>
      <Logo />
      <Slogan>{AppSlogan}</Slogan>
      {isLoading && (
        <View style={{ position: "absolute", top: 330 }}>
          <ProgressBar
            color={"#9b92e5"}
            unfilledColor={"#ddd5e0"}
            borderWidth={0}
            progress={progress}
            width={200}
          />
        </View>
      )}
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
        <View style={{ height: 21 }}></View>
      ) : (
        <View style={styles.error}>
          <Text variant="error">{error}</Text>
        </View>
      )}
      <Spacer variant="bottom" size="small"></Spacer>
      <View style={{ marginTop: 18 }}>
        <AuthButton onPress={handleLogin}>
          <AuthButtonContent>Đăng nhập</AuthButtonContent>
        </AuthButton>
        {/* <AuthButton onPress={handleFacebookLogin}>
          <AuthButtonContent>Đăng nhập với facebook</AuthButtonContent>
        </AuthButton> */}
        <Spacer variant="top" size="large"></Spacer>
        <AuthButton onPress={navigateToRegisterScreen}>
          <AuthButtonContent>Đăng ký</AuthButtonContent>
        </AuthButton>
      </View>
      <Spacer variant="top" size="large"></Spacer>
      <Text variant="caption">Quên mật khẩu ?</Text>
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
