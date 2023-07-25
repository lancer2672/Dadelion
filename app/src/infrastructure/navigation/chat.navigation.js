import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ChatScreen from "@src/features/chat/screens/Chat.screen";
import ChatRoom from "@src/features/chat/screens/ChatRoom.screen";

const Stack = createNativeStackNavigator();
export const ChatNavigator = () => (
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
