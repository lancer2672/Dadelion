import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

import Color from "../utils/color";
import { useState } from "react";
import axios from "axios";
import { UrlAPI } from "../constants/constants";

const InputBar = ({ ...props }) => {
  const [text, setText] = useState("");
  console.log(props.postId);
  const handlePostComment = () => {
    if (text != "") {
      axios.put(`${UrlAPI}/post/${props.postId}`, {
        content: text,
      });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Viết bình luận..."
        onChangeText={(newText) => setText(newText)}
        style={styles.inputText}
      ></TextInput>
      <TouchableOpacity onPress={handlePostComment} style={styles.sendBtn}>
        <Ionicons name="send" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default InputBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 4,
    minHeight: 36,
    alignItems: "center",
    borderRadius: 25,
    overflow: "hidden",
  },
  inputText: {
    backgroundColor: Color.descriptionBackground,
    height: "100%",
    flex: 1,
    paddingLeft: 10,
    paddingRight: 4,
  },
  sendBtn: {
    backgroundColor: Color.descriptionBtnBackground,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 5,
    paddingBottom: 5,
  },
});
