import { View, Text, Pressable } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { Switch } from "react-native";
import { useState } from "react";
import { useTheme } from "styled-components";
const SettingItem = ({
  name,
  icon,
  iconColor,
  backgroundIconColor,
  onClick,
  selectionName = "",
  isToggleMode = false,
  defaultSwitchValue = false,
}) => {
  const [isEnabled, setIsEnabled] = useState(defaultSwitchValue);
  const theme = useTheme();

  return (
    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}>
      <View
        style={{
          backgroundColor: backgroundIconColor,
          padding: 8,
          borderRadius: 25,
          marginRight: 12,
        }}
      >
        <Entypo name={icon} size={20} color={iconColor} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ color: theme.colors.chat.text }}>{name}</Text>
      </View>
      <Text style={{ color: theme.colors.chat.text }}>{selectionName}</Text>

      {isToggleMode ? (
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={theme.colors.chat.text == "white" ? "white" : "black"}
          onValueChange={() => {
            setIsEnabled((prev) => !prev);
            onClick();
          }}
          value={isEnabled}
        />
      ) : (
        <TouchableOpacity
          onPress={onClick}
          style={{
            borderRadius: 8,
            backgroundColor: "gray",
            padding: 8,
            marginLeft: 12,
          }}
        >
          <Entypo name="chevron-right" size={24} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SettingItem;
