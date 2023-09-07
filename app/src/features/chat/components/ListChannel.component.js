import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";

import Channel from "./ChannelItem.component";
import { colors } from "@src/infrastructure/theme/colors";
import { useTheme } from "styled-components";
const ListChannel = ({ navigation, route, channels }) => {
  const theme = useTheme();
  return (
    <FlatList
      style={{
        padding: 12,
        backgroundColor: theme.colors.chat.bg.primary,
      }}
      data={channels}
      ListEmptyComponent={() => null}
      renderItem={({ item }) => {
        return <Channel navigation={navigation} channel={item} />;
      }}
      keyExtractor={(item) => {
        return item._id;
      }}
    ></FlatList>
  );
};

export default ListChannel;
