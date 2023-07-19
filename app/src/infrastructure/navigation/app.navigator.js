import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather, Ionicons } from "@expo/vector-icons";

import User from "@src/views/User/User";
import Home from "@src/views/Home/Home";
import Map from "@src/features/map/screens/map.screen";
import { ChatNavigator } from "./chat.navigation";

export const AppNavigator = () => {
  const Tab = createBottomTabNavigator();
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
          } else if (route.name === "ChatNavigator") {
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
        tabBarActiveTintColor: "tomato",
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
        name="ChatNavigator"
        options={{ headerShown: false }}
        component={ChatNavigator}
      />
      <Tab.Screen
        name="User"
        options={{ headerShown: false }}
        component={User}
      />
    </Tab.Navigator>
  );
};
