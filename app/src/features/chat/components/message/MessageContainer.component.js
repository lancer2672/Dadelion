import {
  StyleSheet,
  Image,
  Text,
  View,
  FlatList,
  Pressable,
} from "react-native";
import React, { useState, memo } from "react";
import styled from "styled-components/native";
import { postCreatedTimeFormatter } from "@src/utils/timeFormatter";
import { useTheme } from "styled-components";
import CallMessageItem from "./CallMessageItem.component";
import VideoMessageItem from "./VideoMessageItem.component";
import OpenImageModal from "./OpenImageModal.component";
import ImageMessageItem from "./ImageMessageItem.component";
import Avatar from "@src/components/Avatar";

const MessageContainer = ({ chatFriend = {}, isMyMessage, messages }) => {
  const theme = useTheme();
  console.log("messages", messages);
  return (
    <Container isMyMessage={isMyMessage}>
      {!isMyMessage && (
        <Avatar
          style={{ width: 60, height: 60, alignSelf: "flex-end" }}
          source={{ uri: chatFriend.avatar }}
        />
      )}
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <MessageWrapper isMyMessage={isMyMessage}>
            {item.timeMarker && (
              <Text
                style={{
                  flex: 1,
                  color: theme.colors.text.primary,
                  textAlign: "center",
                }}
              >
                {postCreatedTimeFormatter(item.createdAt)}
              </Text>
            )}
            <View style={{ flexDirection: "row" }}>
              {isMyMessage && <View style={{ flex: 1 }}></View>}
              <View>
                {item.message && (
                  <>
                    {/* styled component */}
                    <Message isMyMessage={isMyMessage}>{item.message}</Message>
                  </>
                )}
                {item.imageUrls && (
                  <ImageMessageItem
                    imageUrls={item.imageUrls}
                  ></ImageMessageItem>
                )}
                {item.videoUrls && item.videoUrls?.length > 0 && (
                  <VideoMessageItem message={item}></VideoMessageItem>
                )}
                {item.callHistory && item.callHistory.duration !== -1 && (
                  <CallMessageItem message={item}></CallMessageItem>
                )}
              </View>
            </View>
          </MessageWrapper>
        )}
        keyExtractor={(item) => item._id}
      />
    </Container>
  );
};

const Container = styled(View).attrs((props) => ({
  flexDirection: props.isMyMessage ? "row-reverse" : "row",
  flex: 1,
  // backgroundColor: "tomato",
}))`
  align-content: center;
  margin: 8px;
  margin-bottom: 0px;
`;

const MessageWrapper = styled(View).attrs((props) => {
  return {
    marginLeft: props.isMyMessage ? 32 : 6,
    marginRight: props.isMyMessage ? 6 : 40,
  };
})`
  margin-bottom: 2px;
`;

const Message = styled(Text).attrs((props) => {
  return { textAlign: props.isMyMessage ? "right" : "left" };
})`
  background-color: ${(props) => props.theme.colors.text.secondary};
  color: ${(props) => props.theme.colors.text.primary};
  margin-top: 6px;
  border-radius: 15px;
  line-height: 24px;
  padding: 6px;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 15px;
`;

export default memo(MessageContainer);
