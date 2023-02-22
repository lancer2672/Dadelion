import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import styled from "styled-components/native";

import InputBar from "./message-input-bar.component";
import ListUserMessages from "./list-user-messages.component";
import ChatRoomHeader from "./chat-room-header.component";

const Container = styled(View)`
  flex: 1;
`;
const ChatRoom = ({ setModalVisible, channelMessages }) => {
  return (
    <Container>
      <ChatRoomHeader setModalVisible={setModalVisible}></ChatRoomHeader>
      <ListUserMessages channelMessages={channelMessages}></ListUserMessages>
      <InputBar></InputBar>
    </Container>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({});
