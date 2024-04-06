import {
  Entypo,
  FontAwesome,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";
import ReadMore from "@fawazahmed/react-native-read-more";
import { useRoute } from "@react-navigation/native";
import textStyle from "@src/components/typography/text.style";
import { goBack } from "@src/infrastructure/navigation/navigator.navigation";
import { theme } from "@src/infrastructure/theme";
import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";

const movieData = {
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
};
const MovieDetail = () => {
  //genre? ifnot fetch
  const movie = useRoute().params ? {} : movieData;

  // fetch('http://yourserver.com/movie/stream?movieUrl=http://example.com/yourmovie.mp4')
  // .then(response => {
  //   if (!response.ok) {
  //     throw new Error("HTTP error " + response.status);
  //   }
  //   return response.blob();
  // })
  // .then(blob => {
  //   // Tại đây, blob là dữ liệu file bạn muốn stream.
  //   // Bạn có thể xử lý blob tùy thuộc vào nhu cầu của bạn.
  //   // Ví dụ, bạn có thể chuyển nó thành URL và sử dụng trong thẻ <Video> hoặc tương tự.
  //   var url = URL.createObjectURL(blob);
  //   // Sử dụng url này để phát video
  // })
  // .catch(e => {
  //   console.error("An error occurred while fetching the file:", e);
  // });
  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.bg.primary }}
      showsVerticalScrollIndicator={false}
    >
      <ImageBackground
        source={require("../../../assets/imgs/Logo.png")}
        style={styles.bg}
      >
        <View style={[StyleSheet.absoluteFillObject]}>
          <LinearGradient
            style={[StyleSheet.absoluteFillObject, { flex: 1 }]}
            colors={[
              "rgba(81, 78, 182, 0)",
              "rgba(81, 78, 182, 0.4)",
              "rgba(81, 78, 182, 0.8)",
            ]}
          ></LinearGradient>
        </View>
        <Pressable onPress={goBack} style={styles.backBtn}>
          <Ionicons
            name="arrow-back"
            size={32}
            color={theme.colors.white[100]}
          />
        </Pressable>
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <View
            style={[styles.row, { paddingHorizontal: 12, paddingVertical: 6 }]}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={[textStyle.h[1], { color: theme.colors.white[100] }]}
              >
                {movie?.title}
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
                  {movie?.stars}
                  {} (53)
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
        </View>
      </ImageBackground>
      <View style={{ paddingHorizontal: 12 }}>
        <View style={styles.container}>
          <View style={styles.innerView}>
            <Entypo name="calendar" size={24} color="black" />
            <Text style={{ marginLeft: 4 }}>17 Sep 2022</Text>
          </View>
          <View style={styles.innerView}>
            <Octicons name="stopwatch" size={24} color="black" />
            <Text style={{ marginLeft: 4 }}>{movie?.duration} minutes</Text>
          </View>
          <View style={styles.innerView}>
            <MaterialCommunityIcons
              name="movie-open-outline"
              size={24}
              color="black"
            />
            <Text style={{ marginLeft: 4 }}>Action</Text>
          </View>
        </View>
        <View style={{ marginVertical: 12 }}>
          <Text style={textStyle.h[2]}>Giới thiệu</Text>
          <ReadMore seeMoreText="Xem thêm" numberOfLines={4}>
            <Text>{movie?.description}</Text>
          </ReadMore>
        </View>
        <View style={{ marginVertical: 12 }}>
          <Text style={[textStyle.h[2], { marginBottom: 4 }]}>Diễn viên</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            onEndReached={undefined}
            data={movie?.actor_avatars || []}
            renderItem={({ item }) => {
              return (
                <Image
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 60,
                    marginHorizontal: 8,
                  }}
                  source={{ uri: item }}
                ></Image>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default MovieDetail;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(232, 232, 232)",
    flexDirection: "row",
    paddingHorizontal: 8,
    borderRadius: 16,
    paddingVertical: 16,
    marginVertical: 12,
    justifyContent: "space-between",
  },
  playBtn: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    backgroundColor: "white",
  },
  row: { flexDirection: "row", alignItems: "center" },
  innerView: {
    marginHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  bg: {
    backgroundColor: "tomato",
    height: 400,
    padding: 12,
  },
  backBtn: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    backgroundColor: "rgba(232, 232, 232, 0.5)",
  },
});
