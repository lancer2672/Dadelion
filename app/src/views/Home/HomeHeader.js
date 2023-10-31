import {
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Text,
  View,
  Pressable,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { FontAwesome5, Feather, Entypo } from "@expo/vector-icons";

import CreatePost from "@src/features/post/screens/CreatePost.screen";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "@src/store/selector";
import { colors } from "@src/infrastructure/theme/colors";
import { Spacer } from "@src/components/spacer/spacer.component";
import { useTheme } from "styled-components";
import { Avatar } from "@src/components/Avatar";
import { useNavigation } from "@react-navigation/native";
import { useGetFriendRequestsQuery } from "@src/store/slices/api/friendRequestApiSlice";
import { useGetNotificationsQuery } from "@src/store/slices/api/notificationApiSlice";
import { markSeenNotifications } from "@src/store/slices/notificationSlice";
import { getSocket } from "@src/utils/socket";

const HomeHeader = ({}) => {
  const userState = useSelector(userSelector);
  const socket = getSocket();
  const { user } = userState;
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [hasNewNotification, setHasNewNotification] = useState(false);
  const { data: friendRequests } = useGetFriendRequestsQuery(undefined, {
    //always make new request
    refetchOnMountOrArgChange: true,
  });
  const { data: notifications } = useGetNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  useEffect(() => {
    let checkNewFriendRequest = false;
    let checkNewNotification = false;
    if (friendRequests) {
      checkNewFriendRequest = friendRequests.some((request) => !request.isSeen);
    }
    if (notifications) {
      checkNewNotification = notifications.some(
        (notification) => !notification.isSeen
      );
    }
    if (checkNewFriendRequest || checkNewNotification) {
      setHasNewNotification(() => true);
    }
  }, [notifications, friendRequests]);
  useEffect(() => {
    if (socket) {
      socket.on("new-notification", () => {
        console.log("socket new-notification");
        setHasNewNotification(() => true);
      });
    }
  }, [socket]);
  const handleNavigationUser = () => {
    navigation.navigate("User");
  };
  const navigateToSearchScreen = () => {
    navigation.navigate("Search");
  };
  const navigateToNotificationScreen = () => {
    navigation.navigate("Notification");

    setHasNewNotification(() => false);
    const friendRequestIds = friendRequests.map((request) => request._id);
    const notificationIds = notifications.map(
      (notification) => notification._id
    );
    dispatch(markSeenNotifications({ friendRequestIds, notificationIds }));
  };
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          marginVertical: 20,
          marginHorizontal: 24,
          alignItems: "center",
        }}
      >
        <Pressable onPress={handleNavigationUser}>
          <Avatar
            style={{ width: 40, height: 40 }}
            source={{ uri: user.avatar }}
          ></Avatar>
        </Pressable>
        <Text
          style={{
            flex: 1,
            fontSize: 22,
            marginLeft: 12,
            fontWeight: 500,
            color: theme.colors.text.primary,
          }}
        >
          Dandelions
        </Text>

        <TouchableOpacity
          onPress={navigateToSearchScreen}
          style={{
            backgroundColor: colors.white,
            padding: 8,
            borderRadius: 25,
            elevation: 2,
          }}
        >
          <Feather name="search" size={20} color={colors.black} />
        </TouchableOpacity>

        <Spacer position={"left"} size={"large"}></Spacer>

        <TouchableOpacity
          onPress={navigateToNotificationScreen}
          style={{
            backgroundColor: colors.white,
            minWidth: 38,
            padding: 6,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 25,
            elevation: 2,
          }}
        >
          <FontAwesome5 name="bell" size={22} color={colors.black} />
          {hasNewNotification && (
            <Entypo
              style={{ position: "absolute", top: -13, right: -2 }}
              name="dot-single"
              size={40}
              color="red"
            />
          )}
        </TouchableOpacity>
      </View>

      {/* <CreatePostModal isVisible={isVisidbleCreatePost}></CreatePostModal> */}
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    margin: 12,
    alignItems: "center",
  },
  descriptionContainer: {
    position: "absolute",
    flex: 1,
    right: 0,
    left: 48,
  },
  description: {
    backgroundColor: "gray",
    opacity: 0.5,
    padding: 8,
    borderRadius: 25,
  },

  avatar: {
    width: 40,
    height: 40,
    resizeMode: "stretch",
    borderRadius: 50,
    marginRight: 8,
  },

  //Modal
  postCreateContainer: {},
  centeredView: {
    backgroundColor: "rgba(1, 1, 1, 0.2)",
    flex: 1,
    alignItems: "center",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
});
