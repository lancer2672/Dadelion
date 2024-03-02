import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import useNotification from "@src/hooks/useNotification";
import { userSelector } from "@src/store/selector";
import { useGetChannelsQuery } from "@src/store/slices/api/chatApiSlice";
import { getSocket } from "@src/utils/socket";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PagerView from "react-native-pager-view";
import { useSelector } from "react-redux";
import { useTheme } from "styled-components/native";
import SideMenu from "../components/SideMenu.component";
import ChatPage from "../pages/Chat.page";
import WaitingChannel from "../pages/WaitingChannels.page";
const ChatHome = () => {
  const [friendChannels, setFriendChannels] = useState();
  const [waitingChanels, setWaitingChannels] = useState();
  const pageViewRef = useRef();
  const { user } = useSelector(userSelector);
  const { t } = useTranslation();
  const socket = getSocket();
  const [sideMenuVisible, setSideMenuVisible] = useState(false);

  const { setIsBgNotificationEnable } = useNotification();
  const {
    isLoading,
    data = [],
    refetch,
  } = useGetChannelsQuery(user._id, {
    refetchOnMountOrArgChange: true,
  });

  console.log("List Channel Data", socket == null, user._id, !user._id, data);
  useEffect(() => {
    if (!isLoading && data && data.length > 0) {
      console.log("useEffect", { isLoading, data });
      setFriendChannels(() => data.filter((c) => !c.isInWaitingList));
      setWaitingChannels(() => data.filter((c) => c.isInWaitingList));
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

  const onButtonClick = (index) => {
    pageViewRef.current.setPageWithoutAnimation(index);
  };
  useFocusEffect(
    React.useCallback(() => {
      setIsBgNotificationEnable(false);
      return () => {
        setIsBgNotificationEnable(true);
      };
    }, [setIsBgNotificationEnable])
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
