import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState, useEffect, useContext } from "react";

import Channel from "./ChannelItem.component";
import { Spacer } from "@src/components/spacer/spacer.component";
const ListChannel = ({ navigation }) => {
  const channels = [
    {
      _id: "64c0f962cc848243cf3655dd",
    },
    {
      _id: "64c22903ebac3f58a4c3b770",
    },
  ];

  return (
    <FlatList
      style={{ margin: 12, marginTop: 24, flexGrow: 0 }}
      data={channels}
      ListEmptyComponent={() => null}
      renderItem={({ item }) => {
        return (
          <Spacer position={"bottom"} size={"large"}>
            <Channel navigation={navigation} channel={item} />
          </Spacer>
        );
      }}
      keyExtractor={(item) => {
        return item._id;
      }}
    ></FlatList>
  );
};

export default ListChannel;

const styles = StyleSheet.create({});
