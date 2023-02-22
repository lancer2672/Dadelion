import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

const Container = styled(View)`
  flex-direction: row;
`;

const ChatRoomHeader = ({ setModalVisible, chatRoomName = "" }) => {
  return (
    <Container>
      <TouchableOpacity onPress={() => setModalVisible(false)}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text>{chatRoomName}</Text>
      {/* <Options></Options> */}
    </Container>
  );
};

export default ChatRoomHeader;

const styles = StyleSheet.create({});
