import { StyleSheet, Text, View, Platform } from "react-native";
import React from "react";

import ListAvtWithName from "../components/list-avt-with-name.componet";
import ListChannel from "../components/list-channel.component";

const ChatScreen = ({ navigation }) => {
  return (
    <View>
      <ListAvtWithName></ListAvtWithName>
      <ListChannel navigation={navigation}></ListChannel>
    </View>
  );
};

export default ChatScreen;
