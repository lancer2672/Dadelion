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
import { TextInput } from "react-native-paper";

import { Spacer } from "../../../components/spacer/spacer.component";
import { AppSlogan } from "../../../utils/slogan";
import {
  InputText,
  AuthButton,
  Slogan,
  Logo,
  BackgroundImage,
  AuthButtonContent,
} from "../components/authentication.style";
import { Text } from "../../../components/typography/text.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

const RegisterScreen = ({ navigation }) => {
  const { isLoading, error, onRegister, setError } = useContext(
    AuthenticationContext
  );
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [replicatedPassword, setReplicatedPassword] = useState("");

  const navigateToLoginScreen = () => {
    setError(null);
    navigation.navigate("Login");
  };
  const handleRegistration = async () => {
    await onRegister(email, username, password, replicatedPassword);
    // if(error == null){
    //   setUsername
    //   setPassword
    //   setEmail
    //   setReplicatedPassword
    // }
    if (error == null) {
      navigateToLoginScreen();
    }
  };
  return (
    <BackgroundImage>
      <Logo />
      <Slogan>{AppSlogan}</Slogan>
      <InputText
        onChangeText={(email) => setEmail(email)}
        placeholder="Email"
      ></InputText>
      <InputText
        onChangeText={(username) => setUsername(username)}
        placeholder="Tên đăng nhập"
      ></InputText>
      <InputText
        password
        onChangeText={(password) => setPassword(password)}
        placeholder="Mật khẩu"
      ></InputText>
      <InputText
        password
        onChangeText={(replicatedPassword) =>
          setReplicatedPassword(replicatedPassword)
        }
        placeholder="Nhập lại mật khẩu"
      ></InputText>
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
