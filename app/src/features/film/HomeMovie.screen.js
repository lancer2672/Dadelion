import {
  Dimensions,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "@src/infrastructure/theme";
import { goBack } from "@src/infrastructure/navigation/navigator.navigation";
import Carousel from "react-native-reanimated-carousel";
import MovieList from "./components/MovieList.component";
import { Searchbar } from "react-native-paper";
import LinearGradient from "react-native-linear-gradient";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const HomeMovie = () => {
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.bg.primary }}>
      <ScrollView>
        <FilmCarousel></FilmCarousel>
        <MovieList></MovieList>
      </ScrollView>
    </View>
  );
};

const FilmCarousel = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const renderItem = ({ item, index }) => {
    return (
      <ImageBackground
        source={require("../../../assets/imgs/Logo.png")}
        style={styles.bg}
      >
        <View style={[StyleSheet.absoluteFillObject, styles.overlay]}>
          <LinearGradient
            style={[StyleSheet.absoluteFillObject, { flex: 1 }]}
            colors={[
              "rgba(81, 78, 182, 0)",
              "rgba(81, 78, 182, 0.4)",
              "rgba(81, 78, 182, 0.8)",
            ]}
          ></LinearGradient>
        </View>
      </ImageBackground>
    );
  };
  return (
    <View>
      <Carousel
        loop
        width={SCREEN_WIDTH}
        height={(SCREEN_HEIGHT * 1) / 3}
        autoPlay={true}
        data={[...new Array(6).keys()]}
        scrollAnimationDuration={1000}
        // onSnapToItem={(index) => console.log("current index:", index)}
        renderItem={renderItem}
      />
      <View style={styles.search}>
        <Searchbar
          style={{ flex: 1, backgroundColor: "rgba(52, 52, 52, 0.5)" }}
          icon={"movie-search"}
          placeholder="Tìm kiếm"
          placeholderTextColor={"white"}
          value={searchKeyword}
          onChange={(newKeyword) => setSearchKeyword(newKeyword)}
          onChangeText={(text) => {
            setSearchKeyword((prevKeyword) => text);
          }}
          iconColor={"white"}
        />
      </View>
    </View>
  );
};
export default HomeMovie;

const styles = StyleSheet.create({
  bg: {
    backgroundColor: "tomato",
    height: SCREEN_HEIGHT / 2,
  },
  overlay: {
    // backgroundColor: "blue",
  },
  backBtn: {
    padding: 12,
    margin: 12,
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "rgba(232, 232, 232, 0.7)",
  },
  search: {
    position: "absolute",
    top: 18,
    height: 50,
    left: 12,
    right: 12,
  },
});
