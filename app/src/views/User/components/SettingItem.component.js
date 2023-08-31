import { View, Text, Pressable } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { Switch } from "react-native";
import { useState } from "react";
const SettingItem = ({
  name,
  icon,
  iconColor,
  backgroundIconColor,
  onClick,
  selectionName = "",
  isToggleMode = false,
}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  return (
    <TouchableOpacity
      onPress={onClick}
      style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
    >
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
        <Text>{name}</Text>
      </View>
      <Text>{selectionName}</Text>

      {isToggleMode ? (
        <Switch
          thumbColor={isEnabled ? "black" : "white"}
          onValueChange={() => {
            setIsEnabled((prev) => !prev);
          }}
          value={isEnabled}
        />
      ) : (
        <View
          style={{
            borderRadius: 8,
            backgroundColor: "gray",
            padding: 8,
            marginLeft: 12,
          }}
        >
          <Entypo name="chevron-right" size={24} color="white" />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default SettingItem;
