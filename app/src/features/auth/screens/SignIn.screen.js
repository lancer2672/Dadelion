import { View, Keyboard, Pressable, Image, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import ProgressBar from "react-native-progress/Bar";
import {
  AuthButton,
  Error,
  AuthButtonContent,
} from "../components/authentication.style";
// import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import InputText from "@src/features/auth/components/TextInput.component";
import RememberPassword from "../components/RememberCheckBox.component";
import { useTheme } from "styled-components";
import AuthContainer from "../components/AuthContainer.component";
import { Text } from "@src/components/typography/text.component";
import { Spacer } from "@src/components/spacer/spacer.component";
import { accountSchema } from "@src/utils/validationSchemas";
import { handleValidateField } from "@src/utils/validator";
import { useLoginMutation } from "@src/store/slices/api/userApiSlice";
import { setUser, update } from "@src/store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setIsLoading } from "@src/store/slices/appSlice";
import { initSocket } from "@src/utils/socket";
import { Avatar } from "@src/components/Avatar";

const Login = ({ navigation }) => {
  const [login, { error, isSuccess, isLoading: isFetching, ...loginResult }] =
    useLoginMutation();
  const theme = useTheme();
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

  const handleSignInGoogle = () => {};
  useEffect(() => {
    // handle result when login succeeded
    (async () => {
      try {
        if (isSuccess) {
          const payload = { savePassword, ...loginResult.data };
          dispatch(setUser(payload));
          //auto enable save password
          if (true) {
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
          initSocket(loginResult.data.user._id);
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
      {false ? (
        <View>
          <Avatar width={80} height={80}></Avatar>
          <Text style={{ fontSize: 16, color: "white", marginTop: 8 }}>
            Xoá tài khoản
          </Text>
        </View>
      ) : (
        <View>
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
        </View>
      )}
      {/* <RememberPassword
        savePassword={savePassword}
        onIconPress={toggleSavePasswordCheck}
      ></RememberPassword> */}
      {/* <Text style={{ fontSize: 16, color: "white" }}>Quên mật khẩu ?</Text> */}

      {error && <Error variant="error">{error}</Error>}
      <Spacer variant="top" size="large"></Spacer>
      <View style={{ marginTop: 12 }}>
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
      <View
        style={{
          marginTop: 12,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Pressable style={styles.fb}>
          <Image
            style={styles.logo}
            resizeMode="center"
            source={require("../../../../assets/icons/facebook_icon.png")}
          ></Image>
        </Pressable>
        <Pressable
          onPress={handleSignInGoogle}
          style={[styles.google, { backgroundColor: theme.colors.chat.text }]}
        >
          <Image
            resizeMode="contain"
            style={styles.logo}
            source={require("../../../../assets/icons/google_icon.png")}
          ></Image>
        </Pressable>
      </View>
    </AuthContainer>
  );
};
const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: "100%",
  },
  google: {
    width: 46,
    height: 46,
    borderRadius: 22,
    marginLeft: 12,
    elevation: 2,
  },
  fb: {
    width: 50,
    height: 50,
    borderRadius: 25,
    elevation: 2,
  },
});
export default Login;
