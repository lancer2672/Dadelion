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

import { Avatar } from "@src/components/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { Entypo } from "@expo/vector-icons";
import { userSelector } from "@src/store/selector";

import { joinRoom } from "@src/store/slices/chatSlice";
import { useGetUserByIdQuery } from "@src/store/slices/api/userApiSlice";
import { commentCreatedTimeFormater } from "@src/utils/timeFormatter";
import { useGetLastMessageQuery } from "@src/store/slices/api/chatApiSlice";

const Channel = ({ navigation, channel }) => {
  const { _id: channelId, memberIds, channelMessages } = channel;
  console.log("channelId", channelId);
  const { user } = useSelector(userSelector);
  const [chatFriend, setChatFriend] = useState(null);
  const [chatFriendId, setChatFriendId] = useState(null);
  const [lastMessage, setLastMessage] = useState(null);
  const { data: lastMsgData, isLoading: isLoadLastMsg } =
    useGetLastMessageQuery(channelId, {
      cacheTime: 0,
      staleTime: 0,
    });
  console.log("lastMsgData", lastMsgData);
  const dispatch = useDispatch();
  const { isLoading, isSuccess, data, error } = useGetUserByIdQuery(
    chatFriendId,
    {
      skip: !chatFriendId,
    }
  );
  useEffect(() => {
    const friendId = memberIds.filter((id) => id != user._id);
    setChatFriendId(friendId[0]);
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
        dispatch(joinRoom(channelId));
        navigation.navigate("ChatRoom", {
          channelId,
          memberIds,
        });
      }}
    >
      <TouchableOpacity>
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

        {lastMessage && <LastMessage>{lastMessage.message}</LastMessage>}
      </View>
      {lastMessage && (
        <View
          style={{
            height: "100%",
            justifyContent: "flex-end",
            marginBottom: 12,
          }}
        >
          <Text style={{ opacity: 0.5 }}>
            {commentCreatedTimeFormater(lastMessage.createdAt)}
          </Text>
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
const Name = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.large};
  flex: 1;
  font-weight: ${(props) => props.theme.fontWeights.medium};
`;

const LastMessage = styled(Text)`
  margin-bottom: 4px;
  font-size: ${(props) => props.theme.fontSizes.body};
`;
export default Channel;

const styles = StyleSheet.create({});
