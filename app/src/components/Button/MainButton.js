import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

import Color from "../../utils/color";

const MainButton = ({ ...props }) => {
  const { style, content, event } = props;
  return (
    <TouchableOpacity onPress={() => event()} style={[styles.container, style]}>
      <Text style={styles.content}>{content}</Text>
    </TouchableOpacity>
  );
};

export default MainButton;

const styles = StyleSheet.create({
  container: {
    minWidth: 76,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: Color.strongPink,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Color.white,
  },
});
