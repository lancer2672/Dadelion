import { StyleSheet, View } from "react-native";
import Video from "react-native-video";
const MovieVideo = () => {
  return (
    <View style={styles.container}>
      <Video
        source={{
          uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        }}
        style={styles.backgroundVideo}
        resizeMode="cover"
        controls={true}
      />
    </View>
  );
};

export default MovieVideo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#000",
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
