import {
  StyleSheet,
  Button,
  Image,
  ImageBackground,
  TouchableOpacity,
  View,
} from "react-native";
import { useState, useContext } from "react";
import React from "react";

import { Spacer } from "../../../components/spacer/spacer.component";
import { AppSlogan } from "../../../utils/slogan";
import InputText, {
  AuthButton,
  Slogan,
  Logo,
  Error,
  BackgroundImage,
  AuthButtonContent,
} from "../components/authentication.style";
import { Text } from "../../../components/typography/text.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { accountSchema } from "../../../utils/validationSchemas";
import validateInformation from "../../../utils/validator";

const RegisterScreen = ({ navigation }) => {
  const { isLoading, error, onRegister, setError } = useContext(
    AuthenticationContext
  );
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationError, setValidationError] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigateToLoginScreen = () => {
    setError(null);
    navigation.navigate("Login");
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  console.log("er", validationError);
  const handleRegistration = async () => {
    const accountInfor = {
      email: email,
      username: username,
      password: password,
      confirmPassword: confirmPassword,
    };
    await validateInformation(accountSchema, accountInfor, [
      "confirmPassword",
      "password",
      "username",
      "email",
    ])
      .then((accountInfor) => {
        onRegister(email, username, password, confirmPassword);
        setUsername("");
        setPassword("");
        setEmail("");
        setConfirmPassword("");
        setValidationError({});
        if (error == null) {
          navigateToLoginScreen();
        }
      })
      .catch((err) => {
        setValidationError({ [err.path]: err.errors[0] });
      });
  };
  console.log("username", username);
  return (
    <BackgroundImage>
      <Logo />
      <Slogan>{AppSlogan}</Slogan>

      <InputText
        iconLeft={"email"}
        setText={setEmail}
        hasValidationError={validationError.email}
        placeholder={"Email"}
      ></InputText>
      {validationError.email && (
        <Error variant="error">{validationError.email}</Error>
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
        iconLeft={"lock"}
        setText={setPassword}
        passwordType
        showPassword={showPassword}
        onIconPress={togglePasswordVisibility}
        hasValidationError={validationError.password}
        placeholder={"Mật khẩu"}
      ></InputText>
      {validationError.password && (
        <Error variant="error">{validationError.password}</Error>
      )}
      <InputText
        iconLeft={"lock"}
        setText={setConfirmPassword}
        passwordType
        showPassword={showPassword}
        onIconPress={togglePasswordVisibility}
        hasValidationError={validationError.confirmPassword}
        placeholder={"Nhập lại mật khẩu"}
      ></InputText>
      {validationError.confirmPassword && (
        <Error variant="error">{validationError.confirmPassword}</Error>
      )}

      {error && (
        <View style={styles.error}>
          <Text variant="error">{error}</Text>
        </View>
      )}
      <Spacer variant="bottom" size="huge"></Spacer>
      <View>
        <AuthButton onPress={handleRegistration}>
          <AuthButtonContent>Đăng ký</AuthButtonContent>
        </AuthButton>
        <Spacer variant="top" size="large"></Spacer>
        <AuthButton onPress={navigateToLoginScreen}>
          <AuthButtonContent>Quay lại đăng nhập</AuthButtonContent>
        </AuthButton>
      </View>
    </BackgroundImage>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  error: {},
  textInput: {
    backgroundColor: "white",
    width: 250,
    fontSize: 14,
  },
});
