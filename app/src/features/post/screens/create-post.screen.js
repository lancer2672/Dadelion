import {
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import React, { useState, useContext } from "react";
import * as ImagePicker from "expo-image-picker";
import { Entypo } from "@expo/vector-icons";
import Color from "../../../utils/color";
import { PostContext } from "../../../services/post/post.context";

const SCREEN_WIDTH = Dimensions.get("window").width;

const CreatePost = ({ ...props }) => {
  const { CreatePost, error, isLoading } = useContext(PostContext);
  const { setIsvisible } = props;
  const [description, setDescription] = useState("");
  const [imageUri, setImageUri] = useState(null);

  const handleCreatePost = async () => {
    const newPostData = new FormData();
    if (imageUri != null) {
      newPostData.append("postImage", {
        uri: imageUri,
        name: new Date() + "_profile",
        type: "image/jpg",
      });
    }
    newPostData.append("description", description);
    await CreatePost(newPostData);
    setIsvisible(false);
  };
  const handleSelectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };
  if (isLoading) {
    return <ActivityIndicator size="large" color="#fff"></ActivityIndicator>;
  }
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
      {imageUri == null ? (
        <Image
          style={styles.image}
          source={require("./../../../../assets/imgs/ChooseAnImage.png")}
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
    backgroundColor: Color.lightGray,
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
