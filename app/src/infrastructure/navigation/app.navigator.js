import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import useNotification from "@src/hooks/useNotification";
import {
  enableTrackingLocation,
  receiveListLocationListener,
} from "@src/services/location";
import { onAppOpened } from "@src/services/notifee/notifee";
import { userSelector } from "@src/store/selector";
import { useGetChannelsQuery } from "@src/store/slices/api/chatApiSlice";
import { joinChannels } from "@src/store/slices/chatSlice";
import { getSocket } from "@src/utils/socket";
import {
  CallingScreen,
  ChatRoom,
  DetailPost,
  EditProfile,
  FriendList,
  Guest,
  IncomingCallScreen,
  Notification,
  ResetPassword,
  Search,
  Settings,
} from "./index";
import { Tabs } from "./tabs";
import { AUTH_ROUTE } from "./route";
import HomeMovie from "@src/features/film/HomeMovie.screen";
import MovieDetail from "@src/features/film/FilmDetail.screen";

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const socket = getSocket();
  const { user } = useSelector(userSelector);
  const { enableNotifications } = useNotification();
  const { isLoading, data = [] } = useGetChannelsQuery(user?._id, {
    refetchOnMountOrArgChange: true,
  });
  useEffect(() => {
    if (socket) {
      const removeListener = receiveListLocationListener(socket, dispatch);
      return () => {
        removeListener();
      };
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
    enableTrackingLocation(dispatch);
    const unsubscribeNotification = enableNotifications();
    onAppOpened()
      .then(() => console.log("onAppOpened1"))
      .catch((er) => {
        console.log("error onAppOpened1", er);
      });
    return () => {
      unsubscribeNotification();
    };
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={AUTH_ROUTE.MOVIE}
    >
      <Stack.Screen name="AppTabs" component={Tabs} />

      {/* chat */}
      <Stack.Screen name="DetailPost" component={DetailPost} />
      <Stack.Screen name="ChatRoom" component={ChatRoom} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="Guest" component={Guest} />

      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />

      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="FriendList" component={FriendList} />
      {/* call */}
      <Stack.Screen name="IncomingCall" component={IncomingCallScreen} />
      <Stack.Screen name="CallingScreen" component={CallingScreen} />

      <Stack.Screen name={AUTH_ROUTE.MOVIE} component={HomeMovie} />
      <Stack.Screen name={AUTH_ROUTE.MOVIE_DETAIL} component={MovieDetail} />
    </Stack.Navigator>
  );
};
