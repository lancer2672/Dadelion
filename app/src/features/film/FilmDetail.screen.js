import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { goBack } from "@src/infrastructure/navigation/navigator.navigation";
import {
  Entypo,
  FontAwesome,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";
import { theme } from "@src/infrastructure/theme";
import textStyle from "@src/components/typography/text.style";
import ReadMore from "@fawazahmed/react-native-read-more";
import { FlatList } from "react-native-gesture-handler";
import { Image } from "react-native";
import { ScrollView } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const MovieDetail = () => {
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
                Tên phim
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
                  4.3 (53)
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
            <Text style={{ marginLeft: 4 }}>140 minutes</Text>
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
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
              quis sem sed neque mattis condimentum id ut magna. Sed arcu ipsum,
              porttitor sed scelerisque eu, placerat quis lectus. Etiam maximus
              libero ut pharetra feugiat. Praesent congue, lorem id tristique
              vulputate, libero velit ornare lectus, quis tincidunt nisi velit
              vel mi. Nulla suscipit justo non ipsum scelerisque mollis.
              Suspendisse hendrerit urna et velit pretium tempus. Proin commodo
              euismod magna ac molestie. Proin maximus consectetur est hendrerit
              porttitor. Pellentesque sed lectus in mauris scelerisque lobortis.
              Mauris interdum mattis vulputate.
            </Text>
          </ReadMore>
        </View>
        <View style={{ marginVertical: 12 }}>
          <Text style={[textStyle.h[2], { marginBottom: 4 }]}>Diễn viên</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            onEndReached={undefined}
            data={[1, 2, 3]}
            renderItem={({ item }) => {
              return (
                <Image
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 60,
                    marginHorizontal: 8,
                  }}
                  source={{ uri: "https://picsum.photos/200" }}
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
