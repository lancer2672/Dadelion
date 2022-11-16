import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  Dimensions,
  TextInput,
} from "react-native";
import React from "react";

import readImageData from "../../utils/imageHandler";

const dayjs = require("dayjs");
const UpdatePost = ({
  userAvatar,
  creatorName,
  createdAt,
  description,
  image,
}) => {
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
      <View
        style={{
          //to fit image in post => property: SCREEN_WIDTH_WITH_MARGIN_L_R_12 - 6
          width: 300,
          height: 350,
        }}
      >
        <Image
          source={{
            uri: image || null,
          }}
          //to fit image in post => marginLeft 4;
          style={{ flex: 1, resizeMode: "stretch" }}
        ></Image>
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
  avatar: {
    marginRight: 12,
    width: 40,
    height: 40,
    resizeMode: "stretch",
    borderRadius: 50,
  },
});
