import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Color from "../utils/color";
import { UrlAPI } from "../constants/constants";
import { updatePost } from "../features/post/postSlice";

const InputBar = ({ ...props }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);

  const [text, setText] = useState("");
  const handlePostComment = () => {
    if (text != "") {
      axios
        .put(`${UrlAPI}/post/${props.postId}`, {
          content: text,
        })
        .then((res) => {
          setText("");
          dispatch(updatePost(res.data.updatedPost));
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Viết bình luận..."
        value={text}
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
