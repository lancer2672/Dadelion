import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";

import Channel from "./ChannelItem.component";
import { colors } from "@src/infrastructure/theme/colors";
import { useTheme } from "styled-components";
import { useNavigation } from "@react-navigation/native";
const ListChannel = ({ channels }) => {
  const theme = useTheme();
  const navigation = useNavigation();
  return (
    <FlatList
      style={{
        backgroundColor: theme.colors.bg.primary,
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
