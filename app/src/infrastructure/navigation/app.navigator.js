import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

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
import {
  enableTrackingLocation,
  receiveListLocationListener,
} from "@src/services/location";
import { Tabs } from "./tabs";
import { getSocket } from "@src/utils/socket";
import { connectVoximplant } from "@src/voximplant/services/Client";
import { useGetChannelsQuery } from "@src/store/slices/api/chatApiSlice";
import { joinChannels } from "@src/store/slices/chatSlice";
import useNotification from "@src/hooks/useNotification";
import { onAppOpened } from "@src/services/notifee/notifee";
import { userSelector } from "@src/store/selector";

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const socket = getSocket();
  const { user } = useSelector(userSelector);
  const { enableNotifications } = useNotification();
  const { isLoading, data = [] } = useGetChannelsQuery(user._id, {
    refetchOnMountOrArgChange: true,
  });
  useEffect(() => {
    if (socket) {
      receiveListLocationListener(socket, dispatch);
    }
  }, [socket]);
  useEffect(() => {
    if (!isLoading && data) {
      //listen to incoming message
      const channelIds = data.map((channel) => channel._id);
      dispatch(joinChannels({ channelIds }));
    }
  }, [isLoading, data]);
  useEffect(() => {
    connectVoximplant();
    enableTrackingLocation(dispatch);
    // const unsubscribeVoximplant = enableCallingService(navigation);
    const unsubscribeNotification = enableNotifications();
    onAppOpened()
      .then(() => console.log("onAppOpened1"))
      .catch((er) => {
        console.log("error onAppOpened1", er);
      });
    return () => {
      // unsubscribeVoximplant();
      unsubscribeNotification();
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
