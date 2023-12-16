import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import PagerView from "react-native-pager-view";
import ChatPage from "../pages/Chat.page";
import WaitingChannel from "../pages/WaitingChannels.page";
import { useFocusEffect } from "@react-navigation/native";
import useNotification from "@src/hooks/useNotification";
import { useGetChannelsQuery } from "@src/store/slices/api/chatApiSlice";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { getSocket } from "@src/utils/socket";
import { useTheme } from "styled-components/native";
import { userSelector } from "@src/store/selector";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SideMenu from "../components/SideMenu.component";
const ChatHome = () => {
  const [friendChannels, setFriendChannels] = useState();
  const [waitingChanels, setWaitngChannels] = useState();
  const pageViewRef = useRef<PagerView>();
  const { user } = useSelector(userSelector);
  const { t } = useTranslation();
  const socket = getSocket();
  const theme = useTheme();
  const { setIsBgNotificationEnable } = useNotification();
  const {
    isLoading,
    data = [],
    refetch,
  } = useGetChannelsQuery(user._id, {
    refetchOnMountOrArgChange: true,
  });

  console.log("List Channel Data", data);
  useEffect(() => {
    if (!isLoading && data) {
      setFriendChannels(() => data.filter((c) => !c.isInWaitingList));
      setWaitngChannels(() => data.filter((c) => c.isInWaitingList));
    }
  }, [isLoading, data]);

  useEffect(() => {
    if (socket) {
      socket.on("unfriend", () => {
        refetch();
      });
      return () => {
        socket.off("unfriend");
      };
    }
  }, [socket]);

  const onButtonClick = (index: number) => {
    pageViewRef.current.setPageWithoutAnimation(index);
  };
  useFocusEffect(
    React.useCallback(() => {
      setIsBgNotificationEnable(false);
      return () => {
        setIsBgNotificationEnable(true);
      };
    }, [])
  );
  return (
    <View style={styles.container}>
      <Header></Header>
      <PagerView
        ref={pageViewRef}
        scrollEnabled={false}
        style={styles.pagerView}
        initialPage={0}
      >
        <ChatPage friendChannels={friendChannels} key="0" />
        <WaitingChannel key="1" />
      </PagerView>
    </View>
  );
};

export default ChatHome;

const Header = ({}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [sideMenuVisible, setSideMenuVisible] = useState(false);
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
        <Text style={[styles.heading, { color: theme.colors.text.primary }]}>
          {t("chat")}
        </Text>
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
      <SideMenu
        isVisible={sideMenuVisible}
        onClose={() => {
          setSideMenuVisible(false);
        }}
      ></SideMenu>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  heading: {
    fontSize: 32,
    fontWeight: "500",
    flex: 1,
  },
  pagerView: {
    flex: 1,
    padding: 12,
  },
});
