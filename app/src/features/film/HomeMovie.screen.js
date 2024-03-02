import {
  Dimensions,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "@src/infrastructure/theme";
import Carousel from "react-native-snap-carousel";
import { goBack } from "@src/infrastructure/navigation/navigator.navigation";

const SCREEN_WIDTH = Dimensions.get("window").width;
const HomeMovie = () => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <FilmCarousel></FilmCarousel>
      </ScrollView>
    </View>
  );
};

const FilmCarousel = () => {
  const renderItem = ({ item, index }) => {
    return (
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
    );
  };
  return (
    <Carousel
      data={[1, 2]}
      renderItem={renderItem}
      sliderWidth={SCREEN_WIDTH}
      itemWidth={SCREEN_WIDTH}
    />
  );
};
export default HomeMovie;

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
