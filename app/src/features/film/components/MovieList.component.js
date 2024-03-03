import React from "react";
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

const MovieList = ({ genre, data }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Genre: genre</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        onEndReached={undefined}
        data={[1, 2, 3]}
        renderItem={({ item }) => {
          return <MovieItem movie={item}></MovieItem>;
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

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
          <Text style={textStyle.h[2]}>Movie Name</Text>
          <View style={itemStyles.row}>
            <View style={itemStyles.row}>
              <Octicons name="stopwatch" size={18} color="black" />
              <Text style={itemStyles.text}>140 minutes</Text>
            </View>
            <View style={itemStyles.row}>
              <Fontisto
                name="star"
                size={18}
                color={theme.colors.other.yellow}
              />
              <Text style={itemStyles.text}>4.3</Text>
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
    marginRight: 12,
    marginLeft: 12,
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
});

export default MovieList;
