import {
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  Animated,
  Button,
  ImageBackground,
  StyleSheet,
} from "react-native";
import React, { useState, useContext } from "react";
import * as SecureStore from "expo-secure-store";

import { AppSlogan } from "../../../utils/slogan";
import Color from "../../../utils/color";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import {
  InputText,
  AuthButton,
  Slogan,
  Logo,
  Input,
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
    <BackgroundImage source={require("../../../../assets/imgs/Auth.jpg")}>
      <Logo source={require("./../../../../assets/imgs/Logo.png")} />
      <Slogan>{AppSlogan}</Slogan>
      <InputText
        autoCapitalize="false"
        onChangeText={(newUsername) => setUsername(newUsername)}
        placeholder="Tên đăng nhập"
      ></InputText>
      <InputText
        autoCapitalize="false"
        onChangeText={(newPassword) => setPassword(newPassword)}
        secureTextEntry={true}
        placeholder="Mật khẩu"
      ></InputText>

      {error == null ? (
        <View style={{ height: 20 }}></View>
      ) : (
        <View style={styles.error}>
          <Text style={styles.errorMessage}>{error}</Text>
        </View>
      )}
      <Spacer variant="bottom" size="medium"></Spacer>
      <View style={{ marginTop: 18 }}>
        <AuthButton onPress={handleLogin}>
          <AuthButtonContent>Đăng nhập</AuthButtonContent>
        </AuthButton>
        <Spacer variant="top" size="medium"></Spacer>
        <AuthButton onPress={navigateToRegisterScreen}>
          <AuthButtonContent>Đăng ký</AuthButtonContent>
        </AuthButton>
      </View>
      <Text style={styles.forgetText}>Quên mật khẩu ?</Text>
      <Animated.Image
        source={require("./../../../../assets/LoginAnimation.gif")}
        style={{ width: "100%", height: 200 }}
      />
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
  },
});
export default LoginScreen;
