import React, { memo, useEffect, useRef } from "react";
import styled from "styled-components/native";
import { Ionicons, FontAwesome, Entypo, Feather } from "@expo/vector-icons";
import { Avatar } from "../../../components/Avatar";
import { Alert, TouchableOpacity, View } from "react-native";
import { commentCreatedTimeFormater } from "@src/utils/timeFormatter";
import { useTheme } from "styled-components";
import { useSelector } from "react-redux";
import { chatSelector, userSelector } from "@src/store/selector";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";

const ChatRoomHeader = () => {
  const { user } = useSelector(userSelector);
  const navigation = useNavigation();
  const { selectedChannel } = useSelector(chatSelector);
  const theme = useTheme();
  const { t } = useTranslation();
  const handleNavigateToGuest = () => {
    if (selectedChannel.chatFriend) {
      navigation.navigate("Guest", { guestId: selectedChannel.chatFriend._id });
    }
  };
  const makeCall = () => {
    //just allow to call if they're friend
    if (
      user.friends.some(
        (friend) => friend.userId == selectedChannel.chatFriend._id
      )
    ) {
      navigation.navigate("CallingScreen", {});
    } else {
      Alert.alert(t("notify"), t("notFriend"), [{ text: "OK" }]);
    }
  };
  return (
    <Container>
      <BackIcon onPress={() => navigation.goBack()}>
        <Ionicons
          name="chevron-back"
          size={32}
          color={theme.colors.text.primary}
        />
      </BackIcon>

      <TouchableOpacity onPress={handleNavigateToGuest}>
        <Avatar
          width={40}
          height={40}
          uri={selectedChannel.chatFriend?.avatar}
        />
      </TouchableOpacity>

      <HeaderInfo>
        <HeaderText>{selectedChannel.chatFriend?.nickname}</HeaderText>
        {selectedChannel.chatFriend?.isOnline == 1 ? (
          <View style={{ flexDirection: "row" }}>
            <Entypo
              style={{ position: "absolute", left: "-12%", top: "-30%" }}
              name="dot-single"
              size={32}
              color="green"
            />
            <StatusText>Đang hoạt động</StatusText>
          </View>
        ) : (
          <StatusText>{`${commentCreatedTimeFormater(
            selectedChannel.chatFriend?.lastOnline
          )}`}</StatusText>
        )}
      </HeaderInfo>
      <TouchableOpacity onPress={makeCall} style={{ padding: 4 }}>
        <FontAwesome
          name="video-camera"
          size={24}
          color={theme.colors.text.primary}
        />
      </TouchableOpacity>

      <TouchableOpacity style={{ marginLeft: 8, marginRight: 8, padding: 4 }}>
        <Feather
          name="more-vertical"
          size={24}
          color={theme.colors.text.primary}
        />
      </TouchableOpacity>
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  padding-top: 12px;
  background-color: ${(props) => props.theme.colors.bg.secondary};
  padding-bottom: 12px;
  elevation: 4;
`;

const BackIcon = styled.TouchableOpacity`
  margin-left: 12px;
  margin-right: 12px;
`;

const HeaderInfo = styled.View`
  flex: 1;
  margin-left: 12px;
`;

const HeaderText = styled.Text`
  font-size: ${(props) => props.theme.fontSizes.large};
  color: ${(props) => props.theme.colors.text.primary};
  font-weight: bold;
`;

const StatusText = styled.Text`
  font-size: 14px;
  color: ${(props) => props.theme.colors.text.primary};
`;

export default memo(ChatRoomHeader);
