import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import styled from "styled-components/native";

import InputBar from "../components/message-input-bar.component";
import ListUserMessages from "../components/list-user-messages.component";
import ChatRoomHeader from "../components/chat-room-header.component";

const Container = styled(View)`
  flex: 1;
`;
const ChatRoom = ({ channelId, channelMessages }) => {
  return (
    <Container>
      <ChatRoomHeader></ChatRoomHeader>
      <ListUserMessages channelMessages={channelMessages}></ListUserMessages>
      <InputBar channelId={channelId}></InputBar>
    </Container>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({});
