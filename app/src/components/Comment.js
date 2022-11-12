import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";

import { UrlAPI } from "../constants/constants";
import arrayBufferToBase64 from "../utils/imageConvert";
import Color from "../utils/color";

const Comment = ({ ...props }) => {
  console.count("comment");
  const [imageURI, setImageURI] = useState("");
  const [userName, setUserName] = useState("");
  const [content, setContent] = useState("");
  useEffect(() => {
    axios
      .get(`${UrlAPI}/user/${props.userId}`)
      .then((res) => {
        setUserName(res.data.user.nickname);
        setContent(props.content);
        setImageURI(
          "data:image/jpeg;base64," +
            arrayBufferToBase64(res.data.user.avatar.data.data)
        );
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image source={{ uri: imageURI }} style={styles.avatar}></Image>
      </TouchableOpacity>
      <View style={styles.commentInfo}>
        <Text>{userName}</Text>
        <Text>{content}</Text>
      </View>
      <TouchableOpacity style={styles.moreBtn}>
        <MaterialIcons name="expand-more" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default Comment;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 40,
    width: "100%",
    alignItems: "center",
    backgroundColor: Color.descriptionBackground,
    borderRadius: 25,
  },
  commentInfo: {
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    resizeMode: "stretch",
    borderRadius: 50,
    marginRight: 8,
  },
  moreBtn: {
    marginLeft: 6,
  },
});
