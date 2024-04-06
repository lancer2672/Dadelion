import { Dimensions, StyleSheet, View } from "react-native";

import { FlashList } from "@shopify/flash-list";
import textStyle from "@src/components/typography/text.style";
import { useGetMoviesWatchingQuery } from "@src/store/slices/api/movieApiSlice";
import { Text } from "react-native";
import MovieItem from "./MovieItem.component";

const SCREEN_WIDTH = Dimensions.get("window").width;
const sampleData = [
  {
    movie: {
      id: 1,
      title: "Movie 1",
      duration: 120,
      description:
        "The genus Pisum contains two species, Pisum fulvum and Pisum sativum. The latter is divided into three subspecies: the domesticated pea ssp. sativum, and three wild taxa ssp. elatius and ssp. humile; ssp. humile can be further divided into two varieties, var. humile and var. syriacum. The latter taxon is fully interfertile with the cultigens and can be considered the wild progenitor of pea. For breeding purposes, both ssp. elatius and ssp. humile can be viewed",
      actor_avatars: ["https://picsum.photos/200", "https://picsum.photos/200"],
      trailer: "path/to/trailer1.mp4",
      file_path:
        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      thumbnail: "path/to/thumbnail1.jpg",
      views: 1000,
      stars: 4,
      created_at: "2024-03-23T17:23:44.941426Z",
    },
    watched_duration: 120,
    last_watched: "2022-01-03T00:00:00Z",
  },
];
const MovieListWatching = ({}) => {
  const {
    data = [],
    isLoading,
    error,
  } = useGetMoviesWatchingQuery({ userId: 2, offset: 0, limit: 5 });
  if (error) {
    console.log("MovieListWatching", error);
  }
  console.log("MovieListWatching", data.watched_duration);
  if (data.length === 0) {
    return <></>;
  }
  return (
    <View style={styles.container}>
      <Text
        style={[
          textStyle.h[2],
          { marginBottom: 6, marginLeft: 12, fontWeight: "bold" },
        ]}
      >
        Xem tiếp
      </Text>
      <View style={{ flex: 1 }}>
        <FlashList
          estimatedItemSize={SCREEN_WIDTH}
          nestedScrollEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          onEndReached={undefined}
          data={data}
          renderItem={({ item }) => {
            console.log("RENDERITEM", item);
            return (
              <MovieItem
                movie={item}
                watchedDuration={item.watched_duration}
              ></MovieItem>
            );
          }}
          keyExtractor={(item, index) => `watching-movie-${index.toString()}`}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 4,
    // height: 200,
    justifyContent: "center",
  },
});

export default MovieListWatching;
