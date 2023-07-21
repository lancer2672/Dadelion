import { View, Keyboard } from "react-native";
import React, { useState, useEffect } from "react";
import ProgressBar from "react-native-progress/Bar";

import {
  AuthButton,
  Error,
  AuthButtonContent,
} from "../components/authentication.style";

import InputText from "@src/features/auth/components/text-input.component";
import RememberPassword from "../components/remember-checkbox.component";
import AuthContainer from "../components/auth-container.component";
import { Text } from "@src/components/typography/text.component";
import { Spacer } from "@src/components/spacer/spacer.component";
import { accountSchema } from "@src/utils/validationSchemas";
import { handleValidateField } from "@src/utils/validator";
import { useLoginMutation } from "@src/store/services/userService";
import { setUser, update } from "@src/store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { appSelector } from "@src/store/selector";
import { setIsLoading } from "@src/store/slices/appSlice";
const LoginScreen = ({ navigation }) => {
  const [login, { error, isSuccess, isLoading: isFetching, ...loginResult }] =
    useLoginMutation();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [savePassword, setSavePassword] = useState(false);
  const [progress, setProgress] = useState(0);
  const [validationErrors, setValidationErrors] = useState({});
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
    login({ username, password });
  };
  useEffect(() => {
    // handle result when login succeeded
    (async () => {
      try {
        if (isSuccess) {
          const payload = { savePassword, ...loginResult.data };
          dispatch(setUser(payload));
          if (savePassword) {
            await AsyncStorage.setItem(
              "userId",
              JSON.stringify(loginResult.data.user._id)
            );
            await AsyncStorage.setItem(
              "token",
              JSON.stringify(loginResult.data.token)
            );
            await AsyncStorage.setItem(
              "refreshToken",
              JSON.stringify(loginResult.data.refreshToken)
            );
          }
        }
      } catch (er) {
        console.log("err", er);
      }
    })();
    dispatch(setIsLoading(isFetching));
  }, [isFetching]);
  const navigateToRegister1Screen = () => {
    // setError(null);
    navigation.navigate("Register1", {});
  };
  return (
    <AuthContainer>
      {false && (
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
        iconLeft={"lock"}
        passwordType
        setText={setPassword}
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
      <Spacer variant="top" size="large"></Spacer>
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
