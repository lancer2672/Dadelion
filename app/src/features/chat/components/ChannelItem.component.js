import {
  StyleSheet,
  Text,
  Image,
  Modal,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
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

const Channel = ({ navigation, channel }) => {
  const { _id: channelId, memberIds } = channel;
  const { t } = useTranslation();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { user } = useSelector(userSelector);
  const [chatFriend, setChatFriend] = useState(null);
  const [chatFriendId, setChatFriendId] = useState(null);
  const [lastMessage, setLastMessage] = useState({});
  const [unseenMessageIds, setUnseenMessageIds] = useState([]);
  const { data: lastMsgData, isLoading: isLoadLastMsg } =
    useGetLastMessageQuery(channelId, {
      refetchOnMountOrArgChange: true,
    });
  const { data: dataChannelMsg } = useLoadChatRoomMessagesQuery(channelId);
  const { isLoading, isSuccess, data, error } = useGetUserByIdQuery(
    chatFriendId,
    {
      skip: !chatFriendId,
    }
  );
  const handleNavigateToGuest = () => {
    if (chatFriendId) {
      navigation.navigate("Guest", { guestId: chatFriendId });
    }
  };
  useEffect(() => {
    if (dataChannelMsg && chatFriend) {
      let countUnseenMsg = [];
      let index = 0;
      while (
        index < dataChannelMsg.length &&
        dataChannelMsg[index].userId == chatFriend._id &&
        dataChannelMsg[index].isSeen == false
      ) {
        countUnseenMsg.push(dataChannelMsg[index]._id);
        index++;
      }
      setUnseenMessageIds(countUnseenMsg);
    }
  }, [dataChannelMsg, chatFriend]);
  useEffect(() => {
    const friendId = memberIds.filter((id) => id != user._id);
    setChatFriendId(() => friendId[0]);
  }, []);

  useEffect(() => {
    if (lastMsgData) {
      setLastMessage(lastMsgData.lastMessage);
    }
  }, [isLoadLastMsg, lastMsgData]);
  useEffect(() => {
    if (isSuccess) {
      setChatFriend(() => data.user);
    } else console.log("error", error);
  }, [isLoading, data]);
  return (
    <Container
      onPress={() => {
        dispatch(setSelectedChannel({ ...channel, chatFriend }));
        navigation.navigate("ChatRoom");
        if (lastMessage) {
          setLastMessage((prev) => ({ ...prev, isSeen: true }));
        }
        setUnseenMessageIds([]);
      }}
    >
      <TouchableOpacity onPress={handleNavigateToGuest}>
        <Avatar
          width={60}
          height={60}
          source={
            chatFriend
              ? chatFriend.avatar
                ? { uri: chatFriend.avatar }
                : undefined //use default source
              : undefined
          }
        ></Avatar>
        {chatFriend?.isOnline == 1 && (
          <Entypo
            style={{
              position: "absolute",
              right: "-24%",
              bottom: "-24%",
            }}
            name="dot-single"
            size={52}
            color="green"
          />
        )}
      </TouchableOpacity>
      <View style={{ flex: 1, marginVertical: 8, marginHorizontal: 8 }}>
        <Name>{chatFriend ? chatFriend.nickname : ""}</Name>

        {lastMessage ? (
          <LastMessage userId={user._id} lastMessage={lastMessage}>
            {lastMessage.message || lastMessage.imageUrls?.length > 0
              ? t("sentImage")
              : lastMessage.callHistory?.duration
              ? t("calledYou")
              : t("missCall")}
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
  color: ${(props) => props.theme.colors.chat.text};
`;
const EmptyMessage = styled(Text).attrs((props) => ({}))`
  font-size: 16px;
  opacity: 0.5;
  font-weight: 400;
  font-style: italic;
  color: ${(props) => props.theme.colors.chat.text};
`;
const Name = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.large};
  flex: 1;
  color: ${(props) => props.theme.colors.chat.text};
  font-weight: ${(props) => props.theme.fontWeights.medium};
`;

export default Channel;

const styles = StyleSheet.create({});
