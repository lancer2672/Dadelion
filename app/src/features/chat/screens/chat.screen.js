import { StyleSheet, Text, View, SafeAreaView, Platform } from "react-native";
import React from "react";

import ListAvtWithName from "../components/list-avt-with-name.componet";
import ListChannel from "../components/list-channel.component";

const ChatScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "gray" }}>
      <ListAvtWithName></ListAvtWithName>
      <ListChannel></ListChannel>
    </SafeAreaView>
  );
};

export default ChatScreen;
