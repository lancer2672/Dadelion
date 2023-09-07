import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import styled from "styled-components/native";

import ListAvtWithName from "../components/ListAvatarUsername.componet";
import ListChannel from "../components/ListChannel.component";
import { Avatar } from "../../../components/Avatar";
import { colors } from "@src/infrastructure/theme/colors";
import { useSelector } from "react-redux";
import { userSelector } from "@src/store/selector";
import ChatTabs from "../components/ChatTabs.component";
import { useTheme } from "styled-components";

const ChatScreen = ({ navigation }) => {
  const { user } = useSelector(userSelector);
  const theme = useTheme();
  return (
    <View style={{ backgroundColor: theme.colors.chat.bg.primary, flex: 1 }}>
      {/* <ListAvtWithName></ListAvtWithName> */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 16,
        }}
      ></View>

      <ChatTabs navigation={navigation}></ChatTabs>
    </View>
  );
};
const Heading = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.h5};
  font-weight: ${(props) => props.theme.fontWeights.medium};
  flex: 1;
  margin-bottom: 24px;
  text-align: center;
`;

export default ChatScreen;
