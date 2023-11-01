import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import styled from "styled-components/native";

import ListAvatarName from "../components/ListAvatarName.component";
import ListChannel from "../components/ListChannel.component";
import { colors } from "@src/infrastructure/theme/colors";
import { useSelector } from "react-redux";
import { userSelector } from "@src/store/selector";
import ChatTabs from "../components/ChatTabs.component";
import { useTheme } from "styled-components";
import { useGetChannelsQuery } from "@src/store/slices/api/chatApiSlice";
import SearchChannel from "../components/SearchChannel.component";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const ChatScreen = ({ navigation }) => {
  const { user } = useSelector(userSelector);
  const { t } = useTranslation();
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
        padding: 12,
        justifyContent: "flex-start",
      }}
    >
      <Heading>{t("chat")}</Heading>
      <SearchChannel
        channels={channels}
        resetSearch={resetSearch}
        setChannels={setChannels}
      ></SearchChannel>
      <ListAvatarName channels={data}></ListAvatarName>
      <ListChannel channels={channels}></ListChannel>
      {/* <ChatTabs navigation={navigation}></ChatTabs> */}
    </View>
  );
};
const Heading = styled(Text)`
  font-size: 32px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.text.primary};
`;

export default ChatScreen;
