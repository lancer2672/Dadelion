import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Spacer } from "../../../components/spacer/spacer.component";
import UserMessage from "./message-of-user.component";

const ListUserMessages = ({ channelMessages }) => {
  console.log("z", channelMessages);
  const listMessages = [
    {
      _id: 1,
      myMessage: true,
      messageBox: [
        {
          _id: 1,
          message: "Colour picker",
        },
      ],
    },
    {
      _id: 2,
      messageBox: [
        {
          _id: 2,
          message: "Colour picker",
        },
        {
          _id: 3,
          message: "Colour picker",
        },
      ],
    },
  ];
  return (
    <FlatList
      style={{
        flex: 1,
        marginBottom: 8,
      }}
      inverted
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
