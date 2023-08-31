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
import FeatureTabs from "@src/features/user/FeatureTabs,component";
import {
  StyledButton1,
  StyledButton2,
  UserDescription,
  Name,
  HeaderContent,
  HeaderContainer,
  BottomHeader,
  ItemValue,
  ItemLabel,
  ItemContainer,
} from "../sharedStyledComponents";
import Settings from "./components/Settings.component";

const User = ({ props, navigation }) => {
  const { user = {} } = useSelector(userSelector);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [updateUser, { isLoading, data, isSuccess, ...res }] =
    useUpdateUserMutation();
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
        updateUser({ newUserData, userId: user._id });
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
                setSettingVisible(true);
              }}
            >
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
          <View style={{ flexDirection: "row" }}>
            <StyledButton1>
              <Text
                style={{
                  fontWeight: 500,
                  fontSize: 16,
                  color: "#9971ee",
                }}
              >
                {t("changePassword")}
              </Text>
            </StyledButton1>
            <StyledButton2>
              <Text
                style={{
                  fontWeight: 500,
                  fontSize: 16,
                  color: colors.white,
                }}
              >
                {t("sendMessage")}
              </Text>
            </StyledButton2>
          </View>
        </Header>
        <BottomHeader>
          <ItemContainer>
            <ItemValue>85</ItemValue>
            <ItemLabel>Bài viết</ItemLabel>
          </ItemContainer>
          <ItemContainer>
            <ItemValue>85</ItemValue>
            <ItemLabel>Bạn bè</ItemLabel>
          </ItemContainer>
        </BottomHeader>
      </HeaderContainer>

      <FeatureTabs userId={user._id}></FeatureTabs>
      <Settings
        user={user}
        visible={settingVisible}
        onClose={() => {
          setSettingVisible(false);
        }}
      ></Settings>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

const Header = styled.View`
  width: 100%;
  height: 80%;
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
