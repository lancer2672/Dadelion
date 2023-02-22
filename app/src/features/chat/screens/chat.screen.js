import { StyleSheet, Text, View, Platform } from "react-native";
import React from "react";

import ListAvtWithName from "../components/list-avt-with-name.componet";
import ListChannel from "../components/list-channel.component";

const ChatScreen = () => {
  return (
    <View>
      <ListAvtWithName></ListAvtWithName>
      <ListChannel></ListChannel>
    </View>
  );
};

export default ChatScreen;
