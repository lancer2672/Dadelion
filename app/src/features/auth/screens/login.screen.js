import { View, Keyboard } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import ProgressBar from "react-native-progress/Bar";

import {
  AuthButton,
  Error,
  AuthButtonContent,
} from "../components/authentication.style";
import InputText from "../components/text-input.component";
import RememberPassword from "../components/remember-checkbox.component";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { accountSchema } from "../../../utils/validationSchemas";
import { handleValidateField } from "../../../utils/validator";
import AuthContainer from "../components/auth-container.component";

const LoginScreen = ({ navigation }) => {
  const { isLoading, error, onLogin, setError, isAuthenticated } = useContext(
    AuthenticationContext
  );
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [savePassword, setSavePassword] = useState(false);
  const [progress, setProgress] = useState(0);
  const [validationErrors, setValidationErrors] = useState({});
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleSavePasswordCheck = () => {
    setSavePassword(!savePassword);
  };
  const updateProgressBarEvent = (progEvent) => {
    var percentCompleted = Math.round(
      (progEvent.loaded * 100) / progEvent.total
    );
    setProgress(() => percentCompleted / 100);
  };

  const handleLogin = () => {
    if (!password || !username) {
      setError("Vui lòng điền đầy đủ thông tin");
      return;
    }
    setError(null);
    Keyboard.dismiss();
    if (Object.keys(validationErrors).length == 0)
      onLogin(username, password, savePassword, updateProgressBarEvent);
  };
  const navigateToRegister1Screen = () => {
    setError(null);
    navigation.navigate("Register1", {});
  };
  return (
    <AuthContainer>
      {isLoading && (
        <View style={{ position: "absolute", top: 345 }}>
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
        hasValidationError={validationErrors.username}
        placeholder={"Tên đăng nhập"}
        onBlur={() =>
          handleValidateField(
            accountSchema,
            "username",
            username,
            validationErrors,
            setValidationErrors
          )
        }
      ></InputText>
      {validationErrors.username && (
        <Error variant="error">{validationErrors.username}</Error>
      )}

      <InputText
        onIconPress={togglePasswordVisibility}
        iconLeft={"lock"}
        passwordType
        setText={setPassword}
        showPassword={showPassword}
        onBlur={() =>
          handleValidateField(
            accountSchema,
            "password",
            password,
            validationErrors,
            setValidationErrors
          )
        }
        hasValidationError={validationErrors.password}
        placeholder={"Mật khẩu"}
      ></InputText>

      {validationErrors.password && (
        <Error variant="error">{validationErrors.password}</Error>
      )}

      {error && <Error variant="error">{error}</Error>}
      <RememberPassword
        savePassword={savePassword}
        onIconPress={toggleSavePasswordCheck}
      ></RememberPassword>

      <Spacer variant="bottom" size="small"></Spacer>

      <View style={{ marginTop: 18 }}>
        <AuthButton
          // isValidated={Object.keys(validationErrors).length == 0 ? true : false}
          onPress={handleLogin}
        >
          <AuthButtonContent>Đăng nhập</AuthButtonContent>
        </AuthButton>
        <Spacer variant="top" size="large"></Spacer>
        <AuthButton onPress={navigateToRegister1Screen}>
          <AuthButtonContent>Đăng ký</AuthButtonContent>
        </AuthButton>
      </View>
      <Spacer variant="top" size="large"></Spacer>
      <Text variant="caption">Quên mật khẩu ?</Text>
    </AuthContainer>
  );
};
export default LoginScreen;
