import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { memo } from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

const Container = styled(View)`
  flex-direction: row;
`;
const BackIcon = styled(TouchableOpacity)`
  margin-left: 12px;
`;

const ChatRoomHeader = ({ navigation, chatRoomName = "" }) => {
  console.log("chat room render");
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

export default memo(ChatRoomHeader);

const styles = StyleSheet.create({});
