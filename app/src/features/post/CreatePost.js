import {
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import { render } from "react-dom";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";

import { UrlAPI } from "../../constants/constants";

const CreatePost = () => {
  const [description, setDescription] = useState("");
  const [result, setResult] = useState(true);

  const handleSelectImage = async () => {
    await DocumentPicker.getDocumentAsync({
      type: "image/*",
    })
      .then((result) => {
        const image = result.file;
        const newPostData = new FormData();
        newPostData.append("testImage", image);
        newPostData.append("description", description);
        console.log(result);
        return axios.post(`${UrlAPI}/post/image`, newPostData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      })
      .then((res) => {
        console.log("Save file thanh cong", res);
      })
      .catch(function (error) {
        console.log("err");
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  };
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          style={styles.descriptionText}
          onChangeText={(newDescript) => setDescription(newDescript)}
          placeholder="Bạn đang nghĩ gì..."
        ></TextInput>
        <TouchableOpacity onPress={handleSelectImage}>
          <Entypo name="images" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Image
        style={styles.image}
        source={require("./../../../assets/imgs/24.jpg")}
      ></Image>
    </View>
  );
};

export default CreatePost;

const styles = StyleSheet.create({
  container: {},
  descriptionText: {
    color: "white",
  },
  image: {
    height: 300,
    width: 300,
    resizeMode: "stretch",
  },
});
