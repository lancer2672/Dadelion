import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";

import Channel from "./channel.component";
import { Spacer } from "../../../components/spacer/spacer.component";

const ListChannel = () => {
  const listUser = [
    {
      name: "khánh",
    },
    {
      name: "toản",
    },
    {
      name: "toản1",
    },
    {
      name: "toản2",
    },
    {
      name: "toản3",
    },
    {
      name: "toản4",
    },
    {
      name: "toản5",
    },
    {
      name: "toản6",
    },
    {
      name: "toản7",
    },
    {
      name: "toản8",
    },
    {
      name: "toản88",
    },
    {
      name: "toản888",
    },
  ];
  return (
    <FlatList
      style={{ margin: 12, marginTop: 24, flexGrow: 0 }}
      data={listUser}
      ListEmptyComponent={() => null}
      renderItem={({ item }) => {
        const { avatar, name } = item;
        return (
          <Spacer position={"bottom"} size={"large"}>
            <Channel />
          </Spacer>
        );
      }}
      keyExtractor={(item) => {
        return item.name;
      }}
    ></FlatList>
  );
};

export default ListChannel;

const styles = StyleSheet.create({});
