import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import FoundUser from "./found-user.component";
import { Spacer } from "../../../components/spacer/spacer.component";
const FoundedUsersList = () => {
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
  ];
  return (
    <FlatList
      style={{ margin: 12 }}
      data={listUser}
      ListEmptyComponent={() => null}
      renderItem={({ item }) => {
        const { avatar, name } = item;
        return (
          <Spacer position={"bottom"} size={"small"}>
            <FoundUser name={name} />
          </Spacer>
        );
      }}
      keyExtractor={(item) => {
        return item.name;
      }}
    ></FlatList>
  );
};

export default FoundedUsersList;

const styles = StyleSheet.create({});
