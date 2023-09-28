import React, { useEffect } from "react";
import { Feather, Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import messaging from "@react-native-firebase/messaging";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components";
import { useDispatch } from "react-redux";

import DetailPost from "@src/features/post/screens/PostDetail.screen";
import ChatRoom from "@src/features/chat/screens/ChatRoom.screen";
import Guest from "@src/views/Guest";
import { useSaveFCMtokenMutation } from "@src/store/slices/api/userApiSlice";
import Notification from "@src/features/notification/screens/Notification.screen";
import Settings from "@src/features/user/screens/Settings.screen";
import EditProfile from "@src/features/user/screens/EditProfile.screens";
import Search from "@src/features/search/screens";
import FriendList from "@src/features/user/screens/FriendList.screen";
import { Image, Pressable, View, StyleSheet } from "react-native";
import IncomingCallScreen from "@src/features/call/screens/IncomingCall.screen";
import CallingScreen from "@src/features/call/screens/CallingScreen.screen";
import ResetPassword from "@src/features/user/screens/ResetPassword.screen";
import { enableCallingService } from "@src/services/calling";
import { getMessagingToken } from "@src/services/messaging";
import { enableTrackingLocation } from "@src/services/location";
import { Tabs } from "./tabs";
const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  const [saveFCMtoken, { error }] = useSaveFCMtokenMutation();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    enableTrackingLocation(dispatch);
    onTokenRefresh = getMessagingToken(saveFCMtoken);
    unsubscribeVoximplant = enableCallingService(navigation);
    const unsubscribeRemoteMessaging = messaging().onMessage(
      async (remoteMessage) => {
        console.log(
          "A new FCM message arrived!",
          JSON.stringify(remoteMessage)
        );
      }
    );
    return () => {
      onTokenRefresh();
      unsubscribeVoximplant();
      unsubscribeRemoteMessaging();
    };
  }, []);
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="AppTabs"
    >
      <Stack.Screen name="AppTabs" component={Tabs} />

      <Stack.Screen name="DetailPost" component={DetailPost} />
      <Stack.Screen name="ChatRoom" component={ChatRoom} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="Guest" component={Guest} />

      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />

      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="FriendList" component={FriendList} />

      <Stack.Screen name="IncomingCall" component={IncomingCallScreen} />
      <Stack.Screen name="CallingScreen" component={CallingScreen} />
    </Stack.Navigator>
  );
};
