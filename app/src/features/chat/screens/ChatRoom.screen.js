import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";

import InputBar from "../components/InputBar.component";
import ListUserMessages from "../components/ListMessage.component";
import ChatRoomHeader from "../components/ChatRoomHeader.component";
import { useGetUserByIdQuery } from "@src/store/slices/api/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "@src/store/selector";
import AnimatedEllipsis from "react-native-animated-ellipsis";
import { useTranslation } from "react-i18next";
import { joinRoom, typing } from "@src/store/slices/chatSlice";
import { chatApi } from "@src/store/slices/api/chatApiSlice";
import { getSocket } from "@src/utils/socket";

const ChatRoom = ({ navigation, route }) => {
  const { user } = useSelector(userSelector);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const socket = getSocket();
  const { channelId, memberIds } = route.params;
  const [chatFriendId, setChatFriendId] = useState(null);
  const [chatFriend, setChatFriend] = useState({});
  const [isTyping, setIsTyping] = useState(false);
  const { isLoading, isSuccess, data, error } = useGetUserByIdQuery(
    chatFriendId,
    {
      skip: !chatFriendId,
    }
  );
  useEffect(() => {
    const friendId = memberIds.filter((id) => id != user._id);
    setChatFriendId(friendId[0]);
    dispatch(joinRoom({ channelId }));
    socket.on("typing", (channelId, isTyping) => {
      setIsTyping(() => isTyping);
      console.log("socket on typing", channelId, isTyping);
    });
  }, []);
  useEffect(() => {
    if (isSuccess) {
      setChatFriend(() => data.user);
    } else console.log("error", error);
  }, [isLoading, data]);

  return (
    <Container>
      <ChatRoomHeader
        chatFriend={chatFriend}
        navigation={navigation}
      ></ChatRoomHeader>
      <ListUserMessages
        chatFriend={chatFriend}
        channelId={channelId}
      ></ListUserMessages>
      {isTyping && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingLeft: 20,
          }}
        >
          <Text style={{ color: "red" }}>User Typing</Text>
        </View>
      )}
      <InputBar channelId={channelId}></InputBar>
    </Container>
  );
};
const Container = styled(View)`
  flex: 1;
  background-color: ${(props) => props.theme.colors.chat.bg.primary};
`;
export default ChatRoom;
