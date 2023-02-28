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
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import styled from "styled-components/native";

import { Spacer } from "../../../components/spacer/spacer.component";
import Color from "../../../utils/color";
import { PostContext } from "../../../services/post/post.context";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { Avatar } from "../shared-styled-components";

const BackIcon = styled(TouchableOpacity)`
  margin-right: 12px;
`;
const UserName = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.label};
  margin-left: 8px;
  font-weight: ${(props) => props.theme.fontWeights.medium};
`;
const Header = styled(View)`
  margin-top: 8px;
  margin-bottom: 8px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
const Body = styled(View)`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
const Heading = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.title};
  font-weight: ${(props) => props.theme.fontWeights.medium};
  flex: 1;
`;
const UserInfo = styled(View)`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex: 1;
  margin-bottom: 16px;
`;
const CreateButton = styled(TouchableOpacity)`
  background-color: ${(props) => props.theme.colors.ui.primary}
  border-radius: 4px;
  justify-content: center;
  padding: 8px;
  align-items: center;

  shadow-color: #000;
  shadow-offset: 4px;
  shadow-opacity: 0.4;
  shadow-radius: 4px;
  elevation: 1;
`;
const CreateButtonText = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.label};
  font-weight: ${(props) => props.theme.fontWeights.medium};
  color: ${(props) => props.theme.colors.white};
`;
const Seperator = styled(View)`
  border-width: 1px;
  border-color: #9cabad;
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

const Container = styled(View).attrs((props) => ({
  width: props.SCREEN_WIDTH,
  height: props.SCREEN_HEIGHT,
  padding: 8,
}))`
  align-items: center;
  background-color: ${(props) => props.theme.colors.bg.primary}
  justify-content: flex-start;
`;
const AddImageButton = styled(TouchableOpacity)``;
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const CreatePost = ({ ...props }) => {
  const { CreatePost, error, isLoading } = useContext(PostContext);
  const { user } = useContext(AuthenticationContext);
  const [description, setDescription] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const { setIsvisible } = props;
  const { avatar, nickname } = user;

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
    <Container SCREEN_WIDTH={SCREEN_WIDTH} SCREEN_HEIGHT={SCREEN_HEIGHT}>
      <Header>
        <BackIcon onPress={() => setIsvisible(false)}>
          <Ionicons name="arrow-back" size={32} color="black" />
        </BackIcon>
        <Heading>Tạo bài viết</Heading>
        <CreateButton onPress={handleCreatePost}>
          <CreateButtonText>Đăng</CreateButtonText>
        </CreateButton>
      </Header>
      <Seperator style={{ width: SCREEN_WIDTH }}></Seperator>
      <Spacer size={"medium"} position={"bottom"}></Spacer>
      <Body>
        <UserInfo>
          {avatar == null ? (
            <Avatar
              source={require("./../../../../assets/imgs/DefaultAvatar.png")}
            ></Avatar>
          ) : (
            <Avatar source={{ uri: avatar }}></Avatar>
          )}
          <UserName>{nickname}</UserName>
        </UserInfo>
      </Body>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
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
          style={{ width: SCREEN_WIDTH - 24 }}
          source={require("./../../../../assets/imgs/ChooseAnImage.png")}
        ></SelectedImage>
      ) : (
        <SelectedImage
          style={{ width: SCREEN_WIDTH - 24 }}
          source={{
            uri: imageUri,
          }}
        ></SelectedImage>
      )}
    </Container>
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
    padding: 2,
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
