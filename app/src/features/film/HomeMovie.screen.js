import { FontAwesome, Fontisto } from "@expo/vector-icons";
import textStyle from "@src/components/typography/text.style";
import { navigate } from "@src/infrastructure/navigation/navigator.navigation";
import { AUTH_ROUTE } from "@src/infrastructure/navigation/route";
import { theme } from "@src/infrastructure/theme";
import { useGetListMoviesQuery } from "@src/store/slices/api/movieApiSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Dimensions,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Searchbar } from "react-native-paper";
import Carousel from "react-native-reanimated-carousel";
import MovieList from "./components/MovieList.component";
import MovieListSuggest from "./components/MovieListSuggest.component";
import MovieListWatching from "./components/MovieListWatching.component";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
// let data = [
//   {
//     id: 1,
//     title: "Movie 1",
//     duration: 120,
//     description: "This is a description for Movie 1.",
//     actor_avatars: ["https://picsum.photos/200", "https://picsum.photos/200"],
//     trailer: "path/to/trailer1.mp4",
//     file_path:
//       "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
//     thumbnail: "https://picsum.photos/200",
//     views: 1000,
//     stars: 4,
//     created_at: "2024-03-03T11:20:56.706415Z",
//     movie_id: 1,
//     genre_id: 1,
//   },
//   {
//     id: 2,
//     title: "Movie 2",
//     duration: 150,
//     description: "This is a description for Movie 2.",
//     actor_avatars: ["https://picsum.photos/200", "https://picsum.photos/200"],
//     trailer: "path/to/trailer2.mp4",
//     file_path:
//       "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
//     thumbnail: "https://picsum.photos/200",
//     views: 2000,
//     stars: 5,
//     created_at: "2024-03-04T11:20:56.706415Z",
//     movie_id: 2,
//     genre_id: 2,
//   },
// ];

const HomeMovie = () => {
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.bg.primary }}>
      <ScrollView>
        <FilmCarousel></FilmCarousel>
        <MovieListWatching></MovieListWatching>
        <MovieListSuggest></MovieListSuggest>
        <MovieList></MovieList>
      </ScrollView>
    </View>
  );
};

const FilmCarousel = () => {
  const [searchKeyword, setSearchKeyword] = useState("");

  // Call the useGetRecentMoviesQuery hook to fetch the recent movies
  const {
    data: movies = [],
    isLoading,
    error,
  } = useGetListMoviesQuery({ skip: 0, limit: 10 });

  useEffect(() => {
    axios
      .get("http://172.29.142.149:8080/movies", {
        params: {
          limit: 10,
          skip: 0,
        },
      })
      .then((res) => {
        console.log("RES", res);
      })
      .catch((er) => {
        console.log("er", er);
      });
  }, []);
  if (error) {
    console.log("error", error);
  }
  console.log("MOVIES", movies);
  const renderItem = ({ item, index }) => {
    return (
      <Pressable
        onPress={() => {
          navigate(AUTH_ROUTE.MOVIE_DETAIL);
        }}
        style={{ flex: 1 }}
      >
        <ImageBackground source={{ uri: item.thumbnail }} style={styles.bg}>
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
          <View
            style={[
              styles.row,
              {
                paddingHorizontal: 12,
                paddingVertical: 12,
                marginTop: "auto",
              },
            ]}
          >
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
              <Text
                style={[textStyle.h[1], { color: theme.colors.white[100] }]}
              >
                {item.title}
              </Text>
              <View style={styles.row}>
                <Fontisto
                  name="star"
                  size={16}
                  color={theme.colors.other.yellow}
                />
                <Text
                  style={[
                    textStyle.content.medium,
                    { color: theme.colors.white[100], marginHorizontal: 8 },
                  ]}
                >
                  {item.stars} (53)
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.playBtn}>
              <FontAwesome
                name={"play"}
                size={28}
                color={theme.colors.other.bluepurple}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </Pressable>
    );
  };
  return (
    <View>
      <Carousel
        loop
        width={SCREEN_WIDTH}
        height={(SCREEN_HEIGHT * 1) / 3}
        autoPlay={true}
        data={movies}
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
    flex: 1,
  },
  playBtn: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    backgroundColor: "white",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
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
