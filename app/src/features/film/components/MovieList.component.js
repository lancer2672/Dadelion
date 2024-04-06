import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { FlashList } from "@shopify/flash-list";
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

let data = [
  {
    id: 1,
    title: "Movie 1",
    duration: 120,
    description: "This is a description for Movie 1.",
    actor_avatars: ["https://picsum.photos/200", "https://picsum.photos/200"],
    trailer: "path/to/trailer1.mp4",
    file_path:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    thumbnail: "https://picsum.photos/200",
    views: 1000,
    stars: 4,
    created_at: "2024-03-03T11:20:56.706415Z",
    movie_id: 1,
    genre_id: 1,
  },
  {
    id: 2,
    title: "Movie 2",
    duration: 150,
    description: "This is a description for Movie 2.",
    actor_avatars: ["https://picsum.photos/200", "https://picsum.photos/200"],
    trailer: "path/to/trailer2.mp4",
    file_path:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    thumbnail: "https://picsum.photos/200",
    views: 2000,
    stars: 5,
    created_at: "2024-03-04T11:20:56.706415Z",
    movie_id: 2,
    genre_id: 2,
  },
];
const MovieList = ({ genre }) => {
  const [selectedGenre, setSelectedGenre] = useState();
  console.log("selectedGenre", selectedGenre);
  return (
    <View style={styles.container}>
      <DropDownComponent
        label={"Thể loại"}
        style={{ paddingHorizontal: 12 }}
        values={parse(mockMovieGenres)}
        onSelect={setSelectedGenre}
        selectedItem={selectedGenre}
      ></DropDownComponent>
      <FlashList
        estimatedItemSize={60}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        onEndReached={undefined}
        data={data}
        renderItem={({ item }) => {
          return (
            <View style={{ marginVertical: 8 }}>
              <MovieItem movie={item}></MovieItem>
            </View>
          );
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

export default MovieList;
