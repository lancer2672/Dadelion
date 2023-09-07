import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import styled from "styled-components/native";

import { userSelector } from "@src/store/selector";
import { useUpdateUserMutation } from "@src/store/slices/api/userApiSlice";
import { updateUserState } from "@src/store/slices/userSlice";
import { colors } from "@src/infrastructure/theme/colors";
import FeatureTabs from "@src/features/user/components/FeatureTabs.component";
import {
  UserDescription,
  Name,
  HeaderContent,
  BottomHeader,
  ItemValue,
  ItemLabel,
  ItemContainer,
} from "../sharedStyledComponents";
import Settings from "@src/features/user/screens/Settings.screen";
import { useGetPostByUserIdQuery } from "@src/store/slices/api/postApiSlice";
import { useTheme } from "styled-components";

const User = ({ props, navigation }) => {
  const { user = {} } = useSelector(userSelector);
  const { t } = useTranslation();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [updateUser, { isLoading, data, isSuccess, ...res }] =
    useUpdateUserMutation();
  const { data: postData } = useGetPostByUserIdQuery();
  console.log("postData", postData);
  const [avatarUri, setAvatarUri] = useState(null);
  const [selectedImageUri, setSelectedImageUri] = useState(null);
  const [settingVisible, setSettingVisible] = useState(false);
  useEffect(() => {
    setAvatarUri(user.avatar);
  }, []);
  useEffect(() => {
    if (isSuccess) {
      setAvatarUri(selectedImageUri);
      dispatch(updateUserState(data.user));
    }
  }, [isSuccess]);
  const updateUserImage = async (isWallpaper, setUri) => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
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
        updateUser({ newUserData });
      }
    } catch (err) {
      console.log("Error selecting image", err);
    }
  };
  const handleUpdateAvatar = () => updateUserImage(false, setAvatarUri);
  return (
    <Container>
      <HeaderContainer>
        <Header>
          <HeaderContent>
            <TouchableOpacity>
              {/* <AntDesign name="arrowleft" size={32} color="black" /> */}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Settings");
              }}
            >
              <AntDesign
                name="setting"
                size={32}
                color={theme.colors.chat.text}
              />
            </TouchableOpacity>
          </HeaderContent>
          <Avatar avatarUri={avatarUri}>
            <TouchableOpacity onPress={handleUpdateAvatar}>
              <CameraIcon>
                <AntDesign
                  style={{ opacity: 1 }}
                  name="camera"
                  size={24}
                  color={theme.colors.chat.text}
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
            <ItemValue>{postData ? postData.length : 0}</ItemValue>
            <ItemLabel>Bài viết</ItemLabel>
          </ItemContainer>
          <ItemContainer>
            <ItemValue>{user.friends.length}</ItemValue>
            <ItemLabel>Bạn bè</ItemLabel>
          </ItemContainer>
        </BottomHeader>
      </HeaderContainer>

      <FeatureTabs userId={user._id}></FeatureTabs>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.primary};
`;
const HeaderContainer = styled.View`
  height: 300px;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
  width: 100%;
  background-color: #9971ee;
  elevation: 5;
`;
const Header = styled.View`
  width: 100%;
  height: 80%;
  justify-content: space-between;
  align-items: center;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
  overflow: hidden;
  background-color: ${(props) => props.theme.colors.chat.bg.primary};
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
  width: 110px;
  height: 110px;
  overflow: hidden;
  justify-content: flex-end;
`;

const CameraIcon = styled.View`
  justify-content: center;
  align-items: center;
  background-color: rgba(52, 52, 52, 0.4);
  padding-bottom: 10px;
`;

export default User;

const styles = StyleSheet.create({});
