import React from "react";
import {
  Image,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components/native";

//not working
export const BackgroundImage = styled.ImageBackground`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
`;
export const Logo = styled(Image)`
  width: 200px;
  height: 200px;
  resize-mode: contain;
`;
export const InputText = styled(TextInput)`
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
