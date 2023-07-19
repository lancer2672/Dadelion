import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import AvtWithName from "./avt-with-name.component";
import { Spacer } from "@src/components/spacer/spacer.component";
const ListAvtWithName = () => {
  const listUser = [
    {
      name: "khánh",
    },
  ];
  return (
    <FlatList
      style={{
        margin: 12,
        height: 80,
        flexGrow: 0,
      }}
      data={listUser}
      horizontal
      showsHorizontalScrollIndicator={false}
      ListEmptyComponent={() => null}
      renderItem={({ item }) => {
        const { avatar, name } = item;
        return (
          <Spacer position={"right"} size={"large"}>
            <AvtWithName name={name} />
          </Spacer>
        );
      }}
      keyExtractor={(item) => {
        return item.name;
      }}
    ></FlatList>
  );
};

export default ListAvtWithName;
