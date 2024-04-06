import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  FlatList,
  Pressable,
} from "react-native";
import { Fontisto, Octicons } from "@expo/vector-icons";

import textStyle from "@src/components/typography/text.style";
import { theme } from "@src/infrastructure/theme";
import { navigate } from "@src/infrastructure/navigation/navigator.navigation";
import { AUTH_ROUTE } from "@src/infrastructure/navigation/route";
import DropDownComponent from "@src/components/dropdown/DropDown.component";

// Define the MovieItem component
const MovieItem = ({ movie }) => {
  const navigateToMovieDetail = () => {
    navigate(AUTH_ROUTE.MOVIE_DETAIL);
  };
  return (
    <Pressable onPress={navigateToMovieDetail}>
      <View style={itemStyles.container}>
        <Image style={itemStyles.img} />
        <View style={itemStyles.content}>
          <Text>Genre</Text>
          <Text style={textStyle.h[2]}>{movie.title}</Text>
          <View style={itemStyles.row}>
            <View style={itemStyles.row}>
              <Octicons name="stopwatch" size={18} color="black" />
              <Text style={itemStyles.text}>{movie.duration} minutes</Text>
            </View>
            <View style={itemStyles.row}>
              <Fontisto
                name="star"
                size={18}
                color={theme.colors.other.yellow}
              />
              <Text style={itemStyles.text}>{movie.stars}</Text>
              <Text>(53)</Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

// Define the styles
const itemStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 4,
    paddingHorizontal: 12,
  },
  text: {
    marginHorizontal: 4,
  },
  img: {
    width: 80,
    backgroundColor: "red",
    height: 80,
    borderRadius: 8,
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});
export default MovieItem;
