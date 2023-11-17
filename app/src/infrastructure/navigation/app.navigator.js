import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import messaging from "@react-native-firebase/messaging";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import { useSaveFCMtokenMutation } from "@src/store/slices/api/userApiSlice";
import {
  Notification,
  Settings,
  EditProfile,
  Search,
  FriendList,
  IncomingCallScreen,
  CallingScreen,
  ResetPassword,
  DetailPost,
  ChatRoom,
  Guest,
} from "./index";
import { enableCallingService } from "@src/services/calling";
import { getMessagingToken } from "@src/services/messaging";
import {
  enableTrackingLocation,
  receiveListLocationListener,
} from "@src/services/location";
import { Tabs } from "./tabs";
import { getSocket } from "@src/utils/socket";
import { connectVoximplant } from "@src/voximplant/services/Client";
import { requestNotificationPermission } from "@src/permissions";
import {
  enableForegroundNotification,
  registerForegroundService,
} from "@src/services/notifee";
import messagingNotificationIns from "@src/services/notifee/MessagingNotification";
import useNotification from "@src/hooks/useNotification";
import { AppState } from "react-native";

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  const [saveFCMtoken, { error }] = useSaveFCMtokenMutation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const socket = getSocket();
  const { setIsBgNotificationEnable } = useNotification();
  useEffect(() => {
    if (socket) {
      receiveListLocationListener(socket, dispatch);
    }
  }, [socket]);

  useEffect(() => {
    // (async () => {
    //   try {
    //     await enableTrackingLocation(dispatch);
    //   } catch (er) {
    //     console.log("enableTrackingLocation er", er);
    //   }
    // })();

    enableTrackingLocation(dispatch);
    //notifee
    requestNotificationPermission();
    enableForegroundNotification();
    registerForegroundService();
    connectVoximplant();

    const onTokenRefresh = getMessagingToken(saveFCMtoken);
    const unsubscribeVoximplant = enableCallingService(navigation);
    const unsubscribeRemoteMessaging = messaging().onMessage(
      async (remoteMessage) => {
        console.log("A new FCM message arrived!", remoteMessage);
      }
    );
    return () => {
      onTokenRefresh();
      unsubscribeVoximplant();
      unsubscribeRemoteMessaging();
    };
  }, []);

  useEffect(() => {
    AppState.addEventListener("change", handleAppStateChange);
  }, []);

  const handleAppStateChange = async (nextAppState) => {
    console.log("StateChanged", nextAppState);
    if (nextAppState === "active") {
      setIsBgNotificationEnable(false);
    } else {
      setIsBgNotificationEnable(true);

      messagingNotificationIns.displayNotification();
    }
  };

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
