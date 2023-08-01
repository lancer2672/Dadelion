import React, { useEffect } from "react";
import { Feather, Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import User from "@src/views/User/User";
import Home from "@src/views/Home/Home";
import Map from "@src/features/map/screens/Mapscreen";
import { ChatNavigator } from "./chat.navigation";
import { colors } from "../theme/colors";
import DetailPost from "@src/features/post/screens/PostDetail.screen";
import ChatScreen from "@src/features/chat/screens/Chat.screen";
import ChatRoom from "@src/features/chat/screens/ChatRoom.screen";

const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

const Tab = createBottomTabNavigator();
const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "User") {
            iconName = "user";
          } else if (route.name === "Map") {
            iconName = "map-pin";
          } else if (route.name === "Chat") {
            return (
              <Ionicons
                name="ios-chatbubble-ellipses-outline"
                size={24}
                color={color}
              />
            );
          }
          // You can return any component that you like here!
          return <Feather name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.text.primary,
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Home"
        options={{ headerShown: false }}
        component={Home}
      />
      <Tab.Screen name="Map" options={{ headerShown: false }} component={Map} />
      <Tab.Screen
        name="Chat"
        options={{ headerShown: false }}
        component={ChatScreen}
      />
      <Tab.Screen
        name="User"
        options={{ headerShown: false }}
        component={User}
      />
    </Tab.Navigator>
  );
};

export const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="AppTabs"
    >
      <Stack.Screen name="AppTabs" component={Tabs} />
      <Stack.Screen name="DetailPost" component={DetailPost} />
      <Stack.Screen name="ChatRoom" component={ChatRoom} />
    </Stack.Navigator>
  );
};
