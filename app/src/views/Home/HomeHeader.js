import { Entypo, Feather, FontAwesome5 } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { Avatar } from "@src/components/Avatar";
import { Spacer } from "@src/components/spacer/spacer.component";
import { userSelector } from "@src/store/selector";
import { useGetFriendRequestsQuery } from "@src/store/slices/api/friendRequestApiSlice";
import { useGetNotificationsQuery } from "@src/store/slices/api/notificationApiSlice";
import { markSeenNotifications } from "@src/store/slices/notificationSlice";
import { getSocket } from "@src/utils/socket";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "styled-components";

const HomeHeader = ({}) => {
  const userState = useSelector(userSelector);
  const socket = getSocket();
  const { user } = userState;
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [hasNewNotification, setHasNewNotification] = useState(false);
  const { data: friendRequests, refetch } = useGetFriendRequestsQuery(
    undefined,
    {
      //always make new request
      refetchOnMountOrArgChange: true,
    }
  );
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
      socket.on("response-friendRequest", () => {
        console.log("socket refetch friend request");
        refetch();
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
    <View style={{}}>
      <View style={styles.left}>
        <Pressable onPress={handleNavigationUser}>
          <Avatar
            style={{ width: 40, height: 40 }}
            source={{ uri: user.avatar }}
          ></Avatar>
        </Pressable>
        <Text style={styles.heading(theme)}>Dandelions</Text>

        <TouchableOpacity
          onPress={navigateToSearchScreen}
          style={styles.search(theme)}
        >
          <Feather name="search" size={20} color={theme.colors.bg.primary} />
        </TouchableOpacity>

        <Spacer position={"left"} size={"large"}></Spacer>

        <TouchableOpacity
          onPress={navigateToNotificationScreen}
          style={styles.bell(theme)}
        >
          <FontAwesome5 name="bell" size={22} color={theme.colors.bg.primary} />
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
  left: {
    flexDirection: "row",
    marginVertical: 20,
    marginHorizontal: 24,
    alignItems: "center",
  },
  search: (theme) => ({
    backgroundColor: theme.colors.text.primary,
    padding: 8,
    borderRadius: 25,
    elevation: 2,
  }),
  heading: (theme) => ({
    flex: 1,
    fontSize: 22,
    marginLeft: 12,
    fontWeight: "500",
    color: theme.colors.text.primary,
  }),
  bell: (theme) => ({
    backgroundColor: theme.colors.text.primary,
    minWidth: 38,
    padding: 6,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    elevation: 2,
  }),
});
