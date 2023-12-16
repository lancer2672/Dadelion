import { chatSelector, userSelector } from "@src/store/selector";
import { useLoadChatRoomMessagesQuery } from "@src/store/slices/api/chatApiSlice";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import MessageContainer from "./message/MessageContainer.component";

const LIMIT_MESSAGE = 20;
const ListUserMessages = ({ chatFriend }) => {
  const { user } = useSelector(userSelector);
  const { selectedChannel } = useSelector(chatSelector);
  // const [visibleMessages, setVisibleMessages] = useState(20);
  const [listMessage, setListMessage] = useState([]);
  const [listGroupedMessage, setListGroupedMessage] = useState([]);
  const [skip, setSkip] = useState(0);
  const { isLoading, error, isSuccess, data } = useLoadChatRoomMessagesQuery({
    channelId: selectedChannel._id,
    skip: skip,
    limit: LIMIT_MESSAGE,
  });

  const loadMoreMessage = () => {
    console.log("loadMoreMessage", skip);
    setSkip(skip + LIMIT_MESSAGE);
  };

  useEffect(() => {
    // if (!data) return;
    //group message chunk by user Id
    const groupedByUserId = listMessage.reduce((acc, msg) => {
      const lastGroup = acc[acc.length - 1];
      const newMessage = { ...msg };
      if (lastGroup) {
        const lastMessage = lastGroup.messages[0];
        const timeDifference =
          new Date(lastMessage.createdAt) - new Date(newMessage.createdAt);
        if (timeDifference > 30 * 60 * 1000) {
          newMessage.timeMarker = true;
          lastMessage.timeMarker = true;
        }
      }
      if (!lastGroup || lastGroup.userId !== newMessage.userId) {
        acc.push({ userId: newMessage.userId, messages: [newMessage] });
      } else {
        lastGroup.messages.push(newMessage);
      }

      return acc;
    }, []);
    console.log("groupedByUserId", groupedByUserId);
    setListGroupedMessage(groupedByUserId);
  }, [listMessage]);
  useEffect(() => {
    if (data) {
      if (listMessage.length >= data.length) {
        //append new message
        setListMessage([...listMessage, ...data]);
      } else {
        //
        setListMessage(data);
      }
    }
  }, [data]);
  console.log("grouped msg", skip, listMessage, data);
  return (
    <FlatList
      style={{
        flex: 1,
        paddingBottom: 8,
      }}
      inverted={true}
      onEndReached={loadMoreMessage}
      showsVerticalScrollIndicator={false}
      data={listGroupedMessage}
      ListEmptyComponent={() => <></>}
      onEndReachedThreshold={0.5}
      renderItem={({ item }) => {
        const { userId: memberId, messages } = item;
        let isMyMessage = memberId == user._id ? true : false;
        return (
          <MessageContainer
            isMyMessage={isMyMessage}
            chatFriend={chatFriend}
            messages={messages}
            loadMoreMessage={loadMoreMessage}
          />
        );
      }}
      keyExtractor={(item, index) => {
        return `#!${item.userId} + ${index}`;
      }}
    ></FlatList>
  );
};

export default ListUserMessages;

const styles = StyleSheet.create({});
