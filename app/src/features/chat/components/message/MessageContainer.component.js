import { Text, View, FlatList } from "react-native";
import React, { useState, memo } from "react";
import styled from "styled-components/native";
import { postCreatedTimeFormatter } from "@src/utils/timeFormatter";
import { useTheme } from "styled-components";
import CallMessageItem from "./CallMessageItem.component";
import VideoMessageItem from "./VideoMessageItem.component";
import ImageMessageItem from "./ImageMessageItem.component";
import Avatar from "@src/components/Avatar";
import { MessageType } from "@src/constants";

const MessageContainer = ({ chatFriend = {}, isMyMessage, messages }) => {
  const theme = useTheme();
  console.log("messages", messages);
  return (
    <Container isMyMessage={isMyMessage}>
      {!isMyMessage && (
        <Avatar
          style={{
            width: 32,
            height: 32,
          }}
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
                {item.type === MessageType.TEXT && (
                  <Message isMyMessage={isMyMessage}>
                    {item.attrs.message}
                  </Message>
                )}
                {item.type === MessageType.IMAGE && (
                  <ImageMessageItem
                    images={item.attrs.images}
                  ></ImageMessageItem>
                )}
                {item.type === MessageType.VIDEO && (
                  <VideoMessageItem
                    videoUrls={item.attrs.videoUrls}
                  ></VideoMessageItem>
                )}
                {item.type === MessageType.CALL && (
                  <CallMessageItem
                    callHistory={item.attrs.callHistory}
                  ></CallMessageItem>
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
}))`
  align-items: flex-end;
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
