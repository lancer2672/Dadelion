import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import UserMessage from "./Message.component";
import { useSelector } from "react-redux";
import { userSelector } from "@src/store/selector";
import { useLoadChatRoomMessagesQuery } from "@src/store/slices/api/chatApiSlice";

const ListUserMessages = ({ channelId }) => {
  const { user } = useSelector(userSelector);
  const [visibleMessages, setVisibleMessages] = useState(20);
  const [listMessage, setListMessage] = useState([]);

  const { isLoading, error, isSuccess, data } =
    useLoadChatRoomMessagesQuery(channelId);

  useEffect(() => {
    if (isSuccess) {
      setListMessage(data);
    }
    if (error) {
      console.log("error", error);
    }
  }, [isLoading, data]);

  const handleLoadMore = () => {
    setVisibleMessages(visibleMessages + 10);
  };
  return (
    <FlatList
      style={{
        flex: 1,
        paddingBottom: 8,
      }}
      inverted={true}
      initialNumToRender={20}
      data={listMessage.slice(0, visibleMessages)}
      ListEmptyComponent={() => null}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      renderItem={({ item }) => {
        const { userId: memberId, message, imageUrl } = item;
        let isMyMessage = memberId == user._id ? true : false;
        return (
          <UserMessage
            imageUrl={imageUrl}
            isMyMessage={isMyMessage}
            message={message}
          />
        );
      }}
      keyExtractor={(item) => {
        return `$!@#${item._id}`;
      }}
    ></FlatList>
  );
};

export default ListUserMessages;

const styles = StyleSheet.create({});
