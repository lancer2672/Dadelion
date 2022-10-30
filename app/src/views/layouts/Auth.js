import {
  StyleSheet,
  ImageBackground,
  Image,
  Text,
  View,
  Dimensions,
} from "react-native";
import React from "react";

const Auth = (body) => {
  return (
    <ImageBackground
      source={require("../../../assets/imgs/Auth.jpg")}
      style={styles.container}
    >
      <Image
        style={styles.tinyLogo}
        source={require("./../../../assets/imgs/Logo.png")}
      />
      {body}
    </ImageBackground>
  );
};

export default Auth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  tinyLogo: {
    width: "100px",
    height: "100px",
    resizeMode: "center",
  },
});
