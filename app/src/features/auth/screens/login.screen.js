import { View, StyleSheet, Keyboard } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import ProgressBar from "react-native-progress/Bar";

import {
  AuthButton,
  Slogan,
  Logo,
  Error,
  BackgroundImage,
  AuthButtonContent,
  Animation1,
} from "../components/authentication.style";
import { AppSlogan } from "../../../utils/slogan";
import InputText from "../components/text-input.component";
import RememberPassword from "../components/remember-checkbox.component";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { accountSchema } from "../../../utils/validationSchemas";
import validateInformation from "../../../utils/validator";

const LoginScreen = ({ navigation }) => {
  const { isLoading, error, onLogin, setError, isAuthenticated } = useContext(
    AuthenticationContext
  );
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [savePassword, setSavePassword] = useState(false);
  const [progress, setProgress] = useState(0);
  const [validationError, setValidationError] = useState({});
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
      username: username,
      password: password,
    };
    await validateInformation(accountSchema, acc, ["password", "username"])
      .then((valid) => {
        setValidationError({});
        onLogin(
          valid.username,
          valid.password,
          savePassword,
          updateProgressBarEvent
        );
      })
      .catch((err) => {
        setValidationError({
          [err.path]: err.errors[0],
        });
      });
  };
  const navigateToRegisterScreen = () => {
    setError(null);
    navigation.navigate("Register", {});
  };
  return (
    <BackgroundImage>
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
        iconLeft={"account"}
        setText={setUsername}
        hasValidationError={validationError.username}
        placeholder={"Tên đăng nhập"}
      ></InputText>
      {validationError.username && (
        <Error variant="error">{validationError.username}</Error>
      )}

      <InputText
        onIconPress={togglePasswordVisibility}
        iconLeft={"lock"}
        passwordType
        setText={setPassword}
        showPassword={showPassword}
        hasValidationError={validationError.password}
        placeholder={"Mật khẩu"}
      ></InputText>

      {validationError.password && (
        <Error variant="error">{validationError.password}</Error>
      )}

      {error && <Error variant="error">{error}</Error>}
      <RememberPassword
        savePassword={savePassword}
        setSavePassword={setSavePassword}
      ></RememberPassword>

      <Spacer variant="bottom" size="small"></Spacer>

      <View style={{ marginTop: 18 }}>
        <AuthButton
          // isValidated={Object.keys(validationError).length == 0 ? true : false}
          onPress={handleLogin}
        >
          <AuthButtonContent>Đăng nhập</AuthButtonContent>
        </AuthButton>
        <Spacer variant="top" size="large"></Spacer>
        <AuthButton onPress={navigateToRegisterScreen}>
          <AuthButtonContent>Đăng ký</AuthButtonContent>
        </AuthButton>
      </View>
      <Spacer variant="top" size="large"></Spacer>
      <Text variant="caption">Quên mật khẩu ?</Text>
    </BackgroundImage>
  );
};
export default LoginScreen;
