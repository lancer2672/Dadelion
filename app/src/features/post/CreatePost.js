import {
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import * as FileSystem from "expo-file-system";
import { addPost } from "./postSlice";
import { UrlAPI } from "../../constants/constants";
import Color from "../../utils/color";

const SCREEN_WIDTH = Dimensions.get("window").width;

const CreatePost = ({ setIsvisible }) => {
  const [description, setDescription] = useState("");
  const [imageUri, setImageUri] = useState("");

  const dispatch = useDispatch();
  const handleCreatePost = async () => {
    const newPostData = new FormData();
    newPostData.append("postImage", {
      uri: imageUri,
      name: new Date() + "_profile",
      type: "image/jpg",
    });
    newPostData.append("description", description);
    await axios
      .post(`${UrlAPI}/post/create`, newPostData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setIsvisible(false);
        const newPost = res.data.newPost;
        dispatch(addPost(newPost));
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

  const handleSelectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      setImageUri(result.uri);
    }

    // await DocumentPicker.getDocumentAsync({
    //   type: "image/*",
    // })
    //   .then((result) => {
    //     console.log("res", result);
    //     setImageUri(result.uri);
    //     setImage(result.file);
    //     if (result.file) {
    //       setImage(result.file);
    //     } else {
    //       return FileSystem.readAsStringAsync(result.uri, {
    //         encoding: FileSystem.EncodingType.Base64,
    //       });
    //     }
    //   })
    //   .then((data) => {
    //     setImage({
    //       name:""
    //     });
    //   })
    //   .catch(function (error) {
    //     console.log("err");
    //     if (error.response) {
    //       // The request was made and the server responded with a status code
    //       // that falls out of the range of 2xx
    //       console.log(error.response.data);
    //       console.log(error.response.status);
    //       console.log(error.response.headers);
    //     } else if (error.request) {
    //       // The request was made but no response was received
    //       // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    //       // http.ClientRequest in node.js
    //       console.log(error.request);
    //     } else {
    //       // Something happened in setting up the request that triggered an Error
    //       console.log("Error", error.message);
    //     }
    //     console.log(error.config);
    //   });
  };
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TextInput
          style={styles.descriptionText}
          onChangeText={(newDescript) => setDescription(newDescript)}
          placeholder="Bạn đang nghĩ gì..."
        ></TextInput>
        <TouchableOpacity onPress={handleSelectImage}>
          <Entypo name="images" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {imageUri == false ? (
        <Image
          style={styles.image}
          source={require("./../../../assets/imgs/ChooseAnImage.png")}
        ></Image>
      ) : (
        <Image
          style={styles.image}
          source={{
            uri: imageUri,
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
          <Text>Cancel</Text>
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
    flex: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: Color.descriptionBackground,
  },
  image: {
    marginTop: 16,
    height: (SCREEN_WIDTH * 2) / 3,
    resizeMode: "stretch",
    borderRadius: 10,
    width: SCREEN_WIDTH - 40,
  },
  button: {
    minWidth: 80,
    height: 40,
    backgroundColor: Color.subColor,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 16,
  },
  buttonContainer: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
