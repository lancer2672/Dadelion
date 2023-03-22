import { StyleSheet, Text, View, Platform } from "react-native";
import React from "react";
import styled from "styled-components/native";

import ListAvtWithName from "../components/list-avt-with-name.componet";
import ListChannel from "../components/list-channel.component";

const Heading = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.h4};
  font-weight: ${(props) => props.theme.fontWeights.medium};
  margin-left: 12px;
`;
const ChatScreen = ({ navigation }) => {
  return (
    <View>
      {/* <ListAvtWithName></ListAvtWithName> */}
      <Heading>Đoạn Chat</Heading>
      <ListChannel navigation={navigation}></ListChannel>
    </View>
  );
};

export default ChatScreen;
