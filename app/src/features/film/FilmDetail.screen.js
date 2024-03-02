import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { goBack } from "@src/infrastructure/navigation/navigator.navigation";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "@src/infrastructure/theme";

const MovieDetail = () => {
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../../assets/imgs/Logo.png")}
        style={styles}
      >
        <Pressable onPress={goBack} style={styles.backBtn}>
          <Ionicons
            name="arrow-back"
            size={32}
            color={theme.colors.text.primary}
          />
        </Pressable>
      </ImageBackground>
    </View>
  );
};

export default MovieDetail;

const styles = StyleSheet.create({
  bg: {
    backgroundColor: "tomato",
    height: 400,
  },
  backBtn: {
    padding: 12,
    margin: 12,
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "rgba(232, 232, 232, 0.7)",
  },
});
