import { StyleSheet, Text, View, SafeAreaView, Platform } from "react-native";
import React from "react";

import ListAvtWithName from "../components/list-avt-with-name.componet";

const ChatScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "gray" }}>
      <ListAvtWithName></ListAvtWithName>
    </SafeAreaView>
  );
};

export default ChatScreen;
