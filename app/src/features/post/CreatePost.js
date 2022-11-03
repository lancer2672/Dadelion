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
import Color from "../../utils/color";

const CreatePost = ({ setIsvisible }) => {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState({});
  const [hasImage, setHasImage] = useState(false);
  let uriImage = false;
  const handleCreatePost = async () => {
    const newPostData = new FormData();
    console.log("IMAGE", image);
    newPostData.append("testImage", image);
    newPostData.append("description", description);
    await axios
      .post(`${UrlAPI}/post/image`, newPostData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {})
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
  const handleSelectImage = async () => {
    await DocumentPicker.getDocumentAsync({
      type: "image/*",
    })
      .then((result) => {
        setHasImage(true);
        uriImage = result.uri;
        setImage(result.file);
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
      {hasImage == false ? (
        <Image
          style={styles.image}
          source={require("./../../../assets/imgs/ChooseAnImage.png")}
        ></Image>
      ) : (
        <Image
          style={styles.image}
          source={{
            uri: uriImage,
          }}
        ></Image>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleCreatePost} style={styles.button}>
          <Text>Create Post</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsvisible(false)}
          style={styles.button}
        >
          <Text>Cancle</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreatePost;

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
  },
  descriptionText: {
    color: "white",
  },
  image: {
    height: 300,
    width: 300,
    resizeMode: "stretch",
  },
  button: {
    minWidth: 80,
    height: 40,
    backgroundColor: Color.subColor,
    borderRadius: 25,
  },
  buttonContainer: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
