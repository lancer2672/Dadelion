import React, { useEffect } from "react";
import { Feather, Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import messaging from "@react-native-firebase/messaging";

import User from "@src/views/User";
import Home from "@src/views/Home";
import Map from "@src/features/map/screens/Mapscreen";
import { colors } from "../theme/colors";
import DetailPost from "@src/features/post/screens/PostDetail.screen";
import ChatScreen from "@src/features/chat/screens/chat.screen";
import ChatRoom from "@src/features/chat/screens/ChatRoom.screen";
import Guest from "@src/views/Guest";
import { useSaveFCMtokenMutation } from "@src/store/slices/api/userApiSlice";
import { useNavigation } from "@react-navigation/native";
import Notification from "@src/features/notification/screens/Notification.screen";
import Settings from "@src/features/user/screens/Settings.screen";
import EditProfile from "@src/features/user/screens/EditProfile.screens";
import { useTheme } from "styled-components";
import Search from "@src/features/search/screens";
import FriendList from "@src/features/user/screens/FriendList.screen";
import CreatePost from "@src/features/post/screens/CreatePost.screen";
import { Image, Pressable, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { Voximplant } from "react-native-voximplant";
import IncomingCallScreen from "@src/features/call/screens/IncomingCall.screen";
import CallingScreen from "@src/features/call/screens/CallingScreen.screen";
const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

const CreatePostButton = ({ children, onPress }) => {
  const theme = useTheme();

  return (
    <Pressable
      style={[
        styles.createButton,
        { backgroundColor: theme.colors.text.secondary },
      ]}
      onPress={onPress}
    >
      <View style={{ width: 48, height: 48 }}>{children}</View>
    </Pressable>
  );
};
const Tab = createBottomTabNavigator();
const Tabs = () => {
  const theme = useTheme();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => {
        return {
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {
            height: 50,
            borderTopWidth: 0,
            backgroundColor: theme.colors.chat.bg.secondary,
          },
          tabBarItemStyle: {
            marginLeft: route.name === "Chat" ? 24 : 0,
            marginRight: route.name === "Map" ? 24 : 0,
          },
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
                  color={
                    focused
                      ? theme.colors.text.secondary
                      : theme.colors.text.primary
                  }
                />
              );
            }
            return (
              <Feather
                name={iconName}
                size={size}
                color={
                  focused
                    ? theme.colors.text.secondary
                    : theme.colors.text.primary
                }
              />
            );
          },
          tabBarActiveTintColor: colors.text.primary,
          tabBarInactiveTintColor: "gray",
        };
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Map" component={Map} />
      <Tab.Screen
        name="CreatePost"
        component={CreatePost}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                resizeMode="contain"
                source={require("../../../assets/icons/plus_icon.png")}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: theme.colors.text.primary,
                }}
              ></Image>
            );
          },
          tabBarButton: (props) => {
            return (
              <>
                <View style={{ zIndex: 1 }}>
                  <CreatePostButton {...props}></CreatePostButton>
                </View>
                <View
                  style={[
                    styles.pseudo,
                    { backgroundColor: theme.colors.chat.bg.primary },
                  ]}
                ></View>
              </>
            );
          },
        }}
      />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="User" component={User} />
    </Tab.Navigator>
  );
};

export const AppNavigator = () => {
  const [saveFCMtoken, { error }] = useSaveFCMtokenMutation();
  const navigation = useNavigation();
  const voximplant = Voximplant.getInstance();
  //messsaging
  useEffect(() => {
    // Get the device token
    messaging()
      .getToken()
      .then((token) => {
        console.log("Token", token);
        saveFCMtoken(token);
      });
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("Message handled in the background!", remoteMessage);
    });
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        "Notification caused app to open from background state:",
        remoteMessage.notification
      );
      switch (remoteMessage.data.type) {
        case "chat": {
          navigation.navigate("ChatRoom", {
            channelId: remoteMessage.data.channelId,
            memberIds: JSON.parse(remoteMessage.data.memberIds),
          });
          break;
        }
        case "post/react": {
          // navigation.navigate("DetailPost", {
          //   channelId: remoteMessage.data.channelId,
          //   memberIds: JSON.parse(remoteMessage.data.memberIds),
          // });
        }
      }
    });

    // Listen to whether the token changes
    return messaging().onTokenRefresh((token) => {
      saveFCMtoken(token);
    });
  }, []);
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log("A new FCM message arrived!", JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  }, []);

  //calling
  useEffect(() => {
    voximplant.on(Voximplant.ClientEvents.IncomingCall, (incomingCallEvent) => {
      navigation.navigate("IncomingCall", {
        call: incomingCallEvent.call,
      });
    });
    return () => {
      voximplant.off(Voximplant.ClientEvents.IncomingCall);
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

      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="FriendList" component={FriendList} />

      <Stack.Screen name="IncomingCall" component={IncomingCallScreen} />
      <Stack.Screen name="CallingScreen" component={CallingScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  pseudo: {
    width: 64,
    height: 32,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    left: "50%",
    top: "50%",
    zIndex: 0,
    position: "absolute",
    transform: [{ translateX: -32 }, { translateY: -25 }],
  },
  createButton: {
    top: -24,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    position: "absolute",
    borderRadius: 35,
    left: "50%",
    transform: [{ translateX: -24 }],
  },
});
