import React, { useEffect, useLayoutEffect, useState, useContext } from "react";
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
import { Header, Seperator, Avatar, UserName } from "../shared-components";

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
const PostInfo = styled(View)`
  margin-top: 24px;
  margin-left: 8px;
  flex-direction: row;
  align-items: center;
`;
const Container = styled(View)`
  background-color: ${(props) => props.theme.colors.bg.primary};
  flex: 1;
`;
const UserInfo = styled(View)`
  margin-left: 8px;
`;
const ImageContainer = styled(TouchableOpacity)`
  height: 300px;
`;
const PostImage = styled(ImageBackground)`
  flex: 1;
  opacity: 0.6;
  resize-mode: stretch;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.bg.secondary};
`;
const dayjs = require("dayjs");

const UpdatePost = ({ ...props }) => {
  const {
    userAvatar,
    creatorName,
    createdAt,
    description,
    setIsvisible,
    postId,
    postImage,
  } = props;
  const { error, updatePost } = useContext(PostContext);
  const [newDescription, setNewDescription] = useState(description);
  const [selectedImageUri, setSelectedImageUri] = useState(postImage);
  const [updateBtnDisable, setUpdateBtnDisable] = useState(true);
  useLayoutEffect(() => {
    if (selectedImageUri != postImage || newDescription !== description) {
      setUpdateBtnDisable(false);
    } else {
      setUpdateBtnDisable(true);
    }
  }, [selectedImageUri, newDescription]);
  const HandlePickImage = () => {
    PickImage()
      .then((result) => {
        if (!result.cancelled) setSelectedImageUri(result.uri);
      })
      .catch((err) => {});
  };
  const handleCloseModal = () => {
    setIsvisible(false);
  };
  const handleUpdatePost = async () => {
    const newPostData = new FormData();
    if (selectedImageUri != null) {
      newPostData.append("updateImage", {
        uri: selectedImageUri,
        name: new Date() + "_profile",
        type: "image/jpg",
      });
    }
    newPostData.append("description", newDescription);
    await updatePost(postId, newPostData);
    handleCloseModal();
  };

  return (
    <Container>
      <Header
        isDisabled={updateBtnDisable}
        onBackButtonPress={handleCloseModal}
        onButtonPress={handleUpdatePost}
        heading={"Chỉnh sửa bài viết"}
        buttonContent={"Lưu"}
      ></Header>

      <Seperator></Seperator>

      <PostInfo>
        {userAvatar == null ? (
          <Avatar
            source={require("../../../../assets/imgs/DefaultAvatar.png")}
          ></Avatar>
        ) : (
          <Avatar
            source={{
              uri: userAvatar,
            }}
          ></Avatar>
        )}
        <UserInfo>
          <UserName>{creatorName}</UserName>
          <Text>
            {dayjs(createdAt).format("DD/MM/YYYY" + " lúc " + "HH:mm")}
          </Text>
        </UserInfo>
      </PostInfo>

      <View>
        <TextInput
          style={{ margin: 8, height: "auto", lineHeight: 20, fontSize: 16 }}
          multiline={true}
          defaultValue={description}
          value={newDescription}
          onChangeText={(newText) => setNewDescription(newText)}
          maxLength={500}
        ></TextInput>
      </View>

      <ImageContainer onPress={HandlePickImage}>
        <PostImage
          source={{
            uri: selectedImageUri || postImage || null,
          }}
        >
          <AntDesign style={{}} name="camera" size={48} color="black" />
        </PostImage>
      </ImageContainer>
    </Container>
  );
};

export default UpdatePost;
