import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ListChannel from "./ListChannel.component";
import { colors } from "@src/infrastructure/theme/colors";

const TAB_ITEM_WIDTH = Dimensions.get("window").width / 2 - 16;
const Tab = createMaterialTopTabNavigator();
//Chat tab "friend messages/ stranger messages"
const ChatTabs = ({ navigation }) => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props}></CustomTabBar>}
      screenOptions={{
        tabBarActiveTintColor: "#fff",
      }}
      initialLayout={{
        width: Dimensions.get("window").width,
      }}
    >
      <Tab.Screen
        initialParams={{ navigation }}
        name="Bạn bè"
        component={ListChannel}
      />
      <Tab.Screen
        initialParams={{ navigation }}
        name="Tin nhắn chờ"
        component={ListChannel}
      />
    </Tab.Navigator>
  );
};
const CustomTabBar = ({ state, descriptors, navigation, position }) => {
  const inputRange = state.routes.map((_, i) => i);
  return (
    <View
      style={{
        paddingVertical: 4,
        backgroundColor: colors.chat.bg.secondary,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 12,
        marginHorizontal: 12,
        borderRadius: 50,
        elevation: 4,
        overflow: "hidden",
      }}
    >
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const opacity = position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex) =>
              inputIndex === index ? 1 : 0.3
            ),
          });
          const { options } = descriptors[route.key];

          return (
            <TouchableOpacity
              key={index}
              style={styles.tabItem}
              onPress={() => {
                const event = navigation.emit({
                  type: "tabPress",
                  target: route.key,
                  canPreventDefault: true,
                });

                if (!event.defaultPrevented) {
                  navigation.navigate(route.name);
                }
              }}
            >
              <Animated.Text style={[styles.tabButtonText, { opacity }]}>
                {options.title || route.name}
              </Animated.Text>
            </TouchableOpacity>
          );
        })}
        <TabBarIndicator state={state}></TabBarIndicator>
      </View>
    </View>
  );
};
const TabBarIndicator = ({ state }) => {
  const [translateValue, setTranslateValue] = useState(new Animated.Value(0));
  useEffect(() => {
    slide();
  }, [state]);
  const slide = () => {
    const toValue = state.index * TAB_ITEM_WIDTH;
    console.log(toValue);
    Animated.timing(translateValue, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  return (
    <Animated.View
      style={{
        position: "absolute",
        width: TAB_ITEM_WIDTH,
        borderRadius: 25,
        height: "100%",

        backgroundColor: colors.chat.bg.primary,
        transform: [{ translateX: translateValue }],
      }}
    ></Animated.View>
  );
};
const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    backgroundColor: colors.chat.bg.secondary,
    marginHorizontal: 4,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 16,
    marginHorizontal: 8,
    zIndex: 1,
  },
  tabButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#9971ee",
  },
});

export default ChatTabs;
