import { View, StyleSheet, Keyboard } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { AppSlogan } from "../../../utils/slogan";
import Color from "../../../utils/color";
import * as Facebook from "expo-facebook";
import { TextInput } from "react-native-paper";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import {
  InputText,
  AuthButton,
  Slogan,
  Animation,
  Logo,
  Error,
  BackgroundImage,
  AuthButtonContent,
  Animation1,
} from "../components/authentication.style";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import ProgressBar from "react-native-progress/Bar";

import { accountSchema } from "../../../utils/validation";

const LoginScreen = ({ navigation }) => {
  const { isLoading, error, onLogin, setError } = useContext(
    AuthenticationContext
  );
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [progress, setProgress] = useState(0);
  const [validationErrors, setValidationErrors] = useState({
    name: null,
    password: null,
  });
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const validateInformation = (account) => {
    const accountSchemaNoEmail = accountSchema.omit(["email"]);
    return accountSchemaNoEmail.validate(account);
  };
  const updateProgressBarEvent = (progEvent) => {
    var percentCompleted = Math.round(
      (progEvent.loaded * 100) / progEvent.total
    );
    setProgress(() => percentCompleted / 100);
  };
  const handleLogin = async () => {
    setError(null);
    Keyboard.dismiss();
    const acc = {
      name: username,
      password: password,
    };
    await validateInformation(acc)
      .then((valid) => {
        setValidationErrors({});
        onLogin(valid.name, valid.password, updateProgressBarEvent);
      })
      .catch((err) => {
        setValidationErrors((erros) => {
          return {
            [err.path]: err.errors[0],
          };
        });
      });
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
        onPress={togglePasswordVisibility}
        iconLeft={"account"}
        setText={setUsername}
        validationErrors={validationErrors}
        placeholder={"Tên đăng nhập"}
      ></InputText>
      {validationErrors.name && (
        <Error variant="error">{validationErrors.name}</Error>
      )}
      <Spacer position={"top"} size={"medium"}></Spacer>

      <InputText
        onPress={togglePasswordVisibility}
        iconLeft={"lock"}
        passwordType
        setText={setPassword}
        showPassword={showPassword}
        validationErrors={validationErrors}
        placeholder={"Mật khẩu"}
      ></InputText>

      {validationErrors.password && (
        <Error variant="error">{validationErrors.password}</Error>
      )}

      {error && <Error variant="error">{error}</Error>}
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
  errorMessage: {
    color: Color.error,
  },
  textInput: {
    backgroundColor: "white",
    width: 250,
    fontSize: 14,
  },
  forgetText: {
    fontWeight: "bold",
    color: "#FFF",
  },
});
export default LoginScreen;
