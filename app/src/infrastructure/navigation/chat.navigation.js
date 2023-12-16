import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";

import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import ChatHome from "@src/features/chat/screens/ChatHome.screen";
import ChatRoom from "@src/features/chat/screens/ChatRoom.screen";

const Stack = createNativeStackNavigator();

export const ChatNavigator = ({ navigation, route }) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener("tabPress", (e) => {
      const routeName = getFocusedRouteNameFromRoute(route);
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
      initialRouteName="ChatHome"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ChatHome" component={ChatHome} />
      <Stack.Screen name="ChatRoom" component={ChatRoom} />
    </Stack.Navigator>
  );
};
