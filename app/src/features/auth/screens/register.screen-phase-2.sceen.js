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
import {
  AuthButton,
  Error,
  AuthButtonContent,
} from "../components/authentication.style";
import AuthContainer from "../components/auth-container.component";
import InputText from "../components/text-input.component";
import { Text } from "../../../components/typography/text.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { accountSchema } from "../../../utils/validationSchemas";
import validateInformation from "../../../utils/validator";

const RegisterScreen2 = ({ navigation }) => {
  const { isLoading, error, onRegister, setError } = useContext(
    AuthenticationContext
  );
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigateBack = () => {
    setError(null);
    navigation.goBack();
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
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
        setValidationErrors({});
        if (error == null) {
          navigation.navigate("Login");
        }
      })
      .catch((err) => {
        setValidationErrors({ [err.path]: err.errors[0] });
      });
  };
  return (
    <AuthContainer>
      <InputText
        iconLeft={"email"}
        setText={setEmail}
        hasValidationError={validationErrors.email}
        placeholder={"Email"}
      ></InputText>
      {validationErrors.email && (
        <Error variant="error">{validationErrors.email}</Error>
      )}
      <InputText
        iconLeft={"account"}
        setText={setUsername}
        hasValidationError={validationErrors.username}
        placeholder={"Tên đăng nhập"}
      ></InputText>
      {validationErrors.username && (
        <Error variant="error">{validationErrors.username}</Error>
      )}
      <InputText
        iconLeft={"lock"}
        setText={setPassword}
        passwordType
        showPassword={showPassword}
        onIconPress={togglePasswordVisibility}
        hasValidationError={validationErrors.password}
        placeholder={"Mật khẩu"}
      ></InputText>
      {validationErrors.password && (
        <Error variant="error">{validationErrors.password}</Error>
      )}
      <InputText
        iconLeft={"lock"}
        setText={setConfirmPassword}
        passwordType
        showPassword={showPassword}
        onIconPress={togglePasswordVisibility}
        hasValidationError={validationErrors.confirmPassword}
        placeholder={"Nhập lại mật khẩu"}
      ></InputText>
      {validationErrors.confirmPassword && (
        <Error variant="error">{validationErrors.confirmPassword}</Error>
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
        <AuthButton onPress={navigateBack}>
          <AuthButtonContent>Quay lại </AuthButtonContent>
        </AuthButton>
      </View>
    </AuthContainer>
  );
};

export default RegisterScreen2;

const styles = StyleSheet.create({
  error: {},
  textInput: {
    backgroundColor: "white",
    width: 250,
    fontSize: 14,
  },
});
