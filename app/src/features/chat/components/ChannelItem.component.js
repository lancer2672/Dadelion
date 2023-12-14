import {
  StyleSheet,
  Text,
  Image,
  Modal,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Entypo } from "@expo/vector-icons";

import { Avatar } from "@src/components/Avatar";
import { userSelector } from "@src/store/selector";
import { useGetUserByIdQuery } from "@src/store/slices/api/userApiSlice";
import { commentCreatedTimeFormater } from "@src/utils/timeFormatter";
import {
  useGetLastMessageQuery,
  useLoadChatRoomMessagesQuery,
} from "@src/store/slices/api/chatApiSlice";
import { useTheme } from "styled-components";
import { setSelectedChannel } from "@src/store/slices/chatSlice";
import { MessageType } from "@src/constants";

const Channel = ({ navigation, channel }) => {
  const { _id: channelId, memberIds } = channel;
  const { t } = useTranslation();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { user } = useSelector(userSelector);
  const [lastMessage, setLastMessage] = useState({});
  const [unseenMessageIds, setUnseenMessageIds] = useState([]);

  const { data: lastMsgData, isLoading: isLoadLastMsg } =
    useGetLastMessageQuery(channelId, {
      refetchOnMountOrArgChange: true,
    });

  const { data: dataChannelMsg } = useLoadChatRoomMessagesQuery({
    channelId,
    skip: 0,
    limit: 1,
  });
  const { data: chatFriend } = useGetUserByIdQuery(channel.chatFriendId, {
    skip: !channel.chatFriendId,
  });
  const naviagteToGuest = () => {
    if (channel.chatFriendId) {
      navigation.navigate("Guest", { guestId: channel.chatFriendId });
    }
  };
  const navigateToChatRoom = () => {
    // dispatch(setSelectedChannel({ ...channel, chatFriend }));
    dispatch(setSelectedChannel(channel));
    navigation.navigate("ChatRoom");
    if (lastMessage) {
      setLastMessage((prev) => ({ ...prev, isSeen: true }));
    }
    setUnseenMessageIds([]);
  };
  useEffect(() => {
    if (dataChannelMsg && chatFriend) {
      let unseenMsgId = [];
      let index = 0;
      while (
        index < dataChannelMsg.length &&
        dataChannelMsg[index].userId == chatFriend._id &&
        dataChannelMsg[index].isSeen == false
      ) {
        unseenMsgId.push(dataChannelMsg[index]._id);
        index++;
      }
      setUnseenMessageIds(unseenMsgId);
    }
  }, [dataChannelMsg, chatFriend]);
  console.log("ChannelItem", chatFriend);
  useEffect(() => {
    if (lastMsgData) {
      let note;
      const msgType = lastMsgData.lastMessage?.type;
      if (msgType) {
        switch (msgType) {
          case MessageType.TEXT: {
            note = lastMsgData.lastMessage.attrs.message;
            break;
          }
          case MessageType.IMAGE: {
            note = t("sentImage");
            break;
          }

          case MessageType.VIDEO: {
            note = t("sentVideo");

            break;
          }
          case MessageType.CALL: {
            let callDuration =
              lastMsgData.lastMessage.attrs.callHistory.duration;
            if (callDuration == 0) {
              note = t("missCall");
            } else {
              note = t("calledYou");
            }
            break;
          }
        }
      } else note = t("emptyMessage");
      setLastMessage({ ...lastMsgData.lastMessage, note });
    }
  }, [isLoadLastMsg, lastMsgData]);

  return (
    <Container onPress={navigateToChatRoom}>
      <TouchableOpacity onPress={naviagteToGuest}>
        <Avatar
          style={{ width: 60, height: 60 }}
          source={{ uri: chatFriend?.avatar }}
        ></Avatar>
      </TouchableOpacity>
      <View style={{ flex: 1, marginVertical: 8, marginHorizontal: 8 }}>
        <Name>{chatFriend ? chatFriend.nickname : ""}</Name>

        {lastMessage ? (
          <LastMessage userId={user._id} lastMessage={lastMessage}>
            {lastMessage.note}
          </LastMessage>
        ) : (
          <EmptyMessage>{t("emptyMessage")}</EmptyMessage>
        )}
      </View>
      {lastMessage && (
        <View
          style={{
            height: "100%",
            justifyContent: "flex-end",
            marginBottom: 12,
          }}
        >
          {unseenMessageIds.length > 0 && (
            <Text
              style={{
                fontSize: 16,
                paddingVertical: 4,
                marginBottom: 12,
                color: "tomato",
                textAlign: "center",
              }}
            >
              {unseenMessageIds.length}
            </Text>
          )}

          <LastMessage userId={user._id} lastMessage={lastMessage}>
            {commentCreatedTimeFormater(lastMessage.createdAt)}
          </LastMessage>
        </View>
      )}
    </Container>
  );
};

const Container = styled(TouchableOpacity)`
  width: 100%;
  height: 80px;
  justify-content: flex-start;
  align-items: center;
  border-color: ${(props) => props.theme.colors.bg.secondary}
  flex-direction: row;
  marginVertical: 8px;
`;
const LastMessage = styled(Text).attrs((props) => ({
  opacity:
    props.lastMessage.userId == props.userId
      ? 0.5
      : props.lastMessage.isSeen
      ? 0.5
      : 1,
  fontWeight:
    props.lastMessage.userId == props.userId
      ? "400"
      : props.lastMessage.isSeen
      ? "400"
      : "bold",
}))`
  font-size: 16px;
  color: ${(props) => props.theme.colors.text.primary};
`;
const EmptyMessage = styled(Text).attrs((props) => ({}))`
  font-size: 16px;
  opacity: 0.5;
  font-weight: 400;
  font-style: italic;
  color: ${(props) => props.theme.colors.text.primary};
`;
const Name = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.large};
  flex: 1;
  color: ${(props) => props.theme.colors.text.primary};
  font-weight: ${(props) => props.theme.fontWeights.medium};
`;

export default Channel;

const styles = StyleSheet.create({});
