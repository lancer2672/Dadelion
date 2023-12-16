import { Spacer } from "@src/components/spacer/spacer.component";
import { useEffect, useState } from "react";
import {
  Dimensions,
  ImageBackground,
  Pressable,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import styled from "styled-components/native";

import { uploadFile } from "@src/api/upload";
import { Avatar } from "@src/components/Avatar";
import { userSelector } from "@src/store/selector";
import { useCreatePostMutation } from "@src/store/slices/api/postApiSlice";
import { setIsLoading } from "@src/store/slices/appSlice";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "styled-components";
import { Header, Seperator, UserName } from "../shared-components";

const SCREEN_WIDTH = Dimensions.get("window").width;
const CreatePost = ({ navigation }) => {
  const [createPost, { isLoading, isSuccess, data, error }] =
    useCreatePostMutation();
  const theme = useTheme();
  const { user } = useSelector(userSelector);
  const [description, setDescription] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const dispatch = useDispatch();
  console.log("error", error);
  const handleCreatePost = async () => {
    const newPostData = new FormData();
    if (imageUri == null) {
      return;
    }
    newPostData.append("image", {
      uri: imageUri,
      name: "post-image" + new Date() + "_profile",
      type: "image/jpg",
    });
    const { files } = await uploadFile({ type: "image", data: newPostData });
    console.log("Create post upload img  data", files, newPostData);
    createPost({
      image: { name: files[0].id, url: files[0].url },
      description: description,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      navigation.goBack();
    }
    dispatch(setIsLoading(isLoading));
  }, [isLoading]);

  useEffect(() => {
    ImagePicker.openPicker({
      multiple: false,
      mediaType: "photo",
    })
      .then((image) => {
        // console.log("image", image);
        setImageUri(image.path);
      })
      .catch((er) => console.log("er", er));
  }, []);
  return (
    <Container>
      <Header
        onBackButtonPress={() => navigation.goBack()}
        onButtonPress={handleCreatePost}
        heading={"Tạo bài viết"}
        buttonContent={"Đăng"}
      ></Header>
      <Seperator style={{ width: SCREEN_WIDTH }}></Seperator>
      <Spacer size={"medium"} position={"bottom"}></Spacer>
      <Body>
        <UserInfo>
          <Avatar source={{ uri: user.avatar }}></Avatar>
          <Spacer position={"left"} size={"medium"}></Spacer>
          <View>
            <UserName>{user.nickname}</UserName>
            <UserName>{user.email}</UserName>
          </View>
        </UserInfo>
      </Body>
      <Pressable>
        <SelectedImage
          style={{ width: SCREEN_WIDTH - 16 }}
          resizeMode="contain"
          source={
            imageUri == null
              ? require("@assets/imgs/ChooseImage.png")
              : {
                  uri: imageUri,
                }
          }
        ></SelectedImage>
      </Pressable>
      <View style={{ flexDirection: "row", alignItems: "center", padding: 8 }}>
        <PostContent
          multiline={true}
          onChangeText={(newDescript) => setDescription(newDescript)}
          placeholder="Bạn đang nghĩ gì..."
          placeholderTextColor={theme.colors.text.primary}
        ></PostContent>
      </View>
    </Container>
  );
};
const Body = styled(View)`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
const AddImageButton = styled(TouchableOpacity)``;
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
  
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.bg.secondary}
  color: ${(props) => props.theme.colors.text.primary}
  margin-right: 8px;
  line-height: 24px;
  padding:4px;
  font-size: ${(props) => props.theme.fontSizes.body};
`;
const SelectedImage = styled(ImageBackground)`
  margin-top: 16px;
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
