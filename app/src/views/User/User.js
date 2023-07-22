import {
  Dimensions,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useSelector } from "react-redux";

import { setAuth } from "@src/features/auth/authSlice";
import UserPost from "./UserPost";
import { userSelector } from "@src/store/selector";
import { useUpdateUserMutation } from "@src/store/services/userService";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

const Header = styled.View`
  width: 100%;
  height: 300px;
  justify-content: space-between;
  align-items: center;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
  overflow: hidden;
  background-color: ${(props) => props.theme.colors.bg.primary};
  elevation: 5;
  padding-bottom: 24px;
  padding-top: 12px;
`;
const Avatar = styled.ImageBackground.attrs((props) => {
  return {
    source:
      props.avatarUri == null
        ? require("@assets/imgs/DefaultAvatar.png")
        : { uri: props.avatarUri },
  };
})`
  border-width: 0px;
  border-radius: 60px;
  border-color: #555;
  width: 120px;
  height: 120px;
  overflow: hidden;
  justify-content: flex-end;
`;

const CameraIcon = styled.View`
  justify-content: center;
  align-items: center;
  background-color: rgba(52, 52, 52, 0.4);
  padding-bottom: 10px;
`;

const UserDescription = styled.View`
  margin-bottom: 29px;
  align-items: center;
`;

const Name = styled.Text`
  font-size: ${(props) => props.theme.fontSizes.h5};
  color: ${(props) => props.theme.colors.text.primary};
  font-weight: bold;
`;
const HeaderContent = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding-horizontal: 24px;
`;
const HeaderContainer = styled.View`
  height: 390px;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
  width: 100%;
  background-color: #9971ee;
  elevation: 5;
`;
const BottomHeader = styled.View`
  flex: 1;
  justify-content: center;
  flex-direction: row;
  align-items: center;
`;
const ItemValue = styled.Text`
  font-size: ${(props) => props.theme.fontSizes.title};
  font-weight: bold;
  color: ${(props) => props.theme.colors.text.primary};
`;

const ItemLabel = styled.Text`
  font-size: ${(props) => props.theme.fontSizes.caption};
  color: ${(props) => props.theme.colors.text.primary};
`;
const ItemContainer = styled.View`
  align-items: center;
  margin-horizontal: 12px;
`;

const User = ({ props, navigation }) => {
  const { user = {} } = useSelector(userSelector);
  const [updateUser, { isLoading, isSuccess, ...res }] =
    useUpdateUserMutation();
  const [avatarUri, setAvatarUri] = useState(null);
  const [selectedImageUri, setSelectedImageUri] = useState(null);
  useEffect(() => {
    setAvatarUri(user.avatar);
  }, []);
  useEffect(() => {
    if (isSuccess) {
      setAvatarUri(selectedImageUri);
    }
  }, [isSuccess]);
  const updateUserImage = async (isWallpaper, setUri) => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setSelectedImageUri(result.uri);

        const newUserData = new FormData();
        newUserData.append("userImage", {
          uri: result.uri,
          name: new Date() + "_profile",
          type: "image/jpg",
        });
        newUserData.append("isWallpaper", isWallpaper);
        updateUser({ newUserData, userId: user._id });
      }
    } catch (err) {
      console.log("Error selecting image", err);
    }
  };
  const handleUpdateAvatar = () => updateUserImage(false, setAvatarUri);

  const handleLogOut = () => {
    dispatch(setAuth({ isAuthenticated: false, user: null }));
    navigation.navigate("Login");
  };
  return (
    <Container>
      <HeaderContainer>
        <Header>
          <HeaderContent>
            <TouchableOpacity>
              <AntDesign name="arrowleft" size={32} color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
              <AntDesign name="setting" size={32} color="black" />
            </TouchableOpacity>
          </HeaderContent>
          <Avatar avatarUri={avatarUri}>
            <TouchableOpacity onPress={handleUpdateAvatar}>
              <CameraIcon>
                <AntDesign
                  style={{ opacity: 1 }}
                  name="camera"
                  size={24}
                  color="black"
                />
              </CameraIcon>
            </TouchableOpacity>
          </Avatar>
          <UserDescription>
            <Name>{user.nickname}</Name>
            {/* <Text>User description "ICON"</Text> */}
          </UserDescription>
        </Header>
        <BottomHeader>
          <ItemContainer>
            <ItemValue>85</ItemValue>
            <ItemLabel>Bạn bè</ItemLabel>
          </ItemContainer>
        </BottomHeader>
      </HeaderContainer>
    </Container>
  );
};

export default User;

const styles = StyleSheet.create({});
