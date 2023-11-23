import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";

import InputBar from "../components/InputBar.component";
import ListUserMessages from "../components/ListMessage.component";
import ChatRoomHeader from "../components/ChatRoomHeader.component";
import { useGetUserByIdQuery } from "@src/store/slices/api/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { chatSelector, userSelector } from "@src/store/selector";
import AnimatedEllipsis from "react-native-animated-ellipsis";
import { useTranslation } from "react-i18next";
import { joinRoom, typing } from "@src/store/slices/chatSlice";
import { getSocket } from "@src/utils/socket";
import { useTheme } from "styled-components";

const ChatRoom = () => {
  const { user } = useSelector(userSelector);
  const { t } = useTranslation();
  const theme = useTheme();
  const dispatch = useDispatch();
  const socket = getSocket();
  const { selectedChannel } = useSelector(chatSelector);

  const [isTyping, setIsTyping] = useState(false);
  const {
    isLoading,
    isSuccess,
    data: chatFriend,
    error,
  } = useGetUserByIdQuery(selectedChannel.chatFriendId, {
    skip: !selectedChannel.chatFriendId,
  });

  useEffect(() => {
    dispatch(joinRoom({ channelId: selectedChannel._id }));
    socket.on("typing", (channelId, chatFriendId, isTyping) => {
      setIsTyping(() => isTyping);
    });
  }, [selectedChannel]);

  return (
    <Container>
      <ChatRoomHeader chatFriend={chatFriend}></ChatRoomHeader>
      <ListUserMessages chatFriend={chatFriend}></ListUserMessages>
      {isTyping && (
        <TypingWrapper>
          <Text
            style={{
              fontWeight: "500",
              fontSize: 16,
              color: theme.colors.text.primary,
            }}
          >
            {t("typing")}
          </Text>
          <AnimatedEllipsis
            style={{
              color: theme.colors.text.primary,
              fontSize: 20,
            }}
          ></AnimatedEllipsis>
        </TypingWrapper>
      )}
      <InputBar chatFriendId={selectedChannel.chatFriendId}></InputBar>
    </Container>
  );
};
const Container = styled(View)`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.primary};
`;
const TypingWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-left: 20px;
  align-self: baseline;
  margin-top: 8px;
  border-radius: 1000px;
  padding-vertical: 4px;
  padding-left: 8px;
  padding-right: 8px;
  background-color: ${(props) => props.theme.colors.bg.primary};
`;
export default ChatRoom;
