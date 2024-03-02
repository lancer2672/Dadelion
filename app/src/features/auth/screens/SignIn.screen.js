import { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";

import { WEB_API_KEY } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Avatar } from "@src/components/Avatar";
import { Spacer } from "@src/components/spacer/spacer.component";
import { Text } from "@src/components/typography/text.component";
import InputText from "@src/features/auth/components/TextInput.component";
import { setIsLoading } from "@src/store/slices/appSlice";
import { setUser } from "@src/store/slices/userSlice";
import { initSocket } from "@src/utils/socket";
import { accountSchema } from "@src/utils/validationSchemas";
import { handleValidateField } from "@src/utils/validator";
import { useRef } from "react";
import { TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import AuthContainer from "../components/AuthContainer.component";
import {
  AuthButton,
  AuthButtonContent,
  Error,
} from "../components/authentication.style";

import authApi from "@src/api/auth";
import { transformUsersData } from "@src/utils/transformData";
import withLoading from "@src/utils/withLoading";

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

const testID = "login";
const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [savePassword, setSavePassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const refInputName = useRef();
  const refInputPassword = useRef();

  useEffect(() => {
    resetForm();
  }, []);
  const resetForm = () => {
    setUsername("");
    setPassword("");
    setError(null);
  };
  const handleLoginSuccess = async (data) => {
    console.log("handleLoginSuccess", data);
    dispatch(setIsLoading(true));
    //auto enable save password
    if (true) {
      await AsyncStorage.setItem("token", JSON.stringify(data.token));
      await AsyncStorage.setItem(
        "refreshToken",
        JSON.stringify(data.refreshToken)
      );
      await AsyncStorage.setItem("userId", JSON.stringify(data.user._id));
    }
    const transformedUser = await transformUsersData([data.user]);
    dispatch(setUser(transformedUser));
    initSocket(transformedUser._id);
  };

  const handleLogin = async () => {
    refInputName.current.blur();
    refInputPassword.current.blur();
    if (Object.keys(validationErrors).length !== 0) return;

    withLoading(
      dispatch,
      async () => {
        const data = await authApi.login({ email: username, password });

        handleLoginSuccess(data);
      },
      (error) => {
        setError("Đăng nhập thất bại");
      }
    );
  };
  const handleSignInGoogle = async () => {
    withLoading(
      dispatch,
      async () => {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        data = await authApi.loginWithGoogle(userInfo.idToken);
        await handleLoginSuccess(data);
      },
      (error) => {
        setError(error);
      }
    );
  };
  const handleSendEmailResetPassword = () => {
    navigation.navigate("ForgotPassword", {});
  };

  const navigateToRegister1Screen = () => {
    // setError(null);
    navigation.navigate("Register");
  };
  return (
    <AuthContainer testID={testID}>
      {false ? (
        <View>
          <Avatar style={{ width: 80, height: 80 }}></Avatar>
          <Text style={{ fontSize: 16, color: "white", marginTop: 8 }}>
            Xoá tài khoản
          </Text>
        </View>
      ) : (
        <View style={{ width: "100%", paddingHorizontal: 16 }}>
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
            placeholder={"Mật khẩu"}
          ></InputText>
        </View>
      )}
      <View
        style={{
          marginTop: 12,
          flexDirection: "row",
        }}
      >
        <TouchableOpacity onPress={handleSendEmailResetPassword}>
          <Text style={{ fontSize: 16, color: "white" }}>Quên mật khẩu ?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          testID={`${testID}.register_btn`}
          onPress={navigateToRegister1Screen}
        >
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
