import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  Dimensions,
  TextInput,
  Button,
} from "react-native";
import React from "react";

import readImageData from "../../../utils/imageHandler";
import MainButton from "../../../components/Button/MainButton";

const dayjs = require("dayjs");
const UpdatePost = ({ ...props }) => {
  const {
    userAvatar,
    creatorName,
    createdAt,
    description,
    setIsvisible,
    image,
  } = props;
  const a = (b) => {
    console.log(b);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Image
            source={{
              uri: userAvatar || null, //data.data in your case
            }}
            style={styles.avatar}
          ></Image>
        </TouchableOpacity>
        <View style={styles.postInfo}>
          <Text>{creatorName}</Text>
          <Text>
            {dayjs(createdAt).format("DD/MM/YYYY" + " lúc " + "HH:mm")}
          </Text>
        </View>
      </View>
      <View style={styles.content}>
        <TextInput defaultValue={description}></TextInput>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: image || null,
          }}
          //to fit image in post => marginLeft 4;
          style={{ flex: 1, resizeMode: "stretch" }}
        ></Image>
      </View>
      <View style={styles.buttonContainter}>
        <MainButton
          style={styles.saveBtn}
          content={"Lưu"}
          event={a}
        ></MainButton>
        <MainButton content={"Huỷ"} event={setIsvisible(false)}></MainButton>
      </View>
    </View>
  );
};

export default UpdatePost;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
  },
  header: {
    marginTop: 8,
    marginLeft: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    height: 300,
    width: 300,
    paddingTop: 20,
    paddingBottom: 20,
  },
  avatar: {
    marginRight: 12,
    width: 40,
    height: 40,
    resizeMode: "stretch",
    borderRadius: 50,
  },
  buttonContainter: {
    flexDirection: "row",
    alignSelf: "flex-end",
  },
  saveBtn: {
    marginRight: 8,
  },
});
