import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState, useLayoutEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ListChannel from "./ListChannel.component";
import { colors } from "@src/infrastructure/theme/colors";
import { useGetChannelsQuery } from "@src/store/slices/api/chatApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading } from "@src/store/slices/appSlice";
import { joinChannels } from "@src/store/slices/chatSlice";
import { userSelector } from "@src/store/selector";
import SearchChannel from "./SearchChannel.component";
import { useGetListUserMutation } from "@src/store/slices/api/userApiSlice";
import { useTranslation } from "react-i18next";
import { useTheme } from "styled-components";
import { getSocket } from "@src/utils/socket";

const TAB_ITEM_WIDTH = Dimensions.get("window").width / 2 - 16;
const Tab = createMaterialTopTabNavigator();
//Chat tab "friend messages/ stranger messages"
const ChatTabs = ({ navigation }) => {
  const { user } = useSelector(userSelector);
  const { t } = useTranslation();
  const socket = getSocket();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [friendChannels, setFriendChannels] = useState([]);
  const [pendingChannels, setPendingChannels] = useState([]);
  const [channels, setChannels] = useState([]);
  const [channelIdsResult, setChannelIdsResult] = useState([]);
  const [listUser, setListUser] = useState([]);

  const [hasUnreadMsgFriendChannel, setHasUnreadMsgFriendChannel] =
    useState(false);
  const [hasUnreadMsgPendingChannel, setHasUnreadMsgPendingChannel] =
    useState(false);

  const { isLoading, isSuccess, data, refetch } = useGetChannelsQuery(
    undefined,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const [
    getListUser,
    {
      data: listUserData,
      isLoading: getListUserLoading,
      isSuccess: getListUserSuccess,
    },
  ] = useGetListUserMutation();
  useLayoutEffect(() => {
    dispatch(setIsLoading(isLoading));
    if (isSuccess) {
      //socket join channels
      const channelIds = data.map((c) => c._id);
      dispatch(joinChannels(channelIds));

      // get all members from all channels for searching
      const chatMemberIds = data.map((c) => {
        return c.memberIds.filter((id) => id != user._id);
      });
      getListUser(chatMemberIds);

      // get channels of users exclude those with empty messages
      // and its member is not in user's friend list
      setChannels(() =>
        data.filter((channel) => {
          if (channel.isInWaitingList == true) {
            return channel.channelMessages.length > 0;
          }
          return true;
        })
      );
      setFriendChannels(() => data.filter((c) => c.isInWaitingList == false));
      setPendingChannels(() =>
        data.filter((c) => {
          if (c.channelMessages.length > 0) {
            return c.isInWaitingList == true;
          }
        })
      );
      const check1 = data.some(
        (channel) =>
          channel.isInWaitingList == false &&
          channel.channelMessages.some(
            (message) => !message.isSeen && message.userId != user._id
          )
      );
      setHasUnreadMsgFriendChannel(check1);
      const check2 = data.some(
        (channel) =>
          channel.isInWaitingList == true &&
          channel.channelMessages.some(
            (message) => !message.isSeen && message.userId != user._id
          )
      );
      setHasUnreadMsgPendingChannel(check2);
    }
  }, [isLoading, data]);
  useEffect(() => {
    if (socket) {
      socket.on("unfriend", () => {
        console.log("call refetch 1 ");
        refetch();
      });
      socket.on(
        "response-friendRequest",
        ({ requestId, responseValue, userIds }) => {
          console.log("call refetch 2 ");
          refetch();
        }
      );
    }
  }, [socket]);
  useEffect(() => {
    if (getListUserSuccess) {
      setListUser(listUserData);
    }
  }, [getListUserLoading, listUserData]);

  //for searching
  const resetSearchData = () => {
    setFriendChannels(channels.filter((c) => c.isInWaitingList == false));
    setPendingChannels(channels.filter((c) => c.isInWaitingList == true));
  };
  useEffect(() => {
    setFriendChannels(
      channels.filter(
        (c) => c.isInWaitingList == false && channelIdsResult.includes(c._id)
      )
    );
    setPendingChannels(
      channels.filter(
        (c) => c.isInWaitingList == true && channelIdsResult.includes(c._id)
      )
    );
  }, [channelIdsResult]);

  return (
    <>
      <View
        style={{
          paddingHorizontal: 12,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: 32,
            fontWeight: 500,
            color: theme.colors.chat.text,
          }}
        >
          {t("chat")}
        </Text>

        <SearchChannel
          listUser={listUser}
          channels={channels}
          setChannelIdsResult={setChannelIdsResult}
          resetSearchData={resetSearchData}
        ></SearchChannel>
      </View>
      <Tab.Navigator
        tabBar={(props) => (
          <CustomTabBar
            {...props}
            hasUnreadMsgLeft={hasUnreadMsgFriendChannel}
            hasUnreadMsgRight={hasUnreadMsgPendingChannel}
          ></CustomTabBar>
        )}
        screenOptions={{
          tabBarActiveTintColor: "#fff",
        }}
        initialLayout={{
          width: Dimensions.get("window").width,
        }}
      >
        <Tab.Screen name="Bạn bè">
          {(props) => <ListChannel {...props} channels={friendChannels} />}
        </Tab.Screen>
        <Tab.Screen name="Tin nhắn chờ">
          {(props) => <ListChannel {...props} channels={pendingChannels} />}
        </Tab.Screen>
      </Tab.Navigator>
    </>
  );
};
const CustomTabBar = ({
  state,
  descriptors,
  navigation,
  position,
  hasUnreadMsgLeft,
  hasUnreadMsgRight,
}) => {
  const inputRange = state.routes.map((_, i) => i);
  return (
    <View
      style={{
        paddingVertical: 4,
        backgroundColor: colors.chat.bg.secondary,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 12,
        marginHorizontal: 12,
        borderRadius: 50,
        elevation: 4,
        overflow: "hidden",
      }}
    >
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const opacity = position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex) =>
              inputIndex === index ? 1 : 0.3
            ),
          });
          const { options } = descriptors[route.key];

          return (
            <TouchableOpacity
              key={index}
              style={styles.tabItem}
              onPress={() => {
                const event = navigation.emit({
                  type: "tabPress",
                  target: route.key,
                  canPreventDefault: true,
                });
                if (!event.defaultPrevented) {
                  navigation.navigate(route.name);
                }
              }}
            >
              <Animated.Text style={[styles.tabButtonText, { opacity }]}>
                {options.title || route.name}
              </Animated.Text>
              {route.name == "Bạn bè" && hasUnreadMsgLeft && (
                <View
                  style={{
                    position: "absolute",
                    backgroundColor: "red",
                    width: 12,
                    height: 12,
                    borderRadius: 25,
                    top: 0,
                    right: 0,
                  }}
                ></View>
              )}
              {route.name == "Tin nhắn chờ" && hasUnreadMsgRight && (
                <View
                  style={{
                    position: "absolute",
                    backgroundColor: "red",
                    width: 12,
                    height: 12,
                    borderRadius: 25,
                    top: 0,
                    right: 0,
                  }}
                ></View>
              )}
            </TouchableOpacity>
          );
        })}
        <TabBarIndicator state={state}></TabBarIndicator>
      </View>
    </View>
  );
};
const TabBarIndicator = ({ state }) => {
  const [translateValue, setTranslateValue] = useState(new Animated.Value(0));
  useEffect(() => {
    slide();
  }, [state]);
  const slide = () => {
    const toValue = state.index * TAB_ITEM_WIDTH;
    console.log(toValue);
    Animated.timing(translateValue, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  return (
    <Animated.View
      style={{
        position: "absolute",
        width: TAB_ITEM_WIDTH,
        borderRadius: 25,
        height: "100%",

        backgroundColor: colors.chat.bg.primary,
        transform: [{ translateX: translateValue }],
      }}
    ></Animated.View>
  );
};
const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    backgroundColor: colors.chat.bg.secondary,
    marginHorizontal: 4,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 16,
    marginHorizontal: 8,
    zIndex: 1,
  },
  tabButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#9971ee",
  },
});

export default ChatTabs;
