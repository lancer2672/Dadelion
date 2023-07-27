import {
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  Dimensions,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import styled from "styled-components/native";

import { Spacer } from "@src/components/spacer/spacer.component";
import Color from "@src/utils/color";
import {
  Avatar,
  Seperator,
  BackButton,
  Header,
  UserName,
} from "../shared-components";
import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "@src/store/selector";
import {
  useCreatePostMutation,
  useReactPostMutation,
} from "@src/store/slices/api/postApiSlice";
import { setIsLoading } from "@src/store/slices/appSlice";

const AddImageButton = styled(TouchableOpacity)``;
const SCREEN_WIDTH = Dimensions.get("window").width;
const CreatePost = ({ setIsvisible }) => {
  const [createPost, { isLoading, isSuccess, data, ...res }] =
    useCreatePostMutation();
  const { user } = useSelector(userSelector);
  const [description, setDescription] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isSuccess) {
      setIsvisible(false);
    }
    dispatch(setIsLoading(isLoading));
  }, [isLoading]);
  const handleCreatePost = async () => {
    if (!imageUri && description.trim(" ") == "") {
      //TODO:
    }
    const newPostData = new FormData();
    if (imageUri != null) {
      newPostData.append("postImage", {
        uri: imageUri,
        name: new Date() + "_profile",
        type: "image/jpg",
      });
    }
    newPostData.append("description", description);
    createPost(newPostData);
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
  return (
    <Container>
      <Header
        onBackButtonPress={() => setIsvisible(false)}
        onButtonPress={handleCreatePost}
        heading={"Tạo bài viết"}
        buttonContent={"Đăng"}
      ></Header>
      <Seperator style={{ width: SCREEN_WIDTH }}></Seperator>
      <Spacer size={"medium"} position={"bottom"}></Spacer>
      <Body>
        <UserInfo>
          {user.avatar == null ? (
            <Avatar
              source={require("./../../../../assets/imgs/DefaultAvatar.png")}
            ></Avatar>
          ) : (
            <Avatar source={{ uri: user.avatar }}></Avatar>
          )}
          <Spacer position={"left"} size={"small"}></Spacer>
          <UserName>{user.nickname}</UserName>
        </UserInfo>
      </Body>
      <View style={{ flexDirection: "row", alignItems: "center", padding: 8 }}>
        <PostContent
          multiline={true}
          onChangeText={(newDescript) => setDescription(newDescript)}
          placeholder="Bạn đang nghĩ gì..."
        ></PostContent>
        <AddImageButton onPress={handleSelectImage}>
          <Entypo name="images" size={24} color="black" />
        </AddImageButton>
      </View>
      {imageUri == null ? (
        <SelectedImage
          style={{ width: SCREEN_WIDTH - 16 }}
          source={require("./../../../../assets/imgs/ChooseAnImage.png")}
        ></SelectedImage>
      ) : (
        <SelectedImage
          style={{ width: SCREEN_WIDTH - 16 }}
          source={{
            uri: imageUri,
          }}
        ></SelectedImage>
      )}
    </Container>
  );
};
const Body = styled(View)`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const UserInfo = styled(View)`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex: 1;
  margin-bottom: 16px;
  margin-left: 8px;
`;
const PostContent = styled(TextInput)`
  flex: 1;
  padding: 4px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.bg.secondary}
  margin-right: 8px;
  line-height: 24px;
  font-size: ${(props) => props.theme.fontSizes.body};
`;
const SelectedImage = styled(Image)`
  margin-top: 16px;
  resize-mode: stretch;
  border-radius: 10px;
  height: 250px;
`;

const Container = styled(View).attrs((props) => ({}))`
  align-items: center;
  flex:1;
  background-color: ${(props) => props.theme.colors.bg.primary}
  justify-content: flex-start;

`;
export default CreatePost;
