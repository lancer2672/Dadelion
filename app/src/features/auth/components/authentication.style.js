import {
  Image,
  Pressable,
  ImageBackground,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import styled from "styled-components/native";

export const BackgroundImage = styled.ImageBackground.attrs((props) => ({
  source: require("@assets/imgs/Auth.jpg"),
}))`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.Image.attrs((props) => ({
  source: require("@assets/imgs/Logo.png"),
}))`
  width: 200px;
  height: 200px;
  resize-mode: contain;
`;

export const AuthButton = styled(TouchableOpacity).attrs((props) => ({
  // disabled: props.isValidated ? false : true,
}))`
  min-width: 300px;
  padding-top: ${(props) => props.theme.space[2]};
  padding-bottom: ${(props) => props.theme.space[2]};
  background-color: ${(props) => props.theme.colors.text.primary};
  border-radius: 25px;
  elevation: 2;
`;

export const AuthButtonContent = styled(Text)`
  align-self: center;
  font-weight: bold;
  padding-vertical: 2px;
  font-size: 16px;
  color: ${(props) => props.theme.colors.text.secondary};
`;
export const Slogan = styled(Text)`
  font-style: italic;
  color: ${(props) => props.theme.colors.text.primary};
  font-weight: 500;
  margin-bottom: 40px;
`;

export const Animation = styled(Animated.Image).attrs((props) => ({
  source: require("@assets/imgs/LoginAnimation.gif"),
}))`
  width: 100%;
  height: 200px;
`;
export const Animation1 = styled(Animated.Image).attrs((props) => ({
  source: require("@assets/imgs/DandelionSpreadAnimation.gif"),
}))`
  width: 100%;
  height: 200px;
`;
export const Error = styled(Text)`
  margin-top: 8px;
  color: ${(props) => props.theme.colors.text.error};
`;
export const RemememberCheckButton = () => {
  return;
};
