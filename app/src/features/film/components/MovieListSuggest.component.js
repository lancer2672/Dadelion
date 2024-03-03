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
import MovieItem from "./MovieItem.component";

const mockMovieGenres = [
  {
    id: 1,
    name: "Action",
  },
  {
    id: 2,
    name: "Comedy",
  },
  {
    id: 3,
    name: "Drama",
  },
];
const parse = () => {
  return mockMovieGenres.map((item) => {
    return {
      value: item.id,
      label: item.name,
    };
  });
};
const MovieListSuggest = ({ genre, data }) => {
  const [selectedGenre, setSelectedGenre] = useState();
  console.log("selectedGenre", selectedGenre);
  return (
    <View style={styles.container}>
      <Text
        style={[
          textStyle.h[2],
          { marginBottom: 6, marginLeft: 12, fontWeight: "bold" },
        ]}
      >
        Mới ra mắt
      </Text>
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
});

export default MovieListSuggest;
