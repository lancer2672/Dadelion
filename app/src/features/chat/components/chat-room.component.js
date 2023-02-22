import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import InputBar from "./message-input-bar.component";
import styled from "styled-components/native";

const Container = styled(View)`
  flex: 1;
`;
const ChatRoom = () => {
  const data = [];
  return (
    <Container>
      <Text>ChatRoom</Text>
      <FlatList></FlatList>
      <InputBar></InputBar>
    </Container>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({});
