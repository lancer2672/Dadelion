import { Entypo, Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { chatSelector, userSelector } from "@src/store/selector";
import { useGetUserByIdQuery } from "@src/store/slices/api/userApiSlice";
import { commentCreatedTimeFormater } from "@src/utils/timeFormatter";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Alert, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { useTheme } from "styled-components";
import styled from "styled-components/native";
import { Avatar } from "../../../components/Avatar";

const ChatRoomHeader = () => {
  const { user } = useSelector(userSelector);
  const navigation = useNavigation();
  const { selectedChannel } = useSelector(chatSelector);

  const { data: chatFriend } = useGetUserByIdQuery(
    selectedChannel.chatFriendId,
    {
      skip: !selectedChannel.chatFriendId,
    }
  );

  console.log("SELECTED C", selectedChannel, chatFriend);
  const theme = useTheme();
  const { t } = useTranslation();
  const handleNavigateToGuest = () => {
    if (selectedChannel.chatFriendId) {
      navigation.navigate("Guest", { guestId: selectedChannel.chatFriendId });
    }
  };
  const makeCall = () => {
    //just allow to call if they're friend
    if (
      user.friends.some(
        (friend) => friend.userId == selectedChannel.chatFriendId
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
          style={{ width: 40, height: 40 }}
          source={{ uri: chatFriend?.avatar }}
        />
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
