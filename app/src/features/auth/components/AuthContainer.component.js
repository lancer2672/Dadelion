import { StyleSheet, Text, View } from "react-native";
import React from "react";
import styled from "styled-components/native";
import { AppSlogan } from "@src/utils/slogan";
import { BackgroundImage, Logo, Slogan } from "./authentication.style";

const AuthContainer = ({ children, isLoading }) => {
  return (
    <BackgroundImage isLoading={isLoading}>
      <Logo></Logo>
      <Slogan>{AppSlogan}</Slogan>
      {children}
    </BackgroundImage>
  );
};

export default AuthContainer;

const styles = StyleSheet.create({});
