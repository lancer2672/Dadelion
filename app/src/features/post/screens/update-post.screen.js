import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  Dimensions,
  TextInput,
  Button,
  ImageBackground,
} from "react-native";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";

import { Spacer } from "../../../components/spacer/spacer.component";
import { PickImage } from "../../../utils/openImagePicker";
import { PostContext } from "../../../services/post/post.context";

const UpdateBtn = styled(TouchableOpacity)`
  min-width: 200px;
  padding-top: ${(props) => props.theme.space[2]};
  padding-bottom: ${(props) => props.theme.space[2]};
  background-color: ${(props) => props.theme.colors.ui.quaternary};
  border-radius: 25px;
`;
const UpdateBtnContent = styled(Text)`
  align-self: center;
  font-weight: bold;
  font-size: 16px;
  color: ${(props) => props.theme.colors.text.primary};
`;

const dayjs = require("dayjs");
const UpdatePost = ({ ...props }) => {
  const {
    userAvatar,
    creatorName,
    createdAt,
    description,
    setSelectedItem,
    setIsvisible,

    postId,
    image,
  } = props;
  const { error, UpdatePost } = useContext(PostContext);
  const [newDescription, setNewDescription] = useState(description);
  const [imageUri, setImageUri] = useState(null);
  const HandlePickImage = () => {
    PickImage()
      .then((result) => {
        setImageUri(result.uri);
      })
      .catch((err) => {});
  };
  const handleCloseModal = () => {
    setIsvisible(false);
  };
  const handleUpdatePost = async () => {
    const newPostData = new FormData();
    if (imageUri != null) {
      newPostData.append("updateImage", {
        uri: imageUri,
        name: new Date() + "_profile",
        type: "image/jpg",
      });
    }
    newPostData.append("description", newDescription);
    await UpdatePost(postId, newPostData);
    handleCloseModal();
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{
            uri: userAvatar || null, //data.data in your case
          }}
          style={styles.avatar}
        ></Image>
        <View style={styles.postInfo}>
          <Text>{creatorName}</Text>
          <Text>
            {dayjs(createdAt).format("DD/MM/YYYY" + " lúc " + "HH:mm")}
          </Text>
        </View>
      </View>
      <View style={styles.content}>
        <TextInput
          style={{ margin: 8, height: "auto", lineHeight: 20, fontSize: 16 }}
          multiline={true}
          defaultValue={description}
          value={newDescription}
          onChangeText={(newText) => setNewDescription(newText)}
          maxLength={500}
        ></TextInput>
      </View>

      <TouchableOpacity onPress={HandlePickImage} style={styles.imageContainer}>
        <ImageBackground
          source={{
            uri: imageUri || image || null,
          }}
          style={styles.image}
        >
          <AntDesign style={{}} name="camera" size={48} color="black" />
        </ImageBackground>
      </TouchableOpacity>

      <View style={styles.buttonContainter}>
        <Spacer variant="top" size="medium"></Spacer>
        <UpdateBtn onPress={handleUpdatePost}>
          <UpdateBtnContent>Lưu</UpdateBtnContent>
        </UpdateBtn>
        <Spacer variant="top" size="medium"></Spacer>
        <UpdateBtn onPress={handleCloseModal}>
          <UpdateBtnContent>Hủy</UpdateBtnContent>
        </UpdateBtn>
      </View>
    </View>
  );
};

export default UpdatePost;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,0.4)",
    flex: 1,
  },
  header: {
    marginTop: 24,
    marginLeft: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    maxHeight: 400,
    height: 300,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
  avatar: {
    marginRight: 12,
    width: 40,
    height: 40,
    resizeMode: "stretch",
    borderRadius: 50,
  },
  buttonContainter: {
    width: "100%",
    alignSelf: "center",
  },
  saveBtn: {
    marginRight: 8,
  },
  image: {
    flex: 1,
    opacity: 0.6,
    resizeMode: "stretch",
    alignItems: "center",
    justifyContent: "center",
  },
});
