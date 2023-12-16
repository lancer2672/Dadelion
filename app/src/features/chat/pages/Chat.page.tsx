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
import { useTheme } from "styled-components";
import SearchChannel from "../components/SearchChannel.component";
import { useState } from "react";
import SideMenu from "../components/SideMenu.component";

const ChatPage = ({ friendChannels }) => {
  const theme = useTheme();
  const [channels, setChannels] = useState(friendChannels);
  const [sideMenuVisible, setSideMenuVisible] = useState(false);

  const resetSearch = () => {
    setChannels(friendChannels);
  };

  return (
    <View
      style={{
        backgroundColor: theme.colors.bg.primary,
        flex: 1,
        padding: 12,
        justifyContent: "flex-start",
      }}
    >
      <SearchChannel
        channels={channels}
        resetSearch={resetSearch}
        setChannels={setChannels}
      ></SearchChannel>
      <ListAvatarName channels={channels}></ListAvatarName>
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

export default ChatPage;
