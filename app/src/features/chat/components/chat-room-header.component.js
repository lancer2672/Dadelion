import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

const Container = styled(View)`
  flex-direction: row;
`;
const BackIcon = styled(TouchableOpacity)`
  margin-left: 12px;
`;

const ChatRoomHeader = ({ navigation, chatRoomName = "" }) => {
  return (
    <Container>
      <BackIcon onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={32} color="black" />
      </BackIcon>
      <Text>{chatRoomName}</Text>
      {/* <Options></Options> */}
    </Container>
  );
};

export default ChatRoomHeader;

const styles = StyleSheet.create({});
