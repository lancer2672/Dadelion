import {
  StyleSheet,
  TextInput,
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
import {
  InputText,
  AuthButton,
  Slogan,
  Animation,
  Logo,
  BackgroundImage,
  AuthButtonContent,
} from "../components/authentication.style";
import { Text } from "../../../components/typography/text.component";
import Color from "../../../utils/color";
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
  const handleRegistration = () => {
    onRegister(email, username, password, replicatedPassword);
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
        onChangeText={(password) => setPassword(password)}
        placeholder="Mật khẩu"
      ></InputText>
      <InputText
        onChangeText={(replicatedPassword) =>
          setReplicatedPassword(replicatedPassword)
        }
        placeholder="Nhập lại mật khẩu"
      ></InputText>
      {error == null ? (
        <View style={{ height: 21 }}></View>
      ) : (
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
  error: {
    color: Color.error,
  },
});
