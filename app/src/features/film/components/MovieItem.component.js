import { Fontisto, Octicons } from "@expo/vector-icons";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import textStyle from "@src/components/typography/text.style";
import { navigate } from "@src/infrastructure/navigation/navigator.navigation";
import { AUTH_ROUTE } from "@src/infrastructure/navigation/route";
import { theme } from "@src/infrastructure/theme";
import { Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
// Define the MovieItem component
const MovieItem = ({ movie }) => {
  const navigateToMovieDetail = () => {
    navigate(AUTH_ROUTE.MOVIE_DETAIL);
  };
  return (
    <Pressable onPress={navigateToMovieDetail}>
      <View style={itemStyles.container}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={{
              uri: movie.thumbnail,
            }}
            style={itemStyles.img}
          />
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
        <View
          style={{
            width: `${
              movie?.watched_duration && movie.watched_duration > 0
                ? movie.watched_duration / movie.duration
                : 0
            }%`,
            height: 4,
            backgroundColor: "tomato",
            borderTopRightRadius: 5,
            borderBottomRightRadius: 5,
            marginVertical: 2,
          }}
        />
      </View>
    </Pressable>
  );
};

// Define the styles
const itemStyles = StyleSheet.create({
  container: {
    marginHorizontal: 4,
    paddingHorizontal: 12,
    width: SCREEN_WIDTH,
  },
  text: {
    marginHorizontal: 4,
  },
  img: {
    width: 80,
    backgroundColor: "blue",
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
