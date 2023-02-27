import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { Spacer } from "../../../components/spacer/spacer.component";
import UserMessage from "./message-of-user.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { useLayoutEffect } from "react";
import { ChatContext } from "../../../services/chat/chat.context";

const ListUserMessages = ({ listMessage }) => {
  const { user } = useContext(AuthenticationContext);

  useLayoutEffect(() => {}, []);
  return (
    <FlatList
      style={{
        flex: 1,
        marginBottom: 8,
      }}
      inverted={false}
      data={listMessage}
      ListEmptyComponent={() => null}
      renderItem={({ item }) => {
        const { userId: memberId, messageBox } = item;
        let myMessage = memberId == user._id ? true : false;
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
