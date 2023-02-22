import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Spacer } from "../../../components/spacer/spacer.component";
import UserMessage from "./message-of-user.component";

const ListUserMessages = () => {
  const listMessages = [
    {
      _id: 1,
      myMessage: true,
      messageBox: [
        {
          message: "Colour picker",
        },
      ],
    },
    {
      _id: 2,
      messageBox: [
        {
          message: "Colour picker",
        },
        {
          message: "Colour picker",
        },
      ],
    },
  ];
  return (
    <FlatList
      data={listMessages}
      ListEmptyComponent={() => null}
      renderItem={({ item }) => {
        const { myMessage, messageBox } = item;
        return <UserMessage myMessage={myMessage} messageBox={messageBox} />;
      }}
      keyExtractor={(item) => {
        return item._id;
      }}
    ></FlatList>
  );
};

export default ListUserMessages;

const styles = StyleSheet.create({});
