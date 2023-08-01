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

import { Avatar } from "../../../components/Avatar";
import { useDispatch } from "react-redux";
import { joinRoom } from "@src/store/slices/chatSlice";
import { useGetChannelMembersQuery } from "@src/store/slices/api/chatApiSlice";
import { Entypo } from "@expo/vector-icons";

const Channel = ({ navigation, channel }) => {
  const { _id: channelId } = channel;
  //hiện giờ chỉ cho chat với 1 người nên đặt tên k có "s"
  const [chatFriend, setChatFriend] = useState(null);
  const dispatch = useDispatch();
  const { isLoading, isSuccess, data, error } =
    useGetChannelMembersQuery(channelId);

  useEffect(() => {
    if (isSuccess) {
      setChatFriend(data[0]);
      console.log("setChatFriend data", data);
    } else console.log("error", error);
  }, [isLoading, data]);
  return (
    <Container
      onPress={() => {
        dispatch(joinRoom(channelId));
        navigation.navigate("ChatRoom", {
          channelId,
          chatFriend,
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
        <Entypo
          style={{
            position: "absolute",

            right: "-20%",
            bottom: "-20%",
          }}
          name="dot-single"
          size={44}
          color="green"
        />
      </TouchableOpacity>
      <View style={{ flex: 1, marginLeft: 8 }}>
        <Name>{chatFriend ? chatFriend.nickname : "Tin nhắn"}</Name>

        <LastMessage>empty</LastMessage>
      </View>
      <View>
        <Text style={{ opacity: 0.5 }}>20 mins ago</Text>
        <Text> </Text>
        <Text> 3 </Text>
      </View>
    </Container>
  );
};

const Container = styled(TouchableOpacity)`
  width: 100%;
  height: auto;
  justify-content: flex-start;
  align-items: center;

  border-color: ${(props) => props.theme.colors.bg.secondary}
  flex-direction: row;
  padding-bottom: 12px;
`;
const Name = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.large};
  margin-bottom: 6px;
  font-weight: ${(props) => props.theme.fontWeights.medium};
`;

const LastMessage = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.body};
`;
export default Channel;

const styles = StyleSheet.create({});
