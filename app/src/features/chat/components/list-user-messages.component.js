import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { Spacer } from "../../../components/spacer/spacer.component";
import UserMessage from "./message-of-user.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

const ListUserMessages = ({ listMessage }) => {
  const { user } = useContext(AuthenticationContext);
  const [visibleMessages, setVisibleMessages] = useState(10);
  console.log("userMessage", listMessage.length);
  const handleLoadMore = () => {
    setVisibleMessages(visibleMessages + 10);
    console.log("load more", visibleMessages);
  };
  return (
    <FlatList
      style={{
        flex: 1,
        marginBottom: 8,
      }}
      inverted={true}
      initialNumToRender={10}
      data={listMessage.slice(0, visibleMessages)}
      ListEmptyComponent={() => null}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
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
