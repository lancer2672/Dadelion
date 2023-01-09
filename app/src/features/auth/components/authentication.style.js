import React from "react";
import {
  Image,
  ImageBackground,
  Text,
  TextInput,
  Animated,
  TouchableOpacity,
} from "react-native";
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

export const InputText = styled.TextInput.attrs((props) => ({
  secureTextEntry: props.isPassword ? true : false,
  autoCapitalize: false,
}))`
  border-radius: 25px;
  height: 32px;
  line-height: 20px;
  margin-top: 8px;
  color: ${(props) => props.theme.colors.text.primary};
`;

export const AuthButton = styled(TouchableOpacity)`
  min-width: 200px;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: ${(props) => props.theme.colors.ui.quaternary};
  border-radius: 25px;
`;

export const AuthButtonContent = styled(Text)`
  align-self: center;
  font-weight: bold;
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
