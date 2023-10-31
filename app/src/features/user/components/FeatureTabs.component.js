import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { TabView, SceneMap } from "react-native-tab-view";
import UserPost from "./UserPost.component";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useTheme } from "styled-components";

const TAB_ITEM_WIDTH = Dimensions.get("window").width / 2;
const Tab = createMaterialTopTabNavigator();
const FeatureTabs = ({ userId }) => {
  const theme = useTheme();
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar theme={theme} {...props}></CustomTabBar>}
      screenOptions={{
        tabBarActiveTintColor: "#fff",
      }}
      initialLayout={{
        width: Dimensions.get("window").width,
      }}
    >
      <Tab.Screen initialParams={{ userId }} name="Ảnh" component={UserPost} />
      <Tab.Screen
        initialParams={{ userId }}
        name="Video"
        component={UserPost}
      />
    </Tab.Navigator>
  );
};
const CustomTabBar = ({ state, descriptors, theme, navigation, position }) => {
  const inputRange = state.routes.map((_, i) => i);
  return (
    <View
      style={[styles.tabBar, { backgroundColor: theme.colors.bg.secondary }]}
    >
      {state.routes.map((route, index) => {
        const opacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map((inputIndex) =>
            inputIndex === index ? 1 : 0.5
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
  );
};
const TabBarIndicator = ({ state }) => {
  const [translateValue, setTranslateValue] = useState(new Animated.Value(0));
  useEffect(() => {
    slide();
  }, [state]);
  const slide = () => {
    const toValue = state.index * TAB_ITEM_WIDTH;
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
        width: TAB_ITEM_WIDTH - 48,
        marginHorizontal: 24,
        borderBottomColor: "#9971ee",
        borderBottomWidth: 3,
        bottom: 4,

        transform: [{ translateX: translateValue }],
      }}
    ></Animated.View>
  );
};
const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 16,
  },
  tabButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#9971ee",
  },
});

export default FeatureTabs;
