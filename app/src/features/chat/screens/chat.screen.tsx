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
import { useSelector } from "react-redux";
import { userSelector } from "@src/store/selector";
import { useTheme } from "styled-components";
import { useGetChannelsQuery } from "@src/store/slices/api/chatApiSlice";
import SearchChannel from "../components/SearchChannel.component";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useFocusEffect } from "@react-navigation/native";
import useNotification from "@src/hooks/useNotification";
import { getSocket } from "@src/utils/socket";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SideMenu from "../components/SideMenu.component";

const ChatScreen = ({ navigation }) => {
  const { user } = useSelector(userSelector);
  const { t } = useTranslation();
  const socket = getSocket();
  const theme = useTheme();
  const { setIsBgNotificationEnable } = useNotification();
  const [channels, setChannels] = useState();
  const [sideMenuVisible, setSideMenuVisible] = useState(false);
  const {
    isLoading,
    data = [],
    refetch,
  } = useGetChannelsQuery(user._id, {
    refetchOnMountOrArgChange: true,
  });

  const resetSearch = () => {
    setChannels(() => data.filter((c) => c.isInWaitingList == false));
  };
  console.log("List Channel Data", data);
  useEffect(() => {
    if (!isLoading && data) {
      setChannels(() => data.filter((c) => c.isInWaitingList == false));
    }
  }, [isLoading, data]);

  useEffect(() => {
    if (socket) {
      socket.on("unfriend", () => {
        refetch();
      });
    }
  }, [socket]);
  useFocusEffect(
    React.useCallback(() => {
      setIsBgNotificationEnable(false);
      return () => {
        setIsBgNotificationEnable(true);
      };
    }, [])
  );
  return (
    <View
      style={{
        backgroundColor: theme.colors.bg.primary,
        flex: 1,
        padding: 12,
        justifyContent: "flex-start",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Heading>{t("chat")}</Heading>
        <TouchableOpacity
          onPress={() => {
            setSideMenuVisible(true);
          }}
        >
          <MaterialCommunityIcons
            name="menu"
            size={32}
            color={theme.colors.text.primary}
          />
        </TouchableOpacity>
      </View>
      <SearchChannel
        channels={channels}
        resetSearch={resetSearch}
        setChannels={setChannels}
      ></SearchChannel>
      <ListAvatarName channels={data}></ListAvatarName>
      <ListChannel channels={channels}></ListChannel>
      <SideMenu
        isVisible={sideMenuVisible}
        onClose={() => {
          setSideMenuVisible(false);
        }}
      ></SideMenu>
    </View>
  );
};
const Heading = styled(Text)`
  font-size: 32px;
  font-weight: 500;
  flex: 1;
  color: ${(props) => props.theme.colors.text.primary};
`;

export default ChatScreen;
