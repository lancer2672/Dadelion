import { View, Keyboard, Pressable, Image, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import * as Progress from "react-native-progress";

import {
  AuthButton,
  Error,
  AuthButtonContent,
} from "../components/authentication.style";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import InputText from "@src/features/auth/components/TextInput.component";
import { useTheme } from "styled-components";
import AuthContainer from "../components/AuthContainer.component";
import { Text } from "@src/components/typography/text.component";
import { Spacer } from "@src/components/spacer/spacer.component";
import { accountSchema } from "@src/utils/validationSchemas";
import { handleValidateField } from "@src/utils/validator";
import { setUser, update } from "@src/store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setIsLoading } from "@src/store/slices/appSlice";
import { initSocket } from "@src/utils/socket";
import { Avatar } from "@src/components/Avatar";
import { WEB_API_KEY } from "@env";
import { loginVoximplant } from "@src/voximplant/services/Client";
import { TouchableOpacity } from "react-native";
import { useRef } from "react";
import {
  useLoginMutation,
  useLoginWithGoogleMutation,
} from "@src/store/slices/api/authApi";

GoogleSignin.configure({
  webClientId: WEB_API_KEY,

  offlineAccess: true,
  scopes: [
    "profile",
    "email",
    "https://www.googleapis.com/auth/user.birthday.read",
    "https://www.googleapis.com/auth/user.phonenumbers.read",
    "https://www.googleapis.com/auth/user.gender.read",
  ],
});

const Login = ({ navigation }) => {
  const [login, { error, isSuccess, isLoading: isLoginLoading, data }] =
    useLoginMutation();
  const [
    loginWithGoogle,
    {
      isSuccess: isLoginGGSuccess,
      isLoading: isLoginGGLoading,
      data: loginGGData,
    },
  ] = useLoginWithGoogleMutation();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [savePassword, setSavePassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const refInputName = useRef();
  const refInputPassword = useRef();
  const toggleSavePasswordCheck = () => {
    setSavePassword(!savePassword);
  };
  console.log("login er", error);
  const handleLoginSuccess = async (loginData, isLoading, isSuccess) => {
    try {
      if (isSuccess) {
        const payload = { savePassword, ...loginData };
        dispatch(setUser(payload));
        //auto enable save password
        if (true) {
          await AsyncStorage.setItem("token", JSON.stringify(loginData.token));
          await AsyncStorage.setItem("username", username);
          await AsyncStorage.setItem(
            "userId",
            JSON.stringify(loginData.user._id)
          );
        }
        initSocket(loginData.user._id);

        const tokenVoximplant = await loginVoximplant(
          loginData.user.email,
          loginData.user.voximplantPassword
        );
        if (tokenVoximplant) {
          await AsyncStorage.setItem("tokenVoximplant", tokenVoximplant);
        }
      }
    } catch (er) {
      console.log("err", er);
    }
    dispatch(setIsLoading(isLoading));
  };

  useEffect(() => {
    handleLoginSuccess(loginGGData, isLoginGGLoading, isLoginGGSuccess);
  }, [isLoginGGLoading]);

  useEffect(() => {
    handleLoginSuccess(data, isLoginLoading, isSuccess);
  }, [isLoginLoading]);

  const handleLogin = () => {
    refInputName.current.blur();
    refInputPassword.current.blur();
    console.log(Object.keys(validationErrors).length);
    if (Object.keys(validationErrors).length == 0) {
      login({ username, password });
    }
  };
  const handleSignInGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      loginWithGoogle(userInfo.idToken);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("Sign in SIGN_IN_CANCELLED");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("Sign in IN_PROGRESS");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log("Sign in PLAY_SERVICES_NOT_AVAILABLE");
      } else {
        console.error("Sign in ERROR", error);
      }
    }
  };
  const handleSendEmailResetPassword = () => {
    navigation.navigate("ForgotPassword", {});
  };

  const navigateToRegister1Screen = () => {
    // setError(null);
    navigation.navigate("Register1", {});
  };
  return (
    <AuthContainer isLoading={isLoginLoading}>
      {false ? (
        <View>
          <Avatar style={{ width: 80, height: 80 }}></Avatar>
          <Text style={{ fontSize: 16, color: "white", marginTop: 8 }}>
            Xoá tài khoản
          </Text>
        </View>
      ) : (
        <View>
          <InputText
            ref={refInputName}
            iconLeft={"account"}
            setText={setUsername}
            hasValidationError={validationErrors.username}
            placeholder={"Email"}
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
            ref={refInputPassword}
            iconLeft={"lock"}
            passwordType
            setText={setPassword}
            // onBlur={() =>
            //   handleValidateField(
            //     accountSchema,
            //     "password",
            //     password,
            //     validationErrors,
            //     setValidationErrors
            //   )
            // }
            // hasValidationError={validationErrors.password}
            placeholder={"Mật khẩu"}
          ></InputText>
          {/* {validationErrors.password && (
            <Error variant="error">{validationErrors.password}</Error>
          )} */}
        </View>
      )}
      {/* <RememberPassword
        savePassword={savePassword}
        onIconPress={toggleSavePasswordCheck}
      ></RememberPassword> */}
      <View
        style={{
          marginTop: 12,
          flexDirection: "row",
        }}
      >
        <TouchableOpacity onPress={handleSendEmailResetPassword}>
          <Text style={{ fontSize: 16, color: "white" }}>Quên mật khẩu ?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToRegister1Screen}>
          <Text
            style={{
              marginLeft: 48,
              fontWeight: "500",
              fontSize: 16,
              textDecorationLine: "underline",
              color: "white",
            }}
          >
            Đăng ký
          </Text>
        </TouchableOpacity>
      </View>

      {error && (
        <Error variant="error">Tên đăng nhập hoặc mật khẩu không hợp lệ</Error>
      )}

      <View style={{ marginTop: 12 }}>
        <AuthButton
          // isValidated={Object.keys(validationErrors).length == 0 ? true : false}
          onPress={handleLogin}
        >
          <AuthButtonContent>Đăng nhập</AuthButtonContent>
        </AuthButton>
        <Spacer variant="top" size="large"></Spacer>
        {/* <AuthButton onPress={navigateToRegister1Screen}>
          <AuthButtonContent>Đăng ký</AuthButtonContent>
        </AuthButton> */}
      </View>
      <View
        style={{
          marginTop: 12,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <Pressable style={styles.fb}>
          <Image
            style={styles.logo}
            resizeMode="center"
            source={require("@assets/icons/facebook_icon.png")}
          ></Image>
        </Pressable> */}
        <Pressable
          onPress={handleSignInGoogle}
          style={[styles.google, { backgroundColor: "white" }]}
        >
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <Image
              resizeMode="contain"
              style={styles.logo}
              source={require("@assets/icons/google_icon.png")}
            ></Image>
            <Text
              style={{
                flex: 1,
                color: "black",
                fontSize: 16,
                textAlign: "center",
                paddingRight: 40,
              }}
            >
              Tiếp tục với Google
            </Text>
          </View>
        </Pressable>
      </View>
    </AuthContainer>
  );
};
const styles = StyleSheet.create({
  logo: {
    width: 32,
    height: 32,
    marginLeft: 8,
  },
  google: {
    width: 300,
    height: 42,
    borderRadius: 4,
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
