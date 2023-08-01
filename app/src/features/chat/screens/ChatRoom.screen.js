import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";

import InputBar from "../components/InputBar.component";
import ListUserMessages from "../components/ListMessage.component";
import ChatRoomHeader from "../components/ChatRoomHeader.component";
import { useSelector } from "react-redux";
import { userSelector } from "@src/store/selector";

const Container = styled(View)`
  flex: 1;
  background-color: ${(props) => props.theme.colors.chat.bg.primary};
`;
const ChatRoom = ({ navigation, route }) => {
  const { channelId, chatFriend } = route.params;
  const { user } = useSelector(userSelector);
  return (
    <Container>
      <ChatRoomHeader
        chatFriend={chatFriend}
        navigation={navigation}
      ></ChatRoomHeader>
      <ListUserMessages channelId={channelId}></ListUserMessages>
      <InputBar channelId={channelId}></InputBar>
    </Container>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({});
