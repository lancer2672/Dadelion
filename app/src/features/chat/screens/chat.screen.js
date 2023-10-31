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
import { colors } from "@src/infrastructure/theme/colors";
import { useSelector } from "react-redux";
import { userSelector } from "@src/store/selector";
import ChatTabs from "../components/ChatTabs.component";
import { useTheme } from "styled-components";
import { useGetChannelsQuery } from "@src/store/slices/api/chatApiSlice";
import SearchChannel from "../components/SearchChannel.component";
import { useState } from "react";

const ChatScreen = ({ navigation }) => {
  const { user } = useSelector(userSelector);
  const theme = useTheme();
  const [channels, setChannels] = useState();
  const {
    isLoading,
    data = [],
    refetch,
  } = useGetChannelsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (!isLoading && data) {
      setChannels(() => data.filter((c) => c.isInWaitingList == false));
    }
  }, [isLoading, data]);
  const resetSearch = () => {
    setChannels(() => data.filter((c) => c.isInWaitingList == false));
  };
  console.log("List Channel Data", data);
  return (
    <View
      style={{
        backgroundColor: theme.colors.bg.primary,
        flex: 1,
        justifyContent: "flex-start",
      }}
    >
      {/* <ListAvtWithName></ListAvtWithName> */}
      <SearchChannel
        channels={channels}
        resetSearch={resetSearch}
        setChannels={setChannels}
      ></SearchChannel>
      <ListChannel channels={channels}></ListChannel>
      {/* <ChatTabs navigation={navigation}></ChatTabs> */}
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
