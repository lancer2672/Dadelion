import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState, useEffect, useContext } from "react";

import Channel from "./channel.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { ChatContext } from "../../../services/chat/chat.context";
const ListChannel = () => {
  const { channels } = useContext(ChatContext);
  useEffect(() => {}, []);
  return (
    <FlatList
      style={{ margin: 12, marginTop: 24, flexGrow: 0 }}
      data={channels}
      ListEmptyComponent={() => null}
      renderItem={({ item }) => {
        return (
          <Spacer position={"bottom"} size={"large"}>
            <Channel channel={item} />
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
