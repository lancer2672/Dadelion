import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { Snackbar } from "react-native-paper";

import FoundUser from "./found-user.component";
import { Spacer } from "../../../components/spacer/spacer.component";
const FoundedUsersList = ({ userList }) => {
  if (userList.length === 0) {
    return <></>;
  }

  return (
    <View
      style={{
        position: "absolute",
        top: 68,
        right: 0,
        left: 0,
        backgroundColor: "#e3d8d8",
        zIndex: 1,
      }}
    >
      <FlatList
        style={{ marginTop: 12 }}
        data={userList}
        ListEmptyComponent={() => null}
        renderItem={({ item }) => {
          const { avatar, username } = item;
          return (
            <Spacer position={"bottom"} size={"medium"}>
              <FoundUser avatar={avatar} name={username} />
            </Spacer>
          );
        }}
        keyExtractor={(item) => {
          return item._id;
        }}
      ></FlatList>
    </View>
  );
};

export default FoundedUsersList;

const styles = StyleSheet.create({});
