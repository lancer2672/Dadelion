import React from "react";
import {
  Image,
  ImageBackground,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";
import { TextInput } from "react-native-paper";
import styled from "styled-components/native";

export const BackgroundImage = styled.ImageBackground.attrs((props) => ({
  source: require("../../../../assets/imgs/Auth.jpg"),
}))`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.Image.attrs((props) => ({
  source: require("./../../../../assets/imgs/Logo.png"),
}))`
  width: 200px;
  height: 200px;
  resize-mode: contain;
`;

export const AuthButton = styled(TouchableOpacity)`
  min-width: 200px;
  padding-top: ${(props) => props.theme.space[2]};
  padding-bottom: ${(props) => props.theme.space[2]};
  background-color: ${(props) => props.theme.colors.ui.quaternary};
  border-radius: 25px;
`;

export const AuthButtonContent = styled(Text)`
  align-self: center;
  font-weight: bold;
  font-size: 16px;
  color: ${(props) => props.theme.colors.text.primary};
`;

export const Slogan = styled(Text)`
  font-style: italic;
  color: ${(props) => props.theme.colors.text.primary};
  font-weight: 500;
  margin-bottom: 40px;
`;

export const Animation = styled(Animated.Image).attrs((props) => ({
  source: require("./../../../../assets/LoginAnimation.gif"),
}))`
  width: 100%;
  height: 200px;
`;
export const Animation1 = styled(Animated.Image).attrs((props) => ({
  source: require("./../../../../assets/DandelionSpreadAnimation.gif"),
}))`
  width: 100%;
  height: 200px;
`;
export const Error = styled(Text)`
  margin-top: 8;
  color: ${(props) => props.theme.colors.text.error};
`;
// export const ProgressBarComponent = styled(Progress.Bar).attrs((props) => ({
//   progress: 0.3,
// }))`
//   width: 200px;
// `;
export const InputText = ({
  iconLeft,
  iconRight,
  onIconPress,
  showPassword,
  placeholder,
  setText,
  passwordType,
  validationErrors,
}) => {
  return (
    <TextInput
      mode="outlined"
      outlineStyle={{
        borderRadius: 25,
      }}
      outlineColor={validationErrors.password && "red"}
      style={styles.textInput}
      secureTextEntry={passwordType && !showPassword}
      left={
        <TextInput.Icon
          size={20}
          style={{
            marginRight: 0,
            fontSize: 12,
          }}
          icon={iconLeft}
        />
      }
      right={
        <TextInput.Icon
          size={20}
          onPress={onIconPress}
          icon={
            passwordType == true
              ? showPassword
                ? "eye-off"
                : "eye"
              : iconRight
          }
        />
      }
      onChangeText={(newText) => setText(newText)}
      placeholder={placeholder}
    ></TextInput>
  );
};

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: "white",
    width: 250,
    fontSize: 14,
  },
});
