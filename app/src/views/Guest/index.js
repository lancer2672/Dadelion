import {
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";

import { setAuth } from "@src/features/auth/authSlice";
import { userSelector } from "@src/store/selector";
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "@src/store/slices/api/userApiSlice";
import styled from "styled-components/native";
import { updateUserState } from "@src/store/slices/userSlice";
import { colors } from "@src/infrastructure/theme/colors";
import UserPost from "@src/features/user/UserPost.component";
import FeatureTabs from "@src/features/user/FeatureTabs.component";
import { useTranslation } from "react-i18next";
import { joinChannel, sendFriendRequest } from "@src/store/slices/chatSlice";
import { useCheckFriendStatusQuery } from "@src/store/slices/api/friendRequestApiSlice";
import { useFindOrCreateChannelMutation } from "@src/store/slices/api/chatApiSlice";

const Guest = ({ props, navigation, route }) => {
  const { guestId } = route.params;
  const { t } = useTranslation();
  const { user } = useSelector(userSelector);
  const dispatch = useDispatch();
  const [guest, setGuest] = useState({});
  const [friendStatus, setFriendStatus] = useState("");
  const [showEntireAvatar, setShowEntireAvatar] = useState(false);
  const {
    isLoading: isLoadingUser,
    isSuccess: getUserSuccess,
    data: userData,
    status,
  } = useGetUserByIdQuery(guestId);
  const { data, isLoading: isChecking } = useCheckFriendStatusQuery(
    userData?.user?._id,
    {
      skip: status !== "fulfilled" || !userData,
    }
  );
  const [
    findOrCreateChannel,
    { data: channelData, isSuccess, isLoading: isFindOrCreating },
  ] = useFindOrCreateChannelMutation();
  useEffect(() => {
    if (data) {
      setFriendStatus(data.data.result);
    }
  }, [isChecking, data]);

  useEffect(() => {
    if (getUserSuccess) {
      setGuest(userData.user);
    }
  }, [isLoadingUser, userData]);
  useEffect(() => {
    if (isSuccess) {
      const channel = channelData.channel;

      dispatch(joinChannel({ userBId: guest._id, channelId: channel._id }));

      navigation.navigate("ChatRoom", {
        channelId: channel._id,
        memberIds: channel.memberIds,
      });
    }
  }, [isFindOrCreating, channelData]);

  const handleSendAddFriendRequest = () => {
    dispatch(sendFriendRequest({ senderId: user._id, receiverId: guestId }));
  };
  const handleJoinChatRoom = () => {
    if (guest) {
      findOrCreateChannel({
        channelName: "",
        memberIds: [user._id, guest._id],
      });
    }
  };
  const showAvatar = () => {
    if (guest.avatar) {
      setShowEntireAvatar(true);
    }
  };
  return (
    <Container>
      <HeaderContainer>
        <Header>
          <HeaderContent>
            <TouchableOpacity>
              {/* <AntDesign name="arrowleft" size={32} color="black" /> */}
            </TouchableOpacity>
          </HeaderContent>

          <TouchableOpacity onPress={showAvatar}>
            <Avatar avatarUri={guest.avatar}></Avatar>
          </TouchableOpacity>

          <UserDescription>
            <Name>{guest.nickname}</Name>
            {/* <Text>User description "ICON"</Text> */}
          </UserDescription>
          <View style={{ flexDirection: "row" }}>
            <StyledButton2 onPress={handleSendAddFriendRequest}>
              <Text
                style={{
                  fontWeight: 500,
                  fontSize: 16,
                  color: colors.white,
                }}
              >
                {t(`${friendStatus}`)}
              </Text>
            </StyledButton2>
            <StyledButton1 onPress={handleJoinChatRoom}>
              <Text
                style={{
                  fontWeight: 500,
                  fontSize: 16,
                  color: "#9971ee",
                }}
              >
                {t("sendMessage")}
              </Text>
            </StyledButton1>
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

      {/* <FeatureTabs ></FeatureTabs> */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showEntireAvatar}
        onRequestClose={() => {
          setShowEntireAvatar(false);
        }}
      >
        <View style={{ flex: 1 }}>
          <Image
            style={{ width: "100%", height: "100%" }}
            source={{ uri: guest.avatar }}
          ></Image>
        </View>
      </Modal>
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
const StyledButton1 = styled.TouchableOpacity`
  padding-horizontal: 20px;
  margin-horizontal: 12px;
  width: 120px;
  border-radius: 2px;
  border-width: 2px;
  border-color: #9971ee;
  justify-content: center;
  align-items: center;
  height: 40px;
`;
const StyledButton2 = styled.TouchableOpacity`
  padding-horizontal: 20px;
  margin-horizontal: 12px;
  width: 120px;
  border-radius: 2px;
  background-color: #9971ee;
  justify-content: center;
  align-items: center;
  height: 40px;
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
  height: 360px;
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
  color: ${(props) => props.theme.colors.white};
`;

const ItemLabel = styled.Text`
  font-size: ${(props) => props.theme.fontSizes.large};
  color: ${(props) => props.theme.colors.white};
`;
const ItemContainer = styled.View`
  align-items: center;
  margin-horizontal: 12px;
`;
export default Guest;

const styles = StyleSheet.create({});
