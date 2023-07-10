import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";

import InputBar from "../components/message-input-bar.component";
import ListUserMessages from "../components/list-user-messages.component";
import ChatRoomHeader from "../components/chat-room-header.component";
import { ChatContext } from "../../../services/chat/chat.context";

const Container = styled(View)`
  flex: 1;
`;
const ChatRoom = ({ navigation, route }) => {
  const { channelId, channelMessages } = route.params;
  const { registerMessageListener, loadChatRoomMessages } =
    useContext(ChatContext);
  const [listMessage, setListMessage] = useState(channelMessages);
  useEffect(() => {
    registerMessageListener(setListMessage);
  }, []);
  useEffect(() => {
    (async () => {
      const result = await loadChatRoomMessages(channelId);
      setListMessage(result);
    })();
  });
  return (
    <Container>
      <ChatRoomHeader navigation={navigation}></ChatRoomHeader>
      <ListUserMessages listMessage={listMessage}></ListUserMessages>
      <InputBar
        setListMessage={setListMessage}
        channelId={channelId}
      ></InputBar>
    </Container>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({});
