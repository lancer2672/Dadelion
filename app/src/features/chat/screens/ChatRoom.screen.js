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
`;
const ChatRoom = ({ navigation, route }) => {
  const { channelId } = route.params;
  const { user } = useSelector(userSelector);
  return (
    <Container>
      <ChatRoomHeader navigation={navigation}></ChatRoomHeader>
      <ListUserMessages channelId={channelId}></ListUserMessages>
      <InputBar channelId={channelId}></InputBar>
    </Container>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({});
