import { StyleSheet } from "react-native";

import { BackgroundImage, Logo, Slogan } from "./authentication.style";

const AuthContainer = ({ children, isLoading }) => {
  return (
    <BackgroundImage isLoading={isLoading}>
      <Logo></Logo>
      <Slogan>First, you love, then you live.</Slogan>
      {children}
    </BackgroundImage>
  );
};

export default AuthContainer;

const styles = StyleSheet.create({});
