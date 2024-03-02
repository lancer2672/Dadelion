import React from "react";
import { StyleSheet, Image, Text, View } from "react-native";
import { Fontisto, Octicons } from "@expo/vector-icons";

import textStyle from "@src/components/typography/text.style";
import { theme } from "@src/infrastructure/theme";

// Define the MovieItem component
const MovieItem = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.img} />
      <View style={styles.content}>
        <Text>Genre</Text>
        <Text style={textStyle.h[2]}>Movie Name</Text>
        <View style={styles.row}>
          <View style={styles.row}>
            <Octicons name="stopwatch" size={24} color="black" />
            <Text>140 minutes</Text>
          </View>
          <View style={styles.row}>
            <Fontisto name="star" size={24} color={theme.colors.other.yellow} />
            <Text>4.3</Text>
            <Text>(53)</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

// Define the styles
const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
  },
  img: {},
  content: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default MovieItem;
