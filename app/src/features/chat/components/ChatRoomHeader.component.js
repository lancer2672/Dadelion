import React, { memo } from "react";
import styled from "styled-components/native";
import { Ionicons, FontAwesome, Entypo, Feather } from "@expo/vector-icons";
import { Avatar } from "../../../components/Avatar";
import { TouchableOpacity, View } from "react-native";
import { colors } from "@src/infrastructure/theme/colors";
import { commentCreatedTimeFormater } from "@src/utils/timeFormatter";
import { useTheme } from "styled-components";

const ChatRoomHeader = ({ navigation, chatFriend }) => {
  const theme = useTheme();
  const handleNavigateToGuest = () => {
    if (chatFriend) {
      navigation.navigate("Guest", { guestId: chatFriend._id });
    }
  };
  return (
    <Container>
      <BackIcon onPress={() => navigation.goBack()}>
        <Ionicons
          name="chevron-back"
          size={32}
          color={theme.colors.chat.text}
        />
      </BackIcon>

      <TouchableOpacity onPress={handleNavigateToGuest}>
        <Avatar width={40} height={40} uri={chatFriend?.avatar} />
      </TouchableOpacity>

      <HeaderInfo>
        <HeaderText>{chatFriend?.nickname}</HeaderText>
        {chatFriend?.isOnline == 1 ? (
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
            chatFriend?.lastOnline
          )} ago`}</StatusText>
        )}
      </HeaderInfo>
      <TouchableOpacity style={{ padding: 4 }}>
        <FontAwesome
          name="video-camera"
          size={24}
          color={theme.colors.chat.text}
        />
      </TouchableOpacity>

      <TouchableOpacity style={{ marginLeft: 8, marginRight: 8, padding: 4 }}>
        <Feather
          name="more-vertical"
          size={24}
          color={theme.colors.chat.text}
        />
      </TouchableOpacity>
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  padding-top: 12px;
  background-color: ${(props) => props.theme.colors.chat.bg.secondary};
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
  color: ${(props) => props.theme.colors.chat.text};
  font-weight: bold;
`;

const StatusText = styled.Text`
  font-size: 14px;
  color: ${(props) => props.theme.colors.chat.text};
`;

export default memo(ChatRoomHeader);
