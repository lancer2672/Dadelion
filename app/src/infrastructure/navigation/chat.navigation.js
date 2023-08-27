import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ChatScreen from "@src/features/chat/screens/chat.screen";
import ChatRoom from "@src/features/chat/screens/ChatRoom.screen";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

export const ChatNavigator = ({ navigation, route }) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener("tabPress", (e) => {
      const routeName = getFocusedRouteNameFromRoute(route);
      console.log("RouteName", routeName);
      console.log(routeName === "ChatRoom");
      if (routeName === "ChatRoom") {
        console.log("True");
        navigation.setOptions({ tabBarStyle: { display: "none" } });
      }
    });

    // Clean up
    return unsubscribe;
  }, [navigation]);

  return (
    <Stack.Navigator
      initialRouteName="Chat"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="ChatRoom" component={ChatRoom} />
    </Stack.Navigator>
  );
};
