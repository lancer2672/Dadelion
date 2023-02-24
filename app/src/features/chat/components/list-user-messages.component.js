import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { Spacer } from "../../../components/spacer/spacer.component";
import UserMessage from "./message-of-user.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

const ListUserMessages = ({ channelMessages }) => {
  const { user } = useContext(AuthenticationContext);
  console.log("z", channelMessages);
  return (
    <FlatList
      style={{
        flex: 1,
        marginBottom: 8,
      }}
      inverted
      data={channelMessages}
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
